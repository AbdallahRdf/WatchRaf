import { useContext } from "react";
import MyContext from "../MyContext";

export const TimerCercle = () => {
    
    const {state, isPomodoro} = useContext(MyContext);

    const timerFormatter = () => {
        let minutes = Math.floor(state.timeRemaining / 60).toString();
        let seconds = (state.timeRemaining % 60).toString();
        minutes = minutes.length == 1 ? `0${minutes}` : minutes;
        seconds = seconds.length == 1 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="cercle-parent">
            <div className={isPomodoro ? "cercle pomo-cercle-border" : "cercle cercle-border"}></div>
            <span className={isPomodoro ? "pomo-clock" : "clock"}>{timerFormatter()}</span>
        </div>
    )
}