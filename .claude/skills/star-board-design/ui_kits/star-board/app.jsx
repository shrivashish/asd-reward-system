// Star Board UI kit — app shell: header, parent gate, mode/nav routing.
const ADS = window.StarBoardDesignSystem_0e745f;
const { AppHeader, HeaderAction, BottomNav, Sheet: ASheet, Button: ABtn } = ADS;

function ParentGate({ onPass, onClose }) {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState('');
  function submit() {
    if (val.trim() === '12') onPass();
    else { setErr('Not quite — try again'); setVal(''); }
  }
  return (
    <ASheet anchor="center" onClose={onClose}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', textAlign: 'center', color: 'var(--ink)' }}>What is 7 + 5?</p>
      <input type="number" inputMode="numeric" value={val} autoFocus
        onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
        style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', textAlign: 'center', border: '2px solid var(--line)', borderRadius: 'var(--radius)', padding: 12, background: 'var(--surface-2)', color: 'var(--ink)', width: '100%' }} />
      {err && <p style={{ color: 'var(--coral)', textAlign: 'center', fontSize: 'var(--text-sm)' }}>{err}</p>}
      <div style={{ display: 'flex', gap: 12 }}>
        <ABtn variant="secondary" block onClick={onClose}>Cancel</ABtn>
        <ABtn variant="primary" block onClick={submit}>Enter</ABtn>
      </div>
    </ASheet>
  );
}

function App() {
  const [parentMode, setParentMode] = React.useState(false);
  const [view, setView] = React.useState('tasks');
  const [gate, setGate] = React.useState(false);
  const [tasks] = React.useState(window.SBData.initialTasks);
  const [rewards] = React.useState(window.SBData.initialRewards);
  const [balance, setBalance] = React.useState(window.SBData.startingBalance);
  const [settings, setSettings] = React.useState(() => {
    const o = {}; window.SBData.settings.forEach(s => o[s.key] = s.on); return o;
  });

  const goal = rewards.find(r => r.id === window.SBData.goalId);

  // apply calm + contrast themes to the phone frame
  React.useEffect(() => {
    const el = document.getElementById('sb-app');
    if (!el) return;
    el.dataset.calm = settings.calmMode ? 'true' : 'false';
    if (settings.highContrast) el.dataset.contrast = 'high'; else delete el.dataset.contrast;
  }, [settings.calmMode, settings.highContrast]);

  function toggle(key) { setSettings(s => ({ ...s, [key]: !s[key] })); }
  function award(task, n) { setBalance(b => b + n); }
  function redeem(r) { setBalance(b => Math.max(0, b - r.cost)); }

  function headerAction() {
    if (parentMode) return <HeaderAction label="Back to board" onClick={() => setParentMode(false)}>← Board</HeaderAction>;
    return <HeaderAction label="Parent area" onClick={() => settings.parentGate ? setGate(true) : setParentMode(true)}>⚙️</HeaderAction>;
  }

  const P = window.SBParent;
  const S = window.SBScreens;

  return (
    <React.Fragment>
      <AppHeader action={headerAction()} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        {!parentMode && (
          <S.ChildBoard tasks={tasks} goal={goal} balance={balance} settings={settings} onAward={award} onRedeem={redeem} />
        )}
        {parentMode && view === 'tasks' && <P.TasksScreen tasks={tasks} />}
        {parentMode && view === 'rewards' && <P.RewardsScreen rewards={rewards} goalId={window.SBData.goalId} />}
        {parentMode && view === 'child' && <P.ChildSettingsScreen />}
        {parentMode && view === 'settings' && <P.SettingsScreen settings={settings} onToggle={toggle} />}
        {parentMode && view === 'guide' && <P.GuideScreen />}
      </main>
      {parentMode && <BottomNav items={window.SBData.nav} value={view} onChange={setView} />}
      {gate && <ParentGate onPass={() => { setGate(false); setParentMode(true); }} onClose={() => setGate(false)} />}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('sb-root')).render(<App />);
