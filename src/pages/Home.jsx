import { TimerButton } from "../components/TimerButton";
import { timerStyle } from "../hooks/usePomodoro";

export const Home = ({ state, stopTimer, resetTimer, changeTimerType }) => {

    const pomodoro = timerStyle.pomodoro.title;
    const shortBreak = timerStyle.shortBreak.title;
    const longBreak = timerStyle.longBreak.title;

    const timerBtnTitle = [pomodoro, shortBreak, longBreak];

    const isPomodoro = timerStyle.pomodoro.title === state.isPomodoro;
    const isShortBreak = timerStyle.shortBreak.title === state.isPomodoro;
    const isLongBreak = timerStyle.longBreak.title === state.isPomodoro;

    const timerFormatter = () => {
        let minutes = Math.floor(state.timeRemaining / 60).toString();
        let seconds = (state.timeRemaining % 60).toString();
        minutes = minutes.length == 1 ? `0${minutes}` : minutes;
        seconds = seconds.length == 1 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    };

    let cercleBorder, color, controlBtnsStyle;
    if (isPomodoro) {
        cercleBorder = {
            border: "8px #0D6EFD40 solid"
        }
        color = {
            color: "#0D6EFD"
        }
        controlBtnsStyle = "btn btn-primary control-btn";
    }else {
        cercleBorder = {
            border: "8px #19875440 solid"
        }
        color = {
            color: "#198754"
        }
        controlBtnsStyle = "btn btn-success control-btn";
    }

    return (
        <div className="timer">

            <div className="select-btns">
                {timerBtnTitle.map(btn =>
                    <TimerButton key={btn} changeTimerType={changeTimerType} pomo={btn} state={state} />
                )}
            </div>

            <div className="cercle-parent">
                <div style={cercleBorder} className="cercle"></div>
                <span style={color} className="clock">{timerFormatter()}</span>
            </div>
            <div className="control-btns">
                <button className={controlBtnsStyle} onClick={stopTimer}>
                    {state.isRunning ? "pause" : "start"}
                </button>
                <button className={controlBtnsStyle} onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </div>
    );
};
