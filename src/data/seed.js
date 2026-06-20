import { upsertChild, upsertTask, upsertReward, listChildren } from './repo';

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

  // A reward ladder, easiest to biggest. The child sees them all in order and
  // can claim one once they have saved enough stars for it.
  const ladder = [
    { label: 'Choose a movie', emoji: '🎬', cost: 10 },
    { label: 'Ice cream', emoji: '🍦', cost: 20 },
    { label: 'Chocolate', emoji: '🍫', cost: 30 },
    { label: 'Birthday cake', emoji: '🎂', cost: 50 },
  ];
  for (const r of ladder) {
    await upsertReward({ childId: child.id, imageId: null, active: true, ...r });
  }
}
