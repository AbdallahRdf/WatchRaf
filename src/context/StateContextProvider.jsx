import { createContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { usePomodoro, ACTIONS } from "../hooks/usePomodoro";
import { useAuthState } from "react-firebase-hooks/auth";

//  *StateContextProvider Component:
//  * This component provides a context for managing timer state and actions using the Pomodoro technique.
//  *
//  * It integrates with Firebase authentication to identify the current user and utilizes a custom hook(usePomodoro)
//  * for creating and handling the timer state.It offers functions to control the timer, including starting, stopping,
//  * resetting, and configuring the type of timer.
//  *
//  * Additionally, it prevents page refresh or closure while the timer is running to ensure a seamless user experience.
//  *

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    
    //*create user obj
    const [user] = useAuthState(auth);

    //* usePomodoro: custom hook that creates the timer state, and handle its logic.
    const [state, dispatch, isPomodoro] = usePomodoro(user);

    //* functions to simplify handling the timer events and actions.

    const stopTimer = () => dispatch({ type: ACTIONS.stop });

    const changeTimerType = (actionToBeDone) => dispatch({ type: ACTIONS.setTimer, payload: { timerStyle: actionToBeDone, shouldRun: false, goToPomodoro: false } });

    const setPomos = (count) => dispatch({ type: ACTIONS.setPomosCount, payload: { count } });

    const setBreaks = (count) => dispatch({ type: ACTIONS.setBreakCount, payload: { count } });

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

    // useEffect(()=>{
    //     if(state.isRunnig){
    //         document.title = `${state.timeRemaining} - Pomoraf`;
    //     }
    // }, [state.isRunnig, state.timeRemaining])

    const store = {
        state,
        isPomodoro,
        changeTimerType,
        stopTimer,
        setPomos,
        setBreaks,
    }

    return (
        <StateContext.Provider value={store}>
            { children }
        </StateContext.Provider>
    )
}