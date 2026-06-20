/* @ds-bundle: {"format":3,"namespace":"StarBoardDesignSystem_0e745f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"},{"name":"AppHeader","sourcePath":"components/layout/AppHeader.jsx"},{"name":"HeaderAction","sourcePath":"components/layout/AppHeader.jsx"},{"name":"BottomNav","sourcePath":"components/layout/BottomNav.jsx"},{"name":"ListRow","sourcePath":"components/layout/ListRow.jsx"},{"name":"Sheet","sourcePath":"components/layout/Sheet.jsx"},{"name":"TaskCard","sourcePath":"components/layout/TaskCard.jsx"},{"name":"FillingBoard","sourcePath":"components/stars/FillingBoard.jsx"},{"name":"GoalBar","sourcePath":"components/stars/GoalBar.jsx"},{"name":"StarPips","sourcePath":"components/stars/StarPips.jsx"},{"name":"StarRating","sourcePath":"components/stars/StarRating.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"362a6f2143e4","components/core/Badge.jsx":"72e6d5941529","components/core/Button.jsx":"b43f964f5734","components/core/Card.jsx":"313572b193f1","components/core/Toggle.jsx":"8172ad6806c7","components/layout/AppHeader.jsx":"b14dd2e92135","components/layout/BottomNav.jsx":"1b2e0e1a0ab1","components/layout/ListRow.jsx":"593b6fd32a67","components/layout/Sheet.jsx":"0b313162b1f4","components/layout/TaskCard.jsx":"6b533581735d","components/stars/FillingBoard.jsx":"a59d1f841048","components/stars/GoalBar.jsx":"ca29abf19fb0","components/stars/StarPips.jsx":"de3217d08a96","components/stars/StarRating.jsx":"08ad6b6bea16","ui_kits/star-board/app.jsx":"98ce79866879","ui_kits/star-board/data.js":"fb3785db9d79","ui_kits/star-board/screens-child.jsx":"dc1623f39954","ui_kits/star-board/screens-parent.jsx":"b355a7575f9f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StarBoardDesignSystem_0e745f = window.StarBoardDesignSystem_0e745f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Round avatar tile. Shows an emoji glyph (the product's default,
 * image-first identity) or an image URL, on the quiet surface-2 fill.
 */
function Avatar({
  emoji = '👤',
  src = null,
  size = 48,
  alt = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "img",
    "aria-label": alt,
    style: {
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: '50%',
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Math.round(size * 0.55),
      overflow: 'hidden',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, emoji));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small rounded pill label. `tone` picks the color; `soft` uses a tinted
 * background with colored text instead of a solid fill.
 */
function Badge({
  children,
  tone = 'info',
  soft = false,
  style = {},
  ...rest
}) {
  const tones = {
    info: {
      solid: 'var(--plum)',
      ink: 'var(--plum)'
    },
    reward: {
      solid: 'var(--gold)',
      ink: 'var(--gold-deep)'
    },
    action: {
      solid: 'var(--teal)',
      ink: 'var(--teal-deep)'
    },
    danger: {
      solid: 'var(--coral)',
      ink: 'var(--coral)'
    },
    neutral: {
      solid: 'var(--ink-soft)',
      ink: 'var(--ink-soft)'
    }
  };
  const t = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 1,
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      background: soft ? 'color-mix(in srgb, ' + t.solid + ' 16%, transparent)' : t.solid,
      color: soft ? t.ink : '#fff',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Star Board primary button. Big, rounded, calm. Defaults to the
 * 56px minimum tap target the whole product is built around.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const palettes = {
    primary: {
      bg: 'var(--teal)',
      fg: '#fff',
      press: 'var(--teal-deep)'
    },
    reward: {
      bg: 'var(--gold)',
      fg: '#fff',
      press: 'var(--gold-deep)'
    },
    secondary: {
      bg: 'var(--surface-2)',
      fg: 'var(--ink)',
      press: 'var(--line)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--ink-soft)',
      press: 'var(--surface-2)'
    },
    danger: {
      bg: 'var(--coral)',
      fg: '#fff',
      press: 'var(--coral)'
    }
  };
  const p = palettes[variant] || palettes.primary;
  const sizes = {
    sm: {
      minHeight: 40,
      padding: '6px 14px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      minHeight: 'var(--tap-min)',
      padding: '12px 20px',
      fontSize: 'var(--text-md)'
    },
    lg: {
      minHeight: 'var(--tap-min)',
      padding: '14px 28px',
      fontSize: 'var(--text-lg)'
    }
  };
  const s = sizes[size] || sizes.md;
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      width: block ? '100%' : 'auto',
      minHeight: s.minHeight,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      borderRadius: 'var(--radius)',
      background: pressed && !disabled ? p.press : p.bg,
      color: p.fg,
      opacity: disabled ? 0.5 : 1,
      boxShadow: variant === 'ghost' || variant === 'secondary' ? 'none' : 'var(--shadow)',
      transition: 'background var(--anim-dur) var(--anim-ease)',
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, iconLeft), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The basic Star Board surface: white, generously rounded, soft cool shadow.
 * Use `inset` for the quieter surface-2 fill (fields, notes).
 */
function Card({
  children,
  inset = false,
  selected = false,
  selectColor = 'var(--teal)',
  padding = 'var(--space-4)',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: inset ? 'var(--surface-2)' : 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: inset ? 'none' : 'var(--shadow)',
      border: selected ? `2px solid ${selectColor}` : 'none',
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Star Board switch toggle. Matches the Settings screen: 52×30 track,
 * teal when on, white thumb that slides 22px.
 */
function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    role: "switch",
    "aria-checked": checked,
    "aria-label": label,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 52,
      height: 30,
      flexShrink: 0,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--teal)' : 'var(--line)',
      position: 'relative',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--anim-dur) var(--anim-ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: 3,
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 4px rgba(0,0,0,.2)',
      transform: checked ? 'translateX(22px)' : 'translateX(0)',
      transition: 'transform var(--anim-dur) var(--anim-ease)'
    }
  }));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/layout/AppHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sticky app header: ⭐ Star Board wordmark (teal, Fredoka) on the left,
 * a single round action button on the right (parent gate / back).
 */
