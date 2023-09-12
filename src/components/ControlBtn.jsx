import { useContext } from "react";
import MyContext from "../context/MyContext";

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro, resetTimer } = useContext(MyContext);

    return (
        <button
            className={isPomodoro ? "btn btn-primary control-btn" : "btn btn-success control-btn"}
            onClick={isResetBtn ? resetTimer :  stopTimer}
        >
            {isResetBtn ? "Reset" : state.isRunning ? "Pause" : "Start"}
        </button>
    )
}