import { useState } from "react";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16.447 16.454a7 7 0 10-2.893-4.74l-1.414-1.415a1 1 0 00-1.414 1.414l1.415 1.414a7 7 0 001.893 3.872zM15 9a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBox;
export type { SearchBoxProps };
