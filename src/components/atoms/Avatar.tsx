import React from "react";

export type AvatarProps = {
  name: string;
  size?: "small" | "medium" | "large" | "xl";
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  name,
  size = "medium",
  className,
}) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-12 h-12 text-sm",
    large: "w-16 h-16 text-base",
    xl: "w-20 h-20 text-lg",
  };

  return (
    <div
      className={`bg-blue-500 text-white font-bold flex items-center justify-center rounded-full ${sizeClasses[size]} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
