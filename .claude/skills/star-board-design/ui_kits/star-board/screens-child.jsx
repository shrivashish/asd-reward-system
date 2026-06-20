// Star Board UI kit — screens. Composes the design-system components.
const DS = window.StarBoardDesignSystem_0e745f;
const { Button, Card, Badge, Toggle, Avatar, StarRating, GoalBar, ListRow, TaskCard, Sheet } = DS;

/* ── Award flow: capability check → star pick → calm celebration ── */
function AwardFlow({ task, settings, onAward, onClose }) {
  const needsCap = task.mode === 'skill' && settings.capabilityCheck;
  const [step, setStep] = React.useState(needsCap ? 'capability' : 'pick');
  const [stars, setStars] = React.useState(0);
  const [celebrate, setCelebrate] = React.useState(0);

  function confirm() {
    const amount = task.mode === 'firstTry' ? task.maxStars : stars;
    if (amount === 0) { onClose(); return; }
    setCelebrate(amount);
    setTimeout(() => { onAward(amount); onClose(); }, settings.calmMode ? 700 : 1600);
  }

  if (celebrate) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.15)' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '40px 48px' }}>
          <span style={{ fontSize: 56 }}>⭐</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--gold)', fontWeight: 600 }}>+{celebrate}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)' }}>Great job!</span>
        </Card>
      </div>
    );
  }

  return (
    <Sheet anchor="bottom" onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
        <Avatar emoji={task.emoji} size={56} alt={task.label} style={{ borderRadius: 'var(--radius)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)' }}>{task.label}</span>
      </div>

      {step === 'capability' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)', textAlign: 'center' }}>Is anything making this hard right now?</p>
          {task.capabilityNote && (
            <p style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', borderLeft: '3px solid var(--teal)' }}>💡 {task.capabilityNote}</p>
          )}
          {window.SBData.capabilityOptions.map(opt => (
            <button key={opt.id} onClick={() => { if (opt.id === 'ok') setStep('pick'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 'var(--tap-min)', padding: '12px 16px', background: opt.id === 'ok' ? 'var(--teal)' : 'var(--surface-2)', color: opt.id === 'ok' ? '#fff' : 'var(--ink)', borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', textAlign: 'left', width: '100%' }}>
              <span style={{ fontSize: 20, width: 28 }}>{opt.icon}</span><span>{opt.label}</span>
            </button>
          ))}
          <button onClick={onClose} style={{ alignSelf: 'center', color: 'var(--ink-soft)', fontSize: 'var(--text-base)', padding: 8, minHeight: 44 }}>Cancel</button>
        </div>
      )}

      {step === 'pick' && (
        <React.Fragment>
          {task.mode === 'firstTry' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
              <span style={{ fontSize: 40 }}>🌟</span>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--ink)', textAlign: 'center' }}>They gave it a try — full stars!</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--gold)' }}>{task.maxStars} ★</p>
            </div>
          ) : (
            <StarRating max={task.maxStars} value={stars} onChange={setStars} />
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="secondary" block onClick={onClose}>Cancel</Button>
            <Button variant="primary" block onClick={confirm}>
              {task.mode === 'firstTry' ? `Give ${task.maxStars} ★` : stars > 0 ? `Give ${stars} ★` : 'No stars (ok)'}
            </Button>
          </div>
        </React.Fragment>
      )}
    </Sheet>
  );
}

/* ── Child board ── */
function ChildBoard({ tasks, goal, balance, settings, onAward, onRedeem }) {
  const [active, setActive] = React.useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <GoalBar reward={goal} balance={balance} onRedeem={onRedeem} />
      {tasks.map(t => <TaskCard key={t.id} task={t} onTap={setActive} />)}
      {active && (
        <AwardFlow task={active} settings={settings} onClose={() => setActive(null)} onAward={(n) => onAward(active, n)} />
      )}
    </div>
  );
}

window.SBScreens = { ChildBoard, AwardFlow };
