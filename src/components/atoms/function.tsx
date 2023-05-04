import { ReactElement } from "react";

type Props = {
  onClick?: () => void;
  className?: string;
};

export default function SearchIcon({
  onClick,
  className,
}: Props): ReactElement {
  return (
    <svg
      onClick={onClick}
      className={`h-6 w-6 stroke-current text-gray-600 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.35-4.35"
      />
    </svg>
  );
}