function AppHeader({
  title = 'Star Board',
  action = null
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--line)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--teal)'
    }
  }, "\u2B50 ", title), action);
}

/** The round 56px header action button (e.g. ⚙️ parent gate, ← back). */
function HeaderAction({
  children,
  onClick,
  label,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    "aria-label": label,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      minWidth: 'var(--tap-min)',
      minHeight: 'var(--tap-min)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--text-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: pressed ? 'var(--line)' : 'var(--surface-2)',
      color: 'var(--ink)',
      transition: 'background var(--anim-dur)'
    }
  }, rest), children);
}
Object.assign(__ds_scope, { AppHeader, HeaderAction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/layout/BottomNav.jsx
try { (() => {
/**
 * Bottom tab bar for the parent area. Emoji icon over a tiny label;
 * the active tab turns teal. Fixed to the bottom of the viewport.
 */
function BottomNav({
  items = [],
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Parent navigation",
    style: {
      display: 'flex',
      background: 'var(--surface)',
      borderTop: '1px solid var(--line)'
    }
  }, items.map(item => {
    const active = item.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onChange && onChange(item.id),
      "aria-current": active ? 'page' : undefined,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: '8px 4px',
        minHeight: 'var(--tap-min)',
        color: active ? 'var(--teal)' : 'var(--ink-soft)',
        transition: 'color var(--anim-dur)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        fontSize: 20
      }
    }, item.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-bold)',
        fontSize: 'var(--text-xs)'
      }
    }, item.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/layout/ListRow.jsx
try { (() => {
/**
 * Horizontal list row on a white card: leading visual (emoji/image/node),
 * title + optional meta, and trailing actions. The workhorse of every
 * parent management list (tasks, rewards, children, settings).
 */
function ListRow({
  leading,
  title,
  meta,
  trailing,
  selected = false,
  selectColor = 'var(--teal)',
  dim = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      background: 'var(--surface)',
      borderRadius: 'var(--radius)',
      padding: 'var(--space-3)',
      boxShadow: 'var(--shadow)',
      border: selected ? `2px solid ${selectColor}` : 'none',
      opacity: dim ? 0.5 : 1,
      ...style
    }
  }, leading != null && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), meta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--ink-soft)'
    }
  }, meta)), trailing != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center',
      flexShrink: 0
    }
  }, trailing));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/layout/Sheet.jsx
