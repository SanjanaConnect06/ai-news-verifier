import { useEffect, useRef } from 'react';

const ACCENT_COLORS = ['#2EA7FF', '#8C6BFF', '#6B7CFF', '#16C784'];

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function FloatingParticles({ density = 'normal', variant = 'hero' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reduceMotion = prefersReducedMotion();
    if (reduceMotion) return undefined;

    const isMobile = window.innerWidth < 640;
    const baseCount = density === 'low' ? 18 : 32;
    const count = isMobile ? Math.round(baseCount * 0.6) : baseCount;

    const particles = [];

    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('div');
      const isBar = Math.random() < (variant === 'hero' ? 0.35 : 0.6);
      const size = isBar ? 3 + Math.random() * 3 : 3 + Math.random() * 4;

      el.className = 'pointer-events-none absolute rounded-sm opacity-70';
      const color =
        variant === 'mid'
          ? 'rgba(52, 211, 153, 0.25)'
          : ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      el.style.background = color;

      if (isBar) {
        el.style.width = `${size * 5}px`;
        el.style.height = `${size}px`;
      } else {
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      }

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const depth = 0.4 + Math.random() * 0.6;

      el.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      el.style.willChange = 'transform';
      el.style.boxShadow =
        variant === 'mid'
          ? '0 8px 30px rgba(16, 200, 132, 0.06)'
          : '0 8px 30px rgba(46, 167, 255, 0.12)';

      container.appendChild(el);
      particles.push({ el, baseX: x, baseY: y, depth, speed: 0.2 + Math.random() * 0.35 });
    }

    let frameId;
    let lastTime = performance.now();
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const ratioX = event.clientX / innerWidth - 0.5;
      const ratioY = event.clientY / innerHeight - 0.5;
      mouseX = ratioX * 10;
      mouseY = ratioY * 10;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const loop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      particles.forEach((p, index) => {
        const t = now * 0.00008 * p.speed + index;
        const offsetX = Math.sin(t) * (6 * p.depth) + mouseX * p.depth;
        const offsetY = Math.cos(t * 1.3) * (10 * p.depth) + mouseY * p.depth;
        p.el.style.transform = `translate3d(${p.baseX + offsetX}%, ${p.baseY + offsetY}%, 0)`;
      });

      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (frameId) window.cancelAnimationFrame(frameId);
      particles.forEach((p) => {
        if (p.el && p.el.parentNode === container) {
          container.removeChild(p.el);
        }
      });
    };
  }, [density, variant]);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0 overflow-hidden" />;
}