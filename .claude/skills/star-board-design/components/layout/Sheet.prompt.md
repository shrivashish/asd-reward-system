Modal surface over the calm dark scrim. Two anchors: `bottom` slides up from the edge (the award flow, pickers) and `center` is a dialog (parent gate, confirmations). Tapping the scrim closes it.

```jsx
<Sheet anchor="bottom" onClose={close}>
  <StarRating max={3} value={stars} onChange={setStars} />
  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
    <Button variant="secondary" block onClick={close}>Cancel</Button>
    <Button variant="primary" block onClick={give}>Give {stars} ★</Button>
  </div>
</Sheet>

<Sheet anchor="center" onClose={close}>…parent gate…</Sheet>
```

Animations are short and respect Calm/reduced-motion (they collapse to 0s). Always provide a Cancel — every flow has a soft exit.
