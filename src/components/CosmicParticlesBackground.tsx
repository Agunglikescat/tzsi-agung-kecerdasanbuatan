import React, { useEffect, useRef } from 'react';

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

    // Exact color palette sampled from user's uploaded SVG image:
    // "use-svg-as-background-image-particle-strokes.svg"
    const dotColors = [
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
    ];

    // Large glowing bokeh orbs and concentric discs matching screenshot
    const bokehColorPresets = [
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
    ];

    // 1. Generate Small & Medium Sparkle Particles
    const particleDensity = Math.min(Math.floor((displayWidth * displayHeight) / 7500), 140);
    const particles: Particle[] = [];

    for (let i = 0; i < particleDensity; i++) {
      const isMedium = Math.random() > 0.65;
      const isSmall = !isMedium;
      const radius = isSmall ? Math.random() * 1.2 + 0.6 : Math.random() * 2.5 + 1.6;
      const hasRing = Math.random() > 0.82; // Some particles have stroke orbital rings
      const color = dotColors[Math.floor(Math.random() * dotColors.length)];
      const baseAlpha = Math.random() * 0.5 + 0.4;

      particles.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        radius,
        color,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28 - 0.06, // subtle upward cosmic drift
        alpha: baseAlpha,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        hasRing,
        ringRadius: radius * (Math.random() * 2.5 + 2.8),
        ringColor: color,
        ringDashOffset: Math.random() * 20
      });
    }

    // 2. Generate Large Bokeh Orbs & Concentric Discs
    const orbCount = Math.min(Math.max(Math.floor(displayWidth / 120), 10), 18);
    const bokehOrbs: BokehOrb[] = [];

    for (let i = 0; i < orbCount; i++) {
      const preset = bokehColorPresets[Math.floor(Math.random() * bokehColorPresets.length)];
      const radius = Math.random() * 45 + 30; // 30px to 75px
      const baseAlpha = Math.random() * 0.35 + 0.45;

      bokehOrbs.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        radius,
        innerRadius: radius * (Math.random() * 0.4 + 0.35),
        color: preset.outer,
        innerColor: preset.inner,
        strokeColor: preset.stroke,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        alpha: baseAlpha,
        baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.006
      });
    }

    // Interactive mouse parallax
    let mouseX = displayWidth / 2;
    let mouseY = displayHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      setupDimensions();
    };
    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.66, 2.0);
      lastTime = time;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;
      const parallaxX = (mouseX - displayWidth / 2) * 0.02;
      const parallaxY = (mouseY - displayHeight / 2) * 0.02;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // 1. Deep Midnight Cosmic Space Gradient (matching user image's background)
      const bgGradient = ctx.createLinearGradient(0, 0, displayWidth * 0.8, displayHeight);
      bgGradient.addColorStop(0, '#060714');
      bgGradient.addColorStop(0.35, '#080a1c');
      bgGradient.addColorStop(0.7, '#0b0920');
      bgGradient.addColorStop(1, '#050711');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Subtle ambient nebula glow spots
      const radialGlow1 = ctx.createRadialGradient(
        displayWidth * 0.25 - parallaxX * 0.5,
        displayHeight * 0.3 - parallaxY * 0.5,
        10,
        displayWidth * 0.25,
        displayHeight * 0.3,
        displayWidth * 0.45
      );
      radialGlow1.addColorStop(0, 'rgba(88, 28, 135, 0.12)');
      radialGlow1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow1;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      const radialGlow2 = ctx.createRadialGradient(
        displayWidth * 0.8 - parallaxX * 0.5,
        displayHeight * 0.7 - parallaxY * 0.5,
        10,
        displayWidth * 0.8,
        displayHeight * 0.7,
        displayWidth * 0.5
      );
      radialGlow2.addColorStop(0, 'rgba(14, 116, 144, 0.10)');
      radialGlow2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow2;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // 2. Render Bokeh Orbs & Concentric Soft Discs (Layer 1 - Background)
      bokehOrbs.forEach((orb) => {
        orb.x += orb.vx * delta;
        orb.y += orb.vy * delta;
        orb.pulsePhase += orb.pulseSpeed * delta;

        const margin = orb.radius * 2;
        if (orb.x < -margin) orb.x = displayWidth + margin;
        if (orb.x > displayWidth + margin) orb.x = -margin;
        if (orb.y < -margin) orb.y = displayHeight + margin;
        if (orb.y > displayHeight + margin) orb.y = -margin;

        const currentScale = 1 + Math.sin(orb.pulsePhase) * 0.09;
        const currentRadius = orb.radius * currentScale;
        const currentAlpha = orb.baseAlpha * (0.85 + Math.sin(orb.pulsePhase) * 0.15);

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));

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

        // Inner nested core disc (characteristic of the user's uploaded image)
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
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 3. Render Subtle Constellation Connecting Strokes between nearby particles
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are very close (< 70px)
          if (dist < 70) {
            const strokeAlpha = (1 - dist / 70) * 0.18;
            ctx.strokeStyle = `rgba(168, 85, 247, ${strokeAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x - parallaxX, particles[i].y - parallaxY);
            ctx.lineTo(particles[j].x - parallaxX, particles[j].y - parallaxY);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 4. Render Sparkling Particles & Orbital Particle Strokes (Layer 2 - Foreground)
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

        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.28;
        const finalAlpha = Math.max(0.12, Math.min(1.0, currentAlpha));

        ctx.save();
        ctx.globalAlpha = finalAlpha;

        // Particle Core
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.radius > 2.0 ? 10 : 4;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x - parallaxX, p.y - parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Particle Stroke Ring (Orbital stroke halo from "particle-strokes.svg")
        if (p.hasRing) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.lineDashOffset = p.ringDashOffset;

          ctx.beginPath();
          ctx.arc(
            p.x - parallaxX,
            p.y - parallaxY,
            p.ringRadius * (1 + Math.sin(p.pulsePhase) * 0.1),
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};
