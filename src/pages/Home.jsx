import { timerStyle } from '../App';

export const Home = ({ timeRemaining, isRunning, stopTimer, resetTimer, reducer}) => {

    let minutes = Math.floor(timeRemaining / 60).toString();
    let seconds = (timeRemaining % 60).toString();
    minutes = (minutes.length == 1) ? `0${minutes}` : minutes;
    seconds = (seconds.length == 1) ? `0${seconds}` : seconds;

    return (
        <div className="card text-center">

            {/* <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul className="dropdown-menu">
                    <li onClick={()=>console.log("Action")} sel><a className="dropdown-item">Pomodoro</a></li>
                    <li onClick={()=>console.log("Another Action")}><a className="dropdown-item">Short Break</a></li>
                    <li onClick={()=>console.log("somtet Action")}><a className="dropdown-item">Long Break</a></li>
                </ul>
            </div> */}

            <select name="timeStyle">
                <option onClick={reducer} value={timerStyle.pomodoro.title}>{timerStyle.pomodoro.title}</option>
                <option onClick={reducer} value={timerStyle.shortBreak.title}>{timerStyle.shortBreak.title}</option>
                <option onClick={reducer} value={timerStyle.longBreak.title}>{timerStyle.longBreak.title}</option>
            </select>

            <div className="fs-1">
                {minutes}:{seconds}
            </div>
            <div className="btns">
                <button className="btn btn-outline-dark fs-5" onClick={stopTimer}>{isRunning ? "||" : ">"}</button>
                <button className="btn btn-outline-dark fs-5" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}