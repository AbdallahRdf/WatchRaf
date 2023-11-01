import { useEffect, useState } from "react"
import { ACTIONS } from "./usePomodoro";

/*
  useTimerHidden: this custom hook stops the timer, and starts counting how many seconds passes when
  we leave the timer tab to another tab, and when we are back it uses the dispatch to decrement 
  the passed time from the timer.
*/
export const useTimerHidden = (state, dispatch) => {
  const [isTimerInBackground, setIsTimerInBackground] = useState(false);
  let theStartTime;

  const getPassedTime = () => {
    return Math.round((new Date() - theStartTime) / 1000);
  }

  const checkIfTimerIsUp = () => {
    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        clearInterval(intervalId); // Clear the interval when the tab becomes visible.
      }

      const passedTime = getPassedTime();
      console.log("in hidden, passedTime: " + passedTime);
      if (passedTime >= state.timeRemaining) {
        dispatch({
          type: ACTIONS.decrement,
          payload: { passedTime: state.timeRemaining },
        });
        setIsTimerInBackground(false);
        clearInterval(intervalId);
      }
    }, 1000);
  }

  const handleIfVisible = () => {
    const passedTime = getPassedTime();
    console.log("in visibile, passedTime: " + passedTime);
    dispatch({ type: ACTIONS.decrement, payload: { passedTime } });
    setIsTimerInBackground(false);
  }

  const handleIfHidden = () => {
    theStartTime = new Date();
    dispatch({ type: ACTIONS.stop }); // Stop the timer.
    setIsTimerInBackground(true); // Indicate that the timer is running in the background.

    // Check if the timer reaches 0.
    checkIfTimerIsUp();
  }

  useEffect(() => {

    const handleVisibilityChange = () => {
      if (state.isRunning || isTimerInBackground) {
        if (document.visibilityState === "hidden") {
          handleIfHidden();
          
        } else if (document.visibilityState === "visible") {
          handleIfVisible();
        }
      }
    };  

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [state.isRunning]);
};






// export const useTimerHidden = (state, dispatch) => {

//   const [isTimerInBackground, setIsTimerInBackground] = useState(false);
//   const [startTime, setStartTime] = useState(0);

//   useEffect(() => {
//     let timerID = null;

//     const handleVisibilityChange = () => {
//       console.count("calling the func: ");

//       if(state.isRunning || isTimerInBackground){

//         console.log(state.isRunning, isTimerInBackground);
//         if(document.visibilityState === "hidden"){
//           console.log("is hidden");
//           dispatch({ type: ACTIONS.stop }); //* stop the timer
//           setIsTimerInBackground(true); //* indicates that the timer is running in the background
//           setStartTime(new Date());

//           //* checks if the timer reaches 0;
//           timerID = setInterval(()=>{
//             console.count("interval runing: ");
//             console.log("state timer: " + state.timeRemaining);
//             if(document.visibilityState === "visible"){
//               console.log("clearId cause visi");
//               clearInterval(timerID);
//             }
//             if(Math.round((new Date() - startTime) / 1000) >= state.timeRemaining){
//               console.log("yes it was me, DIO!");
//               dispatch({ type: ACTIONS.decrement, payload: { passedTime: state.timeRemaining } });
//               // setIsRunningInBack(false)
//             }
//           }, 1000);              

//         }else if (document.visibilityState === "visible") {
//           console.log("is visibile");
          
//           const passedTime = Math.round((new Date() - startTime) / 1000); //* calculate how much time passed;
//           console.log("state timer: "+state.timeRemaining);
//           console.log("passed time: "+passedTime);
//           dispatch({ type: ACTIONS.decrement, payload: { passedTime } });
//           setIsTimerInBackground(false);
//         }
//       }
//     }

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, [state.isRunning])
// }