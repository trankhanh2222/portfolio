import { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useReducedMotion } from "../hooks/useEnvironment.js";

// Lop "bu i giay" rat mo, nam sau noi dung. Tat khi giam chuyen dong.
export function ParticlesField({ resolvedTheme }) {
  const reduced = useReducedMotion();
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
      options={options}
    />
  );
}