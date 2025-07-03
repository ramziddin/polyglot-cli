import { render, Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { useChat } from "./use-chat";
import { translate } from "@/translator/translate";
import { config } from "@/config";

function ChatTUI() {
  const [state, dispatch] = useChat();

  useInput(async (inputKey, key) => {
    if (state.isLoading) return;

    if (key.return && state.input.length > 0) {
      dispatch({ type: "submit-text", text: state.input });
      dispatch({ type: "loading" });
      const translated = await translate(config.originalLanguage, config.targetLanguage, state.input);
      dispatch({ type: "submit-translation", text: translated });
    } else if (key.backspace || key.delete) {
      dispatch({ type: "input", text: state.input.slice(0, -1) });
    } else {
      dispatch({ type: "input", text: state.input + inputKey });
    }
  });

  const prompt = <Text color="green">{state.isLoading ? <Spinner type="dots" /> : "›"}</Text>;
  const userInput = <Box>{prompt}<Text>{` ${state.input}`}</Text></Box>;

  return (
    <Box flexDirection="column">
      <Box flexDirection="column">
        {state.history.map((line, i) => <Text key={i}>{line}</Text>)}
      </Box>
      {userInput}
    </Box>
  );
}

export function renderTUI() {
  render(<ChatTUI />);
}
