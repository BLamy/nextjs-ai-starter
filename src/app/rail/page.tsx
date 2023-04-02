import { generateChatCompletion } from "@/lib/ChatCompletion";

export default async function RailExample() {
  const res = await generateChatCompletion([
      { 
          role: 'user', 
          content: process.env.GaurdRailPrompt as string 
      }
  ]);
  console.log(process.env.GaurdRailPrompt)
  return (
    <div>
      <h1>Explain what a bank run is in a tweet.</h1>
      {JSON.stringify(res)}
    </div>
  );

}
  