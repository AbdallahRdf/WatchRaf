import { Link, Route, Routes } from "react-router-dom"
import {Home} from "./pages/Home";
import {Stats} from "./pages/Stats";
import Navbar from "./components/Navbar";
import { usePomodoro, ACTIONS } from "./hooks/usePomodoro";

export function App() {

  const [state, dispatch] = usePomodoro();
  
  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: {shouldRun: false}})

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
