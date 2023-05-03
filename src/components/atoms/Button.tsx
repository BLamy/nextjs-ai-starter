import React, { MouseEventHandler } from "react";

export type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
