import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

function SearchBar({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
      if (setIsOpen) setIsOpen(false); // Close modal on search
    }
  };

  return (
    <>
      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:flex justify-center w-full px-4 md:px-8 mt-4 mb-4">
        <form
          onSubmit={handleSubmit}
          className={`relative flex w-full max-w-xl items-center transition-all duration-200 ${
            isFocused
              ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30 shadow-lg"
              : "shadow-md hover:shadow-lg"
          } bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden`}
        >
          <div className="absolute left-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search posts..."
            className="flex-1 pl-10 pr-4 py-3 text-gray-800 dark:text-gray-200 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />

          <button
            type="submit"
            className="h-full px-5 bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center min-h-[44px]"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* ================= MOBILE MODAL ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold dark:text-white">Search</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type something..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;