import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    year: "2024", status: "Completed", cat: "Branding", live: false,
    title: "Verdant — Brand Identity & Growth System",
    desc: "End-to-end brand identity built around organic credibility and shelf presence, paired with a full-funnel paid acquisition system that scaled the brand to $2M ARR within 12 months.",
    tags: ["Brand Positioning", "Visual Identity", "Paid Social", "Landing Pages"],
    color: "#4ade80", colorBg: "rgba(74,222,128,0.07)", colorBorder: "rgba(74,222,128,0.18)",
    featBg: "#0f1a12",
  },
  {
    year: "2024", status: "Live", cat: "SEO", live: true,
    title: "Pulsify — Organic Growth & Content Engine",
    desc: "Rebuilt technical SEO foundation, launched a topical authority content cluster, and deployed a 6-month editorial calendar. Organic traffic tripled in under six months with zero paid spend.",
    tags: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
    color: "#60a5fa", colorBg: "rgba(96,165,250,0.07)", colorBorder: "rgba(96,165,250,0.18)",
    featBg: "#0e1420",
  },
  {
    year: "2024", status: "Completed", cat: "Paid Media", live: false,
    title: "Solaro — Multi-Channel Product Launch",
    desc: "A paid launch orchestrated across Meta, Google, and TikTok. Reached 500K impressions in the first week and drove a 4.8× ROAS against a competitive CPM environment.",
    tags: ["Meta Ads", "Google Ads", "TikTok", "Creative Strategy"],
    color: "#fb923c", colorBg: "rgba(251,146,60,0.07)", colorBorder: "rgba(251,146,60,0.18)",
    featBg: "#1a1108",
  },
  {
    year: "2023", status: "Completed", cat: "Social", live: false,
    title: "Lumi — Social Brand Architecture",
    desc: "Built an entire social presence from scratch — content pillars, visual templates, community playbook, and influencer pipeline. Grew to 200K followers in 9 months.",
    tags: ["Content Pillars", "Community", "Influencer", "Creative Direction"],
    color: "#f472b6", colorBg: "rgba(244,114,182,0.07)", colorBorder: "rgba(244,114,182,0.18)",
    featBg: "#1a0d14",
  },
  {
    year: "2023", status: "Completed", cat: "Branding", live: false,
    title: "Korova — Rebrand & Market Repositioning",
    desc: "Repositioned an aging D2C food brand from budget to premium. New naming architecture, visual system, tone of voice guide, and a retailer pitch deck that landed 3 national listings.",
    tags: ["Naming", "Visual System", "Tone of Voice", "Retail Strategy"],
    color: "#4ade80", colorBg: "rgba(74,222,128,0.07)", colorBorder: "rgba(74,222,128,0.18)",
    featBg: "#0f1a12",
  },
  {
    year: "2023", status: "Completed", cat: "Paid Media", live: false,
    title: "Fenix Labs — B2B Enterprise Lead Generation",
    desc: "LinkedIn and Google Ads strategy for a SaaS startup targeting enterprise buyers. Cut CPL by 38% in 90 days while maintaining demo-to-close quality approved by the sales team.",
    tags: ["LinkedIn Ads", "Google Ads", "Lead Gen", "CRO"],
    color: "#fb923c", colorBg: "rgba(251,146,60,0.07)", colorBorder: "rgba(251,146,60,0.18)",
    featBg: "#1a1108",
  },
  {
    year: "2022", status: "Completed", cat: "SEO", live: false,
    title: "Meridian Legal — Local SEO Dominance",
    desc: "Hyperlocal SEO strategy covering 14 service areas. Within 8 months, Meridian held top-3 positions for 40+ high-intent queries and increased inbound inquiries by 220%.",
    tags: ["Local SEO", "GMB", "Citation Building", "Content"],
    color: "#60a5fa", colorBg: "rgba(96,165,250,0.07)", colorBorder: "rgba(96,165,250,0.18)",
    featBg: "#0e1420",
  },
  {
    year: "2022", status: "Completed", cat: "Email", live: false,
    title: "Harbour Co. — Full-Funnel Email System",
    desc: "Designed and built a complete email lifecycle system — welcome sequences, abandoned cart recovery, post-purchase nurture, and win-back campaigns. Increased LTV by 34% in 6 months.",
    tags: ["Klaviyo", "Lifecycle Email", "A/B Testing", "Segmentation"],
    color: "#a78bfa", colorBg: "rgba(167,139,250,0.07)", colorBorder: "rgba(167,139,250,0.18)",
    featBg: "#130e1a",
  },
];

