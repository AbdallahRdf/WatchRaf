import { useEffect } from "react"
import { ACTIONS } from "./usePomodoro";


export const useTimerHidden = (state, dispatch) => {

  useEffect(() => {
    let startTime = 0; //* will store the start time, when we leave the current tab;

    const handleVisibilityChange = () => {
        if(state.isRunning){
            if(document.visibilityState === "hidden"){
                startTime = new Date();
            }else if (document.visibilityState === "visible") {
                const passedTime = Math.round((new Date() - startTime) / 1000); //* calculate how much time passed;
                dispatch({ type: ACTIONS.decrement, payload: { passedTime } });
            }
        }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state.isRunning])
}