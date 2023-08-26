import { useContext } from "react";
import { TimerButton } from "../components/TimerButton";
import { timerStyle } from "../hooks/usePomodoro";
import MyContext from "../MyContext";

export const Home = () => {

    const { state, stopTimer, resetTimer } = useContext(MyContext);

    const pomodoro = timerStyle.pomodoro.title;
    const shortBreak = timerStyle.shortBreak.title;
    const longBreak = timerStyle.longBreak.title;

    const timerBtnTitle = [pomodoro, shortBreak, longBreak];

    const isPomodoro = timerStyle.pomodoro.title === state.isPomodoro;

    const timerFormatter = () => {
        let minutes = Math.floor(state.timeRemaining / 60).toString();
        let seconds = (state.timeRemaining % 60).toString();
        minutes = minutes.length == 1 ? `0${minutes}` : minutes;
        seconds = seconds.length == 1 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="timer">

            <div className="select-btns">
                {timerBtnTitle.map(btn =>
                    <TimerButton 
                        key={btn} 
                        pomo={btn} 
                    />
                )}
            </div>

            <div className="cercle-parent">
                <div className={isPomodoro ? "cercle pomo-cercle-border" : "cercle cercle-border"}></div>
                <span className={isPomodoro ? "pomo-clock" : "clock"}>{timerFormatter()}</span>
            </div>
            <div className="control-btns">
                <button 
                    className={isPomodoro ? "btn btn-primary control-btn" : "btn btn-success control-btn"} 
                    onClick={stopTimer}
                >
                    {state.isRunning ? "pause" : "start"}
                </button>
                <button 
                    className={isPomodoro ? "btn btn-primary control-btn" : "btn btn-success control-btn" } 
                    onClick={resetTimer}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
