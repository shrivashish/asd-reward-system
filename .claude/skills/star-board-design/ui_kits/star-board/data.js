// Star Board UI kit — seed data & parent-guide copy (from the source app).
window.SBData = {
  initialTasks: [
    { id: 't1', label: 'Brush teeth', emoji: '🦷', maxStars: 3, mode: 'skill', capabilityNote: 'Try the mild toothpaste if needed' },
    { id: 't2', label: 'Get dressed', emoji: '👕', maxStars: 3, mode: 'skill', capabilityNote: '' },
    { id: 't3', label: 'Try a new food', emoji: '🍎', maxStars: 5, mode: 'firstTry', capabilityNote: '' },
  ],
  initialRewards: [
    { id: 'r1', label: 'Choose a movie', emoji: '🎬', cost: 10 },
    { id: 'r2', label: 'Extra park time', emoji: '🛝', cost: 16 },
    { id: 'r3', label: 'Bake cookies', emoji: '🍪', cost: 24 },
  ],
  goalId: 'r1',
  startingBalance: 7,
  settings: [
    { key: 'calmMode', label: 'Calm mode', desc: 'Removes all animations and sounds', on: false },
    { key: 'sound', label: 'Sound effects', desc: 'Soft audio on star award', on: true },
    { key: 'tts', label: 'Read aloud (TTS)', desc: 'Speaks task/reward labels when tapped', on: false },
    { key: 'highContrast', label: 'High contrast', desc: 'Increases text and color contrast', on: false },
    { key: 'parentGate', label: 'Parent gate', desc: 'Require answer to access parent area', on: true },
    { key: 'capabilityCheck', label: 'Capability check', desc: 'Show check before skill-mode awards (P1)', on: true },
  ],
  capabilityOptions: [
    { id: 'loud', label: 'Too loud', icon: '🔊' },
    { id: 'hurts', label: 'Something hurts', icon: '😣' },
    { id: 'tired', label: 'Too tired', icon: '😴' },
    { id: 'no', label: "Doesn't want to", icon: '✋' },
    { id: 'ok', label: 'All good, proceed →', icon: '✅' },
  ],
  guide: [
    { title: "Won't vs Can't", body: "Sensory pain, anxiety, and skill gaps look identical to defiance from the outside. Rewarding a \u201ccan't\u201d is asking the impossible — check first, reward second." },
    { title: 'Reward the attempt, not the win', body: 'For new or scary things, pay out on the brave try — whether it goes well or not. Gating the reward on success turns an invitation into pressure.' },
    { title: 'Plan the fade', body: 'A reward system is scaffolding — it should come down. When your child is doing something reliably without prompting, start tapering the stars.' },
    { title: 'Earned is earned, always', body: 'Stars earned are never taken away. A hard moment later in the day doesn\u2019t undo what was earned this morning. The app has no star-removal tool.' },
    { title: 'Soft exits matter', body: 'Your child can always say no, stop partway, or have a hard day — and lose nothing. Participation is an invitation, not a demand.' },
  ],
  nav: [
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'child', label: 'Child', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'guide', label: 'Guide', icon: '📖' },
  ],
};
