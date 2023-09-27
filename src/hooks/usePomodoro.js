import { addDoc, collection, getDocs, query, updateDoc, where, getDoc } from "firebase/firestore";
import { useReducer, useEffect } from "react";
import { db } from "../firebase/firebase";
import { useTodayDoc } from "./useTodayDoc";
import { updateTodayDoc } from "./useUpdateTodayDoc";

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

export const ACTIONS = {
  stop: "stop",
  tick: "tick",
  reset: "reset",
  incrementPomoCount: "increment pomodoro count",
  incrementBreakCount: "increment Break Count",
  setPomosCount: "set pomos Count",
  setBreakCount: "set Break Count"
};

export const usePomodoro = (user) => {

  const { pomodoro, shortBreak, longBreak } = timerStyle;

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.stop:
        return {
          ...state,
          isRunning: !state.isRunning,
        };
      case ACTIONS.reset:
        let stateToReturn;
        if (payload.goToPomodoro) {
          stateToReturn = {
            ...state,
            timeRemaining: pomodoro.time,
            isPomodoro: pomodoro.title,
            isRunning: false,
          };
        } else {
          let time;
          switch (state.isPomodoro) {
            case pomodoro.title:
              time = pomodoro.time;
              break;
            case shortBreak.title:
              time = shortBreak.time;
              break;
            case longBreak.title:
              time = longBreak.time;
              break;
          }
          stateToReturn = {
            ...state,
            timeRemaining: time,
            isRunning: false,
          };
        }
        return stateToReturn;
      case ACTIONS.tick:
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
        };
      case pomodoro.title:
        return {
          ...state,
          timeRemaining: pomodoro.time,
          isPomodoro: pomodoro.title,
          isRunning: payload.shouldRun,
        };
      case shortBreak.title:
        return {
          ...state,
          timeRemaining: shortBreak.time,
          isPomodoro: shortBreak.title,
          isRunning: payload.shouldRun,
        };
      case longBreak.title:
        return {
          ...state,
          timeRemaining: longBreak.time,
          isPomodoro: longBreak.title,
          isRunning: payload.shouldRun,
        };
      case ACTIONS.incrementPomoCount:
        return {
          ...state,
          pomosCount: state.pomosCount + 25,
        };
      case ACTIONS.incrementBreakCount:
        const timeToAdd = state.isPomodoro == shortBreak.title ? 5 : 15;
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
    isPomodoro: pomodoro.title,
    pomosCount: 0,
    breakCount: 0,
  });

  const todayDocId = useTodayDoc(user, state);

  useEffect(() => {
    let timer;

    if (state.timeRemaining >= 0 && state.isRunning) {
      timer = setTimeout(() => {
        dispatch({ type: ACTIONS.tick });
      }, 1000);
    } else if (state.timeRemaining < 0) {
      if (pomodoro.title === state.isPomodoro) {
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

  return [state, dispatch, pomodoro.title === state.isPomodoro];
}