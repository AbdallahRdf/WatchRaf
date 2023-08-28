import { useEffect } from "react";

export const useTimerSound = (state, isPomodoro) => {
    useEffect(() => {
      const id = isPomodoro ? "pomoTimerSound" : "breakTimerSound";
      const timerSound = document.getElementById(id);
      if (state.timeRemaining === 0) {
        timerSound.play();
      }
    }, [state.timeRemaining]);
}