try { (() => {
/**
 * Modal surface over the calm scrim. `anchor="bottom"` slides up from the
 * bottom edge (award flow); `anchor="center"` is a centered dialog
 * (parent gate, confirmations). Tapping the scrim calls onClose.
 */
function Sheet({
  children,
  onClose,
  anchor = 'bottom',
  maxWidth = 480,
  zIndex = 50
}) {
  const bottom = anchor === 'bottom';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay-scrim)',
      display: 'flex',
      alignItems: bottom ? 'flex-end' : 'center',
      justifyContent: 'center',
      zIndex,
      padding: bottom ? 0 : 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface)',
      borderRadius: bottom ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
      padding: bottom ? '24px 20px 36px' : '32px 24px',
      width: '100%',
      maxWidth,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      animation: bottom ? 'sb-sheet-up var(--anim-dur) var(--anim-ease-settle)' : 'sb-sheet-pop var(--anim-dur) var(--anim-ease-settle)'
    }
  }, children), /*#__PURE__*/React.createElement("style", null, `
        @keyframes sb-sheet-up { from { transform: translateY(20px); opacity: .8 } to { transform: translateY(0); opacity: 1 } }
        @keyframes sb-sheet-pop { from { transform: scale(.95); opacity: .6 } to { transform: scale(1); opacity: 1 } }
      `));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/stars/FillingBoard.jsx
