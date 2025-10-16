"use client";
import { useTimer } from "@/hooks/useTimer";
import { snippets } from "@/lib/snippets";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TypingGameContext {
  text: string;
  userInput: string;
  isFinished: boolean;
  handleKey: (key: string) => void;
  resetGame: () => void;
  timeLeft: number;
  isTimeRunning: boolean;
}

interface TypingGameProviderProps {
  children: ReactNode;
}

const typingGameContext = createContext({} as TypingGameContext);

export default function TypingGameProvider({
  children,
}: TypingGameProviderProps) {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const { timeLeft, start, stop, reset, isTimeRunning } = useTimer(30);

  const pickSnippet = () =>
    snippets[Math.floor(Math.random() * snippets.length)];

  useEffect(() => {
    setText(pickSnippet());
  }, []);

  const handleKey = (key: string) => {
    if (isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
      start();
    }

    // Backspace
    if (key === "Backspace") {
      setUserInput((prev) => prev.slice(0, -1));
      return;
    }

    // Ignore non-character keys
    if (key.length !== 1) return;

    setUserInput((prev) => {
      const newUserInput = prev + key;

      // If finished entire text
      if (newUserInput === text) {
        setIsFinished(true);
        stop();
        return newUserInput;
      }

      // === AUTO NEWLINE HANDLING ===
      const nextChar = text[newUserInput.length];

      // If user reached end of a line (next char is newline)
      if (nextChar === "\n") {
        // find the following lines after this newline
        const rest = text.slice(newUserInput.length + 1);

        // split by newline to analyze what's ahead
        const linesAhead = rest.split("\n");

        // find the first non-empty line
        const nextNonEmpty = linesAhead.find((l) => l.trim().length > 0);

        // count how many empty lines before that one
        const skippedLines = linesAhead.indexOf(nextNonEmpty ?? "");

        // build the correct number of newlines + indentation
        const indentationMatch = nextNonEmpty?.match(/^[\t ]*/);
        const indentation = indentationMatch ? indentationMatch[0] : "";

        // Add one newline per skipped line + indentation
        const autoInsert =
          "\n".repeat(skippedLines >= 0 ? skippedLines + 1 : 1) + indentation;

        return newUserInput + autoInsert;
      }

      return newUserInput;
    });
  };

  useEffect(() => {
    if (timeLeft <= 0 && !isTimeRunning) {
      setIsFinished(true);
      stop();
    }
  }, [timeLeft, isTimeRunning, stop]);

  const resetGame = () => {
    setText(pickSnippet());
    setUserInput("");
    setIsFinished(false);
    setStartTime(null);
    reset();
  };

  return (
    <typingGameContext.Provider
      value={{
        text,
        userInput,
        isFinished,
        handleKey,
        resetGame,
        timeLeft,
        isTimeRunning,
      }}
    >
      {children}
    </typingGameContext.Provider>
  );
}

export const useTypingGame = () => {
  const ctx = useContext(typingGameContext);
  if (!ctx)
    throw new Error("useTypingGame must be used within TypingGameProvider");
  return ctx;
};
