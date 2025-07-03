import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { config } from "@/config";

const model = new ChatOllama({
  model: config.modelName,
  baseUrl: config.ollamaBaseUrl,
});

const systemTemplate = "Translate the following from {originalLanguage} into {targetLanguage}";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

export async function translate(originalLanguage: string, targetLanguage: string, text: string): Promise<string> {
  const promptValue = await promptTemplate.invoke({
    originalLanguage,
    targetLanguage,
    text,
  });
  const response = await model.invoke(promptValue);
  return response.content.toString();
}
