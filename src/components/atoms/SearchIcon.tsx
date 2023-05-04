import React from "react";

interface SearchIconProps {
  className?: string;
  onClick?: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ className = "", onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 17l-4-4m0 0l-4-4m4 4l4-4m-4 4h12m0-4H7"
    />
  </svg>
);

export default SearchIcon;
export type { SearchIconProps };
