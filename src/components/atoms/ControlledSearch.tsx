import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface ControlledSearchProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

const ControlledSearch = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: ControlledSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full bg-white border border-gray-300 rounded-tl rounded-bl px-4 py-2 pl-10 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (
        <button
          className="absolute top-0 right-0 px-3 py-1 mr-2 mt-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs focus:outline-none"
          onClick={() => onChange("")}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export type { ControlledSearchProps };
export default ControlledSearch;
