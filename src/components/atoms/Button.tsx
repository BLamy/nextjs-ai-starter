import React from "react";

export type ButtonProps = {
  color?:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "teal"
    | "purple"
    | "pink";
  size?: "sm" | "md" | "lg";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  color = "blue",
  size = "md",
  onClick,
  disabled,
  children,
}) => {
  const sizeClass = {
    sm: "py-1.5 px-2",
    md: "py-2 px-4",
    lg: "py-3 px-5",
  };

  const colorClass = {
    red: "bg-red-500 hover:bg-red-600 focus:bg-red-700 active:bg-red-800 text-white",
    blue: "bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800 text-white",
    green:
      "bg-green-500 hover:bg-green-600 focus:bg-green-700 active:bg-green-800 text-white",
    yellow:
      "bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-700 active:bg-yellow-800 text-white",
    orange:
      "bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 active:bg-orange-800 text-white",
    teal: "bg-teal-500 hover:bg-teal-600 focus:bg-teal-700 active:bg-teal-800 text-white",
    purple:
      "bg-purple-500 hover:bg-purple-600 focus:bg-purple-700 active:bg-purple-800 text-white",
    pink: "bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 active:bg-pink-800 text-white",
  };

  return (
    <button
      className={`inline-block rounded text-center ${sizeClass[size]} ${
        colorClass[color]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
export type { ButtonProps };
