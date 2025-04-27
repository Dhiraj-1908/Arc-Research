"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sun, Moon, ChevronDown } from "lucide-react";
import UserInput from "@/components/ui/Arc_componets/UserInput";
import ResearchCards from "@/researchpapers/researchcards";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize with system preference or saved preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('arcThemeMode');
      if (savedMode) {
        setIsDarkMode(savedMode === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
      // Add a slight delay before showing content for smooth transition
      setTimeout(() => setIsLoaded(true), 200);
    }
  }, []);

  // Scroll down handler
  const scrollToResearch = () => {
    const researchSection = document.getElementById('research-section');
    if (researchSection) {
      researchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle mode and save preference
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('arcThemeMode', !isDarkMode ? 'dark' : 'light');
  };

  // Enhanced color scheme for light mode inspired by the navy blue with gold accent
  const colors = {
    light: {
      background: 'bg-[#f0f5fa]',       // Light blue-gray background
      secondary: 'bg-[#e2eaf2]',        // Slightly darker secondary tone
      card: 'bg-white',                 // Pure white for cards
      text: 'text-[#0f2e47]',           // Dark navy text
      mutedText: 'text-[#4a6583]',      // Medium blue-gray for secondary text
      accent: 'text-[#EE4B2B]',         // red 
      blue: 'text-[#2d5f8a]',           // Medium blue accent
      border: 'border-[#d0dbe8]',       // Light border
      shadow: 'shadow-lg shadow-[#c9d6e3]/40' // Subtle shadow
    },
    dark: {
      background: 'bg-gray-900',
      secondary: 'bg-gray-800',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      mutedText: 'text-gray-300',
      accent: 'text-[#EE4B2B]',         // Lighter gold for dark mode
      blue: 'text-[#5ca7c7]',
      border: 'border-gray-700',
      shadow: 'shadow-lg shadow-black/30'
    }
  };
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <main 
      className={`min-h-screen w-full ${theme.background} transition-colors duration-500`}
    >
      {/* Theme toggle button */}
      <button 
        onClick={toggleMode}
        className={`fixed top-6 right-6 z-30 p-3 rounded-full ${
          isDarkMode 
            ? 'bg-gray-800 text-[#e6c77e] hover:bg-gray-700' 
            : 'bg-white text-[#c8a250] hover:bg-gray-100'
        } transition-all duration-300 ${theme.shadow}`}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      {/* Full screen landing section */}
      <section className={`min-h-screen w-full flex flex-col ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500`}>
        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left image section - adjusted to 33% on large screens */}
          <div className="relative w-full lg:w-1/3 h-[350px] lg:h-screen">
            {/* Background image with gradient overlay - improved blending */}
            <div className="absolute inset-0">
              {isDarkMode ? (
                <>
                  <div className="relative h-full w-full overflow-hidden">
                    <Image  
                      src="/background/black_glow.jpg"
                      alt="Dark Mode Background"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900 lg:bg-gradient-to-r lg:from-transparent lg:via-gray-900/80 lg:to-gray-900"></div>
                </>
              ) : (
                <>
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src="/background/blue_glow2.jpg"
                      alt="Light Mode Background"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ADD8E6]/80 to-[#f0f5fa] lg:bg-gradient-to-r lg:from-transparent lg:via-[#ADD8E6]/80 lg:to-[#f0f5fa]"></div>
                </>
              )}
            </div>
            
            {/* Improved Logo container with better clarity and emphasis */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-10">
                <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 relative flex items-center justify-center">
                  {/* Enhanced subtle glow effects */}
                  <div className={`absolute inset-0 rounded-full ${
                    isDarkMode ? 'bg-blue-500/20' : 'bg-[#c8a250]/10'
                  } blur-2xl`}></div>
                  
                  {/* Additional subtle pulsing ring */}
                  <div className={`absolute w-full h-full rounded-full ${
                    isDarkMode ? 'border border-[#5ca7c7]/30' : 'border border-[#c8a250]/30'
                  } animate-ping`} style={{animationDuration: '5s', animationIterationCount: 'infinite'}}></div>
                  
                  {/* Crisp, clear logo with improved rendering */}
                  <Image
                    src="/logo/logo2.svg"
                    width={1100}
                    height={1100}
                    alt="Arc Reactor"
                    priority
                    className="w-full h-full transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right content section - adjusted to fill remaining space */}
          <div className="flex-grow lg:w-2/3 px-6 sm:px-8 lg:px-16 py-10 lg:py-0 flex items-center">
            <div className="max-w-4xl mx-auto lg:mx-0 w-full">
              {/* Title section with improved typography */}
              <div className="mb-10">
                <h2 className={`text-sm font-medium ${theme.blue} mb-3 tracking-wider uppercase`}>
                  AI Research Curator
                </h2>
                <h1 className={`text-5xl sm:text-6xl font-bold ${theme.accent} mb-4 tracking-tight`}>
                  ARC
                </h1>
                <h3 className={`text-2xl sm:text-3xl font-medium ${theme.text} mb-5`}>
                  Research Made <span className={`${theme.blue} relative`}>
                    Simple
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                      isDarkMode ? 'bg-[#5ca7c7]/60' : 'bg-[#2d5f8a]/50'
                    } rounded-full`}></span>
                  </span>
                </h3>
                <p className={`text-lg ${theme.mutedText} mb-8 leading-relaxed max-w-7xl`}>
                  Enter your research topic and answer a few questions to receive a comprehensive, 
                  AI-powered research report tailored specifically to your needs.
                </p>
              </div>
              
              {/* User input component with enhanced styling */}
              <div className="w-full mb-10">
                <div className={`rounded-xl overflow-hidden ${theme.shadow}`}>
                  <div className={`${theme.card} p-5 sm:p-6 border ${theme.border}`}>
                    <UserInput isDarkMode={isDarkMode} />
                  </div>
                </div>
              </div>
              
              {/* Scroll down indicator */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <button 
                  onClick={scrollToResearch}
                  className={`flex flex-col items-center ${theme.mutedText} hover:${theme.text} transition-all duration-300 group`}
                >
                  <span className="text-sm font-medium mb-2">Explore Recent Papers</span>
                  <ChevronDown className="animate-bounce" size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Research papers section - simplified to just include the cards */}
        <section id="research-section" className={`min-h-screen w-full py-20 ${theme.background}`}>
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-bold ${theme.text}`}>
                Recent Research Papers
              </h2>
              <button className={`text-sm font-medium ${theme.blue} flex items-center`}>
                View all research
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div className={`rounded-xl ${theme.card} ${theme.shadow} border ${theme.border} p-8`}>
              <ResearchCards isDarkMode={isDarkMode} />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}