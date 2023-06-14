import React, { useState } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onChange(inputValue);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
      <svg
        className="w-5 h-5 text-gray-500 mr-2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 21l-4.35-4.35M8 14a6 6 0 100-12 6 6 0 000 12z" />
      </svg>
      <input
        type="text"
        className="w-full focus:outline-none"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
export type { SearchInputProps };
