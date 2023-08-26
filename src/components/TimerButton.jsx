import { useContext } from "react"
import MyContext from "../MyContext"
import { timerStyle } from "../hooks/usePomodoro";

export const TimerButton = ({ pomo }) => {
    const {state, changeTimerType} = useContext(MyContext);
  return (
      <button
          className={pomo === state.isPomodoro ? "select-btn selected-btn" : "select-btn"}
          onClick={() => changeTimerType(pomo)}
      >
          <span className={timerStyle.pomodoro.title === pomo ? "blue-color" : "green-color"}>{pomo}</span>
      </button>
  )
}
