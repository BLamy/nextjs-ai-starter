import React from "react";

interface SquareButtonProps {
  children: React.ReactNode;
}

const SquareButton: React.FC<SquareButtonProps> = ({ children }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
};

export default SquareButton;
export type { SquareButtonProps };
