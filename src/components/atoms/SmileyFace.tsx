import React from "react";

type Props = {
  size?: number;
  color?: string;
};

const SmileyFace: React.FC<Props> = ({ size = 64, color = "#FCD34D" }) => {
  return (
    <div className="relative w-1/2" style={{ paddingBottom: "50%" }}>
      <div
        className="absolute rounded-full h-4/5 w-4/5 flex justify-center items-center"
        style={{ top: "25%", backgroundColor: color }}
      >
        <div
          className="absolute rounded-full h-1/2 w-full bottom-0"
          style={{ backgroundColor: "#000" }}
        />
        <div
          className="absolute h-1/4 w-1/4 rounded-full"
          style={{ backgroundColor: "#fff", bottom: "25%", left: "25%" }}
        ></div>
        <div
          className="absolute h-1/4 w-1/4 rounded-full"
          style={{ backgroundColor: "#fff", bottom: "25%", right: "25%" }}
        ></div>
      </div>
    </div>
  );
};

export default SmileyFace;
export type { Props };
