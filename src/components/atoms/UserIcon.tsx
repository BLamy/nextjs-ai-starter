import React from "react";

interface UserIconProps {
  size?: number;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      <path d="M7.75 17.84C8.79 16.68 10.06 16 11.5 16s2.71.68 3.75 1.84" />
      <path d="M5 21a12.08 12.08 0 0 1 7-11.16V3a3 3 0 0 0-6 0v6a3 3 0 0 0-6 0v5.84A12.08 12.08 0 0 1 5 21z" />
    </svg>
  );
}

export default UserIcon;

