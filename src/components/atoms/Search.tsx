import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
        className="flex-1 bg-transparent outline-none"
      />
      <IoSearch className="text-gray-500" />
    </div>
  );
};

export default Search;
export type { SearchProps };
