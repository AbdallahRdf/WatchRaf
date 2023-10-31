import { useContext } from "react";
import { StateContext } from "../../context/StateContextProvider";
import { timerStyle } from "../../hooks/usePomodoro";

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro, changeTimerType } = useContext(StateContext);

    let actionToBeDone;
    if (state.timerTypeTitle === timerStyle.pomodoro.title) {
        actionToBeDone = timerStyle.pomodoro;
    } else if (state.timerTypeTitle === timerStyle.shortBreak.title) {
        actionToBeDone = timerStyle.shortBreak;
    } else {
        actionToBeDone = timerStyle.longBreak;
    }
    
    const handleClick = () => {
        if(isResetBtn){
            changeTimerType(actionToBeDone);
        }else{
            stopTimer();
        }
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