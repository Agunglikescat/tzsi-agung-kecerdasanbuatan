import React from 'react';

interface AgungLogoProps {
  className?: string;
  size?: number | string;
  withText?: boolean;
  glow?: boolean;
  variant?: 'emblem' | 'badge' | 'minimal';
}

export const AgungLogo: React.FC<AgungLogoProps> = ({
  className = '',
  size = 38,
  withText = false,
  glow = true,
  variant = 'emblem'
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* SVG Emblem matching the uploaded Logo.png with adaptive modern cyan/blue palette */}
      <div 
        className={`relative flex items-center justify-center shrink-0 ${
          variant === 'badge' 
            ? 'p-1.5 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900 border border-cyan-500/40 shadow-lg shadow-cyan-500/20' 
            : ''
        }`}
        style={{ width: size, height: size }}
      >
        {glow && (
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md -z-10 animate-pulse pointer-events-none" />
        )}
        
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-sm select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Color Gradients adapted to the website's dark cyber/academic aesthetic */}
            <linearGradient id="agungCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <linearGradient id="agungShardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="agungShardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="agungShardGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Circular Path for Text 'AGUNGPROJECT.ID' matching the original logo */}
            <path
              id="agungTextArc"
              d="M 120 280 A 130 130 0 0 1 230 75"
              fill="none"
            />
          </defs>

          {/* 1. Arc line completing the right and lower circle boundary */}
          <path
            d="M 230 85 A 130 130 0 1 1 125 285"
            stroke="url(#agungCyanGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            className="filter drop-shadow"
          />

          {/* 2. Circular Text along the upper-left arc: AGUNGPROJECT.ID */}
          <text className="font-mono text-[18px] font-extrabold tracking-[0.28em] fill-slate-100">
            <textPath
              href="#agungTextArc"
              startOffset="50%"
              textAnchor="middle"
              className="fill-cyan-300 drop-shadow-sm font-sans font-bold"
            >
              AGUNGPROJECT.ID
            </textPath>
          </text>

          {/* 3. Central Geometric Abstract Origami/Poly Monogram from Logo.png */}
          <g transform="translate(10, 5)">
            {/* Shard 1 (Leftmost tilted polygon) */}
            <polygon
              points="135,210 155,190 168,228 148,248"
              fill="url(#agungShardGrad2)"
            />

            {/* Shard 2 (Upper left tilted facet) */}
            <polygon
              points="162,170 185,150 198,190 175,210"
              fill="url(#agungShardGrad1)"
            />

            {/* Shard 3 (Upper center top facet) */}
            <polygon
              points="198,145 220,125 240,165 218,185"
              fill="url(#agungShardGrad3)"
            />

            {/* Shard 4 (Lower center angled facet) */}
            <polygon
              points="180,230 205,210 228,245 203,265"
              fill="url(#agungShardGrad2)"
            />

            {/* Slanted fine dynamic slash line */}
            <line
              x1="172"
              y1="130"
              x2="238"
              y2="245"
              stroke="#e0f2fe"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Shard 5 (Main right angular folded ribbon/chevron) */}
            <polygon
              points="225,160 248,155 260,185 242,190"
              fill="url(#agungShardGrad3)"
            />

            <polygon
              points="242,190 285,188 322,230 292,230 310,255 268,255 248,220 262,220"
              fill="url(#agungShardGrad1)"
            />

            {/* Extra subtle high-tech accent dots/facets */}
            <circle cx="215" cy="195" r="2.5" fill="#38bdf8" />
            <circle cx="160" cy="225" r="2" fill="#e0f2fe" />
          </g>
        </svg>
      </div>

      {/* Optional Side Text if enabled */}
      {withText && (
        <div className="flex flex-col">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
            AGUNGPROJECT<span className="text-cyan-400">.ID</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
            AI Knowledge Platform
          </span>
        </div>
      )}
    </div>
  );
};
