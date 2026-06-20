The award picker used inside the Award sheet — round star buttons from 0 to max. The leading **0** is deliberate: a child can decline and lose nothing (soft exit). The selected star scales up and turns gold.

```jsx
const [stars, setStars] = useState(0);
<StarRating max={3} value={stars} onChange={setStars} />
```

Copy stays gentle — "No stars — that is okay, try again later". For first-try tasks, skip the picker and pay full stars on the attempt.
