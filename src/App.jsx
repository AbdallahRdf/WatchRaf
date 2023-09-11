import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
//* pages
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
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
import { useFechChartData } from "./hooks/useFetchChartData";
import { useScreenWidth } from "./hooks/useScreenWidth";

export function App() {
  //* return the screen width
  const screenWidth = useScreenWidth();

  //* will contain the chart data for the user in the last 28 days
  const [pomoData, setPomoData] = useState([]);
  const [breakData, setBreakData] = useState([]);

  //* it returns the user object, the 'shouldRender' specifies if the user obj is still loading or not
  const [user, shouldRender] = useAuthUserState();

  //* creates and return the timer state
  const [state, dispatch, isPomodoro] = usePomodoro(user);

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: { shouldRun: false } });

  const incrementPomos = () => dispatch({ type: ACTIONS.incrementPomoCount });

  const incrementBreak = () => dispatch({ type: ACTIONS.incrementBreakCount });

  const setPomos = (count) => dispatch({ type: ACTIONS.setPomosCount, payload: { count } });

  const setBreaks = (count) => dispatch({ type: ACTIONS.setBreakCount, payload: { count } });

  //* fetches the data if the user is available.
  useFechChartData(user, state, setBreakData, setPomoData, setPomos, setBreaks);
  
  //* check if the state.pomosCount changed, so to update the pomoData state, because it is used in stats page (chart)
  useEffect(() => {
    if (user && state.pomosCount !== pomoData[pomoData.length - 1].pomosCount) {
      setPomoData((prevState) => {
        const todayStats = prevState.pop();
        prevState.push({ pomosCount: state.pomosCount, date: todayStats.date });
        return prevState;
      })
    }
  }, [state.pomosCount]);
  
  //* check if the state.breakCount changed, so to update the breakData state, because it is used in stats page (chart)  
  useEffect(() => {
    if (user && state.breakCount !== breakData[breakData.length - 1].breaksCount) {
      setBreakData((prevState) => {
        const todayStats = prevState.pop();
        prevState.push({ breaksCount: state.breakCount, date: todayStats.date });
        return prevState;
      })
    }
  }, [state.breakCount]);
  
  const store = {
    state,
    isPomodoro,
    changeTimerType,
    stopTimer,
    resetTimer,
    incrementPomos,
    incrementBreak,
    setPomos,
    setBreaks,
    user,
    pomoData,
    breakData,
    setBreakData,
    setPomoData,
    screenWidth
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

  //* plays the audio file if the timer is up
  useTimerSound(state, isPomodoro);

  //* is DOM Content loaded 
  const [isLoading] = useLoading();

  return (
    <>
      { isLoading || !shouldRender
        ?
        <Spinner />
        :
        <>
          <audio id="pomoTimerSound" className="d-hidden" src={pomoTimerSoundFile} preload="auto"></audio>
          <audio id="breakTimerSound" className="d-hidden" src={breakTimeSoundFile} preload="auto"></audio>
          <MyContext.Provider value={store}>
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </MyContext.Provider>
        </>
      }
    </>
  )
}
