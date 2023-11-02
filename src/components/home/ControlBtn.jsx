import { useContext } from "react";
import { StateContext } from "../../context/StateContextProvider";
import { getTimerType } from "../../util/getTimerType";

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro, changeTimerType } = useContext(StateContext);

    const actionToBeDone = getTimerType(state.timerTypeTitle);
    
    const handleClick = () => {
        isResetBtn ? changeTimerType(actionToBeDone) : stopTimer();
    }

    return (
        <button
            className={isPomodoro ? "bg-blue control-btn" : "bg-green control-btn"}
            onClick={handleClick}
        >
            {isResetBtn ? "Reset" : state.isRunning ? "Pause" : "Start"}
        </button>
    )
}