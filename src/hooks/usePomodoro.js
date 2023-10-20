import { useReducer, useEffect } from "react";
import { useTodayDoc } from "./useTodayDoc";
import { updateTodayDoc } from "./useUpdateTodayDoc";
import { useTimerHidden } from "./useTimerHidden";

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
  stop: "stop",
  tick: "tick",
  decrement: "decrement",
  reset: "reset",
  incrementPomoCount: "increment pomodoro count",
  incrementBreakCount: "increment Break Count",
  setPomosCount: "set pomodoros Count",
  setBreakCount: "set Breaks Count"
};

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
      case ACTIONS.reset:
        //* payload.goToPomodoro: specifies which timer to show after the reset.
        //* using stateToReturn to know which timer style to show after reseting the timer.
        let stateToReturn;
        if (payload.goToPomodoro || state.timerTypeTitle === pomodoro.title) {
          stateToReturn = {
            ...state,
            timeRemaining: pomodoro.time,
            timerTypeTitle: pomodoro.title,
          };
        } else {
          let time;
          if (state.timerTypeTitle === shortBreak.title){
            time = shortBreak.time;
          } else {
            time = longBreak.time;
          }
          stateToReturn = {
            ...state,
            timeRemaining: time,
          };
        }
        return {...stateToReturn, isRunning: false};
      case ACTIONS.tick:
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
        };
      case ACTIONS.decrement:
        //* ACTIONS.decrement: it is used when we switch to another tab on the browser, the timer stops, when back
        //* substruct the amount of passed time.
        return {
          ...state,
          timeRemaining: state.timeRemaining - payload.passedTime,
          isRunning: true,
        };
      case pomodoro.title:
        return {
          ...state,
          timeRemaining: pomodoro.time,
          timerTypeTitle: pomodoro.title,
          isRunning: payload.shouldRun,
        };
      case shortBreak.title:
        return {
          ...state,
          timeRemaining: shortBreak.time,
          timerTypeTitle: shortBreak.title,
          isRunning: payload.shouldRun,
        };
      case longBreak.title:
        return {
          ...state,
          timeRemaining: longBreak.time,
          timerTypeTitle: longBreak.title,
          isRunning: payload.shouldRun,
        };
      case ACTIONS.incrementPomoCount:
        return {
          ...state,
          pomosCount: state.pomosCount + 25,
        };
      case ACTIONS.incrementBreakCount:
        const timeToAdd = state.timerTypeTitle == shortBreak.title ? 5 : 15;
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

  const [state, dispatch] = useReducer(reducer, {
    timeRemaining: pomodoro.time,
    isRunning: false,
    timerTypeTitle: pomodoro.title,
    pomosCount: 0,
    breakCount: 0,
  });

  const todayDocId = useTodayDoc(user, state);

  useEffect(() => {
    let timer;

    if (
      state.timeRemaining >= 0 &&
      state.isRunning 
      &&
      document.visibilityState === "visible"
    ) {
      timer = setTimeout(() => {
        dispatch({ type: ACTIONS.tick });
      }, 1000);
    } else if (state.timeRemaining < 0) {
      if (pomodoro.title === state.timerTypeTitle) {
        user && dispatch({ type: ACTIONS.incrementPomoCount });
        dispatch({ type: shortBreak.title, payload: { shouldRun: true } });
      } else {
        user && dispatch({ type: ACTIONS.incrementBreakCount });
        dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: true } });
      }
      user && updateTodayDoc(state, todayDocId, timerStyle);
    }

    return () => clearTimeout(timer);
  }, [state]);

  useTimerHidden(state, dispatch);

  return [state, dispatch, pomodoro.title === state.timerTypeTitle];  
}