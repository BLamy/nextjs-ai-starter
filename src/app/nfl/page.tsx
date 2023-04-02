import Card from "../../components/Card";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function NFL() {
  // prettier-ignore
  const nflTeams = [ 
    "49ers", "Bears", "Bengals", "Bills", "Broncos", "Browns", "Buccaneers", "Cardinals", 
    "Chargers", "Chiefs", "Colts", "Commanders", "Cowboys", "Dolphins", "Eagles", "Falcons", 
    "Giants", "Jaguars", "Jets", "Lions", "Packers", "Panthers", "Patriots", "Raiders", 
    "Rams", "Ravens", "Saints", "Seahawks", "Steelers", "Texans", "Titans", "Vikings",
  ];
  return (
    <ul>
      {nflTeams.map((teamName) => (
        <Card key={teamName} title={teamName} href={`/nfl/${teamName}`} />
      ))}
    </ul>
  );
}
