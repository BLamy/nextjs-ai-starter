import { ChangeEvent, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface SearchboxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Searchbox = ({
  placeholder = "Search",
  value,
  onChange,
  className,
}: SearchboxProps) => {
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={className}>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          className="py-2 pr-2 pl-7 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <SearchIcon className="w-5 h-5 absolute ml-2 text-gray-400" />
      </div>
      {focus && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg">
          <ul>
            <li>Search Result 1</li>
            <li>Search Result 2</li>
            <li>Search Result 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export type { SearchboxProps };
export default Searchbox;
