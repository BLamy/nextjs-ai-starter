import { useState } from "react";

type SearchBoxProps = {
  onSearch: (value: string) => void;
};

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="border-2 border-gray-200 bg-white h-10 px-5 pr-12 rounded-lg text-sm focus:outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        className="absolute inset-y-0 right-0 px-4 text-gray-500"
        onClick={() => onSearch(value)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19l3-3m0 0l3-3m-3 3v-8"
          />
        </svg>
      </button>
    </div>
  );
}
