
import { useState } from 'react';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center rounded-full bg-gray-100 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
      <input
        type="text"
        placeholder="Search..."
        className="w-full outline-none text-lg bg-gray-100"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;

