import { useContext } from "react";
import MyContext from "../context/MyContext";

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro, resetTimer, screenWidth } = useContext(MyContext);

    return (
        <button
            className={isPomodoro ? "bg-blue control-btn" : "bg-green control-btn"}
            onClick={isResetBtn ? resetTimer : stopTimer}
        >
            {isResetBtn ? "Reset" : state.isRunning ? "Pause" : "Start"}
        </button>
    )
}