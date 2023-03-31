import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Pick a demo</h1>
      <ul>
        <li>
          <a className={styles.a} href="/joke">
            Joke Generator
          </a>
        </li>
        <li>
          <a className={styles.a} href="/nfl">
            NFL Scores
          </a>
        </li>
      </ul>
    </main>
  );
}
