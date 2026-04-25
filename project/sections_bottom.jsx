// ============ Pricing, How it works, Trust, FAQ, CTA, Footer ============

const PRICING = [
  {
    name: 'Free', price: '$0', sub: 'forever',
    blurb: 'For small teams trying the agentic workflow.',
    cta: 'Start free',
    ctaKind: 'ghost',
    features: [
      'Up to 10 members', '5 boards', '100 AI credits / month',
      'All 5 board views', 'Sprints, docs, retros',
      'Community support',
    ],
  },
  {
    name: 'Pro', price: '$12', sub: 'per user / month',
    blurb: 'Unlimited everything. Made for growing teams.',
    cta: 'Start 14-day trial',
    ctaKind: 'primary',
    featured: true,
    features: [
      'Unlimited members & boards', '5,000 AI credits / month', 'Custom roles & permissions',
      'GitHub PR auto-linking', 'Automations (no-code AI triggers)',
      'Custom dashboards', 'Priority support',
    ],
  },
  {
    name: 'Business', price: '$25', sub: 'per user / month',
    blurb: 'White-label, SSO, and the big-org checklist.',
    cta: 'Talk to sales',
    ctaKind: 'ghost',
    features: [
      'Everything in Pro', 'Unlimited AI credits',
      'SSO / SAML (Okta, Azure AD, Google)', 'White-label branding',
      'Custom domains', 'Audit logs · 2FA · guest access',
      'Dedicated success manager', '99.95% SLA',
    ],
  },
];

