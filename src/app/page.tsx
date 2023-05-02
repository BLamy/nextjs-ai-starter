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
      "Fetches NFL scores using 2 different tools (search & calculator). Note: search results are scraped poorly to show error handling.",
    href: "/nfl",
  },
  {
    title: "Access Control Demo",
    description:
      "Allows admins to describe rules for access control using natural language and GPT will submit a PR to update it's own code.",
    href: "https://accesscontrol.nextjs.ai/",
  },
  {
    title: "Static Embeddings Demo",
    description:
      "Uses a static sqlite database to query for embedding on the client side.",
    href: "/sqlite",
  },
  {
    title: "Guardrails Demo",
    description: "Loads prompt from a Guardrails file.",
    href: "/rail",
  },
  {
    title: "Docs",
    description: "Explore our documentation.",
    href: "https://docs.nextjs.ai/",
  },
  {
    title: "Discord",
    description: "Join our discord.",
    href: "https://discord.gg/2F2bHSma",
  },
  {
    title: "Github",
    description: "Clone the code",
    href: "https://github.com/blamy/nextjs-ai-starter",
  },
] as const;

export default function Home() {
  return (
    <div className="container mx-auto w-full h-full overflow-y-scroll">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
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
