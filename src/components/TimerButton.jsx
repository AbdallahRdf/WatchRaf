import { useContext } from "react"
import MyContext from "../MyContext"

export const TimerButton = ({ pomo }) => {
    const {state, changeTimerType} = useContext(MyContext);
  return (
      <button
          className={pomo === state.isPomodoro ? "select-btn selected-btn" : "select-btn"}
          onClick={() => changeTimerType(pomo)}
      >
          {pomo}
      </button>
  )
}
