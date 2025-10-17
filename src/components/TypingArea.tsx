"use client";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useRef } from "react";
import { useTypingGame } from "@/context/typingGameContext";
import { GameOverModal } from "./GameOverModal";
import { useCapsLock } from "@/hooks/useCapsLock";

export const TypingArea = () => {
  const {
    isFinished,
    isTimeRunning,
    timeLeft,
    handleKey,
    resetGame,
    text,
    userInput,
  } = useTypingGame();

  const { isCapsLockOn, handleKeyEvent } = useCapsLock();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, [handleKeyEvent]);

  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [text]);

  const getChar = (char: string, index: number) => {
    const currentIndex = userInput.length;

    if (index === currentIndex) return "border-b-2";

    if (!userInput[index]) return "text-gray-400";

    return userInput[index] === char ? "text-emerald-500" : "text-rose-500";
  };

  return (
    <div
      className="border-2 border-neutral-700 rounded-md p-4 focus:outline-none"
      tabIndex={0}
      onKeyDown={(e) => handleKey(e.key)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          {isFinished
            ? "✅ Finished!"
            : isTimeRunning
            ? `⏳ ${timeLeft}s left`
            : "💡 Start typing!"}
        </span>

        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
        >
          Reset Game
        </button>
      </div>

      <div className="relative">
        {/* <pre className="language-ts text-white m-0">
          <code ref={codeRef} className={`language-js`}>
            {text}
          </code>
        </pre> */}

        {/* 2️⃣ Foreground layer — user's typing progress */}
        <pre className=" inset-0 pointer-events-none m-0 p-4 whitespace-pre-wrap font-mono">
          {text.split("").map((char, index) => (
            <span key={index} className={getChar(char, index)}>
              {char}
            </span>
          ))}
        </pre>
      </div>

      {isCapsLockOn && (
        <div className="mt-2 text-yellow-400 text-sm">⚠️ Caps Lock is ON</div>
      )}

      <GameOverModal />
    </div>
  );
};
