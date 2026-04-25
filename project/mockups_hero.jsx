// ============ Kanban + AI Chat (Hero mockup) ============

const KanbanCard = ({ id, title, labels = [], avatar, est, ai, blocked, locked }) => (
  <div className={"kb-card" + (locked ? " locked" : "")}>
    <div className="row" style={{ justifyContent: 'space-between' }}>
      <span className="kb-id">{id}</span>
      {blocked && <span className="blocked-badge">{Icons.blocked} blocked by {blocked}</span>}
      {locked && <span className="kb-id" style={{ color: 'var(--warn)' }}>{Icons.lock}</span>}
    </div>
    <div className="kb-title">{title}</div>
    {labels.length > 0 && (
      <div className="kb-labels">
        {labels.map((l, i) => <span key={i} className={"kb-label lbl-" + l.t}>{l.v}</span>)}
      </div>
    )}
    <div className="kb-meta">
      <div className="kb-row">
        {est && <>{est}</>}
      </div>
      <div className="row gap-2">
        {ai && <span className="kb-ai">{Icons.sparkle} {ai}</span>}
        {avatar && <span className={"avatar " + avatar.cls}>{avatar.i}</span>}
      </div>
    </div>
  </div>
);

const KanbanBoard = ({ compact }) => (
  <div className="kb" style={compact ? { gridTemplateColumns: 'repeat(3, 1fr)' } : {}}>
    <div className="kb-col">
      <div className="kb-col-head">
        <div className="kb-col-title"><span className="status-dot sc-todo" /> Backlog <span className="count">8</span></div>
        <span className="kb-id">+</span>
      </div>
      <KanbanCard id="SES-412" title="Allow custom card types with user-defined icons"
        labels={[{t:'feat', v:'feature'}]} est="5 pts" avatar={{cls:'a2', i:'JL'}} ai="AI: ready" />
      <KanbanCard id="SES-418" title="Investigate slow query on pgvector cosine search"
        labels={[{t:'perf', v:'perf'}, {t:'infra', v:'db'}]} est="3 pts" avatar={{cls:'a4', i:'MK'}} />
      <KanbanCard id="SES-421" title="Write retro seeding prompts for Sonnet 4.5"
        labels={[{t:'docs', v:'docs'}]} est="2 pts" avatar={{cls:'a1', i:'RA'}} />
    </div>

    <div className="kb-col">
      <div className="kb-col-head">
        <div className="kb-col-title"><span className="status-dot sc-prog" /> In Progress <span className="count">5</span></div>
      </div>
      <KanbanCard id="SES-389" title="Agentic chat: tool-call streaming with partial renders"
        labels={[{t:'feat', v:'feature'}, {t:'infra', v:'ai'}]} est="8 pts" avatar={{cls:'a5', i:'EN'}} ai="3 sub-tasks" />
      <KanbanCard id="SES-401" title="Fix locked column override for admins"
        labels={[{t:'bug', v:'bug'}]} est="2 pts" avatar={{cls:'a3', i:'SK'}} />
      <KanbanCard id="SES-407" title="Burndown chart scale for multi-sprint view"
        labels={[{t:'feat', v:'feature'}]} est="5 pts" avatar={{cls:'a2', i:'JL'}} />
    </div>

    <div className="kb-col">
      <div className="kb-col-head">
        <div className="kb-col-title"><span className="status-dot sc-rev" /> Review <span className="count">3</span></div>
        <span className="kb-id">{Icons.lock}</span>
      </div>
      <KanbanCard id="SES-377" title="Dependency enforcement on cross-list moves"
        labels={[{t:'feat', v:'feature'}]} est="5 pts" avatar={{cls:'a1', i:'RA'}} blocked="SES-401" locked />
      <KanbanCard id="SES-383" title="Paystack webhook retry with exponential backoff"
        labels={[{t:'infra', v:'payments'}]} est="3 pts" avatar={{cls:'a4', i:'MK'}} locked />
    </div>

    {!compact && (
      <div className="kb-col">
        <div className="kb-col-head">
          <div className="kb-col-title"><span className="status-dot sc-done" /> Done <span className="count">12</span></div>
        </div>
        <KanbanCard id="SES-355" title="Titan Embeddings v2 migration"
          labels={[{t:'infra', v:'ai'}]} est="8 pts" avatar={{cls:'a5', i:'EN'}} />
        <KanbanCard id="SES-368" title="Whitelabel accent picker"
          labels={[{t:'feat', v:'feature'}]} est="3 pts" avatar={{cls:'a3', i:'SK'}} />
        <KanbanCard id="SES-371" title="SAML SSO with Okta"
          labels={[{t:'feat', v:'feature'}]} est="5 pts" avatar={{cls:'a2', i:'JL'}} />
      </div>
    )}
  </div>
);

