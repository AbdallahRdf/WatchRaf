import { useEffect } from "react"
import { ACTIONS } from "./usePomodoro";


export const useTimerHidden = (state, dispatch) => {

  useEffect(() => {

    const handleVisibilityChange = () => {
        const elapsedTime = 0;
        const id = setInterval(() => {
            if(state.isRunning){
                if(document.visibilityState === "hidden"){
                    elapsedTime++;
                } else {
                    dispatch({ type: ACTIONS.decrement, payload: { elapsedTime }});
                    clearInterval(id);
                }
            }
        })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [])
}