const FILTERS = ["All Archive", "Branding", "Paid Media", "SEO", "Social", "Email"];

const FOOTER_LINKS = {
  Company: ["About Us", "Our Team", "Careers", "Contact"],
  Services: ["Brand Strategy", "Paid Media", "SEO & Content", "Social Media"],
  Resources: ["Portfolio", "Blog", "Case Studies"],
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ProjectRow({ project, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        borderBottom: "1px solid #141414",
        cursor: "pointer",
        background: isOpen ? "#0d0d0d" : "transparent",
        transition: "background 0.15s",
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70px 100px 100px 1fr 24px",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem 2rem",
        }}
      >
        <span style={{ fontSize: 12, color: "#333", fontVariantNumeric: "tabular-nums" }}>
          {project.year}
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase", color: project.live ? "#4ade80" : "#444" }}>
          {project.live && (
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", flexShrink: 0, display: "inline-block" }} />
          )}
          {project.status}
        </span>

        <span
          style={{
            fontSize: 10, padding: "3px 9px", borderRadius: 2,
            letterSpacing: "0.5px", display: "inline-block",
            color: project.color,
            background: project.colorBg,
            border: `1px solid ${project.colorBorder}`,
          }}
        >
          {project.cat}
        </span>

        <span style={{ fontSize: 14, color: "#ccc", lineHeight: 1.4 }}>
          {project.title}
        </span>

        <span
          style={{
            fontSize: 16, color: "#333", textAlign: "center", lineHeight: 1,
            display: "block",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          +
        </span>
      </div>

      {/* Expanded detail */}
      <div
        style={{
          maxHeight: isOpen ? 240 : 0,
          overflow: "hidden",
          transition: "max-height 0.38s ease",
        }}
      >
        <div
          style={{
            padding: "0 2rem 1.75rem",
            paddingLeft: "calc(2rem + 70px + 100px + 100px + 3rem)",
          }}
        >
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.8, marginBottom: "1rem", maxWidth: 480 }}>
            {project.desc}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11, color: "#3a3a3a",
                  border: "1px solid #1e1e1e",
                  padding: "3px 10px", borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaExplorer({ projects }) {
  const [activeFeat, setActiveFeat] = useState(0);
  const [mediaFilter, setMediaFilter] = useState("All");
  const feat = projects[activeFeat] || projects[0];

  return (
    <section style={{ borderTop: "1px solid #1a1a1a", marginTop: "3rem" }}>
      {/* Header */}
      <div style={{ padding: "2rem 2rem 1rem", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#444", marginBottom: "0.4rem" }}>
            Media Explorer
          </p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 600, color: "#e2e2e0", letterSpacing: "-0.3px" }}>
            Campaign Gallery
          </h2>
        </div>
      </div>

      {/* Media type filters */}
      <div style={{ display: "flex", gap: 6, padding: "0 2rem 1.5rem" }}>
        {["All", "Photos", "Videos"].map((f) => (
          <button
            key={f}
            onClick={() => setMediaFilter(f)}
            style={{
              background: "transparent",
              border: `1px solid ${mediaFilter === f ? "#333" : "#1e1e1e"}`,
              borderRadius: 2,
              padding: "5px 12px",
              fontSize: 11,
              color: mediaFilter === f ? "#ccc" : "#444",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Thumbnail grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          padding: "0 2rem",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => setActiveFeat(i)}
            style={{
              aspectRatio: "16/10",
              background: p.featBg,
              border: `1px solid ${activeFeat === i ? "#333" : "#1a1a1a"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13, fontWeight: 600,
                color: p.color, letterSpacing: "-0.2px",
              }}
            >
              {p.title.split(" — ")[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Featured project */}
      {feat && (
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              width: "100%", aspectRatio: "16/7",
              background: feat.featBg,
              border: "1px solid #1a1a1a",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 26, fontWeight: 700,
                color: feat.color, letterSpacing: "-0.5px",
              }}
            >
              {feat.title.split(" — ")[0]}
            </span>
          </div>

          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 600, color: "#e2e2e0", marginBottom: "0.6rem" }}>
            {feat.title}
          </h3>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.8, maxWidth: 500, marginBottom: "1.25rem" }}>
            {feat.desc}
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {feat.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11, color: "#444",
                  border: "1px solid #1e1e1e",
                  padding: "4px 12px", borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                background: "#e2e2e0", color: "#0a0a0a",
                border: "none", borderRadius: 3,
                padding: "9px 20px", fontSize: 12,
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                cursor: "pointer", letterSpacing: "0.3px",
              }}
            >
              Start a Similar Brief
            </button>
            <button
              style={{
                background: "transparent", color: "#555",
                border: "1px solid #222", borderRadius: 3,
                padding: "9px 20px", fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer", letterSpacing: "0.3px",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              Keep Browsing
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [filter, setFilter] = useState("All Archive");
  const [openIdx, setOpenIdx] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = filter === "All Archive"
    ? PROJECTS
    : PROJECTS.filter((p) => p.cat === filter);

  const syne = "'Syne', sans-serif";
  const inter = "'Inter', sans-serif";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; color: #e2e2e0; font-family: 'Inter', sans-serif; }
        ::selection { background: #e2e2e0; color: #0a0a0a; }
        a { color: inherit; text-decoration: none; }
        .nav-link { opacity: 0.35; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; }
        .nav-link.active { opacity: 1; }
        .proj-row:hover { background: #0f0f0f; }
        .filter-btn { cursor: pointer; font-family: 'Inter', sans-serif; transition: color 0.2s, border-color 0.2s; }
        .filter-btn:hover { color: #e2e2e0; border-color: #444 !important; }
        .footer-link { opacity: 0.3; transition: opacity 0.2s; }
        .footer-link:hover { opacity: 0.7; }
        .book-btn:hover { opacity: 0.85; }
        .sub-input:focus { outline: none; border-color: #333; }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: scrolled ? "rgba(10,10,10,0.95)" : "#0a0a0a",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: "1px solid #1e1e1e",
          transition: "background 0.3s",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.1rem 2rem",
          fontFamily: inter,
        }}
      >
        <div style={{ fontFamily: syne, fontSize: 17, fontWeight: 600, color: "#e2e2e0", letterSpacing: "-0.3px" }}>
          Apex Studio
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`nav-link${l === "Portfolio" ? " active" : ""}`}
              style={{ fontSize: 13 }}
            >
              {l}
            </a>
          ))}
        </div>
        <button
          className="book-btn"
          style={{
            background: "#e2e2e0", color: "#0a0a0a",
            border: "none", borderRadius: 4,
            padding: "7px 18px", fontSize: 12,
            fontFamily: inter, fontWeight: 500,
            cursor: "pointer", letterSpacing: "0.3px",
            transition: "opacity 0.2s",
          }}
        >
          Book Services
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: "4.5rem 2rem 3rem" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#444", marginBottom: "1.25rem", fontFamily: inter }}>
            Project Archive
          </p>
        </Reveal>
        <Reveal delay={0.07}>
          <h1
            style={{
              fontFamily: syne,
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700, lineHeight: 1.06,
              letterSpacing: "-1.5px", color: "#e2e2e0",
              marginBottom: "1rem",
            }}
          >
            Our Portfolio
          </h1>
        </Reveal>
        <Reveal delay={0.13}>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, maxWidth: 520, fontFamily: inter }}>
            This archive is ordered like project history, not marketing cards. Browse by year and discipline, then open each entry for delivery context.
          </p>
        </Reveal>
      </section>

      {/* FILTERS */}
      <div
        style={{
          display: "flex", gap: 6, padding: "1.5rem 2rem",
          borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a",
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            className="filter-btn"
            onClick={() => { setFilter(f); setOpenIdx(null); }}
            style={{
              background: "transparent",
              border: `1px solid ${filter === f ? "#444" : "#222"}`,
              borderRadius: 3,
              padding: "6px 14px", fontSize: 12,
              color: filter === f ? "#e2e2e0" : "#555",
              letterSpacing: "0.3px",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* COLUMN HEADERS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70px 100px 100px 1fr",
          gap: "1rem",
          padding: "0.6rem 2rem",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        {["Year", "Status", "Discipline", "Project"].map((h) => (
          <span key={h} style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#2a2a2a", fontFamily: inter }}>
            {h}
          </span>
        ))}
      </div>

      {/* PROJECT ROWS */}
      <div>
        {filtered.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.04}>
            <div className="proj-row" style={{ transition: "background 0.15s" }}>
              <ProjectRow
                project={project}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </div>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: "3rem 2rem", fontSize: 14, color: "#333", fontFamily: inter }}>
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* MEDIA EXPLORER */}
      <Reveal>
        <MediaExplorer projects={filtered.length > 0 ? filtered : PROJECTS} />
      </Reveal>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "3rem 2rem 2rem", marginTop: "3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
            gap: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand col */}
          <div>
            <div style={{ fontFamily: syne, fontSize: 16, fontWeight: 600, color: "#e2e2e0", marginBottom: "0.5rem" }}>
              Apex Studio
            </div>
            <p style={{ fontSize: 12, color: "#3a3a3a", lineHeight: 1.7, marginBottom: "0.75rem", fontFamily: inter }}>
              Crafting digital experiences that inspire. From branding to performance and web, we bring your vision to life.
            </p>
            <div style={{ fontSize: 12, color: "#2a2a2a", lineHeight: 1.8, fontFamily: inter }}>
              Kathmandu, Nepal<br />
              hello@apexstudio.co<br />
              +977 98XXXXXXXX
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <div style={{ fontSize: 10, letterSpacing: "1.8px", textTransform: "uppercase", color: "#2a2a2a", marginBottom: "0.85rem", fontFamily: inter }}>
                {group}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map((l) => (
                  <a key={l} href="#" className="footer-link" style={{ fontSize: 13, fontFamily: inter }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Subscribe */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: "1.8px", textTransform: "uppercase", color: "#2a2a2a", marginBottom: "0.85rem", fontFamily: inter }}>
              Stay Updated
            </div>
            <p style={{ fontSize: 12, color: "#3a3a3a", lineHeight: 1.6, marginBottom: "0.85rem", fontFamily: inter }}>
              Get the latest news and updates from Apex Studio.
            </p>
            <div style={{ display: "flex" }}>
              <input
                className="sub-input"
                type="email"
                placeholder="your@email.com"
                style={{
                  background: "#111", border: "1px solid #222",
                  borderRight: "none", borderRadius: "3px 0 0 3px",
                  padding: "8px 12px", fontSize: 12,
                  color: "#ccc", fontFamily: inter, flex: 1,
                  outline: "none",
                }}
              />
              <button
                style={{
                  background: "#1e1e1e", border: "1px solid #222",
                  borderRadius: "0 3px 3px 0", padding: "8px 14px",
                  fontSize: 12, color: "#555", fontFamily: inter,
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderTop: "1px solid #141414", paddingTop: "1.25rem",
          }}
        >
          <span style={{ fontSize: 11, color: "#2a2a2a", fontFamily: inter }}>
            © 2024 Apex Studio. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 18 }}>
            {["LinkedIn", "Facebook", "Instagram"].map((s) => (
              <a key={s} href="#" className="footer-link" style={{ fontSize: 11, letterSpacing: "0.5px", fontFamily: inter }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
