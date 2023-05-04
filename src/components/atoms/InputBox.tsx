import React from "react";

type InputBoxProps = {
  placeholder: string;
};

const InputBox: React.FC<InputBoxProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-red-500 px-4 py-2 rounded-md"
    />
  );
};

export default InputBox;
export type { InputBoxProps };
