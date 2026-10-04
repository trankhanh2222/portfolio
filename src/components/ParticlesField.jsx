import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useReducedMotion } from "../hooks/useEnvironment.js";
import { useWipe } from "../context/WipeContext.jsx";

// Lop "bui giay" rat mo, nam sau noi dung. Tat khi giam chuyen dong.
export function ParticlesField({ resolvedTheme }) {
  const reduced = useReducedMotion();
  const { wiping } = useWipe();
  const container = useRef(null);
  const [color, setColor] = useState("#5b584f");

  // Lay mau tu token de khong hard-code mau o component.
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--c-secondary")
      .trim();
    if (value) setColor(value);
  }, [resolvedTheme]);

  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const loaded = useCallback((c) => {
    container.current = c;
  }, []);

  // Tam dung engine khi cutscene doi ngon ngu phu man hinh: khong ve vo ich
  // duoi overlay, nha CPU/GPU cho animation.
  useEffect(() => {
    const c = container.current;
    if (!c) return;
    if (wiping) c.pause();
    else c.play();
  }, [wiping]);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: true,
        },
        modes: {
          grab: { distance: 130, links: { opacity: 0.18 } },
        },
      },
      particles: {
        number: { value: 26, density: { enable: true, area: 1100 } },
        color: { value: color },
        shape: { type: "circle" },
        opacity: { value: 0.28, random: true },
        size: { value: { min: 0.6, max: 2.2 } },
        links: { enable: false },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
    }),
    [color]
  );

  if (reduced) return null;

  return (
    <Particles
      id="dust"
      className="particles"
      aria-hidden="true"
      init={init}
      loaded={loaded}
      options={options}
    />
  );
}