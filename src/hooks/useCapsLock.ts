import { useState } from "react";

export const useCapsLock = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleKeyEvent = (e: globalThis.KeyboardEvent) => {
    const caps = e.getModifierState && e.getModifierState("CapsLock");
    setIsCapsLockOn(caps);
  };

  return { isCapsLockOn, handleKeyEvent };
};
