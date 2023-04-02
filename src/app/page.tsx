import Card from "../components/Card";

const demos = [
  {
    title: "Basic Poem Demo",
    description: "A static prompt. No arguments. No specific ouput. Just a poem.",
    href: "/poem",
  },
  {
    title: "Joke Generator Basic Demo",
    description: "A simple joke generator, can take 2 arguments to customize response.",
    href: "/joke?jokeType=dad&count=3",
  },
  {
    title: "NFL Scores Agents Demo",
    description:
      "Fetches NFL scores using 2 different tools (search & calculator).",
    href: "/nfl",
  },
  {
    title: "Gaurdrails Demo",
    description: "Loads prompt from a gaurdrails file.",
    href: "/rail",
  },
  {
    title: "Docs",
    description: "Explore our documentation.",
    href: "http://docs.nextjs.ai/",
  },
] as const;

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {demos.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            href={card.href}
          />
        ))}
      </div>
    </div>
  );
}
