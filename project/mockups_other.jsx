// ============ Other product mockups ============

// Sprint / burndown
const BurndownChart = () => {
  const ideal = [40, 37, 34, 30, 27, 23, 20, 17, 13, 10, 7, 3, 0];
  const actual = [40, 38, 36, 34, 32, 28, 23, 19, 15, 11, 8, 5, 2];
  const w = 280, h = 140, pad = 20;
  const max = 40;
  const pts = (arr) => arr.map((v, i) => `${pad + (i / (arr.length - 1)) * (w - 2 * pad)},${pad + (1 - v / max) * (h - 2 * pad)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '100%' }}>
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + (i / 3) * (h - 2 * pad)} y2={pad + (i / 3) * (h - 2 * pad)}
          stroke="var(--border)" strokeDasharray="2 3" />
      ))}
      <polyline fill="none" stroke="var(--fg-dim)" strokeWidth="1.5" strokeDasharray="4 3" points={pts(ideal)} />
      <polyline fill="none" stroke="var(--accent)" strokeWidth="2" points={pts(actual)} />
      <polygon fill="var(--accent)" fillOpacity="0.1" points={`${pad},${h - pad} ${pts(actual)} ${w - pad},${h - pad}`} />
      {actual.map((v, i) => (
        <circle key={i} cx={pad + (i / (actual.length - 1)) * (w - 2 * pad)} cy={pad + (1 - v / max) * (h - 2 * pad)} r="2.5" fill="var(--accent)" />
      ))}
    </svg>
  );
};

const SprintMockup = () => (
  <div className="win">
    <div className="win-top">
      <div className="win-dots"><span /><span /><span /></div>
      <div className="win-crumbs"><span>Sprint 22</span><span className="sep">/</span><span className="active">Overview</span></div>
    </div>
    <div className="sprint-mock">
      <div className="burn-chart">
        <div className="chart-title"><span>BURNDOWN</span><span>41/44 PTS</span></div>
        <BurndownChart />
      </div>
      <div className="burn-chart">
        <div className="chart-title"><span>VELOCITY</span><span>LAST 6 SPRINTS</span></div>
        <div className="bar-mini" style={{ height: 100, marginTop: 16 }}>
          {[32, 37, 34, 40, 38, 42].map((v, i) => (
            <span key={i} className={i === 5 ? 'lead-b' : ''} style={{ height: `${v * 2}px` }} />
          ))}
        </div>
        <div className="chart-title" style={{ marginTop: 8 }}>
          <span>Predicted next: 43 pts</span><span style={{color:'var(--accent-soft)'}}>↑ 7%</span>
        </div>
      </div>
      <div className="burn-chart" style={{ gridColumn: 'span 2', height: 'auto' }}>
        <div className="chart-title"><span>AT-RISK CARDS</span><span style={{color:'var(--warn)'}}>2 detected by AI</span></div>
        <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
          <div className="row gap-3" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
            <span className="kb-id">SES-377</span>
            <span style={{ flex: 1 }}>Dependency enforcement on cross-list moves</span>
            <span className="blocked-badge">blocked 3d</span>
            <span className="avatar a1">RA</span>
          </div>
          <div className="row gap-3" style={{ padding: '6px 0', fontSize: 12 }}>
            <span className="kb-id">SES-401</span>
            <span style={{ flex: 1 }}>Fix locked column override for admins</span>
            <span className="blocked-badge" style={{background:'color-mix(in oklch, var(--warn) 18%, transparent)',color:'var(--warn)'}}>stale 5d</span>
            <span className="avatar a3">SK</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Retro
const RetroMockup = () => (
  <div className="win">
    <div className="win-top">
      <div className="win-dots"><span /><span /><span /></div>
      <div className="win-crumbs"><span>Retro</span><span className="sep">/</span><span className="active">Sprint 21 · Anonymous</span></div>
    </div>
    <div className="retro-mock">
      <div className="retro-phases">
        <div className="done">1 · Write</div>
        <div className="done">2 · Reveal</div>
        <div className="active">3 · Vote</div>
        <div>4 · Discuss</div>
        <div>5 · Close</div>
      </div>
      <div className="retro-grid">
        <div className="retro-col">
          <h5 style={{color:'var(--success)'}}>What went well</h5>
          <div className="retro-note">Agentic chat tools cut sprint planning to 12 min <span className="votes">8</span></div>
          <div className="retro-note">Paystack launch was smooth <span className="votes">5</span></div>
          <div className="retro-note">Burndown caught the slip early <span className="votes">3</span></div>
        </div>
        <div className="retro-col">
          <h5 style={{color:'var(--warn)'}}>What to improve</h5>
          <div className="retro-note">Review column backs up every Thursday <span className="votes">7</span></div>
          <div className="retro-note">Too many P1 interrupts <span className="votes">6</span></div>
          <div className="retro-note">PRD-to-cards output needs more context <span className="votes">2</span></div>
        </div>
        <div className="retro-col">
          <h5 style={{color:'var(--accent-soft)'}}>Actions</h5>
          <div className="retro-note">WIP limit of 3 on Review <span className="votes">{Icons.check}</span></div>
          <div className="retro-note">Interrupt budget = 20% <span className="votes">{Icons.check}</span></div>
        </div>
      </div>
    </div>
  </div>
);

// Document
const DocMockup = () => (
  <div className="win">
    <div className="win-top">
      <div className="win-dots"><span /><span /><span /></div>
      <div className="win-crumbs"><span>Docs</span><span className="sep">/</span><span>Engineering</span><span className="sep">/</span><span className="active">Billing v2 · PRD</span></div>
    </div>
    <div className="doc-mock">
      <div className="doc-crumb">PRD · DRAFT · v0.4 · OWNED BY @ENYA</div>
      <h2 className="doc-title">Billing v2: Paystack + Stripe under one gateway</h2>
      <p className="doc-p">We're unifying billing behind a single domain adapter so finance operations stay identical across regions. <span className="doc-mention">@morgan</span> spec'd the Stripe adapter in Q3; Paystack adapter needs parity on webhook semantics.</p>
      <h3 className="doc-h2">Goals</h3>
      <p className="doc-p">
        <span className="mono" style={{color:'var(--accent-soft)'}}>G1.</span> Process subscriptions in NGN, ZAR, KES with zero reconciliation drift.<br/>
        <span className="mono" style={{color:'var(--accent-soft)'}}>G2.</span> Retry webhooks with exponential backoff up to 24h.<br/>
        <span className="mono" style={{color:'var(--accent-soft)'}}>G3.</span> Expose unified event log per tenant.
      </p>
      <div className="doc-block">
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6, fontSize:12, color:'var(--accent-soft)'}}>
          {Icons.sparkle} <span className="mono">AI / Seshira · Generated 11 cards from this PRD</span>
        </div>
        <div style={{color:'var(--fg)'}}>SES-412 · SES-413 · SES-414 · SES-415 · SES-416 · SES-417 · SES-418 · SES-419 · SES-420 · SES-421 · SES-422</div>
      </div>
      <h3 className="doc-h2">Open questions</h3>
      <p className="doc-p">Do we want per-currency pricing displayed at checkout, or auto-convert at payment time?</p>
    </div>
  </div>
);

// Gantt / Projects
const GanttMockup = () => {
  const bars = [
    { name: 'Billing v2', start: 0, end: 6, color: 'oklch(0.55 0.2 30)' },
    { name: 'Agentic AI v3', start: 2, end: 10, color: 'var(--accent)' },
    { name: 'Mobile App', start: 1, end: 5, color: 'oklch(0.6 0.15 200)' },
    { name: 'Whitelabel', start: 4, end: 8, color: 'oklch(0.62 0.15 145)' },
    { name: 'SSO / SAML', start: 7, end: 11, color: 'oklch(0.65 0.15 75)' },
  ];
  return (
    <div className="win">
      <div className="win-top">
        <div className="win-dots"><span /><span /><span /></div>
        <div className="win-crumbs"><span>Projects</span><span className="sep">/</span><span className="active">Q2 roadmap · Timeline</span></div>
      </div>
      <div className="gantt">
        <div className="gantt-head">
          <div></div>
          {['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'].map(w => <div key={w}>{w}</div>)}
        </div>
        {bars.map(b => (
          <div key={b.name} className="gantt-row">
            <div className="gantt-label">
              <span style={{width:8,height:8,borderRadius:2,background:b.color}}/>{b.name}
            </div>
            <div className="gantt-track">
              <div className="gantt-bar" style={{ left: `${(b.start/12)*100}%`, width: `${((b.end-b.start)/12)*100}%`, background: b.color }}>
                {b.end - b.start}w
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dashboard
const DashboardMockup = () => (
  <div className="win">
    <div className="win-top">
      <div className="win-dots"><span /><span /><span /></div>
      <div className="win-crumbs"><span>Dashboards</span><span className="sep">/</span><span className="active">Team pulse</span></div>
    </div>
    <div className="dash">
      <div className="widget">
        <div className="label">Velocity · 6w avg</div>
        <div className="num">38.2</div>
        <div className="delta">↑ 14% vs prev</div>
      </div>
      <div className="widget">
        <div className="label">Cycle time</div>
        <div className="num">3.4d</div>
        <div className="delta down">↓ 0.8d</div>
      </div>
      <div className="widget">
        <div className="label">AI credits</div>
        <div className="num">2,147</div>
        <div className="delta" style={{color:'var(--fg-muted)'}}>of 5,000 / mo</div>
      </div>
      <div className="widget widget-wide widget-tall" style={{ gridColumn: 'span 2' }}>
        <div className="label">Throughput · cards done / day</div>
        <div className="bar-mini" style={{ height: 80, marginTop: 16 }}>
          {[3, 5, 4, 7, 6, 9, 8, 11, 9, 12, 10, 14, 13, 15].map((v, i) => (
            <span key={i} className={i >= 10 ? 'lead-b' : ''} style={{ height: `${v * 5}px` }} />
          ))}
        </div>
        <div className="chart-title" style={{ marginTop: 12 }}>
          <span>Mon · Jan 13</span><span>Sat · Jan 25</span>
        </div>
      </div>
      <div className="widget">
        <div className="label">Blockers</div>
        <div className="num" style={{color:'var(--warn)'}}>2</div>
        <div className="delta" style={{color:'var(--fg-muted)'}}>auto-flagged</div>
      </div>
    </div>
  </div>
);

// Automation
const AutomationMockup = () => (
  <div className="win">
    <div className="win-top">
      <div className="win-dots"><span /><span /><span /></div>
      <div className="win-crumbs"><span>Automations</span><span className="sep">/</span><span className="active">PR description generator</span></div>
    </div>
    <div className="auto-mock">
      <div className="auto-row">
        <span className="auto-ico trig">IF</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13}}>Card moves to <strong>Review</strong></div>
          <div className="mono" style={{fontSize:11, color:'var(--fg-dim)', marginTop:2}}>trigger · board.card.status_changed</div>
        </div>
      </div>
      <div className="auto-row">
        <span className="auto-ico trig">AND</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13}}>Card has linked GitHub branch</div>
          <div className="mono" style={{fontSize:11, color:'var(--fg-dim)', marginTop:2}}>filter · card.github_branch ≠ null</div>
        </div>
      </div>
      <div className="auto-row">
        <span className="auto-ico act">{Icons.sparkle}</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13}}>Generate PR description from diff + card context</div>
          <div className="mono" style={{fontSize:11, color:'var(--accent-soft)', marginTop:2}}>ai.generate · model=sonnet · credits ≈ 2</div>
        </div>
      </div>
      <div className="auto-row">
        <span className="auto-ico act">→</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13}}>Post description to GitHub PR, notify reviewer</div>
          <div className="mono" style={{fontSize:11, color:'var(--fg-dim)', marginTop:2}}>action · github.pr.update + notify</div>
        </div>
      </div>
      <div style={{ marginTop: 4, display:'flex', gap: 10, alignItems:'center', paddingLeft: 4, color:'var(--fg-muted)', fontSize: 12 }}>
        <span className="chip"><span className="dot" style={{background:'var(--success)'}}/>ran 14× this week</span>
        <span className="chip">avg 1.8s</span>
        <span className="chip">0 errors</span>
      </div>
    </div>
  </div>
);

// Task generation panel
const TaskGenMockup = () => (
  <div className="win">
    <div className="win-top">
      <div className="win-dots"><span /><span /><span /></div>
      <div className="win-crumbs"><span>Generate</span><span className="sep">/</span><span className="active">From document</span></div>
    </div>
    <div style={{padding: 20, display:'flex', flexDirection:'column', gap: 12, minHeight: 320}}>
      <div style={{background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:10, padding: 14, fontSize: 12}}>
        <div className="mono dim" style={{ fontSize: 10, marginBottom: 6, letterSpacing: '0.1em' }}>SOURCE</div>
        <div style={{color:'var(--fg)'}}>PRD · <span className="mono">billing-v2.md</span> · <span className="dim">3,411 words</span></div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
        {[
          { id: 'SES-412', t: 'Stripe adapter: currency mapping', pts: 5, l: 'feat' },
          { id: 'SES-413', t: 'Paystack webhook verification', pts: 3, l: 'infra' },
          { id: 'SES-414', t: 'Unified event log schema', pts: 8, l: 'feat' },
          { id: 'SES-415', t: 'Reconciliation cron', pts: 5, l: 'infra' },
          { id: 'SES-416', t: 'Dunning emails', pts: 3, l: 'feat' },
          { id: 'SES-417', t: 'Proration edge cases', pts: 2, l: 'bug' },
        ].map(c => (
          <div key={c.id} className="kb-card">
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="kb-id">{c.id}</span>
              <span className="kb-ai">{Icons.sparkle} gen</span>
            </div>
            <div className="kb-title">{c.t}</div>
            <div className="kb-meta">
              <span className={"kb-label lbl-" + c.l}>{c.l}</span>
              <span className="kb-row">{c.pts} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

window.SprintMockup = SprintMockup;
window.RetroMockup = RetroMockup;
window.DocMockup = DocMockup;
window.GanttMockup = GanttMockup;
window.DashboardMockup = DashboardMockup;
window.AutomationMockup = AutomationMockup;
window.TaskGenMockup = TaskGenMockup;
