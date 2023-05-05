import React from "react";

type SquareButtonProps = {
  children: React.ReactNode;
};

const SquareButton: React.FC<SquareButtonProps> = ({ children }) => {
  return (
    <button className="w-6 h-6 rounded-md bg-blue-500 text-center text-white">
      {children}
    </button>
  );
};

export default SquareButton;
export type { SquareButtonProps };
