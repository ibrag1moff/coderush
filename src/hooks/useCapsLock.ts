import { useState } from "react";

export const useCapsLock = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleKeyEvent = (e: KeyboardEvent) => {
    const caps = e.getModifierState && e.getModifierState("CapsLock");
    setIsCapsLockOn(caps);
  };

  return { isCapsLockOn, handleKeyEvent };
};
