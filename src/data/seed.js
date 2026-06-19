import { upsertChild, upsertTask, upsertReward, setGoal, listChildren } from './repo';

export async function seedIfEmpty() {
  const children = await listChildren();
  if (children.length > 0) return;

  const child = await upsertChild({ name: 'Leo', avatarImageId: null });

  await upsertTask({
    childId: child.id,
    label: 'Brush teeth',
    imageId: null,
    emoji: '🦷',
    maxStars: 3,
    mode: 'skill',
    capabilityNote: 'Try the mild toothpaste if needed',
    active: true,
    order: 0,
    fadePlan: { taperEvery: 14, targetStars: 1, note: 'Taper to 1 star after 2 weeks of success' },
  });

  await upsertTask({
    childId: child.id,
    label: 'Get dressed',
    imageId: null,
    emoji: '👕',
    maxStars: 3,
    mode: 'skill',
    capabilityNote: '',
    active: true,
    order: 1,
    fadePlan: { taperEvery: 14, targetStars: 1, note: 'Fade after habit forms' },
  });

  await upsertTask({
    childId: child.id,
    label: 'Try a new food',
    imageId: null,
    emoji: '🍎',
    maxStars: 5,
    mode: 'firstTry',
    capabilityNote: '',
    active: true,
    order: 2,
    fadePlan: { taperEvery: 0, targetStars: 0, note: 'Remove once comfortable' },
  });

  const reward = await upsertReward({
    childId: child.id,
    label: 'Choose a movie',
    imageId: null,
    emoji: '🎬',
    cost: 10,
    active: true,
  });

  await setGoal(child.id, reward.id);
}
