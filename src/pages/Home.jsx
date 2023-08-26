import { timerStyle } from "../App";

export const Home = ({ state, stopTimer, resetTimer, changeTimerType }) => {
    const pomodoro = timerStyle.pomodoro.title;
    const shortBreak = timerStyle.shortBreak.title;
    const longBreak = timerStyle.longBreak.title;

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

    const PomoStyle = {
        border: isPomodoro ? "8px #0D6EFD40 solid" : "8px #19875440 solid",
    }

    const color = {
        color: isPomodoro ? "#0D6EFD" : "#198754",
    }

    const controlBtnsStyle = isPomodoro ? "btn btn-primary control-btn" : "btn btn-success control-btn";

    return (
        <div className="timer">
            
            <div className="select-btns">
                <button 
                    className={isPomodoro ? "select-btn selected-btn" :"select-btn"} 
                    onClick={() => changeTimerType(pomodoro)}
                >
                        {pomodoro}
                </button>
                <button 
                    className={isShortBreak ? "select-btn selected-btn" : "select-btn"}
                    onClick={() => changeTimerType(shortBreak)}
                >
                    {shortBreak}
                </button>
                <button 
                    className={isLongBreak ? "select-btn selected-btn" : "select-btn"}
                    onClick={() => changeTimerType(longBreak)}
                >
                    {longBreak}
                </button>
            </div>

            <div className="cercle-parent">
                <div style={PomoStyle} className="cercle"></div>
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
