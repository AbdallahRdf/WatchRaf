import { BarChart } from "../components/BarChart";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserDataContextProvider";

export const Stats = ()=>{
  const { user, pomoData, breakData } = useContext(UserDataContext);

  //* creates separate arrays, for dates, pomodor counts and break counts.
  const dates = pomoData.length > 0 ? pomoData.map(element => element.date) : [];
  const data1 = pomoData.length > 0 ? pomoData.map(element => element.pomosCount) : [];
  const data2 = breakData.length > 0 ? breakData.map(element => element.breaksCount) : [];

  const [chartPage, setChartPage] = useState(0);

  useEffect(()=>{
    if(dates.length > 0){
      setChartPage((pomoData.length/7)-1);
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

  const maxPomo = max(pomoDataFourWeeks[chartPage]);
  const maxBreak = max(breakDataFourWeeks[chartPage]);
  const maxValue = maxPomo > maxBreak ? maxPomo : maxBreak;

  //* returns the max value from an array
  function max(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
      return Math.max(...arr);
    } else {
      return undefined;
    }
  }

  //* handles next week button
  const handleNextWeek = () => {
    if(chartPage < datesFourWeeks.length-1){
      setChartPage(prevState => prevState + 1);
    }
  }
  //* handles previous week button
  const handlePrevWeek = () => {
    if (chartPage > 0) {
      setChartPage(prevState => prevState - 1);
    }
  }

  return (
    <div className="timer">
      <h2 className="mb-4 mt-3">Activity Summary</h2>
      <div className="week-control-btn">
        <button title="previous week" className="left-btn" onClick={handlePrevWeek} disabled={chartPage <= 0}>&lt;</button>
        <span className="week-btn">week</span>
        <button title="next week" className="right-btn" onClick={handleNextWeek} disabled={chartPage >= datesFourWeeks.length - 1}>&gt;</button>
      </div>
      {!user && <p className="text-secondary">* This report will be available when you are logged in</p>}
      <BarChart 
        pomoData={pomoDataFourWeeks[chartPage]} 
        breakData={breakDataFourWeeks[chartPage]} 
        dates={datesFourWeeks[chartPage]} 
        maxValue={maxValue}
      />
    </div>
  )
}
