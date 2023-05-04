import React from "react";

type LargeLabelProps = {
  label: string;
};

const LargeLabel: React.FC<LargeLabelProps> = ({ label }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-32 w-full">
      <h1 className="text-3xl font-medium">{label}</h1>
    </div>
  );
};

export default LargeLabel;
export { LargeLabelProps };
