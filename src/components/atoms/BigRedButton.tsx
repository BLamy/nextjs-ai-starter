import React from "react";

interface BigRedButtonProps {
  onClick: () => void;
}

const BigRedButton: React.FC<BigRedButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-20 h-20 rounded-full bg-red-500 text-white text-lg font-bold focus:outline-none"
      onClick={onClick}
    >
      BIG
    </button>
  );
};

export default BigRedButton;
export type { BigRedButtonProps };
