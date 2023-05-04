import { useState } from "react";

type SearchIconProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
};

const SearchIcon = ({
  size = 24,
  color = "currentColor",
  onClick,
}: SearchIconProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={hovered ? color : "transparent"}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
};

export default SearchIcon;
export type SearchIconProps = ReturnType<typeof SearchIcon>;
