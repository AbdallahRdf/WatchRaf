import { Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import Navbar from "./components/Navbar";
import { usePomodoro, ACTIONS } from "./hooks/usePomodoro";
import MyContext from "./MyContext";

export function App() {
  
  const [state, dispatch] = usePomodoro();

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: {shouldRun: false}});

  const store = {
    state,
    changeTimerType,
    stopTimer,
    resetTimer
  }

  return (
    <>
      <Navbar />
      <MyContext.Provider value={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </MyContext.Provider>
    </>
  )
}
