// Icons - small line icons, currentColor
const Icon = ({ d, size = 14, stroke = 1.75 }) => (
  <svg className="ico" width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);
const IconG = ({ children, size = 14, stroke = 1.75 }) => (
  <svg className="ico" width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icons = {
  board: <IconG><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="7" rx="1"/></IconG>,
  sprint: <IconG><circle cx="12" cy="12" r="8"/><path d="M12 4v4l3 2"/></IconG>,
  doc: <IconG><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></IconG>,
  dash: <IconG><rect x="3" y="3" width="8" height="10" rx="1"/><rect x="13" y="3" width="8" height="6" rx="1"/><rect x="13" y="11" width="8" height="10" rx="1"/><rect x="3" y="15" width="8" height="6" rx="1"/></IconG>,
  goal: <IconG><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></IconG>,
  ai: <IconG><path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.2"/></IconG>,
  auto: <IconG><path d="M13 2L5 14h6l-1 8 8-12h-6z" /></IconG>,
  people: <IconG><circle cx="9" cy="8" r="4"/><path d="M2 20c0-3.87 3.13-7 7-7s7 3.13 7 7"/><circle cx="17" cy="6" r="3"/><path d="M22 16c0-2.76-2.24-5-5-5"/></IconG>,
  github: <IconG><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" stroke="none" fill="currentColor"/></IconG>,
  sparkle: <IconG><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></IconG>,
  check: <IconG><path d="M20 6L9 17l-5-5"/></IconG>,
  x: <IconG><path d="M18 6L6 18M6 6l12 12"/></IconG>,
  arrow: <IconG><path d="M5 12h14M13 6l6 6-6 6"/></IconG>,
  plus: <IconG><path d="M12 5v14M5 12h14"/></IconG>,
  search: <IconG><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></IconG>,
  send: <IconG><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></IconG>,
  chevron: <IconG><path d="M9 18l6-6-6-6"/></IconG>,
  chevronDown: <IconG><path d="M6 9l6 6 6-6"/></IconG>,
  lock: <IconG><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></IconG>,
  bolt: <IconG><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></IconG>,
  sun: <IconG><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></IconG>,
  moon: <IconG><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></IconG>,
  tune: <IconG><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></IconG>,
  blocked: <IconG><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></IconG>,
  link: <IconG><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4.93"/><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 19.07"/></IconG>,
  filter: <IconG><path d="M3 4h18l-7 9v7l-4-2v-5z"/></IconG>,
  cal: <IconG><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></IconG>,
  gantt: <IconG><path d="M3 5h10M3 11h14M3 17h7M3 3v18"/></IconG>,
  swimlane: <IconG><path d="M3 4h18M3 12h18M3 20h18M8 4v16M14 4v16"/></IconG>,
  table: <IconG><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16M15 4v16"/></IconG>,
  vote: <IconG><path d="M5 12l5 5 9-9"/></IconG>,
  retro: <IconG><path d="M12 5v14M5 12l7-7 7 7"/></IconG>,
  shield: <IconG><path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6z"/></IconG>,
  globe: <IconG><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></IconG>,
  branch: <IconG><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v4a4 4 0 0 0 4 4h2M18 7v4a4 4 0 0 1-4 4h-2"/></IconG>,
  terminal: <IconG><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></IconG>,
};

// Seshira wordmark glyph — an abstract 'S' reed/pen, nod to the Egyptian goddess of tracking
const SeshiraGlyph = ({ size = 26 }) => (
  <span className="seshira-glyph" style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 6c-3-2-8-2-9 1-1 3 9 3 8 6s-6 3-9 1"/>
      <path d="M12 2v2M12 20v2" strokeWidth="1.6"/>
    </svg>
  </span>
);

window.Icon = Icon; window.Icons = Icons; window.SeshiraGlyph = SeshiraGlyph;
