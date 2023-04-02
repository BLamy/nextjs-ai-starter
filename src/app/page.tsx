import Card from "../components/Card";
import styles from "./page.module.css";

const demos = [
  {
    title: "Basic Poem Demo",
    description: "A static prompt. No arguments. No specific ouput. Just a poem.",
    href: "/poem",
  },
  {
    title: "Joke Generator Basic Demo",
    description: "A simple joke generator, can take 2 arguments to customize response.",
    href: "/joke",
  },
  {
    title: "NFL Scores Agents Demo",
    description:
      "Fetches NFL scores using 2 different tools (search & calculator).",
    href: "/nfl",
  },
  {
    title: "Docs",
    description: "Explore our documentation.",
    href: "http://docs.nextjs.ai/",
  },
] as const;

export default function Home() {
  return (
    <main className={`mt-10 flex-grow ${styles["min-h-screen-wrapper"]}`}>
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
    </main>
  );
}
