import { useContext } from "react";
import MyContext from "../MyContext";
import { useTimeFormatter } from "../hooks/useTimeFormatter";
import pomoTimerSoundFile from "../audio/microwave-timer-sound.mp3";
import breakTimeSoundFile from "../audio/bicycle-bell.mp3";
import { useTimerSound } from "../hooks/useTimerSound";

export const TimerCercle = () => {
    
    const {isPomodoro} = useContext(MyContext);

    const timeToBeShown = useTimeFormatter();

    useTimerSound();

    return (
        <div className="cercle-parent">
            <div className={isPomodoro ? "cercle pomo-cercle-border" : "cercle cercle-border"}></div>
            <span className={isPomodoro ? "pomo-clock" : "clock"}>{timeToBeShown}</span>
            <audio id="pomoTimerSound" className="audio-hidden" src={pomoTimerSoundFile} preload="auto"></audio>
            <audio id="breakTimerSound" className="audio-hidden" src={breakTimeSoundFile} preload="auto"></audio>
        </div>
    )
}