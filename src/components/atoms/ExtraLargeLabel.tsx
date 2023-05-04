import React from "react";

interface ExtraLargeLabelProps {
  text: string;
}

const ExtraLargeLabel: React.FC<ExtraLargeLabelProps> = ({ text }) => {
  return <label className="text-5xl font-bold text-gray-800">{text}</label>;
};

export default ExtraLargeLabel;
export type { ExtraLargeLabelProps };
