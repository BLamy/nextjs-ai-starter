import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface ControlledSearchboxProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const ControlledSearchbox = ({
  placeholder,
  value,
  onChange,
}: ControlledSearchboxProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-100 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <SearchIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
      {focused && (
        <button
          className="absolute right-0 top-0 bottom-0 px-4 py-2 rounded-md bg-blue-500 text-white"
          onClick={() => onChange("")}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default ControlledSearchbox;
export type { ControlledSearchboxProps };
