The Settings switch — 52×30 track, teal when on, white thumb sliding 22px. Use for every on/off preference (Calm mode, Sound, High contrast, Parent gate…).

```jsx
<Toggle checked={calm} onChange={setCalm} label="Calm mode" />
```

Pair it with a label + description row (see ListRow). Always pass `label` for accessibility.
