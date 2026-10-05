"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hero from "./Hero";
import Entrance from "./Entrance";
import { Arrow, Star, Close, Plus } from "./Icons";
import { SERVICES, WORKS } from "./content";
import { artworkImages } from "./artwork-images";
import aboutPortrait from "../public/hellena-about-studio-v1.webp";

const EMAIL = "hdiasmendescruz@gmail.com";
const WHATSAPP = "https://wa.me/5581996407124";
const SOCIAL = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/psique.hellenamendes/",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hellena-dias-mendes-cruz-1b465b382/",
  },
];
const PROJECTS = [
  {
    title: "Forma Prima",
    category: "Branding",
    subtitle: "Uma identidade que toma forma.",
    cover: 5,
    images: [5, 10, 6, 8, 12],
    className: "forma",
  },
  {
    title: "DigitalNest",
    category: "Digital",
    subtitle: "Presença digital com personalidade.",
    cover: 15,
    images: [15, 7, 11],
    className: "digital",
  },
  {
    title: "Cuidado em cada detalhe",
    category: "Digital",
    subtitle: "Comunicação visual para o universo pet.",
    cover: 2,
    images: [2, 3, 4],
    className: "pet",
  },
  {
    title: "Entre páginas & folhas",
    category: "Editorial",
    subtitle: "Informação que convida à descoberta.",
    cover: 14,
    images: [14, 13],
    className: "editorial",
  },
];
const ARTWORKS = [
  {
    id: 1,
    title: "Resort Beach Class Summer — peça promocional",
    category: "Digital",
  },
  { id: 2, title: "Cuidados com pets — campanha", category: "Digital" },
  { id: 3, title: "Vacina em dia — campanha pet", category: "Digital" },
  { id: 4, title: "Banho e tosa — comunicação pet", category: "Digital" },
  { id: 5, title: "Forma Prima — assinatura da marca", category: "Branding" },
  {
    id: 6,
    title: "Forma Prima — materiais da identidade",
    category: "Branding",
  },
  {
    id: 7,
    title: "DigitalNest — marketing que gera resultados",
    category: "Digital",
  },
  { id: 8, title: "Forma Prima — folder institucional", category: "Editorial" },
  {
    id: 9,
    title: "Cardápio — diagramação gastronômica",
    category: "Editorial",
  },
  { id: 10, title: "Forma Prima — cartões de visita", category: "Branding" },
  {
    id: 11,
    title: "DigitalNest — posicionamento de marca",
    category: "Digital",
  },
  {
    id: 12,
    title: "Forma Prima — apresentação de serviços",
    category: "Editorial",
  },
  { id: 13, title: "Botânica — material editorial", category: "Editorial" },
  { id: 14, title: "Botânica — aplicação do folder", category: "Editorial" },
  {
    id: 15,
    title: "DigitalNest — campanha institucional",
    category: "Digital",
  },
];
const artSrc = (id) => artworkImages[id];

