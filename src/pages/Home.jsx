import { TimerButton } from "../components/TimerButton";
import { timerStyle } from "../hooks/usePomodoro";
import { TimerCercle } from "../components/TimerCercle";
import { ControlBtn } from "../components/ControlBtn";
import { useContext } from "react";
import MyContext from "../context/MyContext";

export const Home = () => {

    const { screenWidth } = useContext(MyContext);

    const shortTitleForShortBreak = timerStyle.shortBreak.title.split(" ")[0];
    const shortTitleForLongBreak = timerStyle.longBreak.title.split(" ")[0];

    const pomodoro = timerStyle.pomodoro.title;
    const shortBreak = screenWidth > 480 ? timerStyle.shortBreak.title : shortTitleForShortBreak;
    const longBreak = screenWidth > 480 ? timerStyle.longBreak.title : shortTitleForLongBreak;

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
