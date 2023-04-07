"use client";
import React, { useState } from "react";

type Props = {
  title: string;
  code: string | JSX.Element[];
  isOpenByDefault?: boolean;
  color: "blue" | "green" | "red" | "gray";
};
const CodeCollapsible: React.FC<Props> = ({
  title,
  code,
  isOpenByDefault,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(!!isOpenByDefault);

  const buttonColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-4">
      <button
        className={`w-full text-white font-bold py-2 px-4 rounded-t focus:outline-none focus:shadow-outline flex justify-between items-center ${
          buttonColors[color] || buttonColors.gray
        }`}
        onClick={handleToggle}
      >
        <span className="capitalize">{title}</span>
        <svg
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <pre className="border-t border-gray-200 p-4 bg-gray-800 text-white font-mono rounded-b overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

export default CodeCollapsible;
