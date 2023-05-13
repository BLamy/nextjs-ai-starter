import React, { useState } from "react";
import { SearchBoxProps } from "./types";

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8.5 1a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM7 8a1 1 0 011-1h5a1 1 0 110 2H8a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        className="pl-10 pr-3 py-2 w-full border border-gray-400 rounded-lg font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:placeholder-gray-600"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
