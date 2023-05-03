import React from \'react\';

type TokenProps = {
  text: string;
  bgColor: string;
  textColor: string;
};

const Token: React.FC<TokenProps> = ({ text, bgColor, textColor }) => {
  return (
    <div
      className={`rounded-full py-1 px-4 text-sm font-medium text-\{textColor} bg-\{bgColor}-100 border border-\{bgColor}-200`}
    >
      {text}
    </div>
  );
};

export default Token;
export type { TokenProps };