try { (() => {
/**
 * The literal "star board" — a wrapping grid of slots that fill with gold
 * stars as the child earns toward a goal. One slot per star of the cost.
 */
function FillingBoard({
  balance = 0,
  cost = 10,
  slotSize = 34,
  style = {}
}) {
  const slots = Math.max(cost, 1);
  const filled = Math.min(balance, slots);
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": `${filled} of ${slots} stars filled`,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5,
      justifyContent: 'center',
      padding: '8px 0',
      ...style
    }
  }, Array.from({
    length: slots
  }).map((_, i) => {
    const on = i < filled;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: slotSize,
        height: slotSize,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: on ? 'var(--gold)' : 'var(--surface-2)',
        border: `2px solid ${on ? 'var(--gold-deep)' : 'var(--line)'}`,
        transition: 'background var(--anim-dur) var(--anim-ease), border-color var(--anim-dur)'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        fontSize: Math.round(slotSize * 0.5),
        color: '#fff',
        lineHeight: 1
      }
    }, "\u2605"));
  }));
}
Object.assign(__ds_scope, { FillingBoard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stars/FillingBoard.jsx", error: String((e && e.message) || e) }); }

// components/stars/GoalBar.jsx
try { (() => {
/**
 * The child board's goal header: the current reward, the balance / cost,
 * the FillingBoard, and a redeem button once the balance is enough.
 */
function GoalBar({
  reward,
  balance = 0,
  onRedeem
}) {
  if (!reward) {
    return /*#__PURE__*/React.createElement("div", {
      style: barStyle(false)
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'center',
        color: 'var(--ink-soft)',
        fontSize: 'var(--text-base)',
        padding: 'var(--space-4)'
      }
    }, "No goal set yet \u2014 ask a parent to set one!"));
  }
  const ready = balance >= reward.cost;
  return /*#__PURE__*/React.createElement("div", {
    style: barStyle(ready)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    emoji: reward.emoji,
    src: reward.src,
    size: 64,
    alt: reward.label
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--ink)'
    }
  }, reward.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--ink-soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-heavy)',
      color: 'var(--teal)'
    }
  }, balance), ' / ', reward.cost, " \u2605"))), /*#__PURE__*/React.createElement(__ds_scope.FillingBoard, {
    balance: balance,
    cost: reward.cost
  }), ready && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "reward",
    block: true,
    iconLeft: "\uD83C\uDF89",
    onClick: () => onRedeem && onRedeem(reward),
    style: {
      marginTop: 'var(--space-3)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)'
    }
  }, "Ready to redeem!"));
}
function barStyle(ready) {
  return {
    background: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    boxShadow: 'var(--shadow)',
    border: ready ? '2px solid var(--gold)' : 'none'
  };
}
Object.assign(__ds_scope, { GoalBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stars/GoalBar.jsx", error: String((e && e.message) || e) }); }

// components/stars/StarPips.jsx
try { (() => {
/**
 * Compact star meter — small ★ glyphs, `filled` gold, the rest line-gray.
 * Used inline on task cards to show a task's max-star value or progress.
 */
function StarPips({
  max = 3,
  filled = 0,
  size = 14,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": `${filled} of ${max} stars`,
    style: {
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      ...style
    }
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    "aria-hidden": "true",
    style: {
      fontSize: size,
      color: i < filled ? 'var(--gold)' : 'var(--line)'
    }
  }, "\u2605")));
}
Object.assign(__ds_scope, { StarPips });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stars/StarPips.jsx", error: String((e && e.message) || e) }); }

// components/layout/TaskCard.jsx
try { (() => {
/**
 * The big tappable task tile on the child board. Large image-first visual,
 * Fredoka label, star pips, and (for first-try tasks) a plum badge.
 * Whole card is one 100px+ tap target.
 */
function TaskCard({
  task,
  onTap
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onTap && onTap(task),
    "aria-label": `Award stars for ${task.label}`,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      boxShadow: 'var(--shadow)',
      width: '100%',
      textAlign: 'left',
      minHeight: 100,
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
      transition: 'transform var(--anim-dur) var(--anim-ease)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    emoji: task.emoji,
    src: task.src,
    size: 72,
    alt: task.label,
    style: {
      borderRadius: 'var(--radius)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--ink)',
      lineHeight: 'var(--leading-tight)'
    }
  }, task.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StarPips, {
    max: task.maxStars
  }), task.mode === 'firstTry' && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "info"
  }, "First try"))));
}
Object.assign(__ds_scope, { TaskCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/TaskCard.jsx", error: String((e && e.message) || e) }); }

// components/stars/StarRating.jsx
try { (() => {
/**
 * The award picker. Round star buttons 0..max; tapping selects how many
 * stars the child managed. Includes an explicit "0" (no stars) option —
 * declining costs nothing (P2 soft exit). Selected star scales up gold.
 */
function StarRating({
  max = 3,
  value = 0,
  onChange,
  prompt = 'How much did they manage?'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, prompt && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--ink-soft)'
    }
  }, prompt), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, Array.from({
    length: max + 1
  }).map((_, i) => {
    const active = i === value;
    const zero = i === 0;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onChange && onChange(i),
      "aria-pressed": active,
      "aria-label": zero ? 'No stars' : `${i} star${i > 1 ? 's' : ''}`,
      style: {
        width: 56,
        height: 56,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: zero ? 18 : 24,
        background: active ? 'var(--gold)' : 'var(--surface-2)',
        color: active ? '#fff' : zero ? 'var(--ink-soft)' : 'var(--line)',
        transform: active ? 'scale(1.1)' : 'scale(1)',
        transition: 'background var(--anim-dur) var(--anim-ease), transform var(--anim-dur) var(--anim-ease), color var(--anim-dur)'
      }
    }, zero ? '0' : '★');
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--ink-soft)',
      minHeight: 20,
      textAlign: 'center'
    }
  }, value === 0 ? 'No stars — that is okay, try again later' : `${value} star${value > 1 ? 's' : ''}`));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stars/StarRating.jsx", error: String((e && e.message) || e) }); }

