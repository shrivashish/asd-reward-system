The base container surface — white, 26px radius, one soft cool-tinted shadow. Wrap rows, editors, sheets, and tiles in it.

```jsx
<Card>Task editor content…</Card>
<Card inset>Quiet note on surface-2</Card>
<Card selected selectColor="var(--gold)">Current goal</Card>
```

`inset` swaps to the surface-2 fill with no shadow (form fields, capability notes). `selected` adds a 2px border — teal for selected tasks/children, gold for the current goal. Default padding is 16px; override with `padding`.
