The standard management row used across every parent list (Tasks, Rewards, Children, Settings). Leading visual, title with optional meta line, trailing actions.

```jsx
<ListRow
  leading={<Avatar emoji="🦷" />}
  title="Brush teeth"
  meta="Skill · max 3★"
  trailing={<><Button variant="secondary" size="sm">Edit</Button><Button variant="danger" size="sm">Archive</Button></>}
/>
<ListRow title="Choose a movie" meta="10 ★" selected selectColor="var(--gold)" trailing={<Badge tone="reward" soft>Current goal</Badge>} />
```

`selected` adds a colored border (teal for active task/child, gold for current goal); `dim` fades archived items to 50%.
