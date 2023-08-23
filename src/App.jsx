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
      <nav className="w-50">
        <ul className="list">
          <li className="list-item"><a className="list-link logo" href="/">Pomoraf</a></li>
          <li className="list-item"><Link className="list-link" to="/">Home</Link></li>
          <li className="list-item"><Link className="list-link" to="/stats">Stats</Link></li>
        </ul>
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
