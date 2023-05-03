import React from 'react';

interface TokenProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

const Token: React.FC<TokenProps> = ({ text, backgroundColor = 'gray', textColor = 'white' }) => {
  return (
    <div
      className={}
    >
      {text}
    </div>
  )
}

export default Token;
export type { TokenProps };

