import { useCallback, useEffect, useState } from 'react';

export const useTimer = (initialTime :number) => {
  const [timeLeft,setTimeLeft] = useState(initialTime)
  const [isTimeRunning, setIsTimeRunning] = useState(false)

  useEffect(() => {
      if(!isTimeRunning) return;

      if(timeLeft <= 0) {
        setIsTimeRunning(false)
        return;
      }

      const timer = setInterval(() =>  setTimeLeft(prevTime => prevTime - 1) , 1000)
      return () => clearInterval(timer)
  }, [isTimeRunning, timeLeft])

  const start = useCallback(() => setIsTimeRunning(true), []);
  const stop = useCallback(() => setIsTimeRunning(false), []);
  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsTimeRunning(false);
  }, [initialTime]);

  return { timeLeft, isTimeRunning, start, stop, reset };

}