function useMotion(root, active) {
  useEffect(() => {
    if (!active) return;
    let disposed = false;
    let media;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        media = gsap.matchMedia();
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            gsap.from(".hero-enter", {
              y: 35,
              opacity: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "all",
            });
            gsap.utils.toArray("[data-reveal]").forEach((element) => {
              gsap.from(element, {
                y: 36,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                  trigger: element,
                  start: "top 93%",
                  once: true,
                },
              });
            });
          },
          root,
        );
        media.add(
          "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap.to(".hero-visual-inner", {
              y: 80,
              rotation: 3,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(".hero-orbit", {
              y: -110,
              rotation: -12,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(".hero-monument", {
              y: -90,
              xPercent: -2,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(".signature-first", {
              x: -45,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(".signature-last", {
              x: 45,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(".about-photo img", {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-photo",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          },
          root,
        );
      })
      .catch(() => {
        /* Keep content readable if motion cannot load. */
      });
    return () => {
      disposed = true;
      media?.revert();
    };
  }, [root, active]);
}

function Header({ onContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef(null);
  const nav = useRef(null);
  const links = [
    { id: "top", label: "Início" },
    { id: "services", label: "Serviços" },
    { id: "works", label: "Trabalhos" },
    { id: "gallery", label: "Galeria" },
    { id: "contact", label: "Contato" },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id], footer[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    nav.current?.querySelector("a")?.focus();
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event) => {
      if (
        !nav.current?.contains(event.target) &&
        !menuButton.current?.contains(event.target)
      )
        setMenuOpen(false);
    };
    const breakpoint = window.matchMedia("(min-width: 761px)");
    const resize = () => {
      if (breakpoint.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    breakpoint.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      breakpoint.removeEventListener("change", resize);
    };
  }, [menuOpen]);
  return (
    <header className={`header ${!active || active === "top" ? "at-top" : ""}`}>
      <a href="#top" className="wordmark" aria-label="Hellena Mendes — início">
        hellena
        <Star className="wordmark-star" />
      </a>
      <nav
        id="main-navigation"
        ref={nav}
        className={`navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegação principal"
      >
        {links.map(({ id, label }, index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-number">0{index + 1}</span>
            {label}
            <span className="nav-dot" />
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="header-socials">
          {SOCIAL.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              {social.name === "Instagram" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM8 18H5V9h3ZM6.5 7.8A1.6 1.6 0 1 1 6.5 4.6a1.6 1.6 0 0 1 0 3.2ZM19 18h-3v-4.5c0-1.2-.5-1.8-1.4-1.8-1 0-1.6.7-1.6 1.8V18h-3V9h3v1.2c.5-.9 1.3-1.4 2.5-1.4 2.3 0 3.5 1.4 3.5 4.2Z" />
                </svg>
              )}
            </a>
          ))}
        </div>
        <button
          className="button button-dark header-cta"
          onClick={() => {
            setMenuOpen(false);
            onContact();
          }}
        >
          Contrate-me!
        </button>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          ref={menuButton}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Marquee() {
  const line = (
    <>
      <span>ESTÉTICA COM INTENÇÃO</span>
      <Star />
      <span>DESIGN COM ESCUTA</span>
      <Star />
      <span>MARCAS COM PERSONALIDADE</span>
      <Star />
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div>{line}</div>
        <div>{line}</div>
      </div>
    </div>
  );
}
function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "light" : ""}`}>
      <span>({number})</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

function Projects({ onView }) {
  return (
    <section
      className="projects section-wrap"
      id="works"
      aria-labelledby="projects-title"
    >
      <SectionLabel number="01">PROJETOS SELECIONADOS</SectionLabel>
      <div className="section-heading" data-reveal>
        <h2 id="projects-title">
          Ideias que
          <br />
          ganharam <span className="serif">vida.</span>
        </h2>
        <div className="heading-aside">
          <p>
            Do primeiro conceito ao último detalhe.
            <br />
            Um recorte do meu universo criativo.
          </p>
          <a href="#gallery" className="text-link">
            Ver todas as peças <Arrow />
          </a>
        </div>
      </div>
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <article
            className={`project-card ${project.className}`}
            key={project.title}
            data-reveal
          >
            <button
              className="project-image"
              onClick={() => onView(project.images, project.title)}
              aria-label={`Ver projeto ${project.title}`}
            >
              <Image
                src={artSrc(project.cover)}
                alt={ARTWORKS[project.cover - 1].title}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span className="project-pill">{project.category}</span>
              <span className="project-open">
                <Arrow />
              </span>
              <span className="project-hover">EXPLORAR PROJETO</span>
            </button>
            <div className="project-info">
              <div>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
              <span className="tiny-index">0{index + 1}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="about section-wrap"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionLabel number="02" light>
        POR TRÁS DO DESIGN
      </SectionLabel>
      <div className="about-grid">
        <div className="about-photo" data-reveal>
          <Image
            src={aboutPortrait}
            sizes="(max-width: 760px) 90vw, 40vw"
            alt="Retrato de Hellena Mendes"
          />
          <span className="photo-annotation">
            prazer, Hellena! <Arrow />
          </span>
          <Star className="about-star" />
        </div>
        <div className="about-copy" data-reveal>
          <h2 id="about-title">
            Antes de criar,
            <br />
            eu <span className="serif accent">escuto.</span>
          </h2>
          <p>
            Sou Hellena Mendes, designer gráfica e estudante de psicologia.
            Acredito que uma boa identidade começa entendendo quem está do outro
            lado.
          </p>
          <p>
            Entre Recife e qualquer lugar, uno repertório visual, pesquisa e
            sensibilidade para transformar histórias em marcas com
            personalidade.
          </p>
          <div className="about-facts">
            <div>
              <strong>03+</strong>
              <span>anos de atuação</span>
            </div>
            <div>
              <strong>
                Design
                <br />& gente.
              </strong>
              <span>o que me move</span>
            </div>
          </div>
          <a
            href="/curriculo-hellena.pdf"
            className="button button-outline"
            download="Curriculo-Hellena-Mendes.pdf"
          >
            Baixar currículo <Arrow direction="down" />
          </a>
        </div>
      </div>
      <div className="trajectory">
        <span className="tiny-index">CAMINHOS & EXPERIÊNCIAS</span>
        <div>
          {WORKS.map((work) => (
            <details className="experience" key={work.title}>
              <summary>
                <span>{work.title}</span>
                <span className="experience-year">{work.year}</span>
                <span className="detail-plus">
                  <Plus />
                </span>
              </summary>
              <div className="experience-detail">
                <p>{work.description}</p>
                <div className="chips">
                  {work.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ onContact }) {
  return (
    <section
      className="services section-wrap"
      id="services"
      aria-labelledby="services-title"
    >
      <SectionLabel number="03">COMO POSSO AJUDAR</SectionLabel>
      <div className="services-grid">
        <div className="services-intro" data-reveal>
          <h2 id="services-title">
            Sua ideia.
            <br />
            Um novo
            <br />
            <span className="serif accent">universo.</span>
          </h2>
          <p>
            Identidade, comunicação e pesquisa.
            <br />
            Do conceito à conexão com o público.
          </p>
          <button className="text-link" onClick={onContact}>
            Vamos criar juntos <Arrow />
          </button>
          <Star className="services-star" />
        </div>
        <div className="service-list" data-reveal>
          {SERVICES.map((service, index) => (
            <details
              className="service-item"
              key={service.id}
              open={index === 0 ? true : undefined}
            >
              <summary>
                <span className="tiny-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <span className="detail-plus">
                  <Plus />
                </span>
              </summary>
              <div className="service-detail">
                <p>{service.text}</p>
                <div className="chips">
                  {service.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onView }) {
  const [filter, setFilter] = useState("Todas");
  const visible = ARTWORKS.filter(
    (art) => filter === "Todas" || art.category === filter,
  );
  return (
    <section
      className="gallery section-wrap"
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <SectionLabel number="04">EXPLORAÇÕES VISUAIS</SectionLabel>
      <div className="gallery-heading">
        <h2 id="gallery-title">
          Mais do meu <span className="serif">olhar.</span>
        </h2>
        <span className="tiny-index">15 PEÇAS / MUITAS POSSIBILIDADES</span>
      </div>
      <div className="gallery-toolbar">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filtrar galeria"
        >
          {["Todas", "Branding", "Digital", "Editorial"].map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="gallery-count" role="status">
          {visible.length} peças
        </span>
      </div>
      <div className="gallery-grid">
        {visible.map((art, index) => (
          <button
            className="gallery-piece"
            key={art.id}
            onClick={() =>
              onView(
                visible.map((item) => item.id),
                art.title,
                index,
              )
            }
            aria-label={`Ampliar ${art.title}`}
          >
            <Image
              src={artSrc(art.id)}
              alt={art.title}
              sizes="(max-width: 500px) 50vw, (max-width: 900px) 33vw, 25vw"
            />
            <span>
              {art.category}
              <Arrow />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Footer({ onContact, onReplay }) {
  return (
    <footer className="footer section-wrap" id="contact">
      <SectionLabel number="05">O PRÓXIMO PROJETO PODE SER O SEU</SectionLabel>
      <div className="footer-heading" data-reveal>
        <h2>
          Vamos criar
          <br />
          algo <span className="serif">marcante?</span>
        </h2>
        <button
          className="contact-circle"
          onClick={onContact}
          aria-label="Conversar sobre meu projeto"
        >
          <Arrow />
        </button>
      </div>
      <div className="contact-links">
        <a href={`mailto:${EMAIL}`}>
          {EMAIL} <Arrow />
        </a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          Ou me chama no WhatsApp <Arrow />
        </a>
      </div>
      <div className="footer-meta">
        <a className="wordmark" href="#top">
          hellena
          <Star className="wordmark-star" />
        </a>
        <span>DE RECIFE, PARA QUALQUER LUGAR.</span>
        <div>
          {SOCIAL.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.name} <Arrow />
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hellena Mendes</span>
        <span>FEITO COM INTENÇÃO & SENSIBILIDADE</span>
        <button onClick={onReplay}>
          Rever abertura <Arrow />
        </button>
      </div>
    </footer>
  );
}

// Native dialogs isolate the background, trap keyboard focus and support Escape.
function Modal({ open, onClose, titleId, className = "", children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const previous = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = originalOverflow;
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        closeRef.current();
      }}
      onClick={(event) => {
        if (event.target === ref.current) {
          const box = ref.current.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            closeRef.current();
        }
      }}
    >
      {open && children}
    </dialog>
  );
}

function Lightbox({ view, onClose }) {
  const [index, setIndex] = useState(view.index || 0);
  const image = ARTWORKS[view.images[index] - 1];
  const change = (delta) =>
    setIndex(
      (current) => (current + delta + view.images.length) % view.images.length,
    );
  return (
    <Modal open onClose={onClose} titleId="lightbox-title" className="lightbox">
      <div
        className="lightbox-content"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") change(1);
          if (event.key === "ArrowLeft") change(-1);
        }}
      >
        <div className="lightbox-top">
          <div>
            <span className="tiny-index">{image.category}</span>
            <h2 id="lightbox-title">{image.title}</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar galeria"
            autoFocus
          >
            <Close />
          </button>
        </div>
        <div className="lightbox-image">
          <Image
            src={artSrc(image.id)}
            alt={image.title}
            width={1200}
            height={1400}
            sizes="90vw"
          />
        </div>
        <div className="lightbox-bottom">
          <button
            className="icon-button"
            onClick={() => change(-1)}
            aria-label="Peça anterior"
          >
            <Arrow direction="left" />
          </button>
          <span aria-live="polite">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(view.images.length).padStart(2, "0")}
          </span>
          <button
            className="icon-button"
            onClick={() => change(1)}
            aria-label="Próxima peça"
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    kind: "Branding",
    message: "",
  });
  const [prepared, setPrepared] = useState(false);
  const update = (field, value) => {
    setPrepared(false);
    setForm((current) => ({ ...current, [field]: value }));
  };
  const text = `Olá, Hellena! Vim pelo seu portfólio.\n\nNome: ${form.name.trim()}\nE-mail: ${form.email.trim()}\nProjeto: ${form.kind}\n\n${form.message.trim()}`;
  return (
    <Modal
      open={open}
      onClose={onClose}
      titleId="contact-title"
      className="contact-modal"
    >
      <div className="contact-modal-content">
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Fechar contato"
        >
          <Close />
        </button>
        <span className="tiny-index accent">
          VAMOS TIRAR SUA IDEIA DO PAPEL
        </span>
        <h2 id="contact-title">
          Tudo começa
          <br />
          com uma <span className="serif">conversa.</span>
        </h2>
        <p>Me conta um pouco do que você tem em mente.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const messageField =
              event.currentTarget.elements.namedItem("message");
            messageField.setCustomValidity(
              form.message.trim() ? "" : "Conte um pouco da sua ideia.",
            );
            if (event.currentTarget.reportValidity()) setPrepared(true);
          }}
        >
          <div className="form-row">
            <label>
              Seu nome
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Como posso te chamar?"
                pattern=".*\S.*\S.*"
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder="voce@exemplo.com"
              />
            </label>
          </div>
          <label>
            O que vamos criar?
            <select
              name="kind"
              value={form.kind}
              onChange={(event) => update("kind", event.target.value)}
            >
              <option>Branding</option>
              <option>Design gráfico</option>
              <option>Comunicação digital</option>
              <option>Pesquisa & escuta</option>
              <option>Outro projeto</option>
            </select>
          </label>
          <label>
            Sobre sua ideia
            <textarea
              name="message"
              required
              maxLength={2000}
              rows={3}
              value={form.message}
              onChange={(event) => {
                event.target.setCustomValidity("");
                update("message", event.target.value);
              }}
              placeholder="Seu projeto, objetivos ou o que precisa transformar…"
            />
          </label>
          {prepared ? (
            <div className="message-ready" role="status">
              <p>
                Sua mensagem está pronta. Abra o WhatsApp e toque em enviar para
                iniciar a conversa.
              </p>
              <a
                className="button button-dark"
                href={`${WHATSAPP}?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continuar no WhatsApp <Arrow />
              </a>
            </div>
          ) : (
            <button className="button button-dark submit-button" type="submit">
              Preparar mensagem <Arrow />
            </button>
          )}
          <p className="form-note">
            A conversa continua no WhatsApp. Prefere e-mail?{" "}
            <a href={`mailto:${EMAIL}`}>Escreva por aqui.</a>
          </p>
        </form>
      </div>
    </Modal>
  );
}

export default function Portfolio() {
  const root = useRef(null);
  const [contact, setContact] = useState(false);
  const [view, setView] = useState(null);
  const [entered, setEntered] = useState(false);
  const [entranceVersion, setEntranceVersion] = useState(0);
  const onEnter = useCallback(() => setEntered(true), []);
  const replayEntrance = useCallback(() => {
    setContact(false);
    setView(null);
    setEntered(false);
    setEntranceVersion((version) => version + 1);
  }, []);
  useEffect(() => {
    const onRefreshShortcut = (event) => {
      if (entered && event.ctrlKey && event.key === "F5" && !event.repeat) {
        replayEntrance();
      }
    };
    window.addEventListener("keydown", onRefreshShortcut);
    return () => window.removeEventListener("keydown", onRefreshShortcut);
  }, [entered, replayEntrance]);
  useMotion(root, entered);
  const onView = (images, title, index = 0) =>
    setView({ images, title, index });
  return (
    <div ref={root} className="portfolio">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Header onContact={() => setContact(true)} />
      <main id="main-content">
        <Hero onContact={() => setContact(true)} motionActive={entered} />
        <Marquee />
        <Projects onView={onView} />
        <About />
        <Services onContact={() => setContact(true)} />
        <Gallery onView={onView} />
      </main>
      <Footer onContact={() => setContact(true)} onReplay={replayEntrance} />
      <ContactModal open={contact} onClose={() => setContact(false)} />
      <Entrance
        key={entranceVersion}
        onEnter={onEnter}
        replay={entranceVersion > 0}
      />
      {view && <Lightbox view={view} onClose={() => setView(null)} />}
    </div>
  );
}
