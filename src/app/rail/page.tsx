import { generateChatCompletion } from "@/lib/ChatCompletion";
import CodeCollapsible from "@/components/CodeCollapsible";

export default async function RailExample() {
  const res = await generateChatCompletion([
      { 
          role: 'user', 
          content: process.env.GaurdRailPrompt as string 
      }
  ]);
  return (
    <div className="m-10">
      <CodeCollapsible
        title="System Prompt"
        code={process.env.GaurdRailPrompt as string }
        color="blue"
      />
      <CodeCollapsible
        isOpenByDefault
        title="Assistant Response"
        code={JSON.stringify(res, null, 2)}
        color="gray"
      />
    </div>
  );
}
  