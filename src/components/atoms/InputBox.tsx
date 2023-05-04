import React from "react";

type InputBoxProps = {
  placeholder: string;
};

const InputBox: React.FC<InputBoxProps> = ({ placeholder }) => {
  return (
    <input
      className="border-red-500 border-2 p-2 rounded-lg focus:outline-none focus:border-red-700"
      type="text"
      placeholder={placeholder}
    />
  );
};

export default InputBox;
export type { InputBoxProps };
