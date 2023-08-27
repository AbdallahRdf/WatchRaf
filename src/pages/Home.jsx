import { TimerButton } from "../components/TimerButton";
import { timerStyle } from "../hooks/usePomodoro";
import { TimerCercle } from "../components/TimerCercle";
import { ControlBtn } from "../components/ControlBtn";

export const Home = () => {

    const pomodoro = timerStyle.pomodoro.title;
    const shortBreak = timerStyle.shortBreak.title;
    const longBreak = timerStyle.longBreak.title;

    const timerButtons = [pomodoro, shortBreak, longBreak].map(btn => <TimerButton key={btn} pomo={btn} />);

    return (
        <div className="timer">
            <div className="select-btns">{timerButtons}</div>
            <TimerCercle />
            <div className="control-btns">
                <ControlBtn isResetBtn={false} />
                <ControlBtn isResetBtn={true} />
            </div>
        </div>
    );
};
