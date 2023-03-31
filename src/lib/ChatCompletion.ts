import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));
export async function generateChatCompletion(
  messages: ChatCompletionRequestMessage[]
): Promise<Record<string, any>> {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0
  });

  try {
    return JSON.parse(
      response.data.choices[0].message?.content.replace("Here's your response:", "") || '{ "error": "No response" }'
    );
  } catch (e) {
    return { error: "json parse error", msg: response.data.choices[0].message?.content };
  }
};
