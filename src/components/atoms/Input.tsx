import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center bg-gray-200 rounded-l w-10 h-10">
        <SearchIcon className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-3 py-2 bg-gray-200 focus:outline-none rounded-r"
      />
    </div>
  );
};

export default Input;
export type { InputProps };
