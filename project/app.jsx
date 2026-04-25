// ============ App root ============

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 270,
  "theme": "dark",
  "density": "comfortable",
  "heroVariant": "split"
}/*EDITMODE-END*/;

const HUES = [
  { name: 'Violet', h: 270 },
  { name: 'Indigo', h: 255 },
  { name: 'Magenta', h: 320 },
  { name: 'Cyan', h: 200 },
  { name: 'Emerald', h: 150 },
  { name: 'Amber', h: 60 },
];

const App = () => {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [tweaksAvailable, setTweaksAvailable] = React.useState(false);
  const [announceVisible, setAnnounceVisible] = React.useState(true);

  const updateTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  // Apply tweaks
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent-h', tweaks.accentHue);
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    document.documentElement.style.setProperty('--density', tweaks.density === 'compact' ? '0.7' : '1');
  }, [tweaks]);

  // Tweaks mode
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksAvailable(true);
      if (e.data?.type === '__deactivate_edit_mode') { setTweaksAvailable(false); setTweaksOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Reveal on scroll
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => updateTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      {announceVisible && <Announcement onDismiss={() => setAnnounceVisible(false)} />}
      <NavBar theme={tweaks.theme} onToggleTheme={toggleTheme} />
      <Hero />
      <FeatureBadges />
      <AISection />
      <FeaturesSection />
      <PricingSection />
      <HowItWorks />
      <FAQSection />
      <TrustSection />
      <FinalCTA />
      <Footer />

      {tweaksAvailable && (
        <>
          <button className="tweaks-btn" onClick={() => setTweaksOpen(o => !o)} aria-label="tweaks">
            {Icons.tune}
          </button>
          {tweaksOpen && (
            <div className="tweaks-panel">
              <h4>Tweaks <button onClick={() => setTweaksOpen(false)} style={{background:'none',border:'none',color:'var(--fg-muted)'}}>{Icons.x}</button></h4>

              <label>Accent hue</label>
              <div className="hue-row">
                {HUES.map(h => (
                  <button key={h.name}
                    className={"hue-dot" + (tweaks.accentHue === h.h ? " active" : "")}
                    style={{ background: `oklch(0.58 0.19 ${h.h})` }}
                    onClick={() => updateTweak('accentHue', h.h)}
                    title={h.name}
                  />
                ))}
              </div>

              <label>Theme</label>
              <div className="seg">
                <button className={tweaks.theme === 'dark' ? 'active' : ''} onClick={() => updateTweak('theme', 'dark')}>Dark</button>
                <button className={tweaks.theme === 'light' ? 'active' : ''} onClick={() => updateTweak('theme', 'light')}>Light</button>
              </div>

              <label>Density</label>
              <div className="seg">
                <button className={tweaks.density === 'comfortable' ? 'active' : ''} onClick={() => updateTweak('density', 'comfortable')}>Comfortable</button>
                <button className={tweaks.density === 'compact' ? 'active' : ''} onClick={() => updateTweak('density', 'compact')}>Compact</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
