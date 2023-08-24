import { Link, Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import { useState, useEffect } from "react";

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

  const [timeRemaining, setTimeRemaining] = useState(timerStyle.pomodoro.time);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(timerStyle.pomodoro.title);

  useEffect(()=>{
    let timer;

    if(timeRemaining >= 0 && isRunning){
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000)
    }else if(timeRemaining < 0){
      if(isPomodoro===timerStyle.pomodoro.title){
        setTimeRemaining(timerStyle.shortBreak.time);
        setIsPomodoro(timerStyle.shortBreak.title);
      }else{
        resetTimer();
      }
    }
    
    return () => clearTimeout(timer);
  }, [timeRemaining, isRunning]);

  const stopTimer = () => setIsRunning(pre => !pre);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(timerStyle.pomodoro.time);
    setIsPomodoro(timerStyle.pomodoro.title);
  }

  const reducer = (event)=>{
    switch(event.target.value){
      case timerStyle.pomodoro.title:
        setTimeRemaining(timerStyle.pomodoro.time);
        setIsPomodoro(timerStyle.pomodoro.title); 
        break;
      case timerStyle.shortBreak.title:
        setTimeRemaining(timerStyle.shortBreak.time);
        setIsPomodoro(timerStyle.shortBreak.title);
        break;
      case timerStyle.longBreak.title:
        setTimeRemaining(timerStyle.longBreak.time);
        setIsPomodoro(timerStyle.longBreak.title);
        break;
    }
    setIsRunning(true);
  }

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
          <Home timeRemaining={timeRemaining} isRunning={isRunning} stopTimer={stopTimer} resetTimer={resetTimer} reducer={reducer}/>
        } />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}
