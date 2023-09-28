import { useEffect } from "react";
import { ACTIONS, timerStyle } from "./usePomodoro";

export const useWorkersAPI = (state, dispatch) => {
  const timerWorker = new Worker("./workerTimer.js");

  useEffect(() => {
    const handleVisibility = () => {
      if (state.isRunning) {
        if (document.visibilityState === "hidden") {
          timerWorker.postMessage({
            message: 'start',
            state,
            timerStyle
          });
        } else {
          timerWorker.postMessage("stop"); // Pause the timer when the tab is not visible
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [state.isRunning]);
  
  timerWorker.addEventListener("message", (e) => {
    const elapsedTime = e.data;
    dispatch({
      type: ACTIONS.decrement,
      payload: { passedTime: parseInt(elapsedTime / 1000) },
    });
    console.log(parseInt(elapsedTime / 1000));
  });
}