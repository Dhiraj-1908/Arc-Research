"use client";
import { useDeepResearchStore } from '@/store/deepResearch';
import React from 'react';
import Image from "next/image";
import ResearchActivities from '@/app/api/deep-research/ResearchActivities';
import ResearchReport from '@/app/api/deep-research/ResearchReport';

const ResearchProgressPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { isLoading, report } = useDeepResearchStore();

  // Theme colors based on light/dark mode
  const theme = {
    background: isDarkMode ? "bg-gray-900" : "bg-[#f0f5fa]",
    text: isDarkMode ? "text-gray-100" : "text-[#0f2e47]",
    mutedText: isDarkMode ? "text-gray-300" : "text-[#4a6583]",
    shadow: isDarkMode ? "shadow-lg shadow-black/30" : "shadow-lg shadow-[#c9d6e3]/40",
  };

  return (
    <div className={`w-full min-h-screen ${theme.background} flex flex-col items-center justify-center relative`}>
      {/* Background with the logo - visible only during loading */}
      <div className={`absolute inset-0 flex items-center justify-center z-0 transition-opacity duration-500 ${report.length > 0 ? 'opacity-10' : 'opacity-20'}`}>
        <div className="relative">
          {/* Enhanced logo container with animation */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center">
            {/* Glowing effect */}
            <div
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? "bg-blue-500/20" : "bg-[#c8a250]/10"
              } blur-2xl`}
            ></div>
            
            {/* Animated border */}
            <div
              className={`absolute inset-0 rounded-full ${
                isDarkMode
                  ? "border border-[#5ca7c7]/30"
                  : "border border-[#3f5277]/90"
              } animate-ping transform scale-[0.9]`}
              style={{
                animationDuration: isLoading ? "2s" : "5s", // Faster rotation during loading
                animationIterationCount: "infinite",
              }}
            ></div>

            {/* Logo with rotation during loading */}
            <div 
              className={`w-full h-full transition-all duration-500 ${isLoading ? 'animate-spin' : ''}`}
              style={{ animationDuration: '8s' }}
            >
              <Image
                src="/logo/logo2.svg"
                width={800}
                height={800}
                alt="Arc Reactor"
                priority
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Status text during loading */}
        {isLoading && report.length <= 0 && (
          <div className={`mb-8 text-center ${theme.text}`}>
            <h2 className="text-3xl font-bold mb-2">Researching...</h2>
            <p className={`${theme.mutedText}`}>
              ARC is gathering and analyzing research papers for your topic
            </p>
          </div>
        )}

        {/* Research activities are always visible */}
        <ResearchActivities />
        
        {/* Research report renders itself when ready */}
        <div className="mt-8 w-full flex justify-center">
          <ResearchReport />
        </div>
      </div>
    </div>
  );
};

export default ResearchProgressPage;