const PricingSection = () => (
  <section className="section" id="pricing" style={{ position: 'relative' }}>
    <div className="glow" style={{ width: 500, height: 400, background: 'var(--accent-glow)', right: '-5%', top: '20%' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 56px' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Pricing</div>
        <h2 className="h-section">Pricing right on the landing page.</h2>
        <p className="lead" style={{ margin: '0 auto' }}>Because you shouldn't have to click "contact us" to see a number.</p>
      </div>

      <div className="feat-grid reveal" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {PRICING.map(p => (
          <div key={p.name} className="card" style={{
            padding: 28,
            borderColor: p.featured ? 'var(--accent-border)' : 'var(--border)',
            boxShadow: p.featured ? '0 0 0 1px var(--accent-border), 0 30px 60px -30px var(--accent-glow)' : 'none',
            background: p.featured ? 'linear-gradient(180deg, color-mix(in oklch, var(--accent) 8%, var(--bg-1)) 0%, var(--bg-1) 50%)' : 'var(--bg-1)',
            position: 'relative',
          }}>
            {p.featured && (
              <span className="chip mono" style={{ position: 'absolute', top: 20, right: 20, fontSize: 10, color: 'var(--accent-soft)', borderColor: 'var(--accent-border)' }}>
                <span className="dot" /> RECOMMENDED
              </span>
            )}
            <div className="eyebrow" style={{ marginBottom: 10 }}>{p.name}</div>
            <div className="row gap-2" style={{ alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.03em' }}>{p.price}</span>
              <span className="muted" style={{ fontSize: 13 }}>{p.sub}</span>
            </div>
            <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, margin: '0 0 20px' }}>{p.blurb}</p>
            <a className={"btn " + (p.ctaKind === 'primary' ? 'btn-primary' : 'btn-ghost')}
               style={{ width: '100%', justifyContent: 'center', marginBottom: 24 }}>{p.cta}</a>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map(f => (
                  <li key={f} className="row gap-3" style={{ fontSize: 13.5 }}>
                    <span style={{ color: 'var(--accent)' }}>{Icons.check}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal" style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--fg-muted)' }}>
        Billing in <span className="mono">USD</span> via Stripe · in <span className="mono">NGN · ZAR · KES</span> via Paystack.
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="section-tight" style={{ borderTop: '1px solid var(--border)' }}>
    <div className="container">
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>How it works</div>
        <h2 className="h-section">Three steps. No onboarding call required.</h2>
      </div>
      <div className="feat-grid reveal" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          {
            n: '01', t: 'Import or start fresh',
            d: 'CSV from Jira, JSON from Linear, or build a board from scratch in 30 seconds. Every import preserves labels, estimates, and history.',
          },
          {
            n: '02', t: 'Let the agent watch',
            d: 'Seshira reads your backlog, sprints, and docs. Within a day it knows your velocity, your stale-card patterns, and who usually owns what.',
          },
          {
            n: '03', t: 'Ship with 14 tools',
            d: 'Ask for sprints, retros, PR descriptions, or blocker reports. The agent does it. You review and merge.',
          },
        ].map(s => (
          <div key={s.n} style={{
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 28,
            position: 'relative',
          }}>
            <div className="mono" style={{
              fontSize: 64, fontWeight: 300,
              color: 'transparent',
              WebkitTextStroke: '1px var(--accent-border)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: 20,
            }}>{s.n}</div>
            <h3 className="h-card" style={{ marginBottom: 10, fontSize: 20 }}>{s.t}</h3>
            <p className="muted" style={{ fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQS = [
  { q: 'What does "agentic" actually mean?', a: 'The AI has access to 14 real tools — create_sprint, move_card, assign_members, detect_blockers, generate_pr_description, and more. It doesn\'t just suggest; it executes (and shows you what it did so you can undo).' },
  { q: 'Can I migrate from Jira, Linear, Asana, or ClickUp?', a: 'Yes. We support CSV, JSON, and native API imports for all four. Labels, estimates, comments, and status history come across intact.' },
  { q: 'What AI model does Seshira use?', a: 'Claude Sonnet for complex reasoning (sprint planning, PRD-to-tasks), Claude Haiku for fast operations (search, summarization). Titan Embeddings for semantic search across your workspace.' },
  { q: 'What\'s an AI credit?', a: 'One agent action that hits a tool, or roughly one Sonnet completion. Free gets 100/mo, Pro 5,000/mo, Business unlimited. Most teams use ~1,000–2,000/mo.' },
  { q: 'Is my data used to train models?', a: 'No. We use AWS Bedrock, which contractually prohibits training on customer data. Your workspace stays yours.' },
  { q: 'What about offline?', a: 'Changes queue locally in IndexedDB and auto-sync on reconnect. Cards edited offline are marked until they\'re merged, and conflicts surface as a review step.' },
  { q: 'Do you have a self-hosted option?', a: 'Not today. Business customers get their own isolated tenant with optional EU data residency. Self-host is on the 2027 roadmap.' },
  { q: 'Can I white-label the AI too?', a: 'Yes. On Business, rename "Seshira AI" to whatever fits your brand, swap the accent color, add your logo. Your users see your product.' },
  { q: 'How does GitHub integration work?', a: 'Branch naming convention maps to card IDs (e.g. ses-412-stripe-adapter). PRs auto-link to the card, status updates flow both ways, and automations can generate PR descriptions.' },
  { q: 'What regions does billing cover?', a: 'Stripe for global cards. Paystack for NGN, ZAR, KES, GHS with native bank transfer and mobile money.' },
  { q: 'What happens when I hit my AI credit cap?', a: 'AI features pause until the next billing cycle, or you can top up in 1,000-credit packs. Non-AI features keep working normally.' },
  { q: 'Is there an API?', a: 'Yes — REST + WebSocket for real-time events. Webhook signatures, OAuth apps, and per-workspace rate limits. Docs at seshira.dev.' },
  { q: 'Do you support SAML and SCIM?', a: 'SSO/SAML on Business with Okta, Azure AD, Google, OneLogin. SCIM provisioning included.' },
  { q: 'Who makes Seshira?', a: 'Morphlix — a small team of engineers who got tired of PM tools that pretend to be smart.' },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', textAlign: 'left', padding: '18px 4px',
        background: 'transparent', border: 'none', color: 'var(--fg)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em',
      }}>
        <span>{q}</span>
        <span style={{ color: 'var(--fg-muted)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-flex' }}>{Icons.chevronDown}</span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: 0, padding: '0 4px 20px', maxWidth: '60ch' }}>{a}</p>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section className="section" id="faq">
    <div className="container">
      <div className="reveal" style={{ marginBottom: 40, maxWidth: 700 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>FAQ</div>
        <h2 className="h-section">Common questions.</h2>
      </div>
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 48px' }}>
        <div>
          {FAQS.slice(0, 7).map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
        <div>
          {FAQS.slice(7).map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => {
  const stack = [
    { n: 'Next.js 16', c: 'oklch(0.9 0 0)' },
    { n: 'React 19', c: 'oklch(0.75 0.1 210)' },
    { n: 'TypeScript', c: 'oklch(0.65 0.14 240)' },
    { n: 'Tailwind', c: 'oklch(0.7 0.12 200)' },
    { n: 'Go · chi', c: 'oklch(0.75 0.1 210)' },
    { n: 'PostgreSQL', c: 'oklch(0.65 0.12 240)' },
    { n: 'pgvector', c: 'var(--accent-soft)' },
    { n: 'AWS Bedrock', c: 'oklch(0.75 0.14 65)' },
    { n: 'Claude Sonnet', c: 'oklch(0.7 0.15 35)' },
    { n: 'Claude Haiku', c: 'oklch(0.7 0.12 65)' },
    { n: 'Titan Embeddings', c: 'oklch(0.72 0.13 180)' },
    { n: 'Redis', c: 'oklch(0.65 0.18 25)' },
    { n: 'WebSocket', c: 'oklch(0.72 0.13 145)' },
    { n: 'Stripe', c: 'oklch(0.7 0.15 260)' },
    { n: 'Paystack', c: 'oklch(0.72 0.13 180)' },
  ];
  return (
    <section className="section-tight" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-1)' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Built on</div>
          <p className="muted" style={{ fontSize: 15, margin: 0 }}>Boring infrastructure, interesting ideas.</p>
        </div>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {stack.map(s => (
            <div key={s.n} className="chip" style={{ padding: '8px 14px', fontSize: 13, color: 'var(--fg)' }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
              {s.n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="section" style={{ position: 'relative', paddingTop: 140, paddingBottom: 140 }}>
    <div className="glow" style={{ width: 700, height: 500, background: 'var(--accent-glow)', left: '50%', top: '40%', transform: 'translateX(-50%)' }} />
    <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
    <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
      <div className="reveal">
        <h2 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 24 }}>
          Your team's <span className="accent-text">AI-powered<br/>engineering OS.</span>
        </h2>
        <p className="lead" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          10 minutes to set up. 14 tools that execute. Every plan free to try.
        </p>
        <div className="row gap-3" style={{ justifyContent: 'center' }}>
          <a className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 15 }}>Start free {Icons.arrow}</a>
          <a className="btn btn-ghost" style={{ padding: '14px 24px', fontSize: 15 }}>Book a walkthrough</a>
        </div>
        <div className="mono" style={{ marginTop: 32, fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '0.08em' }}>
          NO CREDIT CARD · 10 USERS FREE · 100 AI CREDITS / MO
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border)', paddingTop: 60, paddingBottom: 40, background: 'var(--bg-1)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div>
          <a className="row gap-3" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            <SeshiraGlyph />
            <span>Seshira</span>
          </a>
          <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
            AI-native project management. Named after Seshat, the Egyptian goddess of writing and record-keeping.
          </p>
          <div className="row gap-3" style={{ marginTop: 16, color: 'var(--fg-muted)' }}>
            <a href="#" style={{display:'inline-flex'}}>{Icons.github}</a>
            <a href="#" style={{display:'inline-flex'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.7-2.4.9-.7-.8-1.7-1.2-2.8-1.2-2.1 0-3.8 1.7-3.8 3.8 0 .3 0 .6.1.9C9.3 8.5 6.1 6.8 4 4.2c-.3.6-.5 1.2-.5 2 0 1.3.7 2.5 1.7 3.2-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.3 3.4 3.1 3.8-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.6 2.7-1.3 1-3 1.6-4.8 1.6H3c1.7 1.1 3.7 1.7 5.9 1.7 7 0 10.9-5.8 10.9-10.9v-.5c.7-.5 1.4-1.2 1.9-2z"/></svg>
            </a>
            <a href="#" style={{display:'inline-flex'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18H5.7V9.5h2.6V18zM7 8.3c-.9 0-1.6-.7-1.6-1.6S6.1 5.1 7 5.1s1.6.7 1.6 1.6S7.9 8.3 7 8.3zM18.3 18h-2.6v-4.5c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V18H9.9V9.5h2.5v1.1h.1c.3-.6 1.2-1.3 2.4-1.3 2.6 0 3.1 1.7 3.1 3.9V18z"/></svg>
            </a>
          </div>
        </div>
        {[
          { h: 'Product', links: ['Boards', 'Sprints', 'Docs', 'Dashboards', 'AI', 'Pricing', 'Changelog'] },
          { h: 'Company', links: ['About', 'Blog', 'Careers', 'Press kit', 'Contact'] },
          { h: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA', 'SOC 2', 'Status'] },
        ].map(col => (
          <div key={col.h}>
            <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--fg-muted)' }}>{col.h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(l => <a key={l} href="#" className="muted" style={{ fontSize: 13.5 }}>{l}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)' }}>
          © 2026 Morphlix, Inc. · All systems operational <span style={{color:'var(--success)'}}>●</span>
        </div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)' }}>
          v3.0.0-beta · built in lagos + nyc
        </div>
      </div>
    </div>
  </footer>
);

window.PricingSection = PricingSection;
window.HowItWorks = HowItWorks;
window.FAQSection = FAQSection;
window.TrustSection = TrustSection;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
