import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  hasRing: boolean;
  ringRadius: number;
  ringColor: string;
  ringDashOffset: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  innerRadius: number;
  color: string;
  innerColor: string;
  strokeColor?: string;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export const CosmicParticlesBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    const setupDimensions = () => {
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupDimensions();

    const isDark = theme === 'dark';

    // Dot colors: in light mode, use high-contrast vibrant jewel tones
    const dotColors = isDark
      ? [
          '#f472b6', // soft coral pink
          '#fb7185', // rose pink
          '#fda4af', // delicate peach pink
          '#e879f9', // vibrant orchid pink
          '#c084fc', // lavender violet
          '#a855f7', // purple
          '#38bdf8', // sky cyan
          '#22d3ee', // bright cyan
          '#2dd4bf', // teal/turquoise
          '#e0e7ff', // soft bluish white
          '#ffffff'  // pure white star
        ]
      : [
          '#1d4ed8', // vivid sapphire blue
          '#0284c7', // cerulean ocean
          '#0e7490', // deep cyan
          '#4338ca', // royal indigo
          '#6d28d9', // vibrant purple
          '#a21caf', // deep magenta
          '#be123c', // deep ruby rose
          '#047857', // emerald green
          '#b45309', // rich amber
          '#2563eb'  // electric blue
        ];

    // Bokeh color presets adapted for Dark vs Light mode
    const bokehColorPresets = isDark
      ? [
          {
            outer: 'rgba(58, 24, 76, 0.42)',  // plum violet
            inner: 'rgba(84, 32, 112, 0.55)',
            stroke: 'rgba(168, 85, 247, 0.22)'
          },
          {
            outer: 'rgba(20, 36, 68, 0.45)',  // deep space navy
            inner: 'rgba(28, 54, 98, 0.60)',
            stroke: 'rgba(56, 189, 248, 0.20)'
          },
          {
            outer: 'rgba(22, 60, 78, 0.42)',  // deep cyan/teal
            inner: 'rgba(32, 88, 110, 0.55)',
            stroke: 'rgba(45, 212, 191, 0.22)'
          },
          {
            outer: 'rgba(74, 22, 62, 0.38)',  // dark magenta
            inner: 'rgba(110, 32, 88, 0.50)',
            stroke: 'rgba(244, 114, 182, 0.22)'
          },
          {
            outer: 'rgba(26, 28, 64, 0.40)',  // midnight indigo
            inner: 'rgba(38, 44, 96, 0.55)',
            stroke: 'rgba(129, 140, 248, 0.20)'
          }
        ]
      : [
          {
            outer: 'rgba(191, 219, 254, 0.55)',  // azure blue
            inner: 'rgba(147, 197, 253, 0.70)',
            stroke: 'rgba(37, 99, 235, 0.35)'
          },
          {
            outer: 'rgba(233, 213, 255, 0.55)',  // lilac lavender
            inner: 'rgba(216, 180, 254, 0.70)',
            stroke: 'rgba(126, 34, 206, 0.35)'
          },
          {
            outer: 'rgba(204, 251, 241, 0.55)',  // mint teal
            inner: 'rgba(153, 246, 228, 0.70)',
            stroke: 'rgba(13, 148, 136, 0.35)'
          },
          {
            outer: 'rgba(254, 205, 211, 0.55)',  // rose peach
            inner: 'rgba(253, 164, 175, 0.70)',
            stroke: 'rgba(190, 18, 60, 0.35)'
          },
          {
            outer: 'rgba(224, 231, 255, 0.55)',  // indigo soft
            inner: 'rgba(199, 210, 254, 0.70)',
            stroke: 'rgba(67, 56, 202, 0.35)'
          }
        ];

    // 1. Generate Sparkle Particles
    const particleDensity = Math.min(Math.floor((displayWidth * displayHeight) / 7200), 145);
    const particles: Particle[] = [];

    for (let i = 0; i < particleDensity; i++) {
      const isMedium = Math.random() > 0.65;
      const isSmall = !isMedium;
      const radius = isSmall ? Math.random() * 1.3 + 0.8 : Math.random() * 2.6 + 1.8;
      const hasRing = Math.random() > 0.78;
      const color = dotColors[Math.floor(Math.random() * dotColors.length)];
      const baseAlpha = isDark ? (Math.random() * 0.5 + 0.4) : (Math.random() * 0.3 + 0.65);

      particles.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        radius,
        color,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: baseAlpha,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        hasRing,
        ringRadius: radius * (Math.random() * 2.4 + 2.2),
        ringColor: isDark 
          ? (Math.random() > 0.5 ? '#38bdf8' : '#e879f9') 
          : (Math.random() > 0.5 ? '#0284c7' : '#7c3aed'),
        ringDashOffset: Math.random() * 10
      });
    }

    // 2. Generate Ambient Glowing Bokeh Orbs
    const bokehCount = Math.max(8, Math.min(15, Math.floor(displayWidth / 110)));
    const bokehOrbs: BokehOrb[] = [];

    for (let i = 0; i < bokehCount; i++) {
      const preset = bokehColorPresets[i % bokehColorPresets.length];
      const radius = Math.random() * 95 + 60;
      const innerRadius = radius * (Math.random() * 0.4 + 0.35);
      const baseAlpha = isDark ? (Math.random() * 0.3 + 0.4) : (Math.random() * 0.25 + 0.45);

      bokehOrbs.push({
        x: (i / bokehCount) * displayWidth + (Math.random() - 0.5) * 120,
        y: (Math.random() * 0.85 + 0.08) * displayHeight,
        radius,
        innerRadius,
        color: preset.outer,
        innerColor: preset.inner,
        strokeColor: preset.stroke,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: baseAlpha,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.014 + 0.006
      });
    }

    // Interactive mouse parallax
    let mouseX = displayWidth / 2;
    let mouseY = displayHeight / 2;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetParallaxX = (mouseX / displayWidth - 0.5) * 24;
      targetParallaxY = (mouseY / displayHeight - 0.5) * 24;
    };

    const handleResize = () => {
      setupDimensions();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.66, 2.5);
      lastTime = time;

      parallaxX += (targetParallaxX - parallaxX) * 0.05;
      parallaxY += (targetParallaxY - parallaxY) * 0.05;

      // Clear Canvas
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Light mode ambient gradient
      if (!isDark) {
        const bgGrad = ctx.createLinearGradient(0, 0, displayWidth, displayHeight);
        bgGrad.addColorStop(0, 'rgba(248, 250, 252, 0.7)');
        bgGrad.addColorStop(0.5, 'rgba(241, 245, 249, 0.5)');
        bgGrad.addColorStop(1, 'rgba(238, 242, 255, 0.4)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
      }

      // 1. Render Bokeh Orbs
      bokehOrbs.forEach((orb) => {
        orb.x += orb.vx * delta;
        orb.y += orb.vy * delta;
        orb.pulsePhase += orb.pulseSpeed * delta;

        // Boundary wrap
        if (orb.x < -orb.radius * 2) orb.x = displayWidth + orb.radius * 2;
        if (orb.x > displayWidth + orb.radius * 2) orb.x = -orb.radius * 2;
        if (orb.y < -orb.radius * 2) orb.y = displayHeight + orb.radius * 2;
        if (orb.y > displayHeight + orb.radius * 2) orb.y = -orb.radius * 2;

        const currentScale = 1 + Math.sin(orb.pulsePhase) * 0.08;
        const currentAlpha = orb.baseAlpha + Math.sin(orb.pulsePhase) * 0.08;
        const currentRadius = orb.radius * currentScale;

        ctx.save();
        ctx.globalAlpha = Math.max(0.15, Math.min(0.9, currentAlpha));

        // Outer soft bokeh disc
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(
          orb.x - parallaxX * 0.4,
          orb.y - parallaxY * 0.4,
          currentRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Inner core disc
        ctx.fillStyle = orb.innerColor;
        ctx.beginPath();
        ctx.arc(
          orb.x - parallaxX * 0.4,
          orb.y - parallaxY * 0.4,
          orb.innerRadius * currentScale,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Translucent stroke outline on select orbs
        if (orb.strokeColor) {
          ctx.strokeStyle = orb.strokeColor;
          ctx.lineWidth = isDark ? 1.2 : 1.5;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 2. Render Constellation Connecting Strokes between nearby particles
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are very close (< 72px)
          if (dist < 72) {
            const strokeAlpha = (1 - dist / 72) * (isDark ? 0.18 : 0.24);
            ctx.strokeStyle = isDark 
              ? `rgba(168, 85, 247, ${strokeAlpha})` 
              : `rgba(67, 56, 202, ${strokeAlpha})`;
            ctx.lineWidth = isDark ? 0.8 : 1.0;
            ctx.beginPath();
            ctx.moveTo(particles[i].x - parallaxX, particles[i].y - parallaxY);
            ctx.lineTo(particles[j].x - parallaxX, particles[j].y - parallaxY);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 3. Render Sparkling Particles & Orbital Particle Strokes
      particles.forEach((p) => {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.pulsePhase += p.pulseSpeed * delta;
        p.ringDashOffset += 0.3 * delta;

        // Wrap around boundaries
        if (p.x < 0) p.x = displayWidth;
        if (p.x > displayWidth) p.x = 0;
        if (p.y < 0) p.y = displayHeight;
        if (p.y > displayHeight) p.y = 0;

        const currentAlpha = Math.max(0.25, Math.min(1, p.baseAlpha + Math.sin(p.pulsePhase) * 0.25));
        const currentRadius = p.radius * (1 + Math.sin(p.pulsePhase * 1.5) * 0.18);

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Halo glow
        if (p.radius > 1.4) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(
            p.x - parallaxX,
            p.y - parallaxY,
            currentRadius * (isDark ? 2.5 : 2.0),
            0,
            Math.PI * 2
          );
          ctx.globalAlpha = currentAlpha * (isDark ? 0.35 : 0.25);
          ctx.fill();
        }

        // Core Sparkle
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(
          p.x - parallaxX,
          p.y - parallaxY,
          currentRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Orbital Stroke Ring
        if (p.hasRing) {
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = isDark ? 0.9 : 1.2;
          ctx.setLineDash([3, 3]);
          ctx.lineDashOffset = p.ringDashOffset;
          ctx.beginPath();
          ctx.arc(
            p.x - parallaxX,
            p.y - parallaxY,
            p.ringRadius,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};
