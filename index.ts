import { renderTUI } from "@/tui";
import { config } from "@/config";
import { Command } from "commander";

const program = new Command();

program
  .name("polyglot")
  .description("A CLI tool to translate text between languages")
  .option("--original-language <language>", "The original language of the text", "English")
  .option("--target-language <language>", "The target language of the text", "French")
  .option("--ollama-base-url <url>", "The base URL of the Ollama server", "http://localhost:11434")
  .option("--model-name <name>", "The name of the model to use", "mistral")
  .action((options) => {
    const { originalLanguage, targetLanguage, ollamaBaseUrl, modelName } = options;
    config.originalLanguage = originalLanguage;
    config.targetLanguage = targetLanguage;
    config.ollamaBaseUrl = ollamaBaseUrl;
    config.modelName = modelName;
  });

program.parse(process.argv);

renderTUI();
