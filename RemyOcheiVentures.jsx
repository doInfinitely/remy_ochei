import { useState, useEffect, useRef, useCallback } from "react";

const TITLES = [
  "The Transfinite",
  "Bracketeer Extraordinaire",
  "The Prismatic Mind",
  "Polymath",
  "The Singleton",
];

const LIVE_PROJECTS = [
  { name: "Claude Cursor", url: "https://claudecursor.com", desc: "Desktop app to rerank, notify & remote-control Claude Code sessions", icon: "🧭" },
  { name: "Rho-Bot", url: "https://rho-bot.net", desc: "Next-gen bot framework", icon: "🤖" },
  { name: "Epsteinalysis", url: "https://epsteinalysis.com", desc: "Deep investigative data analysis", icon: "🔍" },
  { name: "Elonalysis", url: "https://elonalysis.com", desc: "Tech mogul analytics & insights", icon: "📊" },
  { name: "SparkSeekr", url: "https://sparkseekr.com", desc: "Discover your next spark", icon: "✨" },
  { name: "BranchGPT", url: "https://branchgpt.ai", desc: "AI-powered branching intelligence", icon: "🌿" },
  { name: "Spindle", url: "https://spindle.branchgpt.ai", desc: "Thread your ideas together", icon: "🧵" },
  { name: "Travel-Use", url: "https://travel-use.com", desc: "Smart travel utilities", icon: "🧳" },
  { name: "X-Smoke Shop", url: "https://x-smoke.shop", desc: "Premium smoke retail", icon: "💨" },
];

const COMING_SOON = [
  { name: "Tiny OCR", url: "https://tiny-ocr.com", desc: "Lightweight optical character recognition", icon: "👁" },
  { name: "Black Ringo", url: "https://black-ringo.com", desc: "Coming soon", icon: "🎯" },
  { name: "CloudRun Shop", url: "https://cloudrun.shop", desc: "Cloud deployment marketplace", icon: "☁️" },
];

const TRAVEL_PAL_SUBS = [
  { name: "FlavorAtlas", url: "https://www.flavoratlas.travelpal.ai/", domain: "FlavorAtlas.TravelPal.ai", desc: "Global cuisine mapping" },
  { name: "PhantomNav", url: "https://www.phantomnav.travelpal.ai/", domain: "PhantomNav.TravelPal.ai", desc: "Ghost-mode navigation" },
  { name: "QuestLog", url: "https://www.questlog.travelpal.ai/", domain: "QuestLog.TravelPal.ai", desc: "Gamified travel journal" },
  { name: "Agent", url: "https://www.agent.travelpal.ai/", domain: "Agent.TravelPal.ai", desc: "AI travel agent" },
];

