import { timerStyle } from '../App';

export const Home = ({ stopTimer, resetTimer, state, changeTimerType }) => {

    const timerFormatter = () => {
        let minutes = Math.floor(state.timeRemaining / 60).toString();
        let seconds = (state.timeRemaining % 60).toString();
        minutes = (minutes.length == 1) ? `0${minutes}` : minutes;
        seconds = (seconds.length == 1) ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`
    }
    
    return (
        <div className="card text-center">

            <select name="timeStyle" value={state.isPomodoro} onChange={changeTimerType}>
                <option value={timerStyle.pomodoro.title}>{timerStyle.pomodoro.title}</option>
                <option value={timerStyle.shortBreak.title}>{timerStyle.shortBreak.title}</option>
                <option value={timerStyle.longBreak.title}>{timerStyle.longBreak.title}</option>
            </select>

            <div className="fs-1">
                {timerFormatter()}
            </div>
            <div className="d-grid gap-2 d-md-block">
                <button className="btn btn-outline-dark fs-5" onClick={stopTimer}>{state.isRunning ? "||" : ">"}</button>
                <button className="btn btn-outline-dark fs-5" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    ) 
}