// -------- Interactive AI Chat --------
const AI_SCENARIOS = {
  'plan sprint 23': {
    user: 'Plan sprint 23 — target 42 pts, balance workload across the team.',
    typed: "Pulled 18 refined cards from backlog. Estimated capacity: 44 pts across 5 engineers. Here's a balanced plan:",
    tools: [
      { tool: 'list_backlog', args: 'status=ready, min_priority=P2', result: '18 cards' },
      { tool: 'create_sprint', args: 'name="Sprint 23", start=Mar 10, duration=2w', result: 'created #s23' },
      { tool: 'assign_cards', args: '12 cards to sprint #s23', result: 'balanced to 41 pts' },
    ],
    followups: ['detect blockers', 'generate PRDs for new cards', 'summarize'],
  },
  'find blockers': {
    user: 'Surface any at-risk cards in the current sprint.',
    typed: "Scanned 23 active cards. Found 2 at-risk and 1 blocker — auto-tagged them and pinged owners.",
    tools: [
      { tool: 'analyze_sprint', args: 'sprint=22, heuristic=velocity+comment_gap', result: '3 flagged' },
      { tool: 'tag_cards', args: 'SES-377,SES-401 → at-risk', result: '2 tagged' },
      { tool: 'notify', args: '@rachel, @maya re SES-401', result: 'sent' },
    ],
    followups: ['suggest unblock path', 'reassign', 'draft standup note'],
  },
  'tasks from PRD': {
    user: 'Turn the attached PRD (Billing v2) into cards with estimates and labels.',
    typed: "Parsed the PRD into 11 tasks. Clustered them into 3 epics, estimated using past velocity on payments work.",
    tools: [
      { tool: 'parse_doc', args: 'doc=prd-billing-v2', result: '11 tasks, 3 epics' },
      { tool: 'create_cards', args: '11 cards in project=Billing', result: '11 created' },
      { tool: 'label_cards', args: 'auto: feature/infra/bug', result: 'labeled' },
    ],
    followups: ['assign to team', 'add to sprint 23', 'draft launch checklist'],
  },
};

