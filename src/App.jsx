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
import { useInitializeDataFromDb } from "./hooks/useInitializeDataFromDb";
//* firebase
import { auth, db } from "./firebase/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export function App() {
  const [pomoData, setPomoData] = useState([]);
  const [breakData, setBreakData] = useState([]);

  const [user, shouldRender] = useAuthUserState();

  const [state, dispatch, isPomodoro] = usePomodoro();

  const stopTimer = () => dispatch({ type: ACTIONS.stop });

  const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

  const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: { shouldRun: false } });

  const incrementPomos = () => dispatch({ type: ACTIONS.incrementPomoCount });

  const incrementBreak = () => dispatch({ type: ACTIONS.incrementBreakCount });

  const setPomos = (count) => dispatch({ type: ACTIONS.setPomosCount, payload: { count } });

  const setBreaks = (count) => dispatch({ type: ACTIONS.setBreakCount, payload: { count } });

  // const [pomoData, breakData] = useInitializeDataFromDb(state, user, setBreaks, setPomos);
  // console.log(pomoData);

  useEffect(() => {
    const pomoDataFromDB = [];
    const breakDataFromDB = [];
    const pomoData = [];
    const breakData = [];
    let todayBreakCount = [];
    let todayPomosCount = [];

    const fetchData = async () => {
      if (!user) {
        console.log(
          "User is null or not yet available. Skipping data fetch."
        );
        return;
      }
      const lastFourWeeksDate = new Date();
      lastFourWeeksDate.setDate(lastFourWeeksDate.getDate() - 28);
      lastFourWeeksDate.setHours(0, 0, 0, 0);

      const chartCollectionRef = collection(db, "chart");
      const queryRef = query(
        chartCollectionRef,
        where("uid", "==", user.uid),
        where("timestamp", ">=", lastFourWeeksDate),
        orderBy("timestamp", "asc")
      );

      const todayData = new Date();

      const data = await getDocs(queryRef);
      const formattedData = data.docs.map((doc) => {
        const dataArr = { ...doc.data() };
        pomoDataFromDB.push({
          pomosCount: dataArr.pomodoroCount,
          date: dataArr.timestamp.toDate(),
        });
        breakDataFromDB.push({
          breaksCount: dataArr.breakCount,
          date: dataArr.timestamp.toDate(),
        });
        return dataArr;
      });

      todayPomosCount = pomoDataFromDB.filter(
        (pomo) => pomo.date.getDate() === todayData.getDate()
      );
      todayBreakCount = breakDataFromDB.filter(
        (brek) => brek.date.getDate() === todayData.getDate()
      );
      todayBreakCount.length > 0 && setBreaks(todayBreakCount[0].breaksCount);
      todayPomosCount.length > 0 && setPomos(todayPomosCount[0].pomosCount);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 27);

      for (let i = 1; i < 28; i++) {
        const currentDate = new Date(startDate);

        const pomo = pomoDataFromDB.filter(
          (pomo) => pomo.date.getDate() === currentDate.getDate()
        );
        if (pomo.length > 0) {
          pomoData.push(pomo[0]);
        } else {
          pomoData.push({ pomosCount: 0, date: currentDate });
        }

        let brek = breakDataFromDB.filter(
          (brek) => brek.date.getDate() === currentDate.getDate()
        );
        if (brek.length > 0) {
          breakData.push(brek[0]);
        } else {
          breakData.push({ breaksCount: 0, date: currentDate });
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      pomoData.push({ pomosCount: state.pomosCount, date: startDate });
      breakData.push({ breaksCount: state.breakCount, date: startDate });
      setPomoData(pomoData);
      setBreakData(breakData);
    };

    fetchData();
  }, [user])

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
    breakData
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
  }, [state.isRunning]); // TODO: test if i should put state.isRunning in the arrray of dependenies.

  useTimerSound(state, isPomodoro);

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
          <Navbar user={user} />
          <MyContext.Provider value={store}>
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
