"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,  // Import DrawerTitle
  DrawerHeader,
  DrawerDescription,  // Import DrawerHeader for proper structure
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  FileText, 
  X, 
  Clock,
  ExternalLink,
  Menu
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

interface ResearchActivitiesProps {
  isDarkMode: boolean;
}

const ResearchActivities = ({ isDarkMode }: ResearchActivitiesProps) => {
  const { activities, sources } = useDeepResearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window exists (client-side)
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkMobile();
      
      // Add event listener for window resize
      window.addEventListener("resize", checkMobile);
      
      // Clean up
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  
  // Theme colors based on light/dark mode
  const theme = {
    // Base colors
    card: isDarkMode ? "bg-gray-800/95" : "bg-white/95",
    border: isDarkMode ? "border-gray-700" : "border-black/10",
    text: isDarkMode ? "text-gray-100" : "text-gray-800",
    mutedText: isDarkMode ? "text-gray-400" : "text-gray-500",
    
    // Tab styling
    tabBackground: isDarkMode ? "bg-gray-800" : "bg-white",
    tabActive: isDarkMode ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800",
    tabInactive: isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-800",
    
    // List items
    listItemBorder: isDarkMode ? "border-gray-700" : "border-gray-200",
    listItemHover: isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50",
    
    // Button styling
    button: isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100",
    buttonText: isDarkMode ? "text-gray-200" : "text-gray-700",
    
    // Links
    link: isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700",
    
    // Shadows
    shadow: isDarkMode ? "shadow-lg shadow-black/30" : "shadow-lg shadow-[#c9d6e3]/40",
    
    // Status colors
    statusComplete: "bg-green-500",
    statusError: "bg-red-500",
    statusPending: "bg-yellow-500",

    // Icons
    iconColor: isDarkMode ? "text-blue-400" : "text-blue-600",
  };

  if (activities.length === 0) return null;

  const slideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };
  
  // Content for both drawer and desktop sidebar
  const content = (
    <Tabs 
      defaultValue="activities" 
      className={`w-full h-full ${theme.shadow} backdrop-blur-sm rounded-xl overflow-hidden border ${theme.border}`}
    >
      <TabsList className={`w-full px-2 py-4 ${theme.tabBackground} flex h-16`}>
        <TabsTrigger
          value="activities"
          className={`flex-1 flex items-center justify-center gap-2 data-[state=active]:${theme.tabActive} data-[state=inactive]:${theme.tabInactive} text-base`}
        >
          <Activity className="h-5 w-5" />
          <span>Activities</span>
        </TabsTrigger>
        {sources.length > 0 && (
          <TabsTrigger 
            value="sources"
            className={`flex-1 flex items-center justify-center gap-2 data-[state=active]:${theme.tabActive} data-[state=inactive]:${theme.tabInactive} text-base`}
          >
            <FileText className="h-5 w-5" />
            <span>Sources</span>
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent
        value="activities"
        className={`h-[calc(100%-64px)] overflow-y-auto ${theme.card} backdrop-blur-sm rounded-b-xl`}
      >
        <ul className="space-y-2 p-4">
          {activities.map((activity, index) => (
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={index}
              className={`flex flex-col gap-2 border-b ${theme.listItemBorder} p-3 ${theme.listItemHover} rounded-md text-sm transition-colors duration-200 ${theme.text}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`
                    ${
                      activity.status === "complete"
                        ? theme.statusComplete
                        : activity.status === "error"
                        ? theme.statusError
                        : theme.statusPending
                    } min-w-2 min-h-2 h-2 w-2 block rounded-full
                  `}
                >
                  &nbsp;
                </span>

                <p className="break-words">
                  {activity.message.includes("https://")
                    ? activity.message.split("https://")[0] +
                      "https://" + activity.message.split("https://")[1].split("/")[0]
                    : activity.message}
                </p>
              </div>
              {activity.timestamp && (
                <div className={`flex items-center text-xs ${theme.mutedText}`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {format(activity.timestamp, "HH:mm:ss")}
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </TabsContent>
      {sources.length > 0 && (
        <TabsContent
          value="sources"
          className={`h-[calc(100%-64px)] overflow-y-auto ${theme.card} backdrop-blur-sm rounded-b-xl`}
        >
          <ul className="space-y-2 p-4">
            {sources.map((source, index) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={index}
                className={`flex flex-col gap-2 border-b ${theme.listItemBorder} p-3 ${theme.listItemHover} rounded-md transition-colors duration-200`}
              >
                <Link
                  href={source.url}
                  target="_blank"
                  className={`text-sm ${theme.link} hover:underline flex items-center justify-between`}
                >
                  <span className="line-clamp-2">{source.title}</span>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 ml-2" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </TabsContent>
      )}
    </Tabs>
  );

  // For mobile: return a drawer component
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`fixed top-4 left-4 z-30 flex items-center gap-2 ${theme.button} ${theme.border} ${theme.text} shadow-md`}
          >
            <Menu className="h-5 w-5" />
            <div className="flex items-center">
              <Activity className={`h-4 w-4 mr-2 ${theme.iconColor}`} />
              <span className="font-medium">Research Progress</span>
            </div>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          {/* Add the required DrawerHeader and DrawerTitle for accessibility */}
          <DrawerHeader className="sr-only">
            <DrawerTitle>Research Progress</DrawerTitle>
            <DrawerDescription>View research activities and sources</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 h-full">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // For desktop: return the sidebar
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={slideVariants}
      className="fixed top-4 left-4 z-10 w-[400px] h-[80vh]"
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-2 px-2">
          <div className={`flex items-center gap-2 ${theme.text}`}>
            <Activity className={`h-5 w-5 ${theme.iconColor}`} />
            <span className="font-medium">Research Progress</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-9 p-0 ${theme.button} ${theme.buttonText} border ${theme.border} rounded-full`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100% - 2rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            {content}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResearchActivities;