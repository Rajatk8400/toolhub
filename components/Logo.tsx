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
  // Dimension mappings
  const dimensions = {
    sm: { icon: "h-7 w-7", text: "text-lg", tag: "text-[10px]", dot: "h-1.5 w-1.5" },
    md: { icon: "h-9 w-9", text: "text-xl", tag: "text-xs", dot: "h-2 w-2" },
    lg: { icon: "h-11 w-11", text: "text-2xl", tag: "text-xs", dot: "h-2.5 w-2.5" },
    xl: { icon: "h-14 w-14", text: "text-3xl", tag: "text-sm", dot: "h-3 w-3" },
  }[size];

  const content = (
    <div className={`group inline-flex items-center gap-2.5 ${className}`}>
      {/* Dynamic Animated Icon Mark */}
      <div
        className={`relative flex ${dimensions.icon} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-1.5 shadow-md shadow-blue-500/20 ring-1 ring-white/25 transition-all duration-300 ease-out group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-lg group-hover:shadow-blue-500/35`}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-cyan-400/40 to-indigo-500/40 blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
        >
          {/* Central Nexus Ring */}
          <circle cx="16" cy="16" r="3.5" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.9" />

          {/* Left Multi-Tool Prongs */}
          <path
            d="M7 13.5C7 10.5 9.5 8.5 12.5 8.5L14.5 10.5L11.5 13.5L8.5 13.5C7.8 13.5 7 13.5 7 13.5Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />
          <path d="M8 16H12.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M7 18.5C7 21.5 9.5 23.5 12.5 23.5L14.5 21.5L11.5 18.5L8.5 18.5C7.8 18.5 7 18.5 7 18.5Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />

          {/* Right Dynamic Spark / Lightning Arrow */}
          <path
            d="M17.5 8L24.5 15H20L22.5 24L15.5 17.5H19.5L17.5 8Z"
            fill="url(#logo-spark-accent)"
            stroke="#FFFFFF"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />

          {/* Spark Gradient Definition */}
          <defs>
            <linearGradient id="logo-spark-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography & Brand Mark */}
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
              Hub
            </span>
            {/* Dynamic Accent Spark Dot */}
            <span
              className={`ml-0.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50 transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-400 ${dimensions.dot}`}
            />
          </div>
          {showTagline && (
            <span className={`-mt-0.5 font-medium text-slate-500 tracking-wide ${dimensions.tag}`}>
              Smart Web Utilities & Calculators
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="ToolHub - Free Online Tools & Calculators" className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
