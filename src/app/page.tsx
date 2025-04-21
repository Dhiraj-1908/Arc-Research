"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import UserInput from "@/components/ui/Arc_componets/UserInput";
import ResearchCards from "@/researchpapers/researchcards";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Initialize with system preference or default to dark
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('arcThemeMode');
      if (savedMode) {
        setIsDarkMode(savedMode === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);

  // Toggle mode and save preference
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('arcThemeMode', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <main className={`min-h-screen w-full ${isDarkMode ? 'bg-[#121620]' : 'bg-[#e8e6dd]'} transition-colors duration-100`}>
      {/* Theme toggle button */}
      <button 
        onClick={toggleMode}
        className={`fixed top-4 right-4 z-30 p-3 rounded-full ${
          isDarkMode 
            ? 'bg-gray-800 text-amber-300 hover:bg-gray-700' 
            : 'bg-[#e8e6dd] text-blue-600 hover:bg-[#dbd9d0]'
        } transition-all duration-300 shadow-lg`}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      {/* Main content container with improved layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
        {/* Left hero section - takes full width on mobile, 5/12 on medium and larger screens */}
        <div className="relative md:col-span-5 h-[40vh] md:h-screen">
          {/* Background image with gradient overlay */}
          <div className="absolute inset-0">
            {isDarkMode ? (
              <>
                <div className="relative h-full w-full">
                  <Image  
                    src="/background/black_matt.jpg"
                    alt="Dark Mode Background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121620] md:bg-gradient-to-r md:from-transparent md:to-[#121620]"></div>
              </>
            ) : (
              <>
                <div className="relative h-full w-full">
                  <Image
                    src="/background/ecru_glow.jpg"
                    alt="Light Mode Background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#e8e6dd] md:bg-gradient-to-r md:from-transparent md:to-[#e8e6dd]"></div>
              </>
            )}
          </div>
          
          {/* Logo container - positioned in center of the image with INCREASED SIZE */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10">
              <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 relative flex items-center justify-center">
                {/* Glow effect around logo - increased size to match larger logo */}
                <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/15'} blur-2xl`}></div>
                <Image
                  src="/logo/logo2.svg"
                  width={1100}
                  height={1100}
                  alt="Arc Reactor"
                  priority
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right content section - takes full width on mobile, 7/12 on medium and larger screens */}
        <div className="md:col-span-7 flex flex-col px-6 py-8 md:px-12 md:py-0">
          <div className="flex flex-col justify-center md:h-screen">
            {/* Title section with improved spacing and alignment */}
            <div className="text-center md:text-left mb-8 mt-4 md:mt-0">
              <h2 className={`text-lg font-medium text-blue-500 mb-2 transition-colors duration-300`}>
                AI Research Curator
              </h2>
              <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold ${isDarkMode ? 'text-red-600' : 'text-red-700'} mb-6 transition-colors duration-300`}>
                ARC
              </h1>
              <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl mx-auto md:mx-0 transition-colors duration-300`}>
                Enter the topic and answer a few questions to generate a comprehensive research report.
              </p>
            </div>
            
            {/* User input component */}
            <div className="w-full max-w-3xl mx-auto md:mx-0">
              <UserInput isDarkMode={isDarkMode} />
            </div>

            <ResearchCards isDarkMode={isDarkMode} />

          </div>
        </div>
      </div>
    </main>
  );
}