import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // prettier-ignore
  const nflTeams = [ 
    "49ers", "Bears", "Bengals", "Bills", "Broncos", "Browns", "Buccaneers", "Cardinals", 
    "Chargers", "Chiefs", "Colts", "Commanders", "Cowboys", "Dolphins", "Eagles", "Falcons", 
    "Giants", "Jaguars", "Jets", "Lions", "Packers", "Panthers", "Patriots", "Raiders", 
    "Rams", "Ravens", "Saints", "Seahawks", "Steelers", "Texans", "Titans", "Vikings",
  ];
  return (
    <main className={styles.main}>
      <ul>
        {nflTeams.map((teamName) => (
          <li key={teamName}>
            <a className={styles.a} href={`/nfl/${teamName}`}>
              {teamName}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
