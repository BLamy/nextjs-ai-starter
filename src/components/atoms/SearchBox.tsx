import { ChangeEvent, useState } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClearClick = () => {
    onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="relative bg-white rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.873-4.873"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.5 11A4.5 4.5 0 1011 15.5a4.5 4.5 0 004.5-4.5z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`block w-full pl-10 pr-3 py-2 rounded-md outline-none ${
          isFocused && "ring-2 ring-indigo-500"
        }`}
      />
      {value && (
        <button
          onClick={handleClearClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
