Big, rounded, calm action button — use for every tap action; defaults to the 56px minimum target the whole product is built on.

```jsx
<Button variant="primary" onClick={save}>Save</Button>
<Button variant="reward" iconLeft="🎉" block>Ready to redeem!</Button>
<Button variant="secondary" size="sm">Edit</Button>
<Button variant="danger" size="sm">Archive</Button>
```

Variants: `primary` (teal, default action), `reward` (gold — stars & redemption only), `secondary` (quiet surface-2 fill), `ghost` (text-only), `danger` (coral — destructive only). Sizes `sm`/`md`/`lg`; `block` stretches full width. Press state darkens the fill; disabled drops to 50% opacity. Reserve gold for reward moments and coral for destructive intent.
