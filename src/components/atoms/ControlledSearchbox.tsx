import { ChangeEvent, useState } from "react";

interface ControlledSearchboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ControlledSearchbox = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: ControlledSearchboxProps) => {
  const [focused, setFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`relative rounded-md shadow-sm ${className}`}>
      <label htmlFor="search" className="sr-only">
        {placeholder}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3.25C6.12665 3.25 3.25 6.12665 3.25 10C3.25 13.8734 6.12665 16.75 10 16.75C10.4144 16.75 10.75 16.4144 10.75 16C10.75 15.5856 10.4144 15.25 10 15.25C7.43844 15.25 5.25 13.0616 5.25 10C5.25 6.93844 7.43844 4.75 10 4.75C12.5616 4.75 14.75 6.93844 14.75 9.5C14.75 9.91421 15.0858 10.25 15.5 10.25C15.9142 10.25 16.25 9.91421 16.25 9.5C16.25 6.12665 13.3734 3.25 10 3.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.561 16.563L20.75 20.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        id="search"
        type="text"
        className={`block w-full pl-10 sm:text-sm rounded-md 
        ${
          focused
            ? "focus:ring-1 focus:border-secondary-600 border-secondary-300"
            : "border-gray-300"
        } border
        ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default ControlledSearchbox;
export type { ControlledSearchboxProps };
