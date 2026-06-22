/* One-shot codemod: rewrite modern CSS into forms old WebKit (iPad 2 / iOS 9
   Safari, Chrome 63) can parse. Run once with `node scripts/legacy-css.js`. */
const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (p.endsWith('.css')) out.push(p);
  }
  return out;
}

const files = walk(path.resolve(__dirname, '..', 'src'));

for (const file of files) {
  let css = fs.readFileSync(file, 'utf8');

  // Transform each innermost rule `selector { decls }`. The regex is
  // non-recursive, so @media/@keyframes wrappers are left intact and only
  // their inner rules are rewritten.
  css = css.replace(/([^{}]+)\{([^{}]*)\}/g, (full, rawSel, rawBody) => {
    // Strip comments before reading the selector so commas inside a preceding
    // comment don't look like a multi-selector list.
    const sel = rawSel.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    let body = rawBody;
    const isFlex = /display\s*:\s*(?:inline-)?flex/.test(body);
    const isGrid = /display\s*:\s*(?:inline-)?grid/.test(body);

    // position: sticky -> add the -webkit- prefix Safari 9 requires.
    body = body.replace(/position\s*:\s*sticky\s*;/g,
      'position: -webkit-sticky;\n  position: sticky;');

    // inset: <v> -> physical longhands (unsupported before Chrome 87 / Safari 14).
    body = body.replace(/\binset\s*:\s*([^;]+);/g,
      (m, v) => `top: ${v.trim()}; right: ${v.trim()}; bottom: ${v.trim()}; left: ${v.trim()};`);

    // margin-inline: <v> -> physical left/right.
    body = body.replace(/\bmargin-inline\s*:\s*([^;]+);/g,
      (m, v) => `margin-left: ${v.trim()}; margin-right: ${v.trim()};`);

    // filter -> add -webkit-filter (Safari 9.0 needs the prefix).
    body = body.replace(/(^|[\s;])filter\s*:\s*([^;]+);/g,
      (m, pre, v) => `${pre}-webkit-filter: ${v.trim()}; filter: ${v.trim()};`);

    let appended = '';

    if (isGrid) {
      // Chrome 63 only understands grid-gap, not the gap alias for grids.
      body = body.replace(/(^|[\s;])gap\s*:\s*([^;]+);/g,
        (m, pre, v) => `${pre}grid-gap: ${v.trim()}; gap: ${v.trim()};`);
    } else if (isFlex) {
      // Flexbox gap is unsupported before Chrome 84 / Safari 14.1. Replace it
      // with sibling margins (owl selector). Single-selector containers only.
      const gapMatch = body.match(/(^|[\s;])gap\s*:\s*([^;]+);/);
      if (gapMatch && !sel.includes(',')) {
        const vals = gapMatch[2].trim().split(/\s+/);
        const isColumn = /flex-direction\s*:\s*column/.test(body);
        const prop = isColumn ? 'margin-top' : 'margin-left';
        const val = isColumn ? vals[0] : (vals[1] || vals[0]);
        body = body.replace(/(^|[\s;])gap\s*:\s*[^;]+;/, '$1');
        appended = `\n${sel} > * + * { ${prop}: ${val}; }`;
      }
    }

    return `${rawSel}{${body}}${appended}`;
  });

  fs.writeFileSync(file, css);
}

console.log(`Rewrote ${files.length} CSS files.`);
