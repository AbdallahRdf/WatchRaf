import { useReducer, useEffect } from "react";
import { useTodayDoc } from "./useTodayDoc";
import { updateTodayDoc } from "./useUpdateTodayDoc";
import { useTimerHidden } from "./useTimerHidden";
import { timeFormatter } from "../util/timeFormatter";

//* creating an object that holds the three types of timers and their time in seconds.
export const timerStyle = {
  pomodoro: {
    time: 25*60,
    title: "Pomodoro",
  },
  shortBreak: {
    time: 5*60,
    title: "Short Break",
  },
  longBreak: {
    time: 15*60,
    title: "Long Break",
  },
};

//* creating ACTIONS object to store all the types of actions that are related to the timer
export const ACTIONS = {
  stop: "stop the timer",
  decrement: "decrement an amount of time from the timer",
  incrementPomoCount: "increment pomodoro count",
  incrementBreakCount: "increment Break Count",
  setPomosCount: "set pomodoros Count",
  setBreakCount: "set Breaks Count",
  setTimer: "set/reset the timer",
};

/**
 * 
 * @param user user object or it could be null if there is no user
 * @returns Array - An array containing the timer state, a dispatch function, and a boolean indicating if it's a Pomodoro timer.
 */

export const usePomodoro = (user) => {
  //* destructuring of the timerStyle object to avoid repetitive and long syntax.
  const { pomodoro, shortBreak, longBreak } = timerStyle;

  //* reducer function for the useReducer hook.
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.stop:
        return {
          ...state,
          isRunning: !state.isRunning,
        };

      case ACTIONS.setTimer:
        if (payload.goToPomodoro) {
          return {
            ...state,
            timeRemaining: pomodoro.time,
            timerTypeTitle: pomodoro.title,
            isRunning: false,
          };
        }
        return {
          ...state,
          timeRemaining: payload.timerStyle.time,
          timerTypeTitle: payload.timerStyle.title,
          isRunning: payload.shouldRun,
        };

      case ACTIONS.decrement:
        //* ACTIONS.decrement: it is used when we switch to another tab on the browser, the timer stops, when back
        //* substruct the amount of passed time.
        return {
          ...state,
          timeRemaining: state.timeRemaining - payload.passedTime,
          isRunning: true,
        };

      case ACTIONS.incrementPomoCount:
        return {
          ...state,
          pomosCount: state.pomosCount + 25,
        };

      case ACTIONS.incrementBreakCount:
        const timeToAdd = state.timerTypeTitle === shortBreak.title ? 5 : 15;
        return {
          ...state,
          breakCount: state.breakCount + timeToAdd,
        };

      case ACTIONS.setPomosCount:
        return {
          ...state,
          pomosCount: payload.count,
        };

      case ACTIONS.setBreakCount:
        return {
          ...state,
          breakCount: payload.count,
        };

      default:
        throw new Error(`Unhandled action type: ${type}`);
    }
  };

  //* the default timer to show is pomodoro;
  const [state, dispatch] = useReducer(reducer, {
    timeRemaining: pomodoro.time,
    isRunning: false,
    timerTypeTitle: pomodoro.title,
    pomosCount: 0,
    breakCount: 0,
  });
  
  const todayDocId = useTodayDoc(user, state);

  useEffect(() => {
    let timerID;

    if ( state.timeRemaining >= 0 && state.isRunning ) {

      //* each second decrement the timer;
      timerID = setTimeout(() => {
        dispatch({ type: ACTIONS.decrement, payload: { passedTime: 1 } });
      }, 1000);

    } else if (state.timeRemaining < 0) {
      if (pomodoro.title === state.timerTypeTitle) {

        user && dispatch({ type: ACTIONS.incrementPomoCount });

        dispatch({
          type: ACTIONS.setTimer,
          payload: { timerStyle: shortBreak, shouldRun: true },
        });

      } else {

        user && dispatch({ type: ACTIONS.incrementBreakCount });
        
        dispatch({
          type: ACTIONS.setTimer,
          payload: { goToPomodoro: true },
        });
      }
      user && updateTodayDoc(state, todayDocId, timerStyle);
    }

    return () => clearTimeout(timerID);
  }, [state]);

  //* handles the timer logic when we leave the tab;
  // useTimerHidden(state, dispatch);

  //* shows the time in the document title;
  useEffect(()=>{
    if(state.isRunning){
      document.title = `${timeFormatter(state.timeRemaining)} - Pomoraf`;
    } else {
      document.title = `Pomoraf`;
    }
  }, [state.timeRemaining])

  return [state, dispatch, pomodoro.title === state.timerTypeTitle];
};
