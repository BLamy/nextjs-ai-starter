import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface ControlledSearchBoxProps {
  value: string;
  onChange: (searchText: string) => void;
}

const ControlledSearchBox = ({ value, onChange }: ControlledSearchBoxProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative flex items-center border border-gray-300 bg-gray-100 rounded-full">
      <input
        className="px-4 py-2 bg-transparent rounded-full outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search Here"
      />
      <button className="absolute right-0 px-4">
        <IoSearch className="text-gray-500" size={18} />
      </button>
    </div>
  );
};

export default ControlledSearchBox;
export type { ControlledSearchBoxProps };
