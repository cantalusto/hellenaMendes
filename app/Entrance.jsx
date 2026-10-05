"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Arrow, Star, Close } from "./Icons";

const Perception = dynamic(() => import("./Perception"), { ssr: false });
const SESSION_KEY = "hellena-experience-entered-v1";

export default function Entrance({ onEnter, replay = false }) {
  const dialog = useRef(null);
  const button = useRef(null);
  const timer = useRef(null);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Browser refreshes (including Ctrl+F5) replay the entrance.
    const navigation = performance.getEntriesByType("navigation")[0];
    const refreshed = navigation?.type === "reload";
    let entered = false;
    try {
      entered = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {}
    if (entered && !replay && !refreshed) {
      onEnter();
      return;
    }
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    setOpen(true);
    return () => {
      clearTimeout(timer.current);
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [onEnter, replay]);

  const enter = () => {
    if (leaving) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {}
    setLeaving(true);
    const finish = () => {
      dialog.current.close();
      document.body.style.overflow = "";
      setOpen(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      history.replaceState(null, "", "#top");
      onEnter();
      document.querySelector(".header-cta")?.focus({ preventScroll: true });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else timer.current = setTimeout(finish, 450);
  };

  return (
    <dialog
      ref={dialog}
      className={`entrance ${leaving ? "is-leaving" : ""}`}
      aria-labelledby="entrance-title"
      aria-describedby="entrance-description"
      onCancel={(event) => {
        event.preventDefault();
        enter();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          button.current?.focus();
        }
      }}
    >
      <div className="entrance-layout">
        <header className="entrance-header">
          <span className="entrance-wordmark">
            hellena
            <Star />
          </span>
          <span className="entrance-discipline">
            DESIGN <Close /> PSICOLOGIA
          </span>
        </header>
        <div className="entrance-stage">
          <p className="entrance-eyebrow">
            UM ENCONTRO ENTRE FORMA E PERCEPÇÃO
          </p>
          <h2 id="entrance-title">Olhe além.</h2>
          <div className="entrance-sculpture" aria-hidden="true">
            <div className="entrance-guides" />
            <div className="entrance-art">{open && <Perception />}</div>
            <span className="entrance-note note-form">01 / forma</span>
            <span className="entrance-note note-feeling">02 / sentir</span>
          </div>
          <p className="entrance-script" aria-hidden="true">
            sinta o design.
          </p>
        </div>
        <footer className="entrance-footer">
          <p id="entrance-description">
            Um olhar curioso transforma
            <br />
            ideias em conexões.
          </p>
          <button
            ref={button}
            className="entrance-button"
            onClick={enter}
            disabled={leaving}
            autoFocus
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M8 10V7a4 4 0 0 1 7.6-1.75" />
              <rect x="5" y="10" width="14" height="11" rx="3" />
              <path d="M12 14v3" />
            </svg>
            Desbloquear a experiência <Arrow />
          </button>
          <span className="entrance-invitation">
            POR HELLENA MENDES
            <br />
            <span>Entre com curiosidade.</span>
          </span>
        </footer>
      </div>
    </dialog>
  );
}
