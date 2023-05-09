import { useState } from "react";

interface ControlledSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ControlledSearch = ({
  value,
  onChange,
  placeholder = "Search...",
}: ControlledSearchProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      className="block w-full py-2 px-3 text-base leading-6 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
    />
  );
};

export default ControlledSearch;
export type { ControlledSearchProps };
