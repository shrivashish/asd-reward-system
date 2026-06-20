The hero tile of the child board. Large image/emoji, Fredoka label, star pips showing the task's max value, and a plum "First try" badge for first-try tasks. The entire 100px-tall card is a single tap target that opens the award flow.

```jsx
<TaskCard task={{ label: 'Brush teeth', emoji: '🦷', maxStars: 3, mode: 'skill' }} onTap={openAward} />
<TaskCard task={{ label: 'Try a new food', emoji: '🍎', maxStars: 5, mode: 'firstTry' }} onTap={openAward} />
```

Composes `Avatar`, `StarPips`, and `Badge`. Tapping never penalizes — it opens a sheet where awarding 0 stars is a valid, no-cost choice.
