import React from \'react\';
import PropTypes from \'prop-types\';

interface TokenProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

const Token: React.FC<TokenProps> = ({ text, bgColor = \'bg-gray-300\', textColor = \'text-gray-800\' }) => (
  <span 
    className={`inline-block   px-2 py-1 rounded-md`}
  >
    {text}
  </span>
);

Token.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Token;

