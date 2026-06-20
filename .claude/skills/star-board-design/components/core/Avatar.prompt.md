Round identity tile, emoji-first. Used for child profiles and anywhere a person/photo is shown.

```jsx
<Avatar emoji="👤" size={48} alt="Leo" />
<Avatar src={photoUrl} size={64} alt="Leo" />
```

Defaults to the 👤 glyph on surface-2 — Star Board is image-first, so a real photo (`src`) is encouraged but emoji is always a graceful fallback.
