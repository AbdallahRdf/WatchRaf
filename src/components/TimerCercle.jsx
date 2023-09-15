import { useContext } from "react";
import { useTimeFormatter } from "../hooks/useTimeFormatter";
import { StateContext } from "../context/StateContextProvider";

export const TimerCercle = () => {
    
    const {isPomodoro} = useContext(StateContext);

    const timeToBeShown = useTimeFormatter();

    return (
        <div className="cercle-parent">
            <div className={isPomodoro ? "cercle pomo-cercle-border" : "cercle cercle-border"}></div>
            <span className={isPomodoro ? "pomo-clock" : "clock"}>{timeToBeShown}</span>
        </div>
    )
}