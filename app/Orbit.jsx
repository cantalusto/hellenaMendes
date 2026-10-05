"use client";

import { useEffect, useRef } from "react";

// The CSS sculpture stays visible until WebGL renders, and when it is unavailable.
export default function Orbit({ active = true }) {
  const host = useRef(null);

  useEffect(() => {
    if (!active) return;
    const element = host.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let cleanup = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;
        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
        camera.position.z = 6.5;
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 144, 20, 2, 3);
        const material = new THREE.MeshPhysicalMaterial({
          color: 0xff572b,
          metalness: 0.42,
          roughness: 0.23,
          clearcoat: 1,
        });
        const sculpture = new THREE.Mesh(geometry, material);
        sculpture.rotation.set(0.4, 0.3, -0.35);
        scene.add(
          sculpture,
          new THREE.HemisphereLight(0xffffff, 0x5e1608, 2.7),
        );
        const key = new THREE.DirectionalLight(0xfff0dc, 5);
        key.position.set(3, 4, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xffffff, 3);
        rim.position.set(-4, -2, 3);
        scene.add(rim);
        element.appendChild(renderer.domElement);
        let frame = 0;
        let visible = false;
        let lastTime = 0;
        const pointer = { x: 0, y: 0 };
        const render = () => renderer.render(scene, camera);
        const animate = (time) => {
          if (!visible || document.hidden || preference.matches || disposed)
            return;
          frame = requestAnimationFrame(animate);
          if (time - lastTime < 1000 / 30) return;
          lastTime = time;
          sculpture.rotation.y += 0.007;
          sculpture.rotation.x +=
            (0.4 + pointer.y * 0.35 - sculpture.rotation.x) * 0.04;
          sculpture.rotation.z +=
            (-0.35 + pointer.x * 0.3 - sculpture.rotation.z) * 0.04;
          render();
        };
        const resume = () => {
          cancelAnimationFrame(frame);
          render();
          if (visible && !document.hidden && !preference.matches)
            frame = requestAnimationFrame(animate);
        };
        const resize = new ResizeObserver(() => {
          const { width, height } = element.getBoundingClientRect();
          renderer.setSize(width, height);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
          render();
        });
        resize.observe(element);
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          resume();
        });
        observer.observe(element);
        const move = (event) => {
          if (event.pointerType !== "mouse") return;
          pointer.x = event.clientX / window.innerWidth - 0.5;
          pointer.y = event.clientY / window.innerHeight - 0.5;
        };
        const lost = (event) => {
          event.preventDefault();
          element.classList.remove("is-rendered");
          cancelAnimationFrame(frame);
        };
        const restored = () => {
          element.classList.add("is-rendered");
          resume();
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        renderer.domElement.addEventListener("webglcontextrestored", restored);
        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("visibilitychange", resume);
        preference.addEventListener("change", resume);
        render();
        element.classList.add("is-rendered");
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          observer.disconnect();
          window.removeEventListener("pointermove", move);
          document.removeEventListener("visibilitychange", resume);
          preference.removeEventListener("change", resume);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          renderer.domElement.removeEventListener(
            "webglcontextrestored",
            restored,
          );
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          element.classList.remove("is-rendered");
        };
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup();
    };
  }, [active]);

  return (
    <div className="orbit" ref={host} aria-hidden="true">
      <div className="orbit-fallback" />
    </div>
  );
}
