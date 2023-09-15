import { createContext, useContext, useState, useEffect } from "react";
import { StateContext } from "./StateContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useFechChartData } from '../hooks/useFetchChartData';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {

    const { state, setPomos, setBreaks} = useContext(StateContext);

    const [user] = useAuthState(auth);

    //* will contain the chart data for the user in the last 28 days
    const [pomoData, setPomoData] = useState([]);
    const [breakData, setBreakData] = useState([]);

    useFechChartData(user, state, setBreakData, setPomoData, setPomos, setBreaks);

    //* check if the state.pomosCount changed, so to update the pomoData state, because it is used in stats page (chart)
    useEffect(() => {
        if(pomoData.length > 0){
            if (user && state.pomosCount !== pomoData[pomoData.length - 1].pomosCount) {
                setPomoData((prevState) => {
                    const todayStats = prevState.pop();
                    prevState.push({ pomosCount: state.pomosCount, date: todayStats.date });
                    return prevState;
                })
            }
        }
    }, [state.pomosCount]);

    //* check if the state.breakCount changed, so to update the breakData state, because it is used in stats page (chart)  
    useEffect(() => {
        if (pomoData.length > 0){
            if (user && state.breakCount !== breakData[breakData.length - 1].breaksCount) {
                setBreakData((prevState) => {
                    const todayStats = prevState.pop();
                    prevState.push({ breaksCount: state.breakCount, date: todayStats.date });
                    return prevState;
                })
            }
        }
    }, [state.breakCount]);

    const store = {
        user,
        pomoData,
        breakData,
        setBreakData,
        setPomoData,
    }

    return (
        <UserDataContext.Provider value={store}>
            {children}
        </UserDataContext.Provider>
    )
}