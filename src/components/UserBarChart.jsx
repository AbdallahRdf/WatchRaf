import { BarChart } from "../components/BarChart";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserDataContextProvider";
import ChartButtons from "./ChartButtons";

export const UserBarChart = () => {

    const { user, pomoData, breakData } = useContext(UserDataContext);

    //* creates separate arrays, for dates, pomodoro counts and break counts.
    const dates = pomoData.length > 0 ? pomoData.map(element => element.date) : [];
    const data1 = pomoData.length > 0 ? pomoData.map(element => element.pomosCount) : [];
    const data2 = breakData.length > 0 ? breakData.map(element => element.breaksCount) : [];

    const [chartPage, setChartPage] = useState(0);

    useEffect(() => {
        if (dates.length > 0) {
            setChartPage((pomoData.length / 7) - 1);
        }
    }, [pomoData])

    const pomoDataFourWeeks = [];
    const breakDataFourWeeks = [];
    const datesFourWeeks = [];

    //* creates a nested array, each element is an array of seven value
    for (let i = 0; i < dates.length; i = i + 7) {
        datesFourWeeks.push(dates.slice(i, i + 7));
        pomoDataFourWeeks.push(data1.slice(i, i + 7));
        breakDataFourWeeks.push(data2.slice(i, i + 7));
    }

    //* returns the max value from an array
    function max(arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            return Math.max(...arr);
        }
        return undefined;
    }

    const maxPomo = max(pomoDataFourWeeks[chartPage]);
    const maxBreak = max(breakDataFourWeeks[chartPage]);
    const maxValue = maxPomo > maxBreak ? maxPomo : maxBreak;

    

    return (
        <div className="timer">
            <ChartButtons user={user} chartPage={chartPage} setChartPage={setChartPage} datesFourWeeks={datesFourWeeks} />
            <BarChart
                pomoData={pomoDataFourWeeks[chartPage]}
                breakData={breakDataFourWeeks[chartPage]}
                dates={datesFourWeeks[chartPage]}
                maxValue={maxValue}
            />
        </div>
    )
}
