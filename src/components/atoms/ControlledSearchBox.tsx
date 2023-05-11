import { ChangeEvent, useState } from "react";

interface ControlledSearchBoxProps {
  value?: string;
  onChange?: (searchTerm: string) => void;
  placeholder?: string;
}

const ControlledSearchBox = ({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
}: ControlledSearchBoxProps) => {
  const [value, setValue] = useState(controlledValue || "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="border border-gray-300 p-2 rounded-lg w-full"
    />
  );
};

export default ControlledSearchBox;
export type { ControlledSearchBoxProps };
