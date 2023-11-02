import { useContext } from "react";
import { timeFormatter } from "../../util/timeFormatter";
import { StateContext } from "../../context/StateContextProvider";

import { getTimerType } from "../../util/getTimerType";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const TimerCercle = () => {
    
    const {state, isPomodoro} = useContext(StateContext);

    const timeToBeShown = timeFormatter(state.timeRemaining);

    const maxTime = getTimerType(state.timerTypeTitle).time;

    return (
        <div className="cercle-parent">
            <CircularProgressbar 
                minValue={0} 
                maxValue={maxTime} 
                value={state.timeRemaining} 
                text={timeToBeShown} 
                styles={buildStyles({
                    trailColor: "#eee",
                    pathColor: isPomodoro ? '#0D6EFD' : '#198754',
                    textColor: isPomodoro ? '#0D6EFD' : '#198754',
                    textSize: '1.6rem',
                })}
                strokeWidth={3}
            />
        </div>
    )
}