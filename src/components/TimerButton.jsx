import { useContext } from "react"
import MyContext from "../context/MyContext"
import { timerStyle } from "../hooks/usePomodoro";

export const TimerButton = ({ pomo }) => {
    const {state, changeTimerType} = useContext(MyContext);
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
          className={pomo === state.isPomodoro ? "select-btn selected-btn" : "select-btn"}
          onClick={() => changeTimerType(action)}
      >
          <span className={timerStyle.pomodoro.title === pomo ? "blue-color" : "green-color"}>{pomo}</span>
      </button>
  )
}
