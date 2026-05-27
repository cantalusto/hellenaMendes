"use client";

import { useState, useEffect } from "react";

// ============== MEDIA QUERY ==============
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
};

// ============== ICONS ==============
const Icon = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.5c-.8 0-1.5-.7-1.5-1.5S6.2 5.5 7 5.5s1.5.7 1.5 1.5S7.8 8.5 7 8.5zm11.3 9.8h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V9.7H13v1.2h.1c.3-.6 1.2-1.3 2.4-1.3 2.6 0 3.1 1.7 3.1 3.9v4.8z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M12 5v14" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14" />
    </svg>
  ),
  ArrowUp: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <img
      src="/logo.png"
      alt="hellena"
      style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", display: "block" }}
    />
    <span style={{ fontFamily: '"Caveat", cursive', fontSize: 26, fontWeight: 600, letterSpacing: -0.5, color: "#111" }}>
      hellena
    </span>
  </div>
);

const Header = ({ onHire, onNav }) => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setPastHero(y > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navItems = ["Início", "Serviços", "Trabalhos", "Galeria", "Contato"];
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: isMobile ? "12px 16px" : "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(214,217,222,0.92)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        transition: "all .25s ease",
      }}
    >
      {isMobile ? (
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#111", transition: "transform .2s", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#111", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#111", transition: "transform .2s", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      ) : (
        <nav style={{ display: "flex", gap: 22, fontSize: 13, fontWeight: 500 }}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNav(item)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#111",
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5A1F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#111")}
            >
              {item}
            </button>
          ))}
        </nav>
      )}
      <div
        style={{
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: pastHero ? "auto" : "none",
          transition: "opacity .3s ease, transform .3s ease",
        }}
      >
        <Logo />
      </div>
      {menuOpen && isMobile && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(214,217,222,0.96)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(0,0,0,.06)",
            padding: "12px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                onNav(item);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "12px 4px",
                cursor: "pointer",
                color: "#111",
                fontFamily: "inherit",
                fontSize: 16,
                fontWeight: 500,
                textAlign: "left",
                borderBottom: "1px solid rgba(0,0,0,.06)",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 14 }}>
        <div style={{ display: isMobile ? "none" : "flex", gap: 8 }}>
          {[
            { I: Icon.Instagram, href: "https://www.instagram.com/psique.hellenamendes/", label: "Instagram" },
            { I: Icon.Linkedin, href: "https://www.linkedin.com/in/hellena-dias-mendes-cruz-1b465b382/", label: "LinkedIn" },
          ].map(({ I, href, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111",
                boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#111";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#111";
              }}
            >
              <I />
            </a>
          ))}
        </div>
        <button
          onClick={onHire}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: isMobile ? "8px 14px" : "10px 18px",
            borderRadius: 999,
            cursor: "pointer",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 500,
            fontFamily: "inherit",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FF5A1F")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
        >
          {isMobile ? "Contato" : "Contrate-me!"}
        </button>
      </div>
    </header>
  );
};

