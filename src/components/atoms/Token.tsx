import React from "react";

type TokenProps = {
  text: string;
  color?: string;
};

const Token: React.FC<TokenProps> = ({ text, color = "#3182CE" }) => {
  return (
    <div
      className={`bg-${color} inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-white`}
    >
      {text}
    </div>
  );
};

export default Token;

