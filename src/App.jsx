import { Link, Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import { useState, useEffect } from "react";

function App() {
  let initialTime = 2*60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(()=>{
    let timer;

    if(timeRemaining>0 && isRunning){
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000)
    }else if(timeRemaining===0){
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
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stats">Stats</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={
          <Home timeRemaining={timeRemaining} isRunning={isRunning} stopTimer={stopTimer} resetTimer={resetTimer}/>
        } />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  )
}

export default App