const FloatingTag = ({ label, style }) => (
  <div
    style={{
      position: "absolute",
      background: "#111",
      color: "#fff",
      padding: "7px 16px",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 500,
      boxShadow: "0 6px 18px rgba(0,0,0,.18)",
      ...style,
    }}
  >
    {label}
  </div>
);

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
  <section
    style={{
      position: "relative",
      padding: isMobile ? "0 16px 20px" : "0 28px",
      overflow: "hidden",
      minHeight: isMobile ? "calc(100vh - 60px)" : "auto",
      display: isMobile ? "flex" : "block",
      flexDirection: isMobile ? "column" : undefined,
      justifyContent: isMobile ? "space-between" : undefined,
    }}
  >
    {/* Single stage that holds everything overlapping */}
    <div
      style={{
        position: "relative",
        height: isMobile ? "min(48vh, 380px)" : "clamp(640px, 78vw, 880px)",
        marginTop: 10,
        overflow: isMobile ? "hidden" : "visible",
        flexShrink: isMobile ? 0 : undefined,
      }}
    >
      {/* Huge DESIGNER text behind, full width with side fade */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          pointerEvents: "none",
          fontSize: "clamp(140px, 24vw, 360px)",
          fontWeight: 800,
          letterSpacing: "-0.045em",
          color: "#fff",
          lineHeight: 1,
          fontFamily: '"Inter", Helvetica, Arial, sans-serif',
          zIndex: 1,
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          opacity: 0.95,
        }}
      >
        DESIGNER
      </div>

      {/* Portrait — sits in front of background, fades at bottom */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          height: "clamp(500px, 64vw, 760px)",
          zIndex: 3,
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.55) 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.55) 88%, transparent 100%)",
        }}
      >
        <img
          src="/portrait.png"
          alt="Hellena"
          style={{ height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Cursive signature — desktop only (ilegível sobreposto ao retrato no mobile) */}
      {!isMobile && (
        <>
          <span
            style={{
              position: "absolute",
              left: "2%",
              top: "44%",
              fontFamily: '"Caveat", cursive',
              fontSize: "clamp(70px, 11vw, 170px)",
              color: "#FF5A1F",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -2,
              textShadow: "0 2px 8px rgba(0,0,0,.12)",
              zIndex: 4,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            Hellena
          </span>
          <span
            style={{
              position: "absolute",
              right: "2%",
              top: "44%",
              fontFamily: '"Caveat", cursive',
              fontSize: "clamp(70px, 11vw, 170px)",
              color: "#FF5A1F",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -2,
              textShadow: "0 2px 8px rgba(0,0,0,.12)",
              zIndex: 4,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            Mendes
          </span>
        </>
      )}

      {/* Floating pill tags (desktop only — overlap on mobile) */}
      {!isMobile && (
        <>
          <FloatingTag label="Branding" style={{ top: "32%", left: "26%", transform: "rotate(-6deg)", zIndex: 5 }} />
          <FloatingTag label="Psicologia" style={{ top: "22%", right: "24%", transform: "rotate(7deg)", zIndex: 5 }} />
        </>
      )}

      {/* Bottom fade — dissolves portrait into background */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "38%",
          background:
            "linear-gradient(to bottom, rgba(214,217,222,0) 0%, rgba(214,217,222,0.7) 55%, #D6D9DE 100%)",
          pointerEvents: "none",
          zIndex: 6,
        }}
      />

      {/* Bottom overlay content: title left, info card right (desktop only — mobile renders outside stage) */}
      {!isMobile && (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 20,
          padding: "0 4px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 30,
          alignItems: "end",
          zIndex: 7,
        }}
      >
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", marginBottom: 14 }}>
          <span style={{ display: "inline-block", transform: "rotate(-12deg)" }}>👋</span>
          <span>Olá, sou Hellena Mendes</span>
        </div>
        <h1
          style={{
            fontFamily: '"Inter", Helvetica, Arial, sans-serif',
            fontSize: "clamp(40px, 6.4vw, 88px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "#111",
          }}
        >
          BRANDING,
          <br />
          DESIGN VISUAL
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            &amp; PSICOLOGIA.
            <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", background: "#FF5A1F", verticalAlign: "middle" }} />
          </span>
        </h1>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 22,
          display: "flex",
          alignItems: "center",
          gap: 18,
          boxShadow: "0 8px 30px rgba(0,0,0,.06)",
          marginBottom: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#333" }}>
            Designer gráfica e estudante de psicologia, criando identidades visuais com sensibilidade e escuta — entre Recife e
            qualquer lugar.
          </p>
          <a
            href="mailto:hdiasmendescruz@gmail.com"
            style={{
              display: "inline-block",
              marginTop: 10,
              color: "#FF5A1F",
              fontSize: 13,
              fontWeight: 500,
              borderBottom: "1px solid #FF5A1F",
              paddingBottom: 1,
              textDecoration: "none",
            }}
          >
            hdiasmendescruz@gmail.com
          </a>
        </div>
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: "50%",
            background: "#111",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
            animation: "spin 18s linear infinite",
          }}
        >
          <svg viewBox="0 0 100 100" width="78" height="78" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <path id="circ" d="M50,50 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0" />
            </defs>
            <text fill="#fff" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="2">
              <textPath href="#circ">VAMOS CRIAR · VAMOS CRIAR · </textPath>
            </text>
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "spin-rev 18s linear infinite",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#FF5A1F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Icon.ArrowUp />
            </div>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>

    {/* Mobile-only: title + simplified email card rendered as siblings below the stage */}
    {isMobile && (
      <div style={{ marginTop: -8, position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#222", marginBottom: 10 }}>
          <span style={{ display: "inline-block", transform: "rotate(-12deg)" }}>👋</span>
          <span>Olá, sou Hellena Mendes</span>
        </div>
        <h1
          style={{
            fontFamily: '"Inter", Helvetica, Arial, sans-serif',
            fontSize: "clamp(34px, 9vw, 48px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            margin: "0 0 18px",
            color: "#111",
          }}
        >
          BRANDING,
          <br />
          DESIGN VISUAL
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            &amp; PSICOLOGIA.
            <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: "50%", background: "#FF5A1F" }} />
          </span>
        </h1>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 18,
            boxShadow: "0 8px 30px rgba(0,0,0,.06)",
          }}
        >
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#333" }}>
            Designer gráfica e estudante de psicologia, criando identidades visuais com sensibilidade e escuta — entre Recife e
            qualquer lugar.
          </p>
          <a
            href="mailto:hdiasmendescruz@gmail.com"
            style={{
              display: "inline-block",
              marginTop: 10,
              color: "#FF5A1F",
              fontSize: 13,
              fontWeight: 500,
              borderBottom: "1px solid #FF5A1F",
              paddingBottom: 1,
              textDecoration: "none",
              wordBreak: "break-all",
            }}
          >
            hdiasmendescruz@gmail.com
          </a>
        </div>
      </div>
    )}
  </section>
  );
};

