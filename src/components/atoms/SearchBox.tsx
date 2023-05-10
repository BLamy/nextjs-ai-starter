import { useState } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleClearClick = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <div className="relative flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute left-2 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 1a7 7 0 015.775 11.22l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A7 7 0 118 1zm0 2a5 5 0 100 10A5 5 0 008 3z"
          clipRule="evenodd"
        />
      </svg>
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="py-2 pl-10 pr-8 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {inputValue !== "" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-2 text-gray-400 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleClearClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