/* ─── tiny star canvas ─── */
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 6000,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random(),
      s: Math.random() * 0.008 + 0.002,
      d: Math.random() > 0.5 ? 1 : -1,
    }));
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((s) => {
        s.a += s.s * s.d;
        if (s.a >= 1 || s.a <= 0.1) s.d *= -1;
        ctx.beginPath();
        ctx.arc(s.x % c.width, s.y % c.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,180,${s.a * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

/* ─── drifting ember particles ─── */
function EmberParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;

    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const embers = Array.from({ length: 60 }, () => createEmber(c));

    function createEmber(canvas) {
      return {
        x: Math.random() * (canvas.width || 1400),
        y: (canvas.height || 3000) + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 1.2 + 0.3),
        size: Math.random() * 3.5 + 1,
        life: 1,
        decay: Math.random() * 0.003 + 0.001,
        color: Math.random() > 0.4
          ? [232, 163, 23]   // amber
          : Math.random() > 0.5
            ? [200, 61, 47]  // crimson
            : [255, 120, 50], // orange
        wobbleAmp: Math.random() * 0.8 + 0.2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleOffset: Math.random() * Math.PI * 2,
        t: 0,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);

      embers.forEach((e, i) => {
        e.t += 1;
        e.x += e.vx + Math.sin(e.t * e.wobbleSpeed + e.wobbleOffset) * e.wobbleAmp;
        e.y += e.vy;
        e.life -= e.decay;

        if (e.life <= 0 || e.y < -20) {
          embers[i] = createEmber(c);
          return;
        }

        const alpha = e.life * 0.7;
        const [r, g, b] = e.color;

        // outer glow
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * e.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(r + 40, 255)},${Math.min(g + 40, 255)},${b},${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none",
    }} />
  );
}

/* ─── rotating title ─── */
function RotatingTitle() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("in"); // in, hold, out
  useEffect(() => {
    let t;
    if (phase === "in") t = setTimeout(() => setPhase("hold"), 800);
    else if (phase === "hold") t = setTimeout(() => setPhase("out"), 2600);
    else if (phase === "out") t = setTimeout(() => { setIdx((i) => (i + 1) % TITLES.length); setPhase("in"); }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  const style = {
    display: "inline-block",
    fontStyle: "italic",
    background: "linear-gradient(135deg, #E8A317, #FF6B35, #C63D2F)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: "opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease",
    opacity: phase === "hold" || phase === "in" ? 1 : 0,
    transform: phase === "in" ? "translateY(0)" : phase === "out" ? "translateY(-20px)" : "translateY(0)",
    filter: phase === "out" ? "blur(4px)" : "blur(0px)",
    minWidth: "260px",
    textAlign: "center",
  };

  return <span style={style}>{TITLES[idx]}</span>;
}

/* ─── project card ─── */
function ProjectCard({ project, isLive }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hovered
          ? "linear-gradient(135deg, rgba(200,61,47,0.18), rgba(232,163,23,0.12))"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(232,163,23,0.5)" : "rgba(255,220,180,0.08)"}`,
        borderRadius: "12px",
        padding: "24px 20px",
        transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 32px rgba(200,61,47,0.2), 0 0 60px rgba(232,163,23,0.08)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* pyre glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
          width: "80px", height: "40px",
          background: "radial-gradient(ellipse, rgba(232,163,23,0.4), transparent 70%)",
          filter: "blur(12px)", pointerEvents: "none",
        }} />
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <span style={{ fontSize: "28px", lineHeight: 1 }}>{project.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#FFD4A8",
              letterSpacing: "0.03em",
            }}>{project.name}</span>
            {isLive ? (
              <span style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#1A0A2E", background: "linear-gradient(135deg, #E8A317, #FF6B35)",
                padding: "2px 10px", borderRadius: "20px",
                fontFamily: "'DM Sans', sans-serif",
              }}>LIVE</span>
            ) : (
              <span style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(184,212,227,0.7)", border: "1px solid rgba(184,212,227,0.2)",
                padding: "2px 10px", borderRadius: "20px",
                fontFamily: "'DM Sans', sans-serif",
              }}>SOON</span>
            )}
          </div>
          <p style={{
            margin: 0, fontSize: "13px", color: "rgba(255,220,180,0.5)",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4,
          }}>{project.desc}</p>
        </div>
        <span style={{
          color: hovered ? "#E8A317" : "rgba(255,220,180,0.2)",
          fontSize: "18px", transition: "color 0.3s, transform 0.3s",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          display: "inline-block",
        }}>→</span>
      </div>
    </a>
  );
}

