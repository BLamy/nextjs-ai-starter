import { useState } from "react";

type SearchBoxProps = {
  onChange: (value: string) => void;
};

const SearchBox = ({ onChange }: SearchBoxProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center bg-white rounded-2xl px-4 py-2">
      <svg
        className="h-5 w-5 text-gray-500 fill-current"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.5 15a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm6.693-1.307a1 1 0 01-1.414 1.414l-2.828-2.828a5 5 0 111.414-1.414l2.828 2.828z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="mx-4 bg-transparent outline-none flex-1"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBox;
export type { SearchBoxProps };
