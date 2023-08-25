import { Link, Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import { useReducer, useEffect } from "react";

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

  const reducer = (state, action) => {
    const {type} = action;
    switch (type) {
      case ACTIONS.stop: 
        return {
          ...state,
          isRunning: !state.isRunning
        }
      case ACTIONS.reset: 
        return {
          timeRemaining: timerStyle.pomodoro.time,
          isPomodoro: timerStyle.pomodoro.title,
          isRunning: false
        }
      case ACTIONS.tick: 
        return {...state, timeRemaining: state.timeRemaining-1}
      case timerStyle.pomodoro.title:
        return {
          timeRemaining: timerStyle.pomodoro.time,
          isPomodoro: timerStyle.pomodoro.title,
          isRunning: true
        }
      case timerStyle.shortBreak.title:
        return {
          timeRemaining: timerStyle.shortBreak.time,
          isPomodoro: timerStyle.shortBreak.title,
          isRunning: true
        }
      case timerStyle.longBreak.title:
        return {
          timeRemaining: timerStyle.longBreak.time,
          isPomodoro: timerStyle.longBreak.title,
          isRunning: true
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
        dispatch({type: timerStyle.shortBreak.title});
      }else{
        dispatch({type: ACTIONS.reset})
      }
    }
    
    return () => clearTimeout(timer);
  }, [state]);

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset });

  const changeTimerType = (event) => dispatch({type: event.target.value})

  return (
    <div className="wrapper">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid px-5">
          <a className="navbar-brand logo" href="/">Pomoraf</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={
          <Home state={state} stopTimer={stopTimer} resetTimer={resetTimer} changeTimerType={changeTimerType}/>
        } />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}
