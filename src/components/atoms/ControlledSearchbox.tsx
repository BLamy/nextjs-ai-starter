import { ChangeEvent, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/classNames";

interface ControlledSearchboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ControlledSearchbox = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: ControlledSearchboxProps) => {
  const [focused, setFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classNames("relative rounded-md shadow-sm", className)}>
      <label htmlFor="search" className="sr-only">
        {placeholder}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        id="search"
        type="text"
        className={classNames(
          "block w-full pl-10 sm:text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
          {
            "focus:ring-1 focus:border-secondary-600": focused,
            "border-secondary-300": focused,
            "border-gray-300": !focused,
          },
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default ControlledSearchbox;
export type { ControlledSearchboxProps };
