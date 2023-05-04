import React from "react";

export type PitbullProps = {
  width: number;
  height: number;
  color: string;
};

const Pitbull = ({
  width = 200,
  height = 200,
  color = "#000000",
}: PitbullProps) => {
  const bellyStyles = {
    borderBottomColor: color,
    borderBottomWidth: `${height / 2}px`,
    borderLeftColor: `transparent`,
    borderLeftWidth: `${width / 4}px`,
    borderRightColor: `transparent`,
    borderRightWidth: `${width / 4}px`,
    borderStyle: `solid`,
    height: 0,
    width: `${width}px`,
  };

  const bodyStyles = {
    borderBottomColor: color,
    borderBottomWidth: `${height / 2}px`,
    borderLeftColor: color,
    borderLeftWidth: `${width / 4}px`,
    borderRightColor: color,
    borderRightWidth: `${width / 4}px`,
    borderStyle: `solid`,
    height: 0,
    width: `${width}px`,
  };

  const headStyles = {
    borderBottomColor: color,
    borderBottomWidth: `${height / 6}px`,
    borderLeftColor: color,
    borderLeftWidth: `${width / 4}px`,
    borderRightColor: color,
    borderRightWidth: `${width / 4}px`,
    borderStyle: `solid`,
    height: 0,
    width: `${width}px`,
  };

  const noseStyles = {
    backgroundColor: color,
    borderRadius: `50%`,
    height: `${height / 8}px`,
    width: `${width / 4}px`,
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-end items-center">
        <div style={bellyStyles}></div>
        <div style={bodyStyles}></div>
        <div style={headStyles}>
          <div className="flex justify-around">
            <div style={noseStyles}></div>
            <div style={noseStyles}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitbull;
