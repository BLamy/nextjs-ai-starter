import React, { useState } from "react";

interface SearchBoxProps {
  onSearch?: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-sm">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 text-gray-700 rounded-full focus:outline-none"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10 focus:outline-none">
        <svg
          className="text-gray-600 h-5 w-5 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.264 12.86a6.5 6.5 0 1 0-.902.9l4.704 4.704a.999.999 0 1 0 1.414-1.414l-4.704-4.704zm-5.264.14a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
