import { timerStyle } from "../hooks/usePomodoro";

//* return the timer type object that contains the title and the time
export const getTimerType = (title) => {
    if (title === timerStyle.pomodoro.title) {
      return timerStyle.pomodoro;
    } else if (title === timerStyle.shortBreak.title) {
      return timerStyle.shortBreak;
    }
    return timerStyle.longBreak;
}