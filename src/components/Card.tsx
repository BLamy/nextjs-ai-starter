import Link from 'next/link';

type CardProps = {
  title: string;
  description?: string;
  href: string;
};

const Card: React.FC<CardProps> = ({ title, description, href }) => (
  <Link
    href={href}
    className="text-gray-800 hover:text-blue-800 px-4 py-2 rounded"
  >
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && <p className="mt-4 text-gray-600">{description}</p>}
    </div>
  </Link>
);

export default Card;