const SERVICES = [
  {
    id: "branding",
    title: "BRANDING",
    text: "Construção de identidades visuais coerentes — do logotipo aos materiais impressos. Foco em narrativa, simbolismo e consistência em todos os pontos de contato.",
    deliverables: ["Logotipo", "Manual de marca", "Paleta & tipografia", "Aplicações"],
  },
  {
    id: "design",
    title: "DESIGN GRÁFICO",
    text: "Criação de peças para impressão e ambientes — adesivos, banners, panfletos, folders e materiais promocionais. Layouts adaptados conforme cada projeto.",
    deliverables: ["Impressos", "Materiais promocionais", "Diagramação", "Sinalização"],
  },
  {
    id: "social",
    title: "COMUNICAÇÃO DIGITAL",
    text: "Produção de peças para redes sociais e plataformas digitais. Sistemas visuais que mantêm a marca reconhecível em qualquer formato — feed, stories, carrossel.",
    deliverables: ["Feed & stories", "Templates", "Carrosséis", "Capas"],
  },
  {
    id: "psicologia",
    title: "PSICOLOGIA & ESCUTA",
    text: "Olhar clínico aplicado ao design — escuta atenta, sensibilidade ao contexto e cuidado com a experiência humana. Projetos que combinam estética e bem-estar.",
    deliverables: ["Escuta ativa", "Pesquisa com público", "Acessibilidade", "Design afetivo"],
  },
];

