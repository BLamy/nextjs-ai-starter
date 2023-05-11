import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

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
      <SearchIcon className="h-5 w-5 text-gray-500" />
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
