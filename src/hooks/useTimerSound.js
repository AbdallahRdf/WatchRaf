import { useEffect, useContext } from "react";
import MyContext from "../MyContext";

export const useTimerSound = () => {
    const {state, isPomodoro} = useContext(MyContext);
    useEffect(() => {
      const id = isPomodoro ? "pomoTimerSound" : "breakTimerSound";
      const timerSound = document.getElementById(id);
      if (state.timeRemaining === 0) {
        timerSound.play();
      }
    }, [state.timeRemaining]);
}