import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="hidden md:flex lg:flex justify-center w-full px-4 md:px-8 mt-4 mb-4">
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
          aria-label="Search"
        />

        <button
          type="submit"
          className="h-full px-4 md:px-5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors flex items-center justify-center min-h-[44px]"
        >
          <Search className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