// ui_kits/star-board/app.jsx
try { (() => {
// Star Board UI kit — app shell: header, parent gate, mode/nav routing.
const ADS = window.StarBoardDesignSystem_0e745f;
const {
  AppHeader,
  HeaderAction,
  BottomNav,
  Sheet: ASheet,
  Button: ABtn
} = ADS;
function ParentGate({
  onPass,
  onClose
}) {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState('');
  function submit() {
    if (val.trim() === '12') onPass();else {
      setErr('Not quite — try again');
      setVal('');
    }
  }
  return /*#__PURE__*/React.createElement(ASheet, {
    anchor: "center",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      textAlign: 'center',
      color: 'var(--ink)'
    }
  }, "What is 7 + 5?"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    value: val,
    autoFocus: true,
    onChange: e => setVal(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submit(),
    style: {
      fontSize: 'var(--text-3xl)',
      fontFamily: 'var(--font-display)',
      textAlign: 'center',
      border: '2px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: 12,
      background: 'var(--surface-2)',
      color: 'var(--ink)',
      width: '100%'
    }
  }), err && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--coral)',
      textAlign: 'center',
      fontSize: 'var(--text-sm)'
    }
  }, err), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ABtn, {
    variant: "secondary",
    block: true,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(ABtn, {
    variant: "primary",
    block: true,
    onClick: submit
  }, "Enter")));
}
function App() {
  const [parentMode, setParentMode] = React.useState(false);
  const [view, setView] = React.useState('tasks');
  const [gate, setGate] = React.useState(false);
  const [tasks] = React.useState(window.SBData.initialTasks);
  const [rewards] = React.useState(window.SBData.initialRewards);
  const [balance, setBalance] = React.useState(window.SBData.startingBalance);
  const [settings, setSettings] = React.useState(() => {
    const o = {};
    window.SBData.settings.forEach(s => o[s.key] = s.on);
    return o;
  });
  const goal = rewards.find(r => r.id === window.SBData.goalId);

  // apply calm + contrast themes to the phone frame
  React.useEffect(() => {
    const el = document.getElementById('sb-app');
    if (!el) return;
    el.dataset.calm = settings.calmMode ? 'true' : 'false';
    if (settings.highContrast) el.dataset.contrast = 'high';else delete el.dataset.contrast;
  }, [settings.calmMode, settings.highContrast]);
  function toggle(key) {
    setSettings(s => ({
      ...s,
      [key]: !s[key]
    }));
  }
  function award(task, n) {
    setBalance(b => b + n);
  }
  function redeem(r) {
    setBalance(b => Math.max(0, b - r.cost));
  }
  function headerAction() {
    if (parentMode) return /*#__PURE__*/React.createElement(HeaderAction, {
      label: "Back to board",
      onClick: () => setParentMode(false)
    }, "\u2190 Board");
    return /*#__PURE__*/React.createElement(HeaderAction, {
      label: "Parent area",
      onClick: () => settings.parentGate ? setGate(true) : setParentMode(true)
    }, "\u2699\uFE0F");
  }
  const P = window.SBParent;
  const S = window.SBScreens;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
    action: headerAction()
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--bg)'
    }
  }, !parentMode && /*#__PURE__*/React.createElement(S.ChildBoard, {
    tasks: tasks,
    goal: goal,
    balance: balance,
    settings: settings,
    onAward: award,
    onRedeem: redeem
  }), parentMode && view === 'tasks' && /*#__PURE__*/React.createElement(P.TasksScreen, {
    tasks: tasks
  }), parentMode && view === 'rewards' && /*#__PURE__*/React.createElement(P.RewardsScreen, {
    rewards: rewards,
    goalId: window.SBData.goalId
  }), parentMode && view === 'child' && /*#__PURE__*/React.createElement(P.ChildSettingsScreen, null), parentMode && view === 'settings' && /*#__PURE__*/React.createElement(P.SettingsScreen, {
    settings: settings,
    onToggle: toggle
  }), parentMode && view === 'guide' && /*#__PURE__*/React.createElement(P.GuideScreen, null)), parentMode && /*#__PURE__*/React.createElement(BottomNav, {
    items: window.SBData.nav,
    value: view,
    onChange: setView
  }), gate && /*#__PURE__*/React.createElement(ParentGate, {
    onPass: () => {
      setGate(false);
      setParentMode(true);
    },
    onClose: () => setGate(false)
  }));
}
ReactDOM.createRoot(document.getElementById('sb-root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/star-board/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/star-board/data.js
try { (() => {
// Star Board UI kit — seed data & parent-guide copy (from the source app).
window.SBData = {
  initialTasks: [{
    id: 't1',
    label: 'Brush teeth',
    emoji: '🦷',
    maxStars: 3,
    mode: 'skill',
    capabilityNote: 'Try the mild toothpaste if needed'
  }, {
    id: 't2',
    label: 'Get dressed',
    emoji: '👕',
    maxStars: 3,
    mode: 'skill',
    capabilityNote: ''
  }, {
    id: 't3',
    label: 'Try a new food',
    emoji: '🍎',
    maxStars: 5,
    mode: 'firstTry',
    capabilityNote: ''
  }],
  initialRewards: [{
    id: 'r1',
    label: 'Choose a movie',
    emoji: '🎬',
    cost: 10
  }, {
    id: 'r2',
    label: 'Extra park time',
    emoji: '🛝',
    cost: 16
  }, {
    id: 'r3',
    label: 'Bake cookies',
    emoji: '🍪',
    cost: 24
  }],
  goalId: 'r1',
  startingBalance: 7,
  settings: [{
    key: 'calmMode',
    label: 'Calm mode',
    desc: 'Removes all animations and sounds',
    on: false
  }, {
    key: 'sound',
    label: 'Sound effects',
    desc: 'Soft audio on star award',
    on: true
  }, {
    key: 'tts',
    label: 'Read aloud (TTS)',
    desc: 'Speaks task/reward labels when tapped',
    on: false
  }, {
    key: 'highContrast',
    label: 'High contrast',
    desc: 'Increases text and color contrast',
    on: false
  }, {
    key: 'parentGate',
    label: 'Parent gate',
    desc: 'Require answer to access parent area',
    on: true
  }, {
    key: 'capabilityCheck',
    label: 'Capability check',
    desc: 'Show check before skill-mode awards (P1)',
    on: true
  }],
  capabilityOptions: [{
    id: 'loud',
    label: 'Too loud',
    icon: '🔊'
  }, {
    id: 'hurts',
    label: 'Something hurts',
    icon: '😣'
  }, {
    id: 'tired',
    label: 'Too tired',
    icon: '😴'
  }, {
    id: 'no',
    label: "Doesn't want to",
    icon: '✋'
  }, {
    id: 'ok',
    label: 'All good, proceed →',
    icon: '✅'
  }],
  guide: [{
    title: "Won't vs Can't",
    body: "Sensory pain, anxiety, and skill gaps look identical to defiance from the outside. Rewarding a \u201ccan't\u201d is asking the impossible — check first, reward second."
  }, {
    title: 'Reward the attempt, not the win',
    body: 'For new or scary things, pay out on the brave try — whether it goes well or not. Gating the reward on success turns an invitation into pressure.'
  }, {
    title: 'Plan the fade',
    body: 'A reward system is scaffolding — it should come down. When your child is doing something reliably without prompting, start tapering the stars.'
  }, {
    title: 'Earned is earned, always',
    body: 'Stars earned are never taken away. A hard moment later in the day doesn\u2019t undo what was earned this morning. The app has no star-removal tool.'
  }, {
    title: 'Soft exits matter',
    body: 'Your child can always say no, stop partway, or have a hard day — and lose nothing. Participation is an invitation, not a demand.'
  }],
  nav: [{
    id: 'tasks',
    label: 'Tasks',
    icon: '📋'
  }, {
    id: 'rewards',
    label: 'Rewards',
    icon: '🎁'
  }, {
    id: 'child',
    label: 'Child',
    icon: '👤'
  }, {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️'
  }, {
    id: 'guide',
    label: 'Guide',
    icon: '📖'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/star-board/data.js", error: String((e && e.message) || e) }); }

// ui_kits/star-board/screens-child.jsx
try { (() => {
// Star Board UI kit — screens. Composes the design-system components.
const DS = window.StarBoardDesignSystem_0e745f;
const {
  Button,
  Card,
  Badge,
  Toggle,
  Avatar,
  StarRating,
  GoalBar,
  ListRow,
  TaskCard,
  Sheet
} = DS;

/* ── Award flow: capability check → star pick → calm celebration ── */
function AwardFlow({
  task,
  settings,
  onAward,
  onClose
}) {
  const needsCap = task.mode === 'skill' && settings.capabilityCheck;
  const [step, setStep] = React.useState(needsCap ? 'capability' : 'pick');
  const [stars, setStars] = React.useState(0);
  const [celebrate, setCelebrate] = React.useState(0);
  function confirm() {
    const amount = task.mode === 'firstTry' ? task.maxStars : stars;
    if (amount === 0) {
      onClose();
      return;
    }
    setCelebrate(amount);
    setTimeout(() => {
      onAward(amount);
      onClose();
    }, settings.calmMode ? 700 : 1600);
  }
  if (celebrate) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,.15)'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '40px 48px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 56
      }
    }, "\u2B50"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-4xl)',
        color: 'var(--gold)',
        fontWeight: 600
      }
    }, "+", celebrate), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-xl)',
        color: 'var(--ink)'
      }
    }, "Great job!")));
  }
  return /*#__PURE__*/React.createElement(Sheet, {
    anchor: "bottom",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      borderBottom: '1px solid var(--line)',
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    emoji: task.emoji,
    size: 56,
    alt: task.label,
    style: {
      borderRadius: 'var(--radius)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      color: 'var(--ink)'
    }
  }, task.label)), step === 'capability' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--ink)',
      textAlign: 'center'
    }
  }, "Is anything making this hard right now?"), task.capabilityNote && /*#__PURE__*/React.createElement("p", {
    style: {
      background: 'var(--surface-2)',
      borderRadius: 'var(--radius)',
      padding: '10px 14px',
      fontSize: 'var(--text-sm)',
      color: 'var(--ink-soft)',
      borderLeft: '3px solid var(--teal)'
    }
  }, "\uD83D\uDCA1 ", task.capabilityNote), window.SBData.capabilityOptions.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.id,
    onClick: () => {
      if (opt.id === 'ok') setStep('pick');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minHeight: 'var(--tap-min)',
      padding: '12px 16px',
      background: opt.id === 'ok' ? 'var(--teal)' : 'var(--surface-2)',
      color: opt.id === 'ok' ? '#fff' : 'var(--ink)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--text-base)',
      textAlign: 'left',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      width: 28
    }
  }, opt.icon), /*#__PURE__*/React.createElement("span", null, opt.label))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      alignSelf: 'center',
      color: 'var(--ink-soft)',
      fontSize: 'var(--text-base)',
      padding: 8,
      minHeight: 44
    }
  }, "Cancel")), step === 'pick' && /*#__PURE__*/React.createElement(React.Fragment, null, task.mode === 'firstTry' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: 16,
      background: 'var(--surface-2)',
      borderRadius: 'var(--radius)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 40
    }
  }, "\uD83C\uDF1F"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      color: 'var(--ink)',
      textAlign: 'center'
    }
  }, "They gave it a try \u2014 full stars!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-3xl)',
      color: 'var(--gold)'
    }
  }, task.maxStars, " \u2605")) : /*#__PURE__*/React.createElement(StarRating, {
    max: task.maxStars,
    value: stars,
    onChange: setStars
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: confirm
  }, task.mode === 'firstTry' ? `Give ${task.maxStars} ★` : stars > 0 ? `Give ${stars} ★` : 'No stars (ok)'))));
}

