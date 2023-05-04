import React from "react";

interface BasicInputProps {
  placeholder?: string;
}

const BasicInput: React.FC<BasicInputProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-red-500 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    />
  );
};

export default BasicInput;
export type BasicInputProps = { placeholder?: string };