const ServiceItem = ({ service, open, onToggle, index }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
  <div
    style={{
      background: "#fff",
      borderRadius: 18,
      marginBottom: 14,
      overflow: "hidden",
      transition: "all .3s ease",
      boxShadow: open ? "0 10px 30px rgba(0,0,0,.08)" : "0 1px 0 rgba(0,0,0,.03)",
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: isMobile ? "20px 20px" : "28px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        fontFamily: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: isMobile ? 10 : 18, minWidth: 0 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: "#999" }}>0{index + 1}</span>
        <h3 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111" }}>
          {service.title}
        </h3>
      </div>
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: open ? "#FF5A1F" : "#f3f3f3",
          color: open ? "#fff" : "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all .25s",
        }}
      >
        {open ? <Icon.Minus /> : <Icon.Plus />}
      </span>
    </button>
    <div
      style={{
        maxHeight: open ? (isMobile ? 420 : 240) : 0,
        overflow: "hidden",
        transition: "max-height .35s ease",
        padding: open ? (isMobile ? "0 20px 22px" : "0 30px 28px") : isMobile ? "0 20px" : "0 30px",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr", gap: isMobile ? 14 : 30, paddingTop: 6 }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#444" }}>{service.text}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" }}>
          {service.deliverables.map((d) => (
            <span
              key={d}
              style={{
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 999,
                background: "#f3f3f3",
                color: "#222",
                fontWeight: 500,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const Services = () => {
  const [open, setOpen] = useState("design");
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section id="services" style={{ padding: isMobile ? "40px 16px 30px" : "60px 28px 40px", position: "relative" }}>
      <div style={{ position: "relative", marginBottom: 0, overflow: "hidden" }}>
        <h2
          style={{
            margin: 0,
            fontSize: isMobile ? "clamp(60px, 18vw, 100px)" : "clamp(100px, 16vw, 220px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.95)",
            lineHeight: 0.9,
            whiteSpace: "nowrap",
          }}
        >
          SERVIÇOS
        </h2>
        <div
          style={{
            position: "absolute",
            right: 28,
            bottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            fontWeight: 600,
            color: "#111",
          }}
        >
          <span>SERVIÇOS</span>
          <span style={{ width: 4, height: 22, background: "#FF5A1F" }} />
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        {SERVICES.map((s, i) => (
          <ServiceItem
            key={s.id}
            service={s}
            index={i}
            open={open === s.id}
            onToggle={() => setOpen(open === s.id ? null : s.id)}
          />
        ))}
      </div>
    </section>
  );
};

const WORKS = [
  {
    tag: "Marketing",
    title: "DigitalNest — Designer & Social Media",
    year: "Atual",
    meta: "Marketing digital & redes",
    description:
      "Atuação como designer e social media na DigitalNest, criando peças para campanhas, posts, stories e carrosséis. Trabalho com estratégia de conteúdo, identidade visual de marcas clientes, edição de vídeo e foto, e uso de ferramentas de IA para acelerar a produção criativa.",
    skills: ["Social Media", "Campanhas", "Edição de vídeo", "IA aplicada"],
  },
  {
    tag: "Branding",
    title: "Núcleo de Design — CAA/UFPE",
    year: "2025",
    meta: "Acessibilidade em museus",
    description:
      "Participação em projeto do Centro Acadêmico de Artes da UFPE focado em acessibilidade comunicacional em espaços museais. Desenvolvimento de materiais gráficos inclusivos e diretrizes visuais para públicos diversos.",
    skills: ["Acessibilidade", "Pesquisa", "Material gráfico", "UFPE"],
  },
  {
    tag: "Museologia",
    title: "Museu UFPE — Denis Bernardes",
    year: "2025–26",
    meta: "Mediação & exposições",
    description:
      "Estágio em museologia no Museu Denis Bernardes (UFPE) com atuação em mediação cultural, atendimento ao público, organização de acervo e apoio a exposições temporárias. Experiência direta na ponte entre objeto, narrativa e visitante.",
    skills: ["Mediação", "Acervo", "Exposições", "Curadoria"],
  },
  {
    tag: "Identidade",
    title: "Systems Design",
    year: "2024",
    meta: "Materiais impressos & redes",
    description:
      "Projetos freelance de design gráfico — criação de identidades visuais, peças impressas (panfletos, banners, adesivos) e adaptações para redes sociais. Foco em sistemas visuais coerentes e adaptáveis a múltiplos formatos.",
    skills: ["Logotipo", "Impressos", "Redes sociais", "Sistema visual"],
  },
  {
    tag: "Editorial",
    title: "EREM Pompéia Campos",
    year: "2022–24",
    meta: "Biblioteca & eventos",
    description:
      "Atuação na biblioteca escolar com organização de acervo, mediação de leitura e produção de materiais gráficos para eventos culturais e literários. Primeira experiência prática unindo cuidado com o público e produção visual.",
    skills: ["Biblioteca", "Eventos", "Mediação", "Material educativo"],
  },
];

const WorkRow = ({ work, index, total, open, onToggle }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
  <div
    style={{
      borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,.08)",
      transition: "background .2s",
      background: open ? "rgba(255,90,31,.06)" : "transparent",
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: isMobile ? "18px 18px" : "24px 30px",
        display: isMobile ? "flex" : "grid",
        flexDirection: isMobile ? "column" : undefined,
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 6 : 0,
        gridTemplateColumns: isMobile ? undefined : "120px 1.5fr 1fr 60px",
        color: open ? "#FF5A1F" : "#fff",
        fontFamily: "inherit",
        textAlign: "left",
        transition: "color .2s",
      }}
      onMouseEnter={(e) => {
        if (!open) e.currentTarget.style.color = "#FF5A1F";
      }}
      onMouseLeave={(e) => {
        if (!open) e.currentTarget.style.color = "#fff";
      }}
    >
      <div
        style={{
          display: isMobile ? "flex" : "contents",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.65 }}>
          0{index + 1} / 0{total}
        </span>
        {isMobile && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: open ? "#FF5A1F" : "rgba(255,255,255,.12)",
              color: "#fff",
              transition: "background .25s",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path
                d="M6 2v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{
                  transformOrigin: "center",
                  transform: open ? "scaleY(0)" : "scaleY(1)",
                  transition: "transform .25s ease",
                }}
              />
            </svg>
          </span>
        )}
      </div>
      <span style={{ fontSize: isMobile ? 18 : "clamp(20px, 2.4vw, 30px)", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
        {work.title}
      </span>
      <span style={{ fontSize: 12, opacity: 0.7 }}>
        {work.tag} · {work.meta} {isMobile && `· ${work.year}`}
      </span>
      {!isMobile && (
        <span
          style={{
            fontSize: 13,
            textAlign: "right",
            opacity: 0.9,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {work.year}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: open ? "#FF5A1F" : "rgba(255,255,255,.12)",
              color: "#fff",
              transition: "background .25s",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path
                d="M6 2v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{
                  transformOrigin: "center",
                  transform: open ? "scaleY(0)" : "scaleY(1)",
                  transition: "transform .25s ease",
                }}
              />
            </svg>
          </span>
        </span>
      )}
    </button>
    <div
      style={{
        maxHeight: open ? (isMobile ? 500 : 300) : 0,
        overflow: "hidden",
        transition: "max-height .4s ease",
      }}
    >
      <div
        style={{
          padding: isMobile ? "0 18px 22px" : "0 30px 28px 150px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr",
          gap: isMobile ? 14 : 30,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.78)" }}>{work.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" }}>
          {work.skills.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const Works = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section id="works" style={{ padding: isMobile ? "20px 16px 40px" : "40px 28px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#111" }}>
          Trabalhos & Trajetória
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            fontWeight: 600,
            color: "#111",
          }}
        >
          <span>SELECIONADOS</span>
          <span style={{ width: 4, height: 18, background: "#FF5A1F" }} />
        </div>
      </div>
      <div style={{ background: "#111", borderRadius: 22, overflow: "hidden" }}>
        {WORKS.map((w, i) => (
          <WorkRow
            key={i}
            work={w}
            index={i}
            total={WORKS.length}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

// ============== GALLERY ==============
const ARTWORKS = Array.from({ length: 15 }, (_, i) => `/art-${String(i + 1).padStart(2, "0")}.jpeg`);

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % ARTWORKS.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + ARTWORKS.length) % ARTWORKS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" style={{ padding: isMobile ? "20px 16px 40px" : "20px 28px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#111",
          }}
        >
          Galeria
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            fontWeight: 600,
            color: "#111",
          }}
        >
          <span>PEÇAS &amp; ARTES</span>
          <span style={{ width: 4, height: 18, background: "#FF5A1F" }} />
        </div>
      </div>

      <div
        style={{
          columnCount: isMobile ? 2 : 3,
          columnGap: isMobile ? 10 : 14,
        }}
      >
        {ARTWORKS.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightbox(i)}
            style={{
              display: "block",
              width: "100%",
              breakInside: "avoid",
              marginBottom: 14,
              padding: 0,
              border: "none",
              borderRadius: 14,
              overflow: "hidden",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 4px 14px rgba(0,0,0,.06)",
              transition: "transform .25s, box-shadow .25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,.06)";
            }}
          >
            <img
              src={src}
              alt={`Arte ${i + 1}`}
              loading="lazy"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "rgba(0,0,0,.88)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
            animation: "fadeIn .2s",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            aria-label="Fechar"
            style={{
              position: "absolute",
              top: 22,
              right: 22,
              background: "rgba(255,255,255,.12)",
              border: "none",
              color: "#fff",
              width: 42,
              height: 42,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon.Close />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + ARTWORKS.length) % ARTWORKS.length);
            }}
            aria-label="Anterior"
            style={{
              position: "absolute",
              left: 22,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,.12)",
              border: "none",
              color: "#fff",
              width: 48,
              height: 48,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 22,
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % ARTWORKS.length);
            }}
            aria-label="Próxima"
            style={{
              position: "absolute",
              right: 22,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,.12)",
              border: "none",
              color: "#fff",
              width: 48,
              height: 48,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 22,
            }}
          >
            ›
          </button>
          <img
            src={ARTWORKS[lightbox]}
            alt={`Arte ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 10,
              boxShadow: "0 20px 60px rgba(0,0,0,.5)",
              animation: "pop .25s",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#bbb",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
            }}
          >
            {String(lightbox + 1).padStart(2, "0")} / {String(ARTWORKS.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
};

// Scalloped (wavy edge) circular badge — used for "Baixar Currículo"
const scallopedClip = (() => {
  // Generate a 16-bump scalloped circle as polygon points
  const bumps = 16;
  const outer = 50;
  const inner = 46;
  const pts = [];
  for (let i = 0; i < bumps * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (bumps * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${50 + r * Math.cos(a)}% ${50 + r * Math.sin(a)}%`);
  }
  return `polygon(${pts.join(", ")})`;
})();

