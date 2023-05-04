import { ChangeEvent } from "react";

interface ControlledInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ControlledInput = ({ value, onChange }: ControlledInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="py-2 px-3 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
  );
};

export default ControlledInput;
export type { ControlledInputProps };
