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
  pulseSpeed: number;
  glow: boolean;
}

interface LargeOrb {
  x: number;
  y: number;
  radius: number;
  innerRadius: number;
  color: string;
  innerColor: string;
  vx: number;
  vy: number;
  alpha: number;
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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palettes directly matching the uploaded screenshot:
    // Soft pastel pink/magenta, cyan/sky, lavender/violet, and crisp white
    const starColors = [
      '#f472b6', // pink
      '#fb7185', // rose
      '#fda4af', // light pink
      '#38bdf8', // sky cyan
      '#22d3ee', // bright cyan
      '#67e8f9', // light cyan
      '#c084fc', // purple/lavender
      '#a855f7', // violet
      '#e0e7ff', // soft white-blue
      '#ffffff'  // white sparkle
    ];

    // Large glowing bokeh orbs colors matching the dark purple/indigo/navy discs in the image
    const orbColorPairs = [
      { outer: 'rgba(32, 22, 58, 0.55)', inner: 'rgba(48, 30, 88, 0.7)' },
      { outer: 'rgba(18, 32, 58, 0.55)', inner: 'rgba(28, 48, 88, 0.7)' },
      { outer: 'rgba(40, 18, 52, 0.5)', inner: 'rgba(65, 26, 85, 0.65)' },
      { outer: 'rgba(20, 36, 62, 0.5)', inner: 'rgba(30, 55, 95, 0.65)' },
      { outer: 'rgba(35, 25, 60, 0.45)', inner: 'rgba(50, 35, 90, 0.6)' }
    ];

    // Generate Small & Medium Stars
    const particleCount = Math.min(Math.floor((width * height) / 9000), 120);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isGlowStar = Math.random() > 0.7;
      const baseAlpha = Math.random() * 0.6 + 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isGlowStar ? Math.random() * 2.2 + 1.8 : Math.random() * 1.5 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.05, // gentle upward drift
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        glow: isGlowStar
      });
    }

    // Generate Large Glowing Bokeh Orbs (exactly as in the screenshot)
    const orbCount = Math.min(Math.max(Math.floor(width / 130), 8), 16);
    const largeOrbs: LargeOrb[] = [];

    for (let i = 0; i < orbCount; i++) {
      const radius = Math.random() * 40 + 28; // 28px - 68px
      const pair = orbColorPairs[Math.floor(Math.random() * orbColorPairs.length)];
      largeOrbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        innerRadius: radius * (Math.random() * 0.35 + 0.35),
        color: pair.outer,
        innerColor: pair.inner,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.3 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.005
      });
    }

    // Resize Handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Parallax Interaction (gentle, non-intrusive)
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.66, 2.0);
      lastTime = time;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      const offsetX = (mouseX - width / 2) * 0.015;
      const offsetY = (mouseY - height / 2) * 0.015;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Midnight Space Gradient Background matching screenshot
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#060814');
      bgGrad.addColorStop(0.5, '#080a1c');
      bgGrad.addColorStop(1, '#050711');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Large Glowing Orbs / Bokeh Discs (Background Layer)
      largeOrbs.forEach((orb) => {
        orb.x += orb.vx * delta;
        orb.y += orb.vy * delta;
        orb.pulsePhase += orb.pulseSpeed * delta;

        // Wrap around screen boundaries with margin
        const margin = orb.radius * 2;
        if (orb.x < -margin) orb.x = width + margin;
        if (orb.x > width + margin) orb.x = -margin;
        if (orb.y < -margin) orb.y = height + margin;
        if (orb.y > height + margin) orb.y = -margin;

        const currentScale = 1 + Math.sin(orb.pulsePhase) * 0.08;
        const currentRadius = orb.radius * currentScale;

        // Outer soft glow disc
        ctx.save();
        ctx.globalAlpha = orb.alpha * (0.85 + Math.sin(orb.pulsePhase) * 0.15);
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(orb.x - offsetX * 0.5, orb.y - offsetY * 0.5, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner nested core disc (seen in screenshot's concentric orbs)
        ctx.fillStyle = orb.innerColor;
        ctx.beginPath();
        ctx.arc(
          orb.x - offsetX * 0.5,
          orb.y - offsetY * 0.5,
          orb.innerRadius * currentScale,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Sparkling Dots & Stars (Foreground Layer)
      particles.forEach((p) => {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed) * 0.25;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.15, Math.min(1, p.alpha));

        // Soft glow for special stars
        if (p.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x - offsetX, p.y - offsetY, p.radius, 0, Math.PI * 2);
        ctx.fill();
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
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};
