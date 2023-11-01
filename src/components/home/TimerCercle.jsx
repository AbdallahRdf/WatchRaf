import { useContext } from "react";
import { timeFormatter } from "../../util/timeFormatter";
import { StateContext } from "../../context/StateContextProvider";

export const TimerCercle = () => {
    
    const {state, isPomodoro} = useContext(StateContext);

    const timeToBeShown = timeFormatter(state.timeRemaining);

    return (
        <div className="cercle-parent">
            <div className={isPomodoro ? "cercle pomo-cercle-border" : "cercle cercle-border"}></div>
            <span className={isPomodoro ? "pomo-clock" : "clock"}>{timeToBeShown}</span>
        </div>
    )
}