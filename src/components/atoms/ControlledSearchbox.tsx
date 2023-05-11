import { useState } from "react";

interface ControlledSearchboxProps {
  placeholder: string;
  query: string;
  onChange: (query: string) => void;
}

const ControlledSearchbox = ({
  placeholder,
  query,
  onChange,
}: ControlledSearchboxProps) => {
  const [value, setValue] = useState(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative">
        <input
          id="search"
          className="block w-full px-4 py-2 leading-5 text-gray-700 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          placeholder={placeholder}
          type="search"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ControlledSearchbox;
export type { ControlledSearchboxProps };
