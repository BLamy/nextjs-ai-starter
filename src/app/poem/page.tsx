import { generateChatCompletion } from "@/lib/ChatCompletion";
import CodeCollapsible from "@/components/CodeCollapsible";

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
    <div className="m-10">
      <CodeCollapsible
        title="User"
        code={process.env.BasicStaticPrompt as string }
        color="green"
      />
      <CodeCollapsible
        isOpenByDefault
        title="Assistant Response"
        code={JSON.stringify(res).split('\\n').map((line, i) => <p key={i}>{line}</p>)}
        color="gray"
      />
    </div>
  );
}
  