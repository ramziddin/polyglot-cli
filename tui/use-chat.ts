import { useReducer } from "react";

export function useChat() {
  return useReducer(reducer, initialState);
}

type State = {
  history: string[];
  input: string;
  isLoading: boolean;
};

const initialState: State = {
  input: "",
  history: [],
  isLoading: false,
};

type Action = {
  type: "input";
  text: string;
} | {
  type: "loading";
} | {
  type: "submit-text";
  text: string;
} | {
  type: "submit-translation";
  text: string;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "input":
      return { ...state, input: action.text, isLoading: false };

    case "submit-text":
      return { ...state, history: [...state.history, `You: ${action.text}`], isLoading: false, input: "" };

    case "submit-translation":
      return { ...state, history: [...state.history, `Translated: ${action.text}`], isLoading: false, input: "" };

    case "loading":
      return { ...state, isLoading: true };
  }
}
