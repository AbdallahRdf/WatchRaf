import { Link, Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import { useState, useEffect } from "react";

function App() {
  let initialTime = 25*60;
  const timerStyle = {
    pomodoro: "pomodoro",
    shortBreak: "break",
    longBreak: "long break"
  }

  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(timerStyle.pomodoro);

  useEffect(()=>{
    let timer;

    if(timeRemaining>0 && isRunning){
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000)
    }else if(timeRemaining===0){
      setIsPomodoro(pre => !pre);
      setTimeRemaining(initialTime);
      setIsRunning(false)
    }
    
    return () => clearTimeout(timer);
  }, [timeRemaining, isRunning]);

  const stopTimer = () => setIsRunning(pre => !pre);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(initialTime);
  }

  return (
    <div className="wrapper">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Pomoraf</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link active" to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={
          <Home timeRemaining={timeRemaining} isRunning={isRunning} stopTimer={stopTimer} resetTimer={resetTimer}/>
        } />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
