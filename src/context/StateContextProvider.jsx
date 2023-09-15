import { createContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { usePomodoro, ACTIONS } from "../hooks/usePomodoro";
import { useAuthState } from "react-firebase-hooks/auth";

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    
    //*create user obj
    const [user] = useAuthState(auth);

    //* creates and return the timer state
    const [state, dispatch, isPomodoro] = usePomodoro(user);

    const stopTimer = () => dispatch({ type: ACTIONS.stop });

    const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

    const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: { shouldRun: false } });

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

    const store = {
        state,
        isPomodoro,
        changeTimerType,
        stopTimer,
        resetTimer,
        setPomos,
        setBreaks,
    }

    return (
        <StateContext.Provider value={store}>
            { children }
        </StateContext.Provider>
    )
}