import { useEffect } from "react";
import { ACTIONS, handleTimerMechanism, timerStyle } from "./usePomodoro";

export const useWorkersAPI = (state, user, dispatch) => {
  const timerWorker = new Worker("./workerTimer.js");

  useEffect(() => {
    const handleVisibility = () => {
      if (state.isRunning) {
        if (document.visibilityState === "hidden") {
          timerWorker.postMessage({
            message: "start",
            state,
            timerStyle,
          });
        } else {
          timerWorker.postMessage("stop"); // Pause the timer when the tab is visible
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [state.isRunning, document.visibilityState]);
  
  timerWorker.addEventListener("message", (e) => {

    if (e.data === "time's up") {
      handleTimerMechanism(state, user, dispatch);
    } else {
      const elapsedTime = e.data;
      dispatch({
        type: ACTIONS.decrement,
        payload: { passedTime: elapsedTime },
      });
      console.log('form hook: ',elapsedTime);
    }
  });
}