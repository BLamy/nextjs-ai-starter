import { FC, ChangeEvent } from "react";

type BasicInputProps = {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const BasicInput: FC<BasicInputProps> = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default BasicInput;
export type ComponentNameProps = BasicInputProps;
