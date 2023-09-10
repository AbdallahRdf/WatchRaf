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
//* firebase
import { db } from "./firebase/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useFechChartData } from "./hooks/useFetchChartData";

export function App() {
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
  useFechChartData(user, state, setBreakData, setPomoData);
  // useEffect(() => {
  //   const pomoDataFromDB = [];
  //   const breakDataFromDB = [];
  //   const pomoData = [];
  //   const breakData = [];
  //   let todayBreakCount = [];
  //   let todayPomosCount = [];

  //   const fetchData = async () => {
  //     if (!user) {
  //       // console.log(
  //       //   "User is null or not yet available. Skipping data fetch."
  //       // );
  //       return;
  //     }
  //     //* setting the date for the last 28 days;
  //     const lastFourWeeksDate = new Date();
  //     lastFourWeeksDate.setDate(lastFourWeeksDate.getDate() - 28);
  //     lastFourWeeksDate.setHours(0, 0, 0, 0);

  //     const chartCollectionRef = collection(db, "chart");
  //     const queryRef = query(
  //       chartCollectionRef,
  //       where("uid", "==", user.uid),
  //       where("timestamp", ">=", lastFourWeeksDate),
  //       orderBy("timestamp", "desc")
  //     );
  //     //* will contain the date of the oldest doc in the chart collection
  //     let oldestDateInDB = new Date();

  //     const data = await getDocs(queryRef);
  //     const formattedData = data.docs.map((doc) => {
  //       const dataArr = doc.data();

  //       pomoDataFromDB.push({
  //         pomosCount: dataArr.pomodoroCount,
  //         date: dataArr.timestamp.toDate(),
  //       });

  //       breakDataFromDB.push({
  //         breaksCount: dataArr.breakCount,
  //         date: dataArr.timestamp.toDate(),
  //       });

  //       if(oldestDateInDB > dataArr.timestamp.toDate()){
  //         oldestDateInDB = new Date(dataArr.timestamp.toDate());
  //       }
  //       return dataArr;
  //     });
  //     //* gets the day, month & the year of the oldest date.
  //     const oldestDay = oldestDateInDB.getDate();
  //     const oldestMonth = oldestDateInDB.getMonth();
  //     const oldestYear = oldestDateInDB.getFullYear();

  //     const todayDate = new Date();

  //     todayPomosCount = pomoDataFromDB.filter(
  //       (pomo) => pomo.date.getDate() === todayDate.getDate()
  //     );
  //     todayBreakCount = breakDataFromDB.filter(
  //       (brek) => brek.date.getDate() === todayDate.getDate()
  //     );
  //     todayBreakCount.length > 0 && setBreaks(todayBreakCount[0].breaksCount);
  //     todayPomosCount.length > 0 && setPomos(todayPomosCount[0].pomosCount);

  //     //* pushing first the count of today
  //     pomoData.push({ pomosCount: state.pomosCount, date: new Date(todayDate) });
  //     breakData.push({ breaksCount: state.breakCount, date: new Date(todayDate) });
      
  //     todayDate.setDate(todayDate.getDate() - 1);
  //     //* in this loop, we fill in the rest of the arrays with the counts data of the last 27 days, if there is none, it fills it with 0
  //     for (let i = 1; i < 28; i++) {
  //       const currentDate = new Date(todayDate);

  //       const condition1 = breakData.some(brek => {
  //         return (brek.date.getDate()==oldestDay && brek.date.getMonth()==oldestMonth && brek.date.getFullYear()==oldestYear);
  //       });
  //       const condition2 = pomoData.some(pomo => {
  //         return (pomo.date.getDate() == oldestDay && pomo.date.getMonth() == oldestMonth && pomo.date.getFullYear() == oldestYear);
  //       });
  //       if ( condition1 && condition2 && pomoData.length%7===0){
  //         break;
  //       }
  //       //* checks if there is in the data we fetched form db a date that equals the currentDate
  //       const pomo = pomoDataFromDB.filter(
  //         (pomo) => pomo.date.getDate() === currentDate.getDate()
  //       );
  //       //* if true pushes it, if false pushes an obj with count equal 0
  //       if (pomo.length > 0) {
  //         pomoData.push(pomo[0]);
  //       } else {
  //         pomoData.push({ pomosCount: 0, date: currentDate });
  //       }

  //       //* checks if there is in the data we fetched form db a date that equals the currentDate
  //       let brek = breakDataFromDB.filter(
  //         (brek) => brek.date.getDate() === currentDate.getDate()
  //       );
  //       //* if true pushes it, if false pushes an obj with count equal 0
  //       if (brek.length > 0) {
  //         breakData.push(brek[0]);
  //       } else {
  //         breakData.push({ breaksCount: 0, date: currentDate });
  //       }
        
  //       todayDate.setDate(todayDate.getDate() - 1);
  //     }
  //     //* setting the states to the formatted data.
  //     setPomoData(pomoData.reverse());
  //     setBreakData(breakData.reverse());
  //   };

  //   fetchData();
  // }, [user]);

  
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
    setPomoData
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
