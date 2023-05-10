import { ChangeEvent, useState } from "react";

interface ControlledSearchboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ControlledSearchbox = ({
  value,
  onChange,
  placeholder = "Search...",
}: ControlledSearchboxProps) => {
  const [query, setQuery] = useState(value);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onChange(inputValue);
  };

  return (
    <input
      type="text"
      className="border rounded-md p-2 outline-none"
      placeholder={placeholder}
      value={query}
      onChange={handleInput}
    />
  );
};

export default ControlledSearchbox;
export type { ControlledSearchboxProps };
