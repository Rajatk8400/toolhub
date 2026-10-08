import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  iconOnly?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({
  size = "md",
  showTagline = false,
  iconOnly = false,
  href = "/",
  className = "",
}: LogoProps) {
  const dimensions = {
    sm: { icon: "h-7 w-7", text: "text-lg", tag: "text-[10px]", dot: "h-1.5 w-1.5" },
    md: { icon: "h-9 w-9", text: "text-xl", tag: "text-xs", dot: "h-2 w-2" },
    lg: { icon: "h-11 w-11", text: "text-2xl", tag: "text-xs", dot: "h-2.5 w-2.5" },
    xl: { icon: "h-14 w-14", text: "text-3xl", tag: "text-sm", dot: "h-3 w-3" },
  }[size];

  const content = (
    <div className={`group inline-flex items-center gap-2.5 ${className}`}>
      {/* ToolArena Unique Geometric Arena Nexus Icon */}
      <div
        className={`relative flex ${dimensions.icon} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-1.5 shadow-md shadow-blue-500/20 ring-1 ring-white/30 transition-all duration-300 ease-out group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-lg group-hover:shadow-blue-500/35`}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-cyan-400/40 via-blue-500/30 to-indigo-600/40 blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        >
          {/* Hexagonal Arena Container Outline */}
          <path
            d="M16 2.8L28.2 9.8V22.2L16 29.2L3.8 22.2V9.8L16 2.8Z"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeOpacity="0.85"
          />

          {/* Central Nexus Core */}
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />

          {/* Interconnected Modular Rays linking arena walls to core */}
          <path d="M16 4.5V13" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 19V27.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 10.5L13.5 14.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18.5 17.5L26 21.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 21.5L13.5 17.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18.5 14.5L26 10.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

          {/* Precision Utility Nodes */}
          <circle cx="9.5" cy="12.5" r="1.3" fill="#38BDF8" />
          <circle cx="22.5" cy="19.5" r="1.3" fill="#38BDF8" />
          <circle cx="9.5" cy="19.5" r="1.3" fill="#FDE047" />
          <circle cx="22.5" cy="12.5" r="1.3" fill="#FDE047" />
        </svg>
      </div>

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`font-black tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-950 ${dimensions.text}`}
            >
              Tool
            </span>
            <span
              className={`font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent transition-all duration-300 ${dimensions.text}`}
            >
              Arena
            </span>
            {/* Arena Active Pulse Dot */}
            <span
              className={`ml-1 rounded-full bg-cyan-500 shadow-xs shadow-cyan-500/60 transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-400 ${dimensions.dot}`}
            />
          </div>
          {showTagline && (
            <span className={`-mt-0.5 font-medium text-slate-500 tracking-wide ${dimensions.tag}`}>
              Free Online Tools &amp; Utilities
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="ToolArena - Free Online Tools, Calculators & Utilities"
        className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-xl"
      >
        {content}
      </Link>
    );
  }

  return content;
}
