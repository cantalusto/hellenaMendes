"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import portrait from "../public/hellena-portrait-v3.webp";

const Orbit = dynamic(() => import("./Orbit"), { ssr: false });

export default function Hero({ onContact, motionActive = true }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-art-stage">
          <div className="hero-monument" aria-hidden="true">
            DESIGNER
          </div>
          <div className="hero-visual hero-enter">
            <div className="hero-visual-inner">
              <div className="portrait-halo" />
              <Image
                className="hero-portrait"
                src={portrait}
                sizes="(max-width: 760px) 85vw, 50vw"
                priority
                alt="Hellena Mendes, designer gráfica e estudante de psicologia"
              />
            </div>
          </div>
          <span
            className="hero-signature signature-first hero-enter"
            aria-hidden="true"
          >
            Hellena
          </span>
          <span
            className="hero-signature signature-last hero-enter"
            aria-hidden="true"
          >
            Mendes
          </span>
          <span className="hero-mobile-signature" aria-hidden="true">
            Hellena Mendes
          </span>
          <span className="floating-label label-brand" aria-hidden="true">
            Branding
          </span>
          <span className="floating-label label-human" aria-hidden="true">
            Psicologia
          </span>
          <div className="hero-orbit">
            <Orbit active={motionActive} />
          </div>
        </div>
        <div className="hero-bottom-content">
          <div className="hero-intro hero-enter">
            <p className="hero-greeting">
              <span aria-hidden="true">👋</span> Olá, sou Hellena Mendes
            </p>
            <h1 id="hero-title">
              BRANDING,
              <br />
              DESIGN VISUAL
              <br />
              <span className="hero-title-last">
                &amp; PSICOLOGIA.
                <span className="hero-title-dot" aria-hidden="true" />
              </span>
            </h1>
          </div>
          <div className="hero-contact-card hero-enter">
            <div>
              <p>
                Designer gráfica e estudante de psicologia, criando identidades
                visuais com sensibilidade e escuta — entre Recife e qualquer
                lugar.
              </p>
              <a className="hero-email" href="mailto:hdiasmendescruz@gmail.com">
                hdiasmendescruz@gmail.com
              </a>
              <a className="hero-work-link" href="#works">
                Ver projetos <span aria-hidden="true">↓</span>
              </a>
              <button className="hero-mobile-cta" onClick={onContact}>
                Vamos conversar <span aria-hidden="true">↗</span>
              </button>
            </div>
            <button
              className="hero-contact-seal"
              onClick={onContact}
              aria-label="Conversar sobre um projeto"
            >
              <svg
                className="seal-text"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="hero-seal-path"
                    d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0"
                  />
                </defs>
                <text>
                  <textPath href="#hero-seal-path">
                    VAMOS CRIAR · VAMOS CRIAR ·{" "}
                  </textPath>
                </text>
              </svg>
              <span className="seal-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
