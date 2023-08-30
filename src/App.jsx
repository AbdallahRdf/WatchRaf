import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
//* pages
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";
import { Signup } from "./pages/Signup";
//* components
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner"
//* context file
import MyContext from "./context/MyContext";
//* sound files
import pomoTimerSoundFile from "./audio/microwave-timer-sound.mp3";
import breakTimeSoundFile from "./audio/bicycle-bell.mp3";
//* custom hooks
import { usePomodoro, ACTIONS } from "./hooks/usePomodoro";
import { useTimerSound } from "./hooks/useTimerSound";
import { useAuthUserState } from "./hooks/useAuthUserState";
import { useLoading } from './hooks/useLoading';

export function App() {

  const [state, dispatch, isPomodoro] = usePomodoro();

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: { shouldRun: false } });

  const store = {
    state,
    isPomodoro,
    changeTimerType,
    stopTimer,
    resetTimer
  }

  //* prevent the page from being refreshed or closed while the timer is running
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (state.isRunning) {
        event.preventDefault();
        event.returnValue = "are you sure you want to refresh the page ?";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state.isRunning]);

  useTimerSound(state, isPomodoro);

  const [isLoading] = useLoading();

  const [user, shouldRender] = useAuthUserState();

  return (
    <>
      { isLoading || !shouldRender
        ?
        <Spinner />
        :
        <>
          <audio id="pomoTimerSound" className="d-hidden" src={pomoTimerSoundFile} preload="auto"></audio>
          <audio id="breakTimerSound" className="d-hidden" src={breakTimeSoundFile} preload="auto"></audio>
          <Navbar user={user} />
          <MyContext.Provider value={store}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </MyContext.Provider>
        </>
      }
    </>
  )
}