const Stat = ({ value, label, align = "left", stars = false, isMobile }) => (
  <div style={{ textAlign: isMobile ? "center" : align }}>
    {stars && (
      <div style={{ marginBottom: 6, color: "#111", letterSpacing: 3, fontSize: 12 }}>★★★★★</div>
    )}
    <div
      style={{
        fontSize: isMobile ? "clamp(54px, 16vw, 80px)" : "clamp(72px, 7vw, 112px)",
        fontWeight: 800,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        color: "#111",
      }}
    >
      {value}
    </div>
    <div style={{ marginTop: 10, fontSize: isMobile ? 13 : 15, color: "#333" }}>{label}</div>
  </div>
);

const About = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section id="about" style={{ padding: isMobile ? "30px 16px 40px" : "60px 28px 80px" }}>
      {/* SOBRE MIM pill */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? 22 : 28 }}>
        <span
          style={{
            background: "#fff",
            color: "#111",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 2,
            padding: "8px 18px",
            borderRadius: 999,
            boxShadow: "0 1px 0 rgba(0,0,0,.04)",
          }}
        >
          SOBRE MIM
        </span>
      </div>

      {/* Headline */}
      <h2
        style={{
          margin: "0 auto",
          maxWidth: 920,
          textAlign: "center",
          fontSize: isMobile ? "clamp(24px, 7vw, 32px)" : "clamp(32px, 3.6vw, 50px)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
          color: "#111",
          textTransform: "uppercase",
        }}
      >
        Designer criando identidades visuais com sensibilidade, escuta &amp;
        <span style={{ color: "#FF5A1F" }}> propósito.</span>
      </h2>

      {/* Stats grid with center portrait */}
      <div
        style={{
          position: "relative",
          marginTop: isMobile ? 36 : 70,
          maxWidth: 1180,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Continuous horizontal divider line behind everything */}
        {!isMobile && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 1,
              background: "#111",
              zIndex: 0,
            }}
          />
        )}

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr auto 1fr",
            gridTemplateRows: isMobile ? "auto auto auto" : "auto auto",
            gap: isMobile ? "32px 24px" : "60px 40px",
            alignItems: "center",
            justifyItems: isMobile ? "center" : "stretch",
            zIndex: 1,
          }}
        >
          {/* Top-left stat */}
          <div style={{ gridColumn: isMobile ? "1" : "1", gridRow: "1" }}>
            <Stat value="03+" label="Anos de atuação" align="left" isMobile={isMobile} />
          </div>

          {/* Top-right stat */}
          <div style={{ gridColumn: isMobile ? "2" : "3", gridRow: "1" }}>
            <Stat value="04" label="Áreas de atuação" align="right" stars isMobile={isMobile} />
          </div>

          {/* Center portrait — spans both rows on desktop */}
          <div
            style={{
              gridColumn: isMobile ? "1 / span 2" : "2",
              gridRow: isMobile ? "2" : "1 / span 2",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: isMobile ? "min(260px, 70vw)" : 340,
                aspectRatio: "1",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#FF5A1F",
                boxShadow: "0 20px 50px rgba(0,0,0,.15)",
              }}
            >
              <img
                src="/about.png"
                alt="Hellena"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Scalloped CV badge — overlaps bottom of portrait */}
            <a
              href="/curriculo-hellena.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                marginTop: isMobile ? -28 : -36,
                width: isMobile ? 110 : 130,
                height: isMobile ? 110 : 130,
                background: "#fff",
                color: "#111",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                fontSize: isMobile ? 10 : 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                textAlign: "center",
                lineHeight: 1.15,
                clipPath: scallopedClip,
                WebkitClipPath: scallopedClip,
                filter: "drop-shadow(0 10px 24px rgba(0,0,0,.12))",
                transition: "transform .25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-8deg) scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <span>
                BAIXAR
                <br />
                CURRÍCULO
              </span>
              <span style={{ fontSize: 16 }}>↓</span>
            </a>
          </div>

          {/* Bottom-left stat */}
          <div style={{ gridColumn: isMobile ? "1" : "1", gridRow: isMobile ? "3" : "2" }}>
            <Stat value="50+" label="Projetos entregues" align="left" isMobile={isMobile} />
          </div>

          {/* Bottom-right stat */}
          <div style={{ gridColumn: isMobile ? "2" : "3", gridRow: isMobile ? "3" : "2" }}>
            <Stat value="02" label="Formações em curso" align="right" isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onHire }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
  <section id="contact" style={{ padding: isMobile ? "0 16px 20px" : "0 28px 30px" }}>
    <div
      style={{
        background: "#111",
        color: "#fff",
        borderRadius: 22,
        padding: isMobile ? "40px 24px" : "60px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          gap: isMobile ? 28 : 30,
          alignItems: "end",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: "#FF5A1F", fontWeight: 600 }}>
            VAMOS CONVERSAR
          </span>
          <h3
            style={{
              margin: "12px 0 0",
              fontSize: "clamp(40px, 6vw, 88px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
            }}
          >
            Tem um projeto
            <br /> em mente?
            <span style={{ fontFamily: '"Caveat", cursive', color: "#FF5A1F", fontWeight: 500, marginLeft: 14 }}>vamos lá.</span>
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href="mailto:hdiasmendescruz@gmail.com"
            style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none", fontSize: 14 }}
          >
            <Icon.Mail /> hdiasmendescruz@gmail.com
          </a>
          <a
            href="tel:+5581996407124"
            style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none", fontSize: 14 }}
          >
            <Icon.Phone /> (81) 99640-7124
          </a>
          <a
            href="https://www.instagram.com/psique.hellenamendes/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none", fontSize: 14 }}
          >
            <Icon.Instagram /> @psique.hellenamendes
          </a>
          <a
            href="https://www.linkedin.com/in/hellena-dias-mendes-cruz-1b465b382/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none", fontSize: 14 }}
          >
            <Icon.Linkedin /> Hellena Dias Mendes Cruz
          </a>
          <button
            onClick={onHire}
            style={{
              marginTop: 14,
              alignSelf: "flex-start",
              background: "#FF5A1F",
              color: "#fff",
              border: "none",
              padding: "14px 24px",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5A1F")}
            onMouseDown={(e) => (e.currentTarget.style.color = "#111")}
            onMouseUp={(e) => (e.currentTarget.style.color = "#fff")}
          >
            Iniciar projeto →
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: isMobile ? 36 : 60,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,.12)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 8 : 0,
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          fontSize: isMobile ? 11 : 12,
          color: "#888",
          fontFamily: '"JetBrains Mono", monospace',
          position: "relative",
          zIndex: 2,
        }}
      >
        <span>© 2026 HELLENA MENDES · RECIFE/PE</span>
        <span>FEITO COM CAFÉ E PINCEL ATÔMICO ☕</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -20,
          right: -20,
          fontSize: "clamp(120px, 22vw, 320px)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          color: "rgba(255,255,255,.04)",
          lineHeight: 0.9,
          pointerEvents: "none",
          textAlign: "center",
          fontFamily: '"Inter", Helvetica, Arial, sans-serif',
        }}
      >
        HELLENA
      </div>
    </div>
  </section>
  );
};

