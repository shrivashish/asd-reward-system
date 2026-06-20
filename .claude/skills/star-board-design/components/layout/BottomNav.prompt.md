Bottom tab bar for the parent area. Emoji icon stacked over a tiny bold label; active tab turns teal.

```jsx
<BottomNav
  value={view}
  onChange={setView}
  items={[
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'child', label: 'Child', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'guide', label: 'Guide', icon: '📖' },
  ]}
/>
```

Only shown when the parent area is unlocked. The child board has no bottom nav — it stays single-purpose.
