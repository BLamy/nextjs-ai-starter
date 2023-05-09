import { useState } from "react";

interface ControlledSearchProps {
  /**
   * The current search query
   */
  searchValue: string;

  /**
   * Event handler for when the search query changes
   */
  onSearchChange: (newSearchValue: string) => void;

  /**
   * Placeholder text in the search input
   */
  placeholderText?: string;

  /**
   * Additional class name for the component
   */
  className?: string;

  /**
   * Additional inline styles for the component
   */
  style?: React.CSSProperties;
}

const ControlledSearch: React.FC<ControlledSearchProps> = ({
  searchValue,
  onSearchChange,
  placeholderText = "",
  className = "",
  style = {},
}) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <input
        type="text"
        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:shadow-md"
        placeholder={placeholderText}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <span
        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
        onClick={() => onSearchChange("")}
      >
        <svg
          className="w-4 h-4 fill-current text-gray-500 transition duration-300 ease-in-out hover:text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm5.59 12.7a1 1 0 0 1-1.41 1.42L10 11.41l-4.18 4.18a1 1 0 1 1-1.41-1.42L8.59 10 4.41 5.82a1 1 0 0 1 1.41-1.42L10 8.59l4.18-4.18a1 1 0 0 1 1.41 1.42L11.41 10l4.18 4.18z" />
        </svg>
      </span>
    </div>
  );
};

export type { ControlledSearchProps };
export default ControlledSearch;
