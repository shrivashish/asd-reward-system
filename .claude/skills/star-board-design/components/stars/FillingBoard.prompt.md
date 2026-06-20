The namesake visual: a wrapping grid of slots, one per star of a goal's cost, filling gold left-to-right as stars are earned. Concrete and countable — easier to read than a percentage bar.

```jsx
<FillingBoard balance={7} cost={10} />
```

Lives inside `GoalBar`. Earned stars never disappear (the ledger is append-only), so the board only ever grows.
