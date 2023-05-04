import React from "react";

type SearchBoxProps = {
  onChange: (value: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search"
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium border border-transparent focus:outline-none focus:border-purple-500 rounded-full py-2 pl-8 pr-3 w-full"
        onChange={handleInputChange}
      />
      <span className="absolute left-3 top-2">
        <svg
          className="w-5 h-5 text-gray-400 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 15l5.79 5.79"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 18a8 8 0 100-16 8 8 0 000 16z"
          ></path>
        </svg>
      </span>
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