const AIChat = () => {
  const [active, setActive] = React.useState('plan sprint 23');
  const [typed, setTyped] = React.useState('');
  const [stage, setStage] = React.useState(0); // 0: typing, 1: tools, 2: followups

  const scenario = AI_SCENARIOS[active];

  React.useEffect(() => {
    setTyped(''); setStage(0);
    let i = 0;
    const text = scenario.typed;
    const interval = setInterval(() => {
      i += 2;
      setTyped(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setStage(1); setTimeout(() => setStage(2), 600); }
    }, 24);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="ai-panel">
      <div className="ai-head">
        <span className="spark">{Icons.sparkle}</span>
        <span>Seshira AI</span>
        <span className="mono dim" style={{ marginLeft: 'auto', fontSize: 11 }}>sonnet · 14 tools</span>
      </div>
      <div className="ai-msgs mock-scroll">
        <div className="ai-msg user">{scenario.user}</div>
        <div className="ai-msg bot">
          <span className="spark">{Icons.sparkle}</span>
          <div className="body">
            <div>{typed}{stage === 0 && <span className="cursor" />}</div>
            {stage >= 1 && (
              <>
                {scenario.tools.map((t, i) => (
                  <div key={i} className="ai-tool" style={{ animation: 'fadeIn 0.3s ease forwards', animationDelay: `${i * 0.12}s`, opacity: 0 }}>
                    <span className="check">✓</span>
                    <code>{t.tool}</code>
                    <span style={{ color: 'var(--fg-dim)' }}>({t.args})</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--success)' }}>→ {t.result}</span>
                  </div>
                ))}
              </>
            )}
            {stage >= 2 && (
              <div className="ai-suggest">
                {scenario.followups.map(f => <span key={f} className="ai-chip">{f}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ai-input">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          {Object.keys(AI_SCENARIOS).map(k => (
            <button key={k} className={"ai-chip" + (active === k ? " active" : "")} onClick={() => setActive(k)}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
    </div>
  );
};

// -------- Complete hero mockup (sidebar + board + AI) --------
const HeroAppMockup = () => (
  <div className="win" style={{ minHeight: 600 }}>
    <div className="win-top">
      <div className="win-dots"><span/><span/><span/></div>
      <div className="win-crumbs">
        <span>morphlix</span><span className="sep">/</span>
        <span>Seshira</span><span className="sep">/</span>
        <span className="active">Mobile App · Sprint 22</span>
      </div>
      <span className="chip"><span className="dot" />Live · 5 online</span>
    </div>
    <div className="app" style={{ gridTemplateColumns: '180px 1fr 320px' }}>
      <aside className="app-sb">
        <div className="sb-section">
          <div className="sb-label">Workspace</div>
          <div className="sb-item"><span className="ico">{Icons.dash}</span>Dashboard</div>
          <div className="sb-item active"><span className="ico">{Icons.board}</span>Boards</div>
          <div className="sb-item"><span className="ico">{Icons.sprint}</span>Sprints</div>
          <div className="sb-item"><span className="ico">{Icons.doc}</span>Docs</div>
          <div className="sb-item"><span className="ico">{Icons.goal}</span>Goals</div>
        </div>
        <div className="sb-section">
          <div className="sb-label">Views</div>
          <div className="sb-item" style={{color:'var(--fg)'}}><span className="ico">{Icons.board}</span>Board</div>
          <div className="sb-item"><span className="ico">{Icons.table}</span>Table</div>
          <div className="sb-item"><span className="ico">{Icons.cal}</span>Calendar</div>
          <div className="sb-item"><span className="ico">{Icons.gantt}</span>Timeline</div>
          <div className="sb-item"><span className="ico">{Icons.swimlane}</span>Swimlane</div>
        </div>
        <div className="sb-section">
          <div className="sb-label">Projects</div>
          <div className="sb-item"><span style={{width:8,height:8,borderRadius:2,background:'oklch(0.7 0.16 30)'}}/>Mobile App</div>
          <div className="sb-item"><span style={{width:8,height:8,borderRadius:2,background:'oklch(0.7 0.15 200)'}}/>Billing v2</div>
          <div className="sb-item"><span style={{width:8,height:8,borderRadius:2,background:'oklch(0.7 0.15 145)'}}/>Infra</div>
        </div>
      </aside>

      <main style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
          <strong style={{ fontSize: 14 }}>Sprint 22 · Mobile App</strong>
          <span className="chip" style={{ fontSize: 11 }}>14d · 41/44 pts</span>
          <span className="chip" style={{ fontSize: 11, color: 'var(--warn)' }}>{Icons.blocked} 2 at risk</span>
          <span className="chip mono" style={{ fontSize: 11, marginLeft: 'auto' }}>{Icons.filter} 3 filters</span>
          <div style={{ display:'flex' }}>
            <span className="avatar a1" style={{ marginLeft: -6 }}>RA</span>
            <span className="avatar a2" style={{ marginLeft: -6 }}>JL</span>
            <span className="avatar a3" style={{ marginLeft: -6 }}>SK</span>
            <span className="avatar a4" style={{ marginLeft: -6 }}>MK</span>
            <span className="avatar a5" style={{ marginLeft: -6 }}>EN</span>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <KanbanBoard compact />
        </div>
      </main>

      <AIChat />
    </div>
  </div>
);

window.KanbanBoard = KanbanBoard;
window.AIChat = AIChat;
window.HeroAppMockup = HeroAppMockup;
