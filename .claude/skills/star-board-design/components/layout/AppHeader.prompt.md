Sticky top bar — the teal ⭐ Star Board wordmark (Fredoka) with one optional round action on the right.

```jsx
<AppHeader action={<HeaderAction label="Parent area" onClick={gate}>⚙️</HeaderAction>} />
<AppHeader action={<HeaderAction label="Back" onClick={exit}>← Board</HeaderAction>} />
```

Keep the right side to a single action — the child view shows ⚙️ to enter the parent area; the parent view shows ← back to the board.