/* ─── Travel Pal expandable ─── */
function TravelPalCard() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      background: open
        ? "linear-gradient(135deg, rgba(90,40,120,0.15), rgba(200,61,47,0.08))"
        : "rgba(255,255,255,0.03)",
      border: `1px solid ${open ? "rgba(160,100,200,0.3)" : "rgba(255,220,180,0.08)"}`,
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.4s ease",
    }}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "24px 20px", textAlign: "left",
          display: "flex", alignItems: "flex-start", gap: "14px",
        }}
      >
        <span style={{ fontSize: "28px", lineHeight: 1 }}>🗺️</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: "17px", fontWeight: 700,
              color: "#FFD4A8", letterSpacing: "0.03em",
            }}>Travel Pal</span>
            <span style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(184,212,227,0.7)", border: "1px solid rgba(184,212,227,0.2)",
              padding: "2px 10px", borderRadius: "20px",
              fontFamily: "'DM Sans', sans-serif",
            }}>SUITE • LIVE</span>
          </div>
          <p style={{
            margin: 0, fontSize: "13px", color: "rgba(255,220,180,0.5)",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4,
          }}>AI-powered travel companion ecosystem — 4 modules</p>
        </div>
        <span style={{
          color: open ? "#E8A317" : "rgba(255,220,180,0.3)",
          fontSize: "18px", transition: "transform 0.3s, color 0.3s",
          transform: open ? "rotate(90deg)" : "rotate(0)",
          display: "inline-block",
        }}>→</span>
      </button>
      <div style={{
        maxHeight: open ? "400px" : "0",
        opacity: open ? 1 : 0,
        transition: "max-height 0.5s ease, opacity 0.4s ease",
        overflow: "hidden",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
          padding: "0 20px 20px",
        }}>
          {TRAVEL_PAL_SUBS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(160,100,200,0.15)",
                borderRadius: "8px",
                padding: "14px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(160,100,200,0.12)";
                e.currentTarget.style.borderColor = "rgba(160,100,200,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(160,100,200,0.15)";
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "14px", fontWeight: 700,
                color: "#D4A0E8", marginBottom: "4px",
              }}>{s.name}</div>
              <div style={{
                fontSize: "11px", color: "rgba(255,220,180,0.35)",
                fontFamily: "'DM Sans', sans-serif", marginBottom: "6px",
              }}>{s.domain}</div>
              <div style={{
                fontSize: "12px", color: "rgba(255,220,180,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}>{s.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── decorative flame divider ─── */
function FlameDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "48px 0 40px" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(232,163,23,0.3), transparent)" }} />
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" style={{ opacity: 0.6 }}>
        <path d="M14 0C14 0 4 12 4 20C4 26.627 8.477 32 14 32C19.523 32 24 26.627 24 20C24 12 14 0 14 0Z"
          fill="url(#fg1)" />
        <path d="M14 10C14 10 9 18 9 22C9 25.866 11.239 29 14 29C16.761 29 19 25.866 19 22C19 18 14 10 14 10Z"
          fill="url(#fg2)" />
        <defs>
          <linearGradient id="fg1" x1="14" y1="0" x2="14" y2="32">
            <stop stopColor="#E8A317" /><stop offset="1" stopColor="#C63D2F" />
          </linearGradient>
          <linearGradient id="fg2" x1="14" y1="10" x2="14" y2="29">
            <stop stopColor="#FFD4A8" /><stop offset="1" stopColor="#E8A317" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(232,163,23,0.3), transparent)" }} />
    </div>
  );
}

/* ─── section label ─── */
function SectionLabel({ children, glow }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
      <div style={{
        width: "8px", height: "8px", borderRadius: "50%",
        background: glow || "#E8A317",
        boxShadow: `0 0 12px ${glow || "#E8A317"}`,
      }} />
      <h2 style={{
        margin: 0,
        fontFamily: "'Cinzel', serif",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(255,220,180,0.6)",
      }}>{children}</h2>
    </div>
  );
}

