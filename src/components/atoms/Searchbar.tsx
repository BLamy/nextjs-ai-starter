import React from "react";

interface SearchbarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <div className="relative inline-block w-full">
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <svg
        className="absolute top-0 right-0 w-6 h-6 mt-3 mr-4 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9 17a8 8 0 100-16 8 8 0 000 16zm0-1.666a6.334 6.334 0 110-12.668 6.334 6.334 0 010 12.668z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M12.298 13.85a1 1 0 011.414 1.414l-3.535 3.535a1 1 0 01-1.414 0l-3.535-3.535a1 1 0 111.414-1.414l2.293 2.293 2.293-2.293z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Searchbar;
export type { SearchbarProps };
