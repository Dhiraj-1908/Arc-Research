"use client";
import { useDeepResearchStore } from '@/store/deepResearch';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import ResearchActivities from './ResearchActivities';
import ResearchReport from './ResearchReport';
import { Sun, Moon } from "lucide-react";

interface ResearchProgressPageProps {
  isDarkMode: boolean;
}

const ResearchProgressPage = ({ isDarkMode: initialDarkMode }: ResearchProgressPageProps) => {
  const { isLoading, report } = useDeepResearchStore();
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);
  const [mounted, setMounted] = useState(false);

  // Ensure we initialize correctly after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    setIsDarkMode(initialDarkMode);
  }, [initialDarkMode]);

  // Toggle mode and save preference
  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem("arcThemeMode", newMode ? "dark" : "light");
    }
  };

  // Theme colors based on light/dark mode
  const theme = {
    background: isDarkMode ? "bg-gray-900" : "bg-[#f0f5fa]",
    text: isDarkMode ? "text-gray-100" : "text-[#0f2e47]",
    mutedText: isDarkMode ? "text-gray-300" : "text-[#4a6583]",
    shadow: isDarkMode ? "shadow-lg shadow-black/30" : "shadow-lg shadow-[#c9d6e3]/40",
    themeToggle: isDarkMode 
      ? "bg-gray-800 text-[#e6c77e] hover:bg-gray-700" 
      : "bg-white text-[#c8a250] hover:bg-gray-100",
  };

  // If not mounted yet, don't render anything to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className={`w-full min-h-screen ${theme.background} flex flex-col items-center justify-center relative transition-colors duration-500 overflow-hidden`}>
      {/* Theme toggle button */}
      <button
        onClick={toggleMode}
        className={`fixed top-6 right-6 z-10 p-3 rounded-full ${theme.themeToggle} transition-all duration-300 ${theme.shadow}`}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Background with the logo - visible during loading */}
      <div className={`absolute inset-0 flex items-center justify-center z-0 transition-opacity duration-500 ${report.length > 0 ? 'opacity-10' : 'opacity-20'} overflow-hidden`}>
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

      {/* Activities component - will handle its own responsive behavior */}
      <ResearchActivities isDarkMode={isDarkMode} />

      {/* Content area - properly positioned to avoid overlap with sidebar on larger screens */}
      <div className="relative z-5 w-full flex flex-col items-center pt-16 md:pt-8 overflow-hidden">
        {/* Status text during loading */}
        {isLoading && report.length <= 0 && (
          <div className={`mb-8 text-center ${theme.text} transition-colors duration-300 mt-12 md:mt-0`}>
            <h2 className="text-3xl font-bold mb-2">Researching...</h2>
            <p className={`${theme.mutedText} transition-colors duration-300`}>
              ARC scans the web in real time to deliver sharp, customized query-specific research report.
            </p>
          </div>
        )}
        
        {/* Research report will position itself properly on all screen sizes */}
        <div className="w-full flex justify-center overflow-hidden">
          <ResearchReport isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default ResearchProgressPage;