/* ─── main ─── */
export default function RemyOcheiVentures() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        ::selection { background: rgba(232,163,23,0.3); color: #FFD4A8; }
        @keyframes pyreFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-8px) scale(1.05); opacity: 0.25; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0D0517 0%, #1A0A2E 30%, #12061E 70%, #0A0310 100%)",
        color: "#FFD4A8",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        <Starfield />
        <EmberParticles />

        {/* ambient pyre glow orbs */}
        <div style={{
          position: "fixed", top: "15%", left: "8%", width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(200,61,47,0.06), transparent 70%)",
          borderRadius: "50%", animation: "pyreFloat 8s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", bottom: "20%", right: "5%", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(232,163,23,0.04), transparent 70%)",
          borderRadius: "50%", animation: "pyreFloat 12s ease-in-out infinite 3s", pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "880px", margin: "0 auto", padding: "0 24px",
        }}>
          {/* ─── HEADER ─── */}
          <header style={{
            paddingTop: "clamp(60px, 12vh, 140px)",
            paddingBottom: "20px",
            textAlign: "center",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
          }}>
            {/* celestial ornament */}
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" style={{ marginBottom: "28px", opacity: 0.4 }}>
              <circle cx="30" cy="12" r="4" fill="#E8A317" />
              <circle cx="30" cy="12" r="8" stroke="#E8A317" strokeWidth="0.5" fill="none" opacity="0.5" />
              <line x1="0" y1="12" x2="20" y2="12" stroke="#E8A317" strokeWidth="0.5" opacity="0.3" />
              <line x1="40" y1="12" x2="60" y2="12" stroke="#E8A317" strokeWidth="0.5" opacity="0.3" />
              <circle cx="8" cy="12" r="1.5" fill="#E8A317" opacity="0.4" />
              <circle cx="52" cy="12" r="1.5" fill="#E8A317" opacity="0.4" />
            </svg>

            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(32px, 5.5vw, 56px)",
              fontWeight: 800,
              margin: "0 0 8px",
              color: "#FFD4A8",
              letterSpacing: "0.04em",
              lineHeight: 1.15,
            }}>
              Remy Ochei
            </h1>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 500,
              minHeight: "42px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <RotatingTitle />
            </div>

            <p style={{
              marginTop: "32px",
              fontSize: "15px",
              color: "rgba(255,220,180,0.45)",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 300,
            }}>
              Ventures & creations from the forge of{" "}
              <a href="https://thebracketstudio.com" target="_blank" rel="noopener noreferrer"
                style={{
                  color: "#E8A317", textDecoration: "none",
                  borderBottom: "1px solid rgba(232,163,23,0.3)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(232,163,23,0.8)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(232,163,23,0.3)"}
              >The Bracket Studio</a>
              .
              <br />Each project, a rite unto itself.
            </p>
          </header>

          {/* ─── LIVE PROJECTS ─── */}
          <section style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
          }}>
            <FlameDivider />
            <SectionLabel>The Rites — Live Ventures</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {LIVE_PROJECTS.slice(0, 1).map((p) => (
                <ProjectCard key={p.name} project={p} isLive />
              ))}
              <TravelPalCard />
              {LIVE_PROJECTS.slice(1, 2).map((p) => (
                <ProjectCard key={p.name} project={p} isLive />
              ))}
              {LIVE_PROJECTS.slice(2).map((p) => (
                <ProjectCard key={p.name} project={p} isLive />
              ))}
            </div>
          </section>

          {/* ─── COMING SOON ─── */}
          <section style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s ease 1s, transform 1s ease 1s",
          }}>
            <FlameDivider />
            <SectionLabel glow="rgba(160,100,200,0.8)">The Beyonder — Coming Soon</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {COMING_SOON.map((p) => (
                <ProjectCard key={p.name} project={p} isLive={false} />
              ))}
            </div>
          </section>

          {/* ─── FOOTER ─── */}
          <footer style={{
            textAlign: "center",
            padding: "80px 0 48px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 1.4s",
          }}>
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" style={{ opacity: 0.3, marginBottom: "20px" }}>
              <path d="M14 0C14 0 4 12 4 20C4 26.627 8.477 32 14 32C19.523 32 24 26.627 24 20C24 12 14 0 14 0Z"
                fill="url(#ff1)" />
              <defs>
                <linearGradient id="ff1" x1="14" y1="0" x2="14" y2="32">
                  <stop stopColor="#E8A317" /><stop offset="1" stopColor="#C63D2F" />
                </linearGradient>
              </defs>
            </svg>
            <p style={{
              margin: "0 0 8px",
              fontFamily: "'Cinzel', serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "rgba(255,220,180,0.35)",
            }}>Remy Ochei, Inc.</p>
            <p style={{
              margin: 0,
              fontSize: "12px",
              color: "rgba(255,220,180,0.2)",
            }}>
              Built at{" "}
              <a href="https://thebracketstudio.com" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(232,163,23,0.4)", textDecoration: "none" }}
              >The Bracket Studio</a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
