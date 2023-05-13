import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

type ControlledSearchboxProps = {
  value: string;
  onChange: (value: string) => void;
};

const ControlledSearchbox = ({ value, onChange }: ControlledSearchboxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const containerStyles = `border rounded-md p-2 flex items-center ${
    isFocused ? "border-blue-500" : "border-gray-300"
  } focus-within:border-blue-500`;

  return (
    <div className={containerStyles}>
      <SearchIcon className="h-5 w-5 text-gray-600 mr-2" />
      <input
        type="text"
        className="outline-none flex-1"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search..."
      />
    </div>
  );
};

export type { ControlledSearchboxProps };
export default ControlledSearchbox;
