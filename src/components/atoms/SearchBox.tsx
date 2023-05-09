import { ChangeEvent, useState } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
        className="border border-gray-200 rounded shadow px-4 py-2 w-64"
      />
    </div>
  );
}

export type { SearchBoxProps };
