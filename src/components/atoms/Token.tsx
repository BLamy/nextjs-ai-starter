import React from "react";

interface TokenProps {
  color?: string;
}

const Token: React.FC<TokenProps> = ({ color = "bg-blue-500" }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-white ${color}`}
    ></span>
  );
};

export default Token;
export { TokenProps };
