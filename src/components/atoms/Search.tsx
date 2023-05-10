import { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ label, placeholder, value, onChange }: TextInputProps) => {
  return (
    <label className="block">
      <span className="font-medium mb-1">{label}</span>
      <input
        className="border border-gray-400 px-3 py-2 w-full rounded focus:outline-none focus:border-blue-500"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;
export type { TextInputProps };
