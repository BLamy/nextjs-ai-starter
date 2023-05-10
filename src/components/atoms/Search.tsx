import { useState } from "react";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const Search = ({ value, onChange }: SearchProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="flex items-center max-w-md border-b border-b-2 border-teal-500 py-2">
      <input
        value={inputValue}
        onChange={handleChange}
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <button
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded ml-2"
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export type { SearchProps };
export default Search;
