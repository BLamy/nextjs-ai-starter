import React from "react";

type TokenProps = {
  text: string;
  bgColor: string;
  textColor: string;
};

const Token: React.FC<TokenProps> = ({ text, bgColor, textColor }) => {
  return (
    <div
      className={`px-3 py-1 text-sm rounded-full bg-${bgColor} text-${textColor}`}
    >
      {text}
    </div>
  );
};

export default Token;
