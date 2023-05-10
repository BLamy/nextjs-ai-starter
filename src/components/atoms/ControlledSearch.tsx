import { useState } from "react";

type ControlledSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const ControlledSearch = ({ value, onChange }: ControlledSearchProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center border border-gray-400 rounded-md">
      <input
        type="text"
        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        placeholder="Search"
        value={internalValue}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-r-md hover:bg-blue-700"
        onClick={() => onChange("")}
      >
        Clear
      </button>
    </div>
  );
};

export default ControlledSearch;
export type { ControlledSearchProps };
