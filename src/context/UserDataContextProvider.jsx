import { createContext, useContext, useState } from "react";
import { StateContext } from "./StateContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useFechChartData } from '../hooks/useFetchChartData';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {

    const { user, state, setPomos, setBreaks} = useContext(StateContext);

    // const {user} = useAuthState(auth);

    //* will contain the chart data for the user in the last 28 days
    const [pomoData, setPomoData] = useState([]);
    const [breakData, setBreakData] = useState([]);

    useFechChartData(user, state, setBreakData, setPomoData, setPomos, setBreaks);

    const store = {
        // user,
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