/* ── Child board ── */
function ChildBoard({
  tasks,
  goal,
  balance,
  settings,
  onAward,
  onRedeem
}) {
  const [active, setActive] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(GoalBar, {
    reward: goal,
    balance: balance,
    onRedeem: onRedeem
  }), tasks.map(t => /*#__PURE__*/React.createElement(TaskCard, {
    key: t.id,
    task: t,
    onTap: setActive
  })), active && /*#__PURE__*/React.createElement(AwardFlow, {
    task: active,
    settings: settings,
    onClose: () => setActive(null),
    onAward: n => onAward(active, n)
  }));
}
window.SBScreens = {
  ChildBoard,
  AwardFlow
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/star-board/screens-child.jsx", error: String((e && e.message) || e) }); }

// ui_kits/star-board/screens-parent.jsx
try { (() => {
// Star Board UI kit — parent-area screens.
const PDS = window.StarBoardDesignSystem_0e745f;
const {
  Button: PBtn,
  Card: PCard,
  Badge: PBadge,
  Toggle: PToggle,
  Avatar: PAvatar,
  ListRow: PRow
} = PDS;
function ScreenWrap({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      padding: 16,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      color: 'var(--ink)'
    }
  }, title), children);
}
function TasksScreen({
  tasks,
  goalSetForReward
}) {
  return /*#__PURE__*/React.createElement(ScreenWrap, {
    title: "Tasks"
  }, /*#__PURE__*/React.createElement(PBtn, {
    variant: "primary",
    block: true,
    iconLeft: "\uFF0B"
  }, "Add task"), tasks.map(t => /*#__PURE__*/React.createElement(PRow, {
    key: t.id,
    leading: /*#__PURE__*/React.createElement(PAvatar, {
      emoji: t.emoji,
      size: 44
    }),
    title: t.label,
    meta: `${t.mode === 'firstTry' ? 'First try' : 'Skill'} · max ${t.maxStars}★`,
    trailing: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PBtn, {
      variant: "secondary",
      size: "sm"
    }, "Edit"), /*#__PURE__*/React.createElement(PBtn, {
      variant: "danger",
      size: "sm"
    }, "Archive"))
  })));
}
function RewardsScreen({
  rewards,
  goalId
}) {
  return /*#__PURE__*/React.createElement(ScreenWrap, {
    title: "Rewards & goal"
  }, /*#__PURE__*/React.createElement(PBtn, {
    variant: "reward",
    block: true,
    iconLeft: "\uFF0B"
  }, "Add reward"), rewards.map(r => {
    const isGoal = r.id === goalId;
    return /*#__PURE__*/React.createElement(PRow, {
      key: r.id,
      leading: /*#__PURE__*/React.createElement(PAvatar, {
        emoji: r.emoji,
        size: 48
      }),
      title: r.label,
      meta: `${r.cost} ★`,
      selected: isGoal,
      selectColor: "var(--gold)",
      trailing: isGoal ? /*#__PURE__*/React.createElement(PBadge, {
        tone: "reward",
        soft: true
      }, "Current goal") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PBtn, {
        variant: "secondary",
        size: "sm"
      }, "Edit"), /*#__PURE__*/React.createElement(PBtn, {
        variant: "reward",
        size: "sm"
      }, "Set goal"))
    });
  }));
}
function ChildSettingsScreen() {
  return /*#__PURE__*/React.createElement(ScreenWrap, {
    title: "Children"
  }, /*#__PURE__*/React.createElement(PBtn, {
    variant: "primary",
    block: true,
    iconLeft: "\uFF0B"
  }, "Add child"), /*#__PURE__*/React.createElement(PRow, {
    leading: /*#__PURE__*/React.createElement(PAvatar, {
      emoji: "\uD83D\uDC64",
      size: 48
    }),
    title: "Leo",
    selected: true,
    selectColor: "var(--teal)",
    trailing: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PBadge, {
      tone: "action",
      soft: true
    }, "Active"), /*#__PURE__*/React.createElement(PBtn, {
      variant: "secondary",
      size: "sm"
    }, "Edit"))
  }), /*#__PURE__*/React.createElement(PRow, {
    leading: /*#__PURE__*/React.createElement(PAvatar, {
      emoji: "\uD83D\uDC64",
      size: 48
    }),
    title: "Mia",
    trailing: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PBtn, {
      variant: "primary",
      size: "sm"
    }, "Select"), /*#__PURE__*/React.createElement(PBtn, {
      variant: "secondary",
      size: "sm"
    }, "Edit"))
  }));
}
function SettingsScreen({
  settings,
  onToggle
}) {
  return /*#__PURE__*/React.createElement(ScreenWrap, {
    title: "Settings"
  }, window.SBData.settings.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      background: 'var(--surface)',
      borderRadius: 'var(--radius)',
      padding: 16,
      boxShadow: 'var(--shadow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-base)',
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      color: 'var(--ink-soft)',
      marginTop: 2
    }
  }, s.desc)), /*#__PURE__*/React.createElement(PToggle, {
    checked: settings[s.key],
    onChange: () => onToggle(s.key),
    label: s.label
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--ink)',
      marginTop: 8
    }
  }, "Data"), /*#__PURE__*/React.createElement(PBtn, {
    variant: "secondary",
    block: true
  }, "\u2193 Export backup"), /*#__PURE__*/React.createElement(PBtn, {
    variant: "secondary",
    block: true
  }, "\u2191 Import backup"));
}
function GuideScreen() {
  return /*#__PURE__*/React.createElement(ScreenWrap, {
    title: "Parent guide"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--ink-soft)',
      marginTop: -4
    }
  }, "How to use this tool well \u2014 including when not to."), window.SBData.guide.map(g => /*#__PURE__*/React.createElement(PCard, {
    key: g.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--ink)'
    }
  }, g.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--ink-soft)',
      lineHeight: 1.5
    }
  }, g.body))));
}
window.SBParent = {
  TasksScreen,
  RewardsScreen,
  ChildSettingsScreen,
  SettingsScreen,
  GuideScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/star-board/screens-parent.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.HeaderAction = __ds_scope.HeaderAction;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.TaskCard = __ds_scope.TaskCard;

__ds_ns.FillingBoard = __ds_scope.FillingBoard;

__ds_ns.GoalBar = __ds_scope.GoalBar;

__ds_ns.StarPips = __ds_scope.StarPips;

__ds_ns.StarRating = __ds_scope.StarRating;

})();
