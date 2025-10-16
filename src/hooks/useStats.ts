export const useStats = () => {
  const calculateWPM = (userInput: string, timeInSeconds: number) => {
    const totalChars = userInput.length;
    const words = totalChars / 5;
    const timeMinutes = timeInSeconds / 60;
    const wpm = words / timeMinutes;

    return Math.round(wpm) || 0;
  };

  return { calculateWPM };
};
