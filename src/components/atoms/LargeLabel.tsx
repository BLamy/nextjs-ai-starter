import React from "react";

type LargeLabelProps = {
  text: string;
};

const LargeLabel: React.FC<LargeLabelProps> = ({ text }) => {
  return <h1 className="text-4xl text-center font-bold">{text}</h1>;
};

export default LargeLabel;
export type { LargeLabelProps };
