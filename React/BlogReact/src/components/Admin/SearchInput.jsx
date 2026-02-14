import { Search } from "lucide-react";
import { useState } from "react";

function SearchInput({ placeholder, onChange,value }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex justify-center w-full px-3 sm:px-4 md:px-8 mt-3 sm:mt-4 mb-3 sm:mb-4">
      <form
        className={`relative flex w-full max-w-full sm:max-w-lg md:max-w-xl items-center transition-all duration-200
          ${
            isFocused
              ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30 shadow-md sm:shadow-lg"
              : "shadow-sm sm:shadow-md hover:shadow-lg"
          }
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          rounded-xl overflow-hidden`}
      >
        <div className="absolute left-3 sm:left-4 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>

        <input
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3
            text-sm sm:text-base
            text-gray-800 dark:text-gray-200
            bg-transparent
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none"
        />

        <button
          type="button"
          className="h-full px-4 sm:px-5 bg-blue-600 hover:bg-blue-700
            text-white transition-colors
            flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
