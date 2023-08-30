import { useContext } from "react";
import MyContext from "../context/MyContext";

export const useTimeFormatter = () => {
    const {state} = useContext(MyContext);

    if (state.timeRemaining < 0) {
    return "00:00";
    }
    let minutes = Math.floor(state.timeRemaining / 60).toString();
    let seconds = (state.timeRemaining % 60).toString();
    minutes = minutes.length == 1 ? `0${minutes}` : minutes;
    seconds = seconds.length == 1 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}