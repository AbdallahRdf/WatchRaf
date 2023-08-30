import { useContext } from "react";
import MyContext from "../context/MyContext";
import { useTimeFormatter } from "../hooks/useTimeFormatter";

export const TimerCercle = () => {
    
    const {isPomodoro} = useContext(MyContext);

    const timeToBeShown = useTimeFormatter();

    return (
        <div className="cercle-parent">
            <div className={isPomodoro ? "cercle pomo-cercle-border" : "cercle cercle-border"}></div>
            <span className={isPomodoro ? "pomo-clock" : "clock"}>{timeToBeShown}</span>
        </div>
    )
}