export type Config = {
  ollamaBaseUrl: string;
  modelName: string;
  originalLanguage: string;
  targetLanguage: string;
};

export const config: Config = {
  ollamaBaseUrl: "http://localhost:11434",
  modelName: "mistral",
  originalLanguage: "English",
  targetLanguage: "French",
};
