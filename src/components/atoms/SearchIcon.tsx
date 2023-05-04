import { FC } from "react";

interface SearchIconProps {
  strokeColor?: string;
  strokeWidth?: number;
  size?: number;
}

const SearchIcon: FC<SearchIconProps> = ({
  strokeWidth = 2,
  strokeColor = "#000",
  size = 24,
}) => {
  const halfStrokeWidth = strokeWidth / 2;
  const strokePadding = 2;
  const viewBoxSize = size + strokePadding * 2 + strokeWidth;

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={size / 2 + strokePadding + halfStrokeWidth}
        cy={size / 2 + strokePadding + halfStrokeWidth}
        r={(size - strokeWidth) / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <path
        d={`M${size + strokePadding} ${size + strokePadding}L${
          size / 2 + strokePadding + halfStrokeWidth * 2
        } ${size / 2 + strokePadding + halfStrokeWidth * 2}`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
export type { SearchIconProps };
