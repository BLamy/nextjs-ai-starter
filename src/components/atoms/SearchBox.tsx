import { useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/solid";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBoxProps) {
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
      <SearchIcon className="h-5 w-5 absolute left-2 text-gray-400" />
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="py-2 pl-10 pr-8 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {inputValue !== "" && (
        <XIcon
          className="h-5 w-5 absolute right-2 text-gray-400 cursor-pointer"
          onClick={handleClearClick}
        />
      )}
    </div>
  );
}

export type { SearchBoxProps };
