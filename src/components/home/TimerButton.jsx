import { useContext } from "react"
import { timerStyle } from "../../hooks/usePomodoro";
import { StateContext } from "../../context/StateContextProvider";
import { getTimerType } from "../../util/timerType";

export const TimerButton = ({ pomo }) => {
    const {state, changeTimerType} = useContext(StateContext);
    //* action to be handled by the reducer func;
    let actionTitle = pomo;
    //* checking if we are using only the half of the title, then assign the whole title to the action;
    if(pomo == timerStyle.shortBreak.title.split(" ")[0]){
        actionTitle = timerStyle.shortBreak.title;
    }
    if (pomo == timerStyle.longBreak.title.split(" ")[0]) {
        actionTitle = timerStyle.longBreak.title;
    }

    const actionToBeDone = getTimerType(actionTitle);
    
  return (
      <button
          className={actionTitle === state.timerTypeTitle ? "select-btn selected-btn" : "select-btn"}
          onClick={() => changeTimerType(actionToBeDone)}
      >
          <span className={timerStyle.pomodoro.title === pomo ? "blue-color" : "green-color"}>{pomo}</span>
      </button>
  )
}
