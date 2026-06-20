// Star Board UI kit — parent-area screens.
const PDS = window.StarBoardDesignSystem_0e745f;
const { Button: PBtn, Card: PCard, Badge: PBadge, Toggle: PToggle, Avatar: PAvatar, ListRow: PRow } = PDS;

function ScreenWrap({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16, paddingBottom: 80 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--ink)' }}>{title}</h1>
      {children}
    </div>
  );
}

function TasksScreen({ tasks, goalSetForReward }) {
  return (
    <ScreenWrap title="Tasks">
      <PBtn variant="primary" block iconLeft="＋">Add task</PBtn>
      {tasks.map(t => (
        <PRow key={t.id} leading={<PAvatar emoji={t.emoji} size={44} />}
          title={t.label}
          meta={`${t.mode === 'firstTry' ? 'First try' : 'Skill'} · max ${t.maxStars}★`}
          trailing={<><PBtn variant="secondary" size="sm">Edit</PBtn><PBtn variant="danger" size="sm">Archive</PBtn></>} />
      ))}
    </ScreenWrap>
  );
}

function RewardsScreen({ rewards, goalId }) {
  return (
    <ScreenWrap title="Rewards & goal">
      <PBtn variant="reward" block iconLeft="＋">Add reward</PBtn>
      {rewards.map(r => {
        const isGoal = r.id === goalId;
        return (
          <PRow key={r.id} leading={<PAvatar emoji={r.emoji} size={48} />}
            title={r.label} meta={`${r.cost} ★`}
            selected={isGoal} selectColor="var(--gold)"
            trailing={isGoal
              ? <PBadge tone="reward" soft>Current goal</PBadge>
              : <><PBtn variant="secondary" size="sm">Edit</PBtn><PBtn variant="reward" size="sm">Set goal</PBtn></>} />
        );
      })}
    </ScreenWrap>
  );
}

function ChildSettingsScreen() {
  return (
    <ScreenWrap title="Children">
      <PBtn variant="primary" block iconLeft="＋">Add child</PBtn>
      <PRow leading={<PAvatar emoji="👤" size={48} />} title="Leo" selected selectColor="var(--teal)"
        trailing={<><PBadge tone="action" soft>Active</PBadge><PBtn variant="secondary" size="sm">Edit</PBtn></>} />
      <PRow leading={<PAvatar emoji="👤" size={48} />} title="Mia"
        trailing={<><PBtn variant="primary" size="sm">Select</PBtn><PBtn variant="secondary" size="sm">Edit</PBtn></>} />
    </ScreenWrap>
  );
}

function SettingsScreen({ settings, onToggle }) {
  return (
    <ScreenWrap title="Settings">
      {window.SBData.settings.map(s => (
        <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 16, boxShadow: 'var(--shadow)' }}>
          <div style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>{s.label}</span>
            <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', marginTop: 2 }}>{s.desc}</span>
          </div>
          <PToggle checked={settings[s.key]} onChange={() => onToggle(s.key)} label={s.label} />
        </div>
      ))}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)', marginTop: 8 }}>Data</h2>
      <PBtn variant="secondary" block>↓ Export backup</PBtn>
      <PBtn variant="secondary" block>↑ Import backup</PBtn>
    </ScreenWrap>
  );
}

function GuideScreen() {
  return (
    <ScreenWrap title="Parent guide">
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-soft)', marginTop: -4 }}>How to use this tool well — including when not to.</p>
      {window.SBData.guide.map(g => (
        <PCard key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)' }}>{g.title}</h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{g.body}</p>
        </PCard>
      ))}
    </ScreenWrap>
  );
}

window.SBParent = { TasksScreen, RewardsScreen, ChildSettingsScreen, SettingsScreen, GuideScreen };
