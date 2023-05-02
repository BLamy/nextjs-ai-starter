import Card from "@/components/atoms/Card";

export default function NFL() {
  // prettier-ignore
  const nflTeams = [ 
    "49ers", "Bears", "Bengals", "Bills", "Broncos", "Browns", "Buccaneers", "Cardinals", 
    "Chargers", "Chiefs", "Colts", "Commanders", "Cowboys", "Dolphins", "Eagles", "Falcons", 
    "Giants", "Jaguars", "Jets", "Lions", "Packers", "Panthers", "Patriots", "Raiders", 
    "Rams", "Ravens", "Saints", "Seahawks", "Steelers", "Texans", "Titans", "Vikings",
  ];
  return (
    <ul className="container mx-auto w-full h-full overflow-y-scroll">
      {nflTeams.map((teamName) => (
        <Card key={teamName} title={teamName} href={`/nfl/${teamName}`} />
      ))}
    </ul>
  );
}
