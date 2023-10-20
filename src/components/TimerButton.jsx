import { useContext } from "react"
import { timerStyle } from "../hooks/usePomodoro";
import { StateContext } from "../context/StateContextProvider";

export const TimerButton = ({ pomo }) => {
    const {state, changeTimerType} = useContext(StateContext);
    //* action to be handled by the reducer func;
    let action = pomo;
    //* checking if we are using only the half of the title, then assign the whole title to the action;
    if(pomo == timerStyle.shortBreak.title.split(" ")[0]){
        action = timerStyle.shortBreak.title;
    }
    if (pomo == timerStyle.longBreak.title.split(" ")[0]) {
        action = timerStyle.longBreak.title;
    }

  return (
      <button
          className={action === state.timerTypeTitle ? "select-btn selected-btn" : "select-btn"}
          onClick={() => changeTimerType(action)}
      >
          <span className={timerStyle.pomodoro.title === pomo ? "blue-color" : "green-color"}>{pomo}</span>
      </button>
  )
}
