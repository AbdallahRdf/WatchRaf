import { createContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { usePomodoro, ACTIONS } from "../hooks/usePomodoro";
import { useAuthState } from "react-firebase-hooks/auth";

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    
    //*create user obj
    const {user, loading} = useAuthState(auth);

    //* creates and return the timer state
    const [state, dispatch, isPomodoro] = usePomodoro(user, loading);

    const stopTimer = () => dispatch({ type: ACTIONS.stop });

    const resetTimer = () => dispatch({ type: ACTIONS.reset, payload: { goToPomodoro: false } });

    const changeTimerType = (actionToBeDone) => dispatch({ type: actionToBeDone, payload: { shouldRun: false } });

    const setPomos = (count) => dispatch({ type: ACTIONS.setPomosCount, payload: { count } });

    const setBreaks = (count) => dispatch({ type: ACTIONS.setBreakCount, payload: { count } });

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
        user,
        loading,
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