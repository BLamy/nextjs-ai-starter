import { ChangeEventHandler, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface ControlledSearchboxProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const ControlledSearchbox = ({
  value,
  onChange,
  placeholder = "Search...",
}: ControlledSearchboxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className={`h-9 ${
          isFocused ? "border-gray-700" : "border-gray-300"
        } border w-72 pl-10 pr-4 rounded-md text-sm focus:outline-none focus:border-gray-700`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="absolute left-2 top-[7px]">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default ControlledSearchbox;
export type { ControlledSearchboxProps };
