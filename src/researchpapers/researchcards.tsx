import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import {
  fetchLatestPapers,
  searchArxivPapers,
  Paper,
  ResearchFieldType,
} from "./api/researchapi";

interface ResearchCardsProps {
  isDarkMode: boolean;
}

const ResearchCards: React.FC<ResearchCardsProps> = ({ isDarkMode }) => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeField, setActiveField] = useState<ResearchFieldType>("all");
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Number of papers to fetch - increased to 15
  const maxResults = 15;
  const MAX_CHAR_COUNT = 100;

  // Count characters in the search query
  useEffect(() => {
    setCharCount(searchQuery.length);
  }, [searchQuery]);

  // Handle search input changes with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Load initial papers or search based on query
  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoading(true);
        setError(null);

        let results: Paper[];

        if (debouncedSearchQuery.trim() === "") {
          // Fetch latest papers if no search query - passing maxResults
          results = await fetchLatestPapers(activeField, maxResults);
        } else {
          // Search papers if there is a query - passing maxResults
          setIsSearching(true);
          results = await searchArxivPapers(debouncedSearchQuery, activeField, maxResults);
          setIsSearching(false);
        }

        setPapers(results);
      } catch (err) {
        console.error("Error in component while fetching papers:", err);
        setError("Failed to load research papers. Please try again later.");
        setPapers([]);
        setIsSearching(false);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, [activeField, debouncedSearchQuery]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHAR_COUNT) {
      setSearchQuery(newText);
    }
  };

  // Unified ecru color for all badges
  const badgeColor = "bg-[#c2b280]";

  // Format the category for display (e.g., "cs.AI" -> "CS: AI")
  const formatCategory = (category: string): string => {
    const parts = category.split(".");
    if (parts.length === 1) return category.toUpperCase();

    return `${parts[0].toUpperCase()}: ${parts[1]}`;
  };

  const fields = [
    { id: "all", label: "All Fields" },
    { id: "cs", label: "Computer Science" },
    { id: "physics", label: "Physics" },
    { id: "math", label: "Mathematics" },
    { id: "biology", label: "Biology" },
    { id: "medicine", label: "Medicine" },
  ];

  return (
    <div
      className={`w-full py-1 ${
        isDarkMode ? "bg-gray-900/10" : "bg-gray-100/10"
      } backdrop-blur-sm rounded-lg mt-6`}
    >
      {/* Header with collapsible toggle */}
      <div className="flex justify-between items-center px-0 mb-2">
        <h3
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {isSearching ? "Searching ..." : " Research Papers"}
        </h3>
        <button
          onClick={toggleCollapse}
          className={`p-2 rounded-full ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
          } transition-colors`}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <ChevronDown
              size={20}
              className={isDarkMode ? "text-gray-300" : "text-gray-700"}
            />
          ) : (
            <ChevronUp
              size={20}
              className={isDarkMode ? "text-gray-300" : "text-gray-700"}
            />
          )}
        </button>
      </div>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isCollapsed
            ? "h-0 overflow-hidden opacity-0 max-h-0"
            : "opacity-100 max-h-screen"
        }`}
      >
        {/* Search bar - wider and multiline */}
        <div className="mb-4 flex justify-start">
          <div
            className={`relative flex items-center max-w-xl w-11/12 ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-700"
            } rounded-lg shadow-sm`}
          >
            <Search size={18} className="absolute left-3 text-gray-400" />
            <textarea
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search research papers by title, abstract, or author..."
              className={`w-full text-sm py-2 pl-10 pr-10 rounded-lg focus:outline-none resize-none h-10 overflow-y-auto ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 placeholder-gray-500"
                  : "bg-white text-gray-700 placeholder-gray-400"
              } transition-all duration-500`}
              rows={1}
              style={{ lineHeight: "1.5rem" }}
            />
            {searchQuery && (
              <button
                onClick={handleSearchClear}
                className={`absolute right-3 p-1 rounded-full ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-200 text-gray-500"
                }`}
              >
                <span className="text-sm leading-none">&times;</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Character count indicator */}
        <div className={`text-xs ml-2 mb-2 ${charCount > MAX_CHAR_COUNT - 10 ? 'text-orange-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {charCount}/{MAX_CHAR_COUNT} characters
        </div>
        
        {isSearching && (
          <div
            className={`text-xs mt-1 text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Searching ArXiv for &quot;{debouncedSearchQuery}&quot;...{" "}
          </div>
        )}

        {/* Field Selection Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => {
                setActiveField(field.id as ResearchFieldType);
              }}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeField === field.id
                  ? isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } focus:outline-none`}
            >
              {field.label}
            </button>
          ))}
        </div>

        {/* Cards container */}
        <div className="relative">
          {/* Modified mobile view - no scroll buttons */}
          <div className="block md:hidden">
            <div 
              className="flex overflow-x-auto gap-4 py-2 px-2 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              ref={scrollContainerRef}
            >
              {loading ? (
                // Loading placeholders
                Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={`loading-${i}`}
                      className="flex-shrink-0 w-64 h-40 rounded-lg animate-pulse backdrop-blur-sm"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(31, 41, 55, 0.5)"
                          : "rgba(229, 231, 235, 0.5)",
                      }}
                    />
                  ))
              ) : error ? (
                <div
                  className={`flex-shrink-0 w-full text-center py-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {error}
                </div>
              ) : papers.length === 0 ? (
                <div
                  className={`flex-shrink-0 w-full text-center py-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  No papers found matching your criteria.
                </div>
              ) : (
                papers.map((paper, index) => (
                  <div
                    key={paper.id || index}
                    className={`flex-shrink-0 w-64 p-4 rounded-lg shadow-md snap-start ${
                      isDarkMode
                        ? "bg-gray-800/60 hover:bg-gray-800/80"
                        : "bg-white/70 hover:bg-white/90"
                    } transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${badgeColor} text-gray-900 font-medium`}
                      >
                        {formatCategory(paper.category)}
                      </span>
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(paper.publishedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h4
                      className={`font-medium text-sm mb-1 line-clamp-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {paper.title}
                    </h4>

                    <p
                      className={`text-xs mb-2 line-clamp-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {paper.abstract}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <div
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {paper.authors.length > 2
                          ? `${paper.authors[0]} et al.`
                          : paper.authors.join(", ")}
                      </div>

                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center text-xs ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        } transition-colors duration-500`}
                      >
                        View <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Desktop view with navigation buttons */}
          <div className="hidden md:block">
            {/* Left scroll button */}
            <button
              onClick={scrollLeft}
              className={`absolute left-1 top-1/2 -translate-y-1/2 -ml-4 z-10 p-1 rounded-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-700"
              } shadow-md hover:shadow-lg transition-shadow duration-500 focus:outline-none`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right scroll button */}
            <button
              onClick={scrollRight}
              className={`absolute right-1 top-1/2 -translate-y-1/2 -mr-4 z-10 p-1 rounded-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-700"
              } shadow-md hover:shadow-lg transition-shadow duration-500 focus:outline-none`}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 py-2 px-2 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {loading ? (
                // Loading placeholders
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={`loading-${i}`}
                      className={`flex-shrink-0 w-72 lg:w-80 h-40 rounded-lg ${
                        isDarkMode ? "bg-gray-800/50" : "bg-gray-200/50"
                      } animate-pulse snap-start backdrop-blur-sm`}
                    />
                  ))
              ) : error ? (
                <div
                  className={`w-full text-center py-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {error}
                </div>
              ) : papers.length === 0 ? (
                <div
                  className={`w-full text-center py-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  No papers found matching your criteria.
                </div>
              ) : (
                papers.map((paper, index) => (
                  <div
                    key={paper.id || index}
                    className={`flex-shrink-0 w-72 lg:w-80 p-4 rounded-lg shadow-md snap-start ${
                      isDarkMode
                        ? "bg-gray-800/60 hover:bg-gray-800/80"
                        : "bg-white/70 hover:bg-white/90"
                    } transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${badgeColor} text-gray-900 font-medium`}
                      >
                        {formatCategory(paper.category)}
                      </span>
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(paper.publishedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h4
                      className={`font-medium text-sm mb-1 line-clamp-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {paper.title}
                    </h4>

                    <p
                      className={`text-xs mb-2 line-clamp-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {paper.abstract}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <div
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {paper.authors.length > 2
                          ? `${paper.authors[0]} et al.`
                          : paper.authors.join(", ")}
                      </div>

                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center text-xs ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        } transition-colors duration-500`}
                      >
                        View <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchCards;