import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
}

const SearchIcon: React.FC<Props> = ({ className = '', onClick }) => {
  return (
    <svg
      className={}
      fill=none
      stroke=currentColor
      viewBox=0 0 24 24
      xmlns=http://www.w3.org/2000/svg
      onClick={onClick}
    >
      <path
        strokeLinecap=round
        strokeLinejoin=round
        strokeWidth={2}
        d=M11 17l-5-5M11 7a4 4 0 100 8 4 4 0 000-8zM20 20l-4-4
      />
    </svg>
  );
};

export default SearchIcon;

