import { Link, Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import { useReducer, useEffect } from "react";
import Navbar from "./components/Navbar";

export const timerStyle = {
  pomodoro: {
    time: 25,
    title: "Pomodoro"
  },
  shortBreak: {
    time: 5,
    title: "Short Break"
  },
  longBreak: {
    time: 15,
    title: "Long Break"
  }
}

export function App() {

  const ACTIONS = {
    stop: "stop",
    tick: "tick",
    reset: "reset"
  }

  const reducer = (state, {type, payload}) => {
    switch (type) {
      case ACTIONS.stop: 
        return {
          ...state,
          isRunning: !state.isRunning
        }
      case ACTIONS.reset: 
        let stateToReturn;
        if(payload.backToPomo){
          stateToReturn = {
            timeRemaining: timerStyle.pomodoro.time,
            isPomodoro: timerStyle.pomodoro.title,
            isRunning: false
          }
        } else {
          let time;
          switch(state.isPomodoro){
            case timerStyle.pomodoro.title: time = timerStyle.pomodoro.time; break;
            case timerStyle.shortBreak.title: time = timerStyle.shortBreak.time; break;
            case timerStyle.longBreak.title: time = timerStyle.longBreak.time; break;
          }
          stateToReturn = {
            ...state,
            timeRemaining: time,
            isRunning: false
          }
        }
        return stateToReturn;
      case ACTIONS.tick: 
        return {
          ...state, 
          timeRemaining: state.timeRemaining-1
        }
      case timerStyle.pomodoro.title:
        return {
          timeRemaining: timerStyle.pomodoro.time,
          isPomodoro: timerStyle.pomodoro.title,
          isRunning: payload.run
        }
      case timerStyle.shortBreak.title:
        return {
          timeRemaining: timerStyle.shortBreak.time,
          isPomodoro: timerStyle.shortBreak.title,
          isRunning: payload.run
        }
      case timerStyle.longBreak.title:
        return {
          timeRemaining: timerStyle.longBreak.time,
          isPomodoro: timerStyle.longBreak.title,
          isRunning: payload.run
        }
      default: throw new Error(`Unhandled action type: ${type}`);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    timeRemaining: timerStyle.pomodoro.time,
    isRunning: false,
    isPomodoro: timerStyle.pomodoro.title
  })

  useEffect(()=>{
    let timer;

    if(state.timeRemaining >= 0 && state.isRunning){
      timer = setTimeout(() => {
        dispatch({type: ACTIONS.tick});
      }, 1000)
    }else if(state.timeRemaining < 0){
      if(state.isPomodoro===timerStyle.pomodoro.title){
        dispatch({ type: timerStyle.shortBreak.title, payload: {run: true}});
      }else{
        dispatch({type: ACTIONS.reset, payload: {backToPomo: true}})
      }
    }
    
    return () => clearTimeout(timer);
  }, [state]);

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { backToPomo: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: {run: false}})

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Home state={state} stopTimer={stopTimer} resetTimer={resetTimer} changeTimerType={changeTimerType}/>
        } />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}
