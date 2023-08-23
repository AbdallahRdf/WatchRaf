export const Home = ({ timeRemaining, isRunning, stopTimer, resetTimer}) => {

    let minutes = Math.floor(timeRemaining / 60).toString();
    let seconds = (timeRemaining % 60).toString();
    minutes = (minutes.length == 1) ? `0${minutes}` : minutes;
    seconds = (seconds.length == 1) ? `0${seconds}` : seconds;

    return (
        <>
            <div>
                {minutes}:{seconds}
            </div>
            <button onClick={stopTimer}>{isRunning ? "||" : ">"}</button>
            <button onClick={resetTimer}>Reset</button>
        </>
    )
}