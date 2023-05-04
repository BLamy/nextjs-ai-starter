import React from "react";

type InputBoxProps = {
  placeholder?: string;
};

const InputBox = ({ placeholder = "" }: InputBoxProps) => {
  return (
    <input
      className="border-red-500 border-2 p-2 rounded-md w-40"
      placeholder={placeholder}
    />
  );
};

export default InputBox;
export type { InputBoxProps };
