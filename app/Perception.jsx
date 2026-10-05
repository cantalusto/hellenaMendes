"use client";

import { useEffect, useRef } from "react";

// An abstract atom: separate orbital shells keep every solid form apart.
export default function Perception() {
  const host = useRef(null);
  useEffect(() => {
    const element = host.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
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
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
        camera.position.z = 9.5;
        const sculpture = new THREE.Group();
        sculpture.rotation.set(0.25, -0.2, -0.2);
        const orange = new THREE.MeshPhysicalMaterial({
          color: 0xff572b,
          metalness: 0.35,
          roughness: 0.22,
          clearcoat: 1,
        });
        const ivory = new THREE.MeshPhysicalMaterial({
          color: 0xeee6d5,
          metalness: 0.3,
          roughness: 0.28,
          clearcoat: 0.8,
        });
        const orbitMaterial = new THREE.MeshStandardMaterial({
          color: 0xe8e2d4,
          emissive: 0xb9ac90,
          emissiveIntensity: 0.35,
          metalness: 0.25,
          roughness: 0.4,
        });
        const coreGeometry = new THREE.SphereGeometry(0.53, 48, 32);
        const core = new THREE.Mesh(coreGeometry, orange);
        sculpture.add(core);
        const electronGeometry = new THREE.SphereGeometry(0.12, 24, 16);
        const orbits = [];
        const orbitGeometries = [];
        const shells = [
          { radius: 1.48, tilt: [0.7, 0.25, 0.05], phase: 0.4, speed: 0.35 },
          { radius: 1.96, tilt: [-0.75, 0.5, 1.05], phase: 2.3, speed: -0.26 },
          { radius: 2.44, tilt: [0.3, -0.85, -0.85], phase: 4.2, speed: 0.2 },
        ];
        for (const [i, shell] of shells.entries()) {
          const group = new THREE.Group();
          group.rotation.set(...shell.tilt);
          const geometry = new THREE.TorusGeometry(shell.radius, 0.012, 8, 192);
          orbitGeometries.push(geometry);
          group.add(new THREE.Mesh(geometry, orbitMaterial));
          const electron = new THREE.Mesh(
            electronGeometry,
            i === 1 ? ivory : orange,
          );
          // Offset from the rail leaves a visible gap around the electron.
          const pathRadius = shell.radius + 0.17;
          electron.position.set(
            Math.cos(shell.phase) * pathRadius,
            Math.sin(shell.phase) * pathRadius,
            0,
          );
          group.add(electron);
          sculpture.add(group);
          orbits.push({ ...shell, electron, pathRadius });
        }
        scene.add(
          sculpture,
          new THREE.HemisphereLight(0xfff8ef, 0x301207, 2.8),
        );
        const key = new THREE.DirectionalLight(0xffe9cf, 5);
        key.position.set(3, 4, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xffffff, 4);
        rim.position.set(-4, -1, 3);
        scene.add(rim);
        const fill = new THREE.DirectionalLight(0xff4d1f, 2);
        fill.position.set(1, -3, 2);
        scene.add(fill);
        element.appendChild(renderer.domElement);
        let frame = 0,
          lastTime = 0;
        const pointer = { x: 0, y: 0 };
        const render = () => renderer.render(scene, camera);
        const animate = (time) => {
          if (disposed || document.hidden || preference.matches) return;
          frame = requestAnimationFrame(animate);
          if (time - lastTime < 1000 / 30) return;
          lastTime = time;
          const seconds = time * 0.001;
          sculpture.rotation.y +=
            (pointer.x * 0.42 - 0.2 - sculpture.rotation.y) * 0.035;
          sculpture.rotation.x +=
            (pointer.y * 0.3 + 0.25 - sculpture.rotation.x) * 0.035;
          sculpture.rotation.z = -0.2 + Math.sin(seconds * 0.3) * 0.12;
          sculpture.position.y = Math.sin(seconds * 0.7) * 0.08;
          orbits.forEach(({ electron, pathRadius, phase, speed }) => {
            const angle = phase + seconds * speed;
            electron.position.set(
              Math.cos(angle) * pathRadius,
              Math.sin(angle) * pathRadius,
              0,
            );
          });
          core.rotation.y += 0.005;
          render();
        };
        const resume = () => {
          cancelAnimationFrame(frame);
          render();
          if (!document.hidden && !preference.matches)
            frame = requestAnimationFrame(animate);
        };
        const resize = new ResizeObserver(() => {
          const { width, height } = element.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height;
          // Preserve the complete sculpture in narrow portrait viewports.
          camera.position.z = camera.aspect < 1 ? 9.5 / camera.aspect : 9.5;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          render();
        });
        resize.observe(element);
        const move = (event) => {
          const bounds = element.getBoundingClientRect();
          pointer.x = Math.max(
            -1,
            Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
          );
          pointer.y = Math.max(
            -1,
            Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
          );
        };
        const reset = () => {
          pointer.x = 0;
          pointer.y = 0;
        };
        const lost = (event) => {
          event.preventDefault();
          cancelAnimationFrame(frame);
          element.classList.remove("is-rendered");
        };
        const restored = () => {
          element.classList.add("is-rendered");
          resume();
        };
        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", reset);
        renderer.domElement.addEventListener("webglcontextlost", lost);
        renderer.domElement.addEventListener("webglcontextrestored", restored);
        document.addEventListener("visibilitychange", resume);
        preference.addEventListener("change", resume);
        render();
        element.classList.add("is-rendered");
        resume();
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
          document.removeEventListener("visibilitychange", resume);
          preference.removeEventListener("change", resume);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          renderer.domElement.removeEventListener(
            "webglcontextrestored",
            restored,
          );
          [
            ...orbitGeometries,
            coreGeometry,
            electronGeometry,
            orange,
            ivory,
            orbitMaterial,
          ].forEach((resource) => resource.dispose());
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
  }, []);
  return (
    <div className="perception" ref={host}>
      <div className="perception-fallback">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
