import { useContext } from "react";
import MyContext from "../MyContext";

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro } = useContext(MyContext);

    return (
        <button
            className={isPomodoro ? "btn btn-primary control-btn" : "btn btn-success control-btn"}
            onClick={stopTimer}
        >
            {isResetBtn ? "Reset" : state.isRunning ? "pause" : "start"}
        </button>
    )
}