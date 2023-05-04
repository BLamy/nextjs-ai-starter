interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return <label className="text-4xl font-bold">{text}</label>;
};

export default Label;
export type { LabelProps };
