import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

type ControlledSearchBoxProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const ControlledSearchBox = ({
  value,
  onValueChange,
}: ControlledSearchBoxProps) => {
  const [focused, setFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor="searchbox" className="sr-only">
        Search
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="searchbox"
          id="searchbox"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${
            focused ? "ring-2 ring-primary-500" : ""
          } block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export type { ControlledSearchBoxProps };
export default ControlledSearchBox;
