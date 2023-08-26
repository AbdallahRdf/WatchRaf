export const TimerButton = ({ changeTimerType, pomo, state }) => {
  return (
      <button
          className={pomo === state.isPomodoro ? "select-btn selected-btn" : "select-btn"}
          onClick={() => changeTimerType(pomo)}
      >
          {pomo}
      </button>
  )
}
