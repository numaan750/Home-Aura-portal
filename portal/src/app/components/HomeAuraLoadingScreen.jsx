"use client";
import React from "react";
import Image from "next/image";

const HomeAuraLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#f0dbcc] to-[#dbc3ba] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 aura-overlay pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
          <svg
            className="absolute inset-0 w-full h-full aura-ring-spin-reverse"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="43"
              stroke="url(#ringGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="50 220"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E07A5F" />
                <stop offset="50%" stopColor="#E07A5F" />
                <stop offset="100%" stopColor="#F4A261" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden">
            <Image
              src="/images/Home-Aura.png"
              alt="Home-Aura"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <p className="text-[#1E1E1E] text-base sm:text-lg md:text-xl font-bold mt-1 sm:mt-2">
          Working on it...
        </p>
      </div>

      <p className="absolute bottom-6 sm:bottom-8 text-black text-[14px] sm:text-[18px] text-center px-4 font-regular">
        Don't close app or lock device until finished.
      </p>
    </div>
  );
};

export default HomeAuraLoadingScreen;
