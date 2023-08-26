import {useReducer, useEffect} from "react";

export const timerStyle = {
  pomodoro: {
    time: 25,
    title: "Pomodoro",
  },
  shortBreak: {
    time: 5,
    title: "Short Break",
  },
  longBreak: {
    time: 15,
    title: "Long Break",
  },
};

export const ACTIONS = {
  stop: "stop",
  tick: "tick",
  reset: "reset",
};

export const usePomodoro = () => {

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
            timeRemaining: pomodoro.time,
            isPomodoro: pomodoro.title,
            isRunning: payload.shouldRun,
          };
        case shortBreak.title:
          return {
            timeRemaining: shortBreak.time,
            isPomodoro: shortBreak.title,
            isRunning: payload.shouldRun,
          };
        case longBreak.title:
          return {
            timeRemaining: longBreak.time,
            isPomodoro: longBreak.title,
            isRunning: payload.shouldRun,
          };
        default:
          throw new Error(`Unhandled action type: ${type}`);
      }
    };

    const [state, dispatch] = useReducer(reducer, {
      timeRemaining: pomodoro.time,
      isRunning: false,
      isPomodoro: pomodoro.title,
    });

    useEffect(() => {
      let timer;

      if (state.timeRemaining >= 0 && state.isRunning) {
        timer = setTimeout(() => {
          dispatch({ type: ACTIONS.tick });
        }, 1000);
      } else if (state.timeRemaining < 0) {
        if (state.isPomodoro === pomodoro.title) {
          dispatch({ type: shortBreak.title, payload: { shouldRun: true } });
        } else {
          dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: true } });
        }
      }

      return () => clearTimeout(timer);
    }, [state]);

    return [state, dispatch];
}