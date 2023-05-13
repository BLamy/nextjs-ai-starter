import { useState } from "react";

interface SearchBoxProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchBox = ({ placeholder, onSearch }: SearchBoxProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="px-4 py-2 w-full border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M13.743,12.157l4.232,4.232c0.293,0.293 0.293,0.768 0,1.061l-1.768,1.768c-0.293,0.293 -0.768,0.293 -1.061,0l-4.232,-4.232c-2.109,1.11 -4.759,0.717 -6.514,-1.038c-1.755,-1.755 -1.99,-4.406 -0.879,-6.514l4.232,4.232c0.293,0.293 0.293,0.768 0,1.061l-1.768,1.768c-0.293,0.293 -0.768,0.293 -1.061,0l-4.232,-4.232c-1.716,1.422 -2.649,3.547 -2.283,5.645c0.366,2.097 2.147,3.878 4.244,4.244c2.097,0.366 4.222,-0.567 5.645,-2.283ZM1.727,8.273c-1.563,1.563 -1.563,4.095 0,5.657c1.563,1.563 4.095,1.563 5.657,0c1.563,-1.563 1.563,-4.095 0,-5.657c-1.563,-1.563 -4.095,-1.563 -5.657,0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
