The header at the top of the child board. Shows the current reward, the running balance against its cost, the `FillingBoard`, and — once the balance covers the cost — a gold "Ready to redeem!" button (the goal card also gains a gold border).

```jsx
<GoalBar
  reward={{ label: 'Choose a movie', emoji: '🎬', cost: 10 }}
  balance={7}
  onRedeem={redeem}
/>
```

Composes `Avatar`, `FillingBoard`, and `Button`. With no `reward`, it shows the gentle "ask a parent to set one" empty state.
