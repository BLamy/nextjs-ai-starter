import { useState } from "react";

type SearchBoxProps = {
  placeholder?: string;
  onSearch: (searchValue: string) => void;
};

const SearchBox = ({ placeholder = "Search", onSearch }: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        className="border border-gray-400 rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearch}
      />
      <button
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        type="button"
        onClick={() => onSearch(searchValue)}
      >
        Search
      </button>
    </div>
  );
};

export type SearchBoxProps = SearchBoxProps;
export default SearchBox;