const fieldStyle = {
  width: "100%",
  marginTop: 6,
  padding: "12px 14px",
  border: "1px solid #eee",
  borderRadius: 12,
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
};

const Field = ({ label, value, onChange, type = "text", textarea, required }) => (
  <div>
    <label style={{ fontSize: 11, color: "#888", fontFamily: '"JetBrains Mono", monospace', textTransform: "uppercase" }}>
      {label}
    </label>
    {textarea ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} rows={3} style={fieldStyle} />
    ) : (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} style={fieldStyle} />
    )}
  </div>
);

const HireModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", kind: "Branding", msg: "" });
  const [sent, setSent] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const onSubmit = (e) => {
    e.preventDefault();
    const text =
      `Olá, Hellena! Vim pelo seu portfólio.\n\n` +
      `*Nome:* ${form.name}\n` +
      `*E-mail:* ${form.email}\n` +
      `*Tipo de projeto:* ${form.kind}\n\n` +
      `*Mensagem:*\n${form.msg || "(sem mensagem)"}`;
    const url = `https://wa.me/5581996407124?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setForm({ name: "", email: "", kind: "Branding", msg: "" });
    }, 1800);
  };
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        padding: isMobile ? 12 : 20,
        overflowY: "auto",
        animation: "fadeIn .25s",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: isMobile ? 18 : 22,
          width: "100%",
          maxWidth: 520,
          padding: isMobile ? 20 : 32,
          marginTop: isMobile ? 20 : 0,
          marginBottom: isMobile ? 20 : 0,
          position: "relative",
          animation: "pop .3s",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", color: "#111" }}
        >
          <Icon.Close />
        </button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "#FF5A1F",
                margin: "0 auto 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 32,
              }}
            >
              ✓
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>Abrindo o WhatsApp…</h3>
            <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
              Sua mensagem já está pronta — é só apertar enviar.
            </p>
          </div>
        ) : (
          <>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "#FF5A1F", fontWeight: 600 }}>
              CONTRATAR
            </span>
            <h3 style={{ margin: "6px 0 22px", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
              Conta um pouco sobre o projeto.
            </h3>
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Field label="Seu nome" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <div>
                <label
                  style={{ fontSize: 11, color: "#888", fontFamily: '"JetBrains Mono", monospace', textTransform: "uppercase" }}
                >
                  Tipo
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                  {["Branding", "Design Gráfico", "Comunicação Digital", "Psicologia"].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setForm({ ...form, kind: k })}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                        border: form.kind === k ? "1px solid #FF5A1F" : "1px solid #eee",
                        background: form.kind === k ? "#FF5A1F" : "#fff",
                        color: form.kind === k ? "#fff" : "#111",
                        fontFamily: "inherit",
                      }}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Mensagem" textarea value={form.msg} onChange={(v) => setForm({ ...form, msg: v })} />
              <button
                type="submit"
                style={{
                  marginTop: 8,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Enviar pelo WhatsApp →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ============== LOADER ==============
const Loader = ({ visible }) => (
  <div
    aria-hidden={!visible}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#D6D9DE",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity .5s ease",
    }}
  >
    <div style={{ position: "relative", width: 96, height: 96 }}>
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        style={{ position: "absolute", inset: 0, animation: "spin 2.4s linear infinite" }}
      >
        <circle
          cx="48"
          cy="48"
          r="42"
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="3"
          strokeDasharray="60 200"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="hellena"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 32,
          color: "#111",
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        hellena
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: 3,
          color: "#666",
          textTransform: "uppercase",
        }}
      >
        carregando<span style={{ animation: "fadeIn 1s infinite alternate" }}>…</span>
      </div>
    </div>
  </div>
);

export default function Portfolio() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MIN_DURATION = 2200;
    const start = Date.now();
    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => setLoading(false), wait);
    };
    if (document.readyState === "complete") {
      finish();
      return;
    }
    window.addEventListener("load", finish);
    const fallback = setTimeout(finish, 5000);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const onNav = (label) => {
    const map = { Início: "top", Serviços: "services", Trabalhos: "works", Galeria: "gallery", Contato: "contact" };
    const id = map[label];
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={{ minHeight: "100vh", background: "#D6D9DE", fontFamily: '"Inter", Helvetica, Arial, sans-serif', color: "#111" }}>
      <Loader visible={loading} />
      <Header onHire={() => setModal(true)} onNav={onNav} />
      <Hero />
      <Services />
      <About />
      <Works />
      <Gallery />
      <Footer onHire={() => setModal(true)} />
      <HireModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
