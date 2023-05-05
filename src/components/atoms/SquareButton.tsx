import React from "react";
import { ReactNode } from "react";

interface SquareButtonProps {
  children: ReactNode;
}

const SquareButton = ({ children }: SquareButtonProps) => {
  return (
    <button className="w-10 h-10 bg-gray-500 text-white">{children}</button>
  );
};

export default SquareButton;
export type { SquareButtonProps };
