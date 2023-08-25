import { timerStyle } from "../App";

export const Home = ({ state, stopTimer, resetTimer, changeTimerType }) => {
    const pomodoro = timerStyle.pomodoro.title;
    const shortBreak = timerStyle.shortBreak.title;
    const longBreak = timerStyle.longBreak.title;

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
                <button 
                    className={state.isPomodoro===pomodoro ? "select-btn selected-btn" :"select-btn"} 
                    onClick={() => changeTimerType(pomodoro)}
                >
                        {pomodoro}
                </button>
                <button 
                    className={state.isPomodoro === shortBreak ? "select-btn selected-btn" : "select-btn"}
                    onClick={() => changeTimerType(shortBreak)}
                >
                    {shortBreak}
                </button>
                <button 
                    className={state.isPomodoro === longBreak ? "select-btn selected-btn" : "select-btn"}
                    onClick={() => changeTimerType(longBreak)}
                >
                    {longBreak}
                </button>
            </div>

            <div className="cercle-parent">
                <div className="cercle"></div>
                <span className="clock">{timerFormatter()}</span>
            </div>
            <div className="d-grid gap-2 d-md-block pt-3">
                <button className="btn btn-primary fs-5 mx-1" onClick={stopTimer}>
                    {state.isRunning ? "pause" : "start"}
                </button>
                <button className="btn btn-primary fs-5 mx-1" onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </div>
    );
};
