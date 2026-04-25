// ============ Page sections ============

const NavBar = ({ onToggleTheme, theme }) => (
  <nav className="nav">
    <div className="container nav-inner">
      <a href="#" className="row gap-3" style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
        <SeshiraGlyph />
        <span>Seshira</span>
        <span className="chip mono" style={{ fontSize: 10, marginLeft: 4, padding: '2px 7px' }}>BETA</span>
      </a>
      <div className="nav-links" style={{ display: 'flex' }}>
        <a href="#features">Features</a>
        <a href="#ai">AI</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
        <a href="#" className="row gap-2">Docs {Icons.arrow}</a>
      </div>
      <div className="row gap-3">
        <button className="btn btn-ghost btn-sm" onClick={onToggleTheme} aria-label="theme">
          {theme === 'dark' ? Icons.sun : Icons.moon}
        </button>
        <a className="btn btn-ghost btn-sm" href="#">Sign in</a>
        <a className="btn btn-primary btn-sm" href="#">Start free {Icons.arrow}</a>
      </div>
    </div>
  </nav>
);

const Announcement = ({ onDismiss }) => (
  <div className="announce">
    <span className="pill">New</span>
    <span>Agentic AI v3 — 14 tools that actually do the work. </span>
    <a href="#ai" style={{ color: 'var(--accent-soft)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Read the launch →</a>
    <button onClick={onDismiss} style={{ background: 'transparent', border: 'none', color: 'var(--fg-muted)', position: 'absolute', right: 12, top: 8, padding: 4 }}>{Icons.x}</button>
  </div>
);

const Hero = () => (
  <section style={{ position: 'relative', paddingTop: 80, paddingBottom: 40 }}>
    <div className="glow" style={{ width: 600, height: 600, background: 'var(--accent-glow)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />
    <div className="grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 24 }}>AI-native project management</div>
        <h1 className="h-display reveal">
          Project management,<br/>finally native to <span className="accent-text">agentic AI.</span>
        </h1>
        <p className="lead reveal" style={{ margin: '24px auto 0', textAlign: 'center' }}>
          Seshira's built-in agent doesn't just answer questions — it <em>executes</em>. 14 tools that create sprints,
          move cards, assign owners, and detect blockers. Jira features, Linear polish, AI that actually ships work.
        </p>
        <div className="row gap-3 reveal" style={{ justifyContent: 'center', marginTop: 36 }}>
          <a className="btn btn-primary" href="#" style={{ padding: '13px 22px', fontSize: 15 }}>
            Start free {Icons.arrow}
          </a>
          <a className="btn btn-ghost" href="#features" style={{ padding: '13px 22px', fontSize: 15 }}>
            See features
          </a>
        </div>
        <div className="row gap-6 reveal" style={{ justifyContent: 'center', marginTop: 28, color: 'var(--fg-dim)', fontSize: 13 }}>
          <span className="row gap-2">{Icons.check} Free for 10 users</span>
          <span className="row gap-2">{Icons.check} 100 AI credits/mo</span>
          <span className="row gap-2">{Icons.check} No credit card</span>
        </div>
      </div>

      <div className="reveal" style={{ marginTop: 64 }}>
        <HeroAppMockup />
      </div>
    </div>
  </section>
);

// Feature badges marquee
const FeatureBadges = () => {
  const badges = [
    ['Agentic AI', Icons.sparkle], ['Kanban · 5 views', Icons.board], ['Sprint planning', Icons.sprint],
    ['Anonymous retros', Icons.retro], ['Gantt & timelines', Icons.gantt], ['OKRs & goals', Icons.goal],
    ['Custom dashboards', Icons.dash], ['Nested docs', Icons.doc], ['GitHub PR auto-link', Icons.github],
    ['Automations', Icons.bolt], ['Card dependencies', Icons.link], ['Locked columns', Icons.lock],
    ['SSO · SAML', Icons.shield], ['White-label', Icons.globe], ['Custom domains', Icons.globe],
    ['Offline resilience', Icons.branch], ['Custom roles', Icons.people], ['Audit logs', Icons.terminal],
    ['pgvector search', Icons.search], ['Real-time · WebSocket', Icons.bolt],
  ];
  const track = [...badges, ...badges];
  return (
    <section className="section-tight" style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-1)' }}>
      <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
        <div className="marquee">
          {track.map(([name, ic], i) => (
            <div key={i} className="chip" style={{ padding: '8px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--accent-soft)' }}>{ic}</span>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==== AI Section — 4 capability cards
const AI_CAPS = [
  {
    eyebrow: '14 TOOLS',
    title: 'Agentic chat that runs your workflow',
    body: 'Ask for a sprint — Seshira creates it. Ask for blockers — it finds and tags them. Every message can call real tools: create, move, assign, notify, search, escalate.',
    bullets: ['create_sprint', 'move_card', 'assign_members', 'detect_blockers', 'generate_pr_desc', '+9 more'],
    mockup: 'AIChat',
  },
  {
    eyebrow: 'DOC → CARDS',
    title: 'Turn any PRD into estimated tasks',
    body: 'Paste a PRD, meeting notes, or a bug report. Seshira reads it, clusters work into epics, writes cards, and estimates them using your team\'s actual velocity.',
    bullets: ['PRDs · meeting notes · plain text', 'Auto-labeled (feat/bug/infra)', 'Estimates from your velocity'],
    mockup: 'TaskGen',
  },
  {
    eyebrow: 'SPRINT INTEL',
    title: 'Velocity, blockers, burndown — predicted',
    body: 'Seshira watches every card and flags what\'s at risk before your standup. Predicted velocity, stale-card alerts, blocker radar, and a workload balancer that actually balances.',
    bullets: ['At-risk detection', 'Velocity prediction', 'Workload balancer', 'Stale-card alerts'],
    mockup: 'Sprint',
  },
  {
    eyebrow: 'AUTOMATIONS',
    title: 'No-code triggers with AI actions',
    body: 'When cards enter Review, auto-generate PR descriptions from the diff. When a stale card sits 5 days, notify the owner. When a retro closes, draft the summary. Build it in English.',
    bullets: ['IF card enters Review → gen PR', 'IF stale > 5d → notify owner', 'IF sprint closes → draft notes'],
    mockup: 'Automation',
  },
];

const AISection = () => (
  <section className="section" id="ai">
    <div className="glow" style={{ width: 700, height: 500, background: 'var(--accent-glow)', left: '-10%', top: '20%' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div className="reveal" style={{ maxWidth: 760, marginBottom: 60 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>The AI, specifically</div>
        <h2 className="h-section">The AI doesn't just talk. It ships.</h2>
        <p className="lead">Most PM tools bolt on a chatbot. Seshira was built around one. Every capability below is actually in the product today.</p>
      </div>

      <div className="feat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {AI_CAPS.map((c, i) => (
          <div key={i} className="ai-card reveal">
            <div className="eyebrow" style={{ marginBottom: 12 }}>{c.eyebrow}</div>
            <h3 className="h-card" style={{ marginBottom: 10 }}>{c.title}</h3>
            <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.55, margin: 0, marginBottom: 16 }}>{c.body}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {c.bullets.map(b => <span key={b} className="chip mono" style={{ fontSize: 11 }}>{b}</span>)}
            </div>
            <div style={{ height: 280, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg)' }}>
              {c.mockup === 'AIChat' && <AIChat />}
              {c.mockup === 'TaskGen' && <div style={{ transform: 'scale(0.82)', transformOrigin: 'top left', width: '122%', height: '122%' }}><TaskGenMockup /></div>}
              {c.mockup === 'Sprint' && <div style={{ transform: 'scale(0.72)', transformOrigin: 'top left', width: '139%', height: '139%' }}><SprintMockup /></div>}
              {c.mockup === 'Automation' && <div style={{ transform: 'scale(0.88)', transformOrigin: 'top left', width: '114%', height: '114%' }}><AutomationMockup /></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Alternating feature blocks
const FEATURES = [
  {
    eyebrow: 'BOARDS & VIEWS',
    title: '5 views of the same reality.',
    body: 'Board, Table, Calendar, Timeline, Swimlane — pick the lens. Locked columns enforce RBAC. Dependencies block cross-list drags. Custom card types with your own icons and colors.',
    bullets: ['Kanban with WIP limits', 'Timeline & swimlane', 'Custom card types', 'Locked columns (RBAC)', 'Card dependencies with enforcement'],
    mockup: <KanbanBoard />,
  },
  {
    eyebrow: 'SPRINTS & RETROS',
    title: 'Sprint lifecycle, start to retro.',
    body: 'Planning, backlog refinement, velocity tracking, burndown charts. Then a 5-phase anonymous retro — write, reveal, vote, discuss, close — with AI seeding the first round.',
    bullets: ['Full sprint lifecycle', 'Velocity tracking', 'Burndown charts', '5-phase anonymous retros', 'Refinement assistant'],
    mockup: <RetroMockup />,
  },
  {
    eyebrow: 'DOCS',
    title: 'Wiki-grade docs wired to cards.',
    body: 'Rich editor, nested pages, markdown, mentions, embeds. PRDs become cards with one command. Every doc links to the work it describes — and vice versa.',
    bullets: ['Nested pages', 'Markdown & slash commands', 'AI generates cards from doc', 'Mentions & embeds', 'Real-time collab'],
    mockup: <DocMockup />,
  },
  {
    eyebrow: 'PROJECTS & GOALS',
    title: 'Gantts, milestones, OKRs — connected.',
    body: 'Roadmap projects on a Gantt. Tie cards to milestones, milestones to OKRs, OKRs to company goals. One place to see what\'s slipping and why.',
    bullets: ['Gantt / timeline view', 'Milestones with dependencies', 'OKRs & goal hierarchy', 'Progress rolls up', 'Slip detection'],
    mockup: <GanttMockup />,
  },
  {
    eyebrow: 'DASHBOARDS',
    title: 'Drag-and-drop widgets. Real metrics.',
    body: 'Build a dashboard per team, per project, per quarter. Velocity, cycle time, throughput, AI credit burn. No ETL — it\'s just your data.',
    bullets: ['Custom widgets', 'Drag & drop layout', 'Velocity, cycle, throughput', 'AI credit metering', 'Per-team views'],
    mockup: <DashboardMockup />,
  },
  {
    eyebrow: 'BUILT FOR TEAMS',
    title: 'Enterprise guardrails without the enterprise friction.',
    body: 'SSO/SAML, custom roles with granular permissions, white-label branding, custom domains, 2FA, guest access, audit logs. Offline changes queue locally and auto-sync on reconnect.',
    bullets: ['SSO / SAML', 'Custom roles (granular)', 'White-label (logo, AI name, hue)', 'Custom domains', 'Audit logs · 2FA · guest access', 'Offline resilience'],
    mockup: <AutomationMockup />,
  },
];

const FeatureBlock = ({ f, reverse }) => (
  <div className="reveal" style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1.15fr',
    gap: 60,
    alignItems: 'center',
    padding: '80px 0',
    direction: reverse ? 'rtl' : 'ltr',
  }}>
    <div style={{ direction: 'ltr' }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>{f.eyebrow}</div>
      <h3 className="h-section" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)' }}>{f.title}</h3>
      <p className="lead" style={{ margin: '0 0 24px' }}>{f.body}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {f.bullets.map(b => (
          <li key={b} className="row gap-3" style={{ fontSize: 14 }}>
            <span style={{ color: 'var(--accent)', display: 'inline-flex' }}>{Icons.check}</span>
            <span style={{ color: 'var(--fg)' }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
    <div style={{ direction: 'ltr' }}>
      {f.mockup}
    </div>
  </div>
);

const FeaturesSection = () => (
  <section className="section" id="features" style={{ paddingTop: 60 }}>
    <div className="container">
      <div className="reveal" style={{ marginBottom: 20, maxWidth: 700 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Everything you ship with</div>
        <h2 className="h-section">A full project OS. Not a toy.</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <FeatureBlock f={f} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.NavBar = NavBar;
window.Announcement = Announcement;
window.Hero = Hero;
window.FeatureBadges = FeatureBadges;
window.AISection = AISection;
window.FeaturesSection = FeaturesSection;
