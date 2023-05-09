import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface ControlledSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ControlledSearch: React.FC<ControlledSearchProps> = ({
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search"
        className="w-full py-2 pl-8 pr-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />

      <SearchIcon className="absolute inset-y-0 left-0 w-5 h-5 mx-3 my-auto text-gray-600" />

      {isFocused && (
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm3.707 11.707a.999.999 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a.999.999 0 1 1-1.414-1.414L8.586 10l-2.293-2.293a.999.999 0 1 1 1.414-1.414L10 8.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L11.414 10l2.293 2.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ControlledSearch;
export type { ControlledSearchProps };
