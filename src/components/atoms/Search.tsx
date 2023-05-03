import React from 'react';

type Props = {
  size?: number;
  color?: string;
};

const SearchIcon: React.FC<Props> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns=http://www.w3.org/2000/svg
      width={size}
      height={size}
      viewBox=0 0 24 24
    >
      <path
        fill={color}
        d=M15.5,14h-.79l-.28-.27A6.47,6.47,0,1,0,15,8a6.51,6.51,0,0,0-4.24,1.55L9.71,8.29A1,1,0,0,0,8.29,9.71l2.06,2.06a6.47,6.47,0,0,0-1.55,4.24,6.5,6.5,0,0,0,6.5,6.5,6.47,6.47,0,0,0,4.24-1.55l2.06,2.06a1,1,0,0,0,1.42-1.42l-2.06-2.06A6.51,6.51,0,0,0,15.5,14ZM8,14a4,4,0,1,1,4-4A4,4,0,0,1,8,14Z
      />
    </svg>
  );
};

export default SearchIcon;

