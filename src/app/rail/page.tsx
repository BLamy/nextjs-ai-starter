import { generateChatCompletion } from "@/lib/ChatCompletion";
import CodeCollapsible from "@/components/CodeCollapsible";

export default async function RailExample() {
  const res = await generateChatCompletion([
      { 
          role: 'user', 
          content: process.env.BankRunPrompt as string 
      }
  ], {
    model: "gpt-4"
  });
  return (
    <div className="m-10">
      <CodeCollapsible
        title="User"
        code={process.env.BankRunPrompt as string }
        color="green"
      />
      <CodeCollapsible
        isOpenByDefault
        title="Assistant"
        code={JSON.stringify(res, null, 2)}
        color="gray"
      />
    </div>
  );
}
  