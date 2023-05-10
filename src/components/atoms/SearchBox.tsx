import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="flex items-center rounded-lg w-full bg-white p-2 shadow-lg">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pr-10 pl-4 font-medium text-gray-700 rounded-lg border 
                   border-gray-300 focus:outline-none focus:border-indigo-500 text-sm"
      />
      <button
        type="submit"
        onClick={handleSearch}
        className="text-gray-600 rounded-lg bg-white hover:text-gray-700 focus:outline-none 
                   focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 
                   transition duration-150 ease-in-out"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
export type { SearchBoxProps };
