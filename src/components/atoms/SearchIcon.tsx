import { FC } from "react";

interface SearchIconProps {
  size?: number;
  color?: string;
}

const SearchIcon: FC<SearchIconProps> = ({ size = 24, color = "#000" }) => {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 14h-.79l-.28-.27c1.2-1.39 1.95-3.18 1.95-5.23 0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8c2.05 0 3.93-.75 5.39-1.99l.27.28v.79l5 4.99L20.49 18l-4.99-5zm-7 0c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

export default SearchIcon;
export type { SearchIconProps };
