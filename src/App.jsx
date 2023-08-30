import { Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import { Stats } from "./pages/Stats";
import { Signup } from "./pages/Signup";
import Navbar from "./components/Navbar";
import { usePomodoro, ACTIONS } from "./hooks/usePomodoro";
import MyContext from "./context/MyContext";
import { useEffect } from "react";
import { useTimerSound } from "./hooks/useTimerSound";

import pomoTimerSoundFile from "./audio/microwave-timer-sound.mp3";
import breakTimeSoundFile from "./audio/bicycle-bell.mp3";

export function App() {
  
  const [state, dispatch, isPomodoro] = usePomodoro();

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: {shouldRun: false}});

  const store = {
    state,
    isPomodoro,
    changeTimerType,
    stopTimer,
    resetTimer
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if(state.isRunning){
        event.preventDefault();
        event.returnValue = "are you sure you want to refresh the page ?";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state.isRunning]);

  useTimerSound(state, isPomodoro);

  return (
    <>
      <audio id="pomoTimerSound" className="audio-hidden" src={pomoTimerSoundFile} preload="auto"></audio>
      <audio id="breakTimerSound" className="audio-hidden" src={breakTimeSoundFile} preload="auto"></audio>
      <Navbar />
      <MyContext.Provider value={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MyContext.Provider>
    </>
  )
}
