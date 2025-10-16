"use client";
import { useTypingGame } from "@/context/typingGameContext";
import { GrClose } from "react-icons/gr";
import { motion } from "motion/react";
import { useStats } from "@/hooks/useStats";

export const GameOverModal = () => {
  const { resetGame, isTimeRunning, userInput } = useTypingGame();
  const { calculateWPM } = useStats();
  if (isTimeRunning) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center gap-10 bg-black/50 text-black"
    >
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-zinc-800 text-white w-140 rounded-lg p-8"
      >
        <div className="flex items-center justify-between border-b border-gray-600 pb-5">
          <h1 className="text-2xl font-medium tracking-[2px]">Report</h1>
          <button>
            <GrClose size={25} />
          </button>
        </div>
        <div className="grid grid-cols-2 mt-5 border-b border-gray-600 pb-5">
          <div className="bg-amber-100 w-50 h-50">
            <span className="text-black text-3xl">
              {calculateWPM(userInput, 5)}
            </span>
          </div>
          <div className="bg-amber-100"></div>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md cursor-pointer"
          >
            retry
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
