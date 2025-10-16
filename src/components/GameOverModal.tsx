"use client";
import { useTypingGame } from "@/context/typingGameContext";
import { GrClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import { useStats } from "@/hooks/useStats";

export const GameOverModal = () => {
  const { resetGame, userInput, isFinished } = useTypingGame();
  const { calculateWPM } = useStats();

  return (
    <AnimatePresence>
      {isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex justify-center gap-10 bg-black/50 text-black z-50"
        >
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: 0 }}
            exit={{ y: -250 }}
            transition={{ duration: 0.4 }}
            className="bg-neutral-800 text-white w-125 h-max rounded-lg mt-20 px-4 py-6 mx-5 sm:mx-0"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-medium tracking-[2px]">Report</h1>
              <button onClick={resetGame} className="cursor-pointer">
                <GrClose size={25} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 border-y border-gray-600 py-5 gap-4">
              <div className="bg-neutral-700 rounded-lg px-5 pt-6 pb-12 flex flex-col gap-1">
                <span className="font-medium tracking-[2px] uppercase text-blue-500">
                  WPM
                </span>
                <span className="text-4xl tracking-[2px]">
                  {calculateWPM(userInput, 30)}
                </span>
              </div>
              <div className="bg-neutral-700 rounded-lg px-5 pt-6 pb-12 flex flex-col gap-1">
                <span className="font-medium tracking-[2px] uppercase text-sky-500">
                  Accuracy
                </span>
                <span className="text-4xl tracking-[2px]">98%</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-5">
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md cursor-pointer tracking-[2px] transition"
              >
                Retry
              </button>
              <button
                onClick={resetGame}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md cursor-pointer tracking-[2px] transition"
              >
                Next Example
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
