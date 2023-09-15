import { useContext } from "react";
import { StateContext } from "../context/StateContextProvider";

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro, resetTimer } = useContext(StateContext);

    return (
        <button
            className={isPomodoro ? "bg-blue control-btn" : "bg-green control-btn"}
            onClick={isResetBtn ? resetTimer : stopTimer}
        >
            {isResetBtn ? "Reset" : state.isRunning ? "Pause" : "Start"}
        </button>
    )
}