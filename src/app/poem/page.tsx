import { generateChatCompletion } from "@/lib/ChatCompletion";

export default async function Joke() {
  const res = await generateChatCompletion([
      { 
          role: 'user', 
          content: process.env.BasicStaticPrompt as string 
      }
  ], {
    parseResponse: false
  });
  return (
    <div>
      <h1>Tell me a poem:</h1>
      {JSON.stringify(res).split('\\n').map((line, i) => <p key={i}>{line}</p>)}
    </div>
  );
}
  