import { useContext } from "react";
import MyContext from "../context/MyContext";
import pauseImg from '../img/icons8-pause-64.png';
import playImg from '../img/icons8-play-64.png';
import resetImg from '../img/icons8-reset-50.png';

export const ControlBtn = ({isResetBtn}) => {

    const { state, stopTimer, isPomodoro, resetTimer, screenWidth } = useContext(MyContext);

    return (
        <>
            {   (screenWidth <= 411) 
                ?
                <button
                    className={isPomodoro ? "bg-blue control-btn-icon" : "bg-green control-btn-icon"}
                    onClick={isResetBtn ? resetTimer : stopTimer}
                >
                    <img
                        className={isResetBtn ? 'reset-icon' : state.isRunning ? 'pause-icon' : 'play-icon'}
                        src={isResetBtn ? resetImg : state.isRunning ? pauseImg : playImg} alt="button image"
                    />
                </button>
                :
                <button
                    className={isPomodoro ? "bg-blue control-btn" : "bg-green control-btn"}
                    onClick={isResetBtn ? resetTimer : stopTimer}
                >
                    {isResetBtn ? "Reset" : state.isRunning ? "Pause" : "Start"}
                </button>
            }
        </>
    )
}