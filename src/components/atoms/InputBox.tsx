import React from "react";

type InputBoxProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: React.FC<InputBoxProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="py-2 px-4 border border-red-500 rounded-lg text-red-500 focus:outline-none focus:border-red-700"
    />
  );
};

export default InputBox;
