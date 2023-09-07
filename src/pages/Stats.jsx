import { BarChart } from "../components/BarChart";
import { useContext, useState } from "react";
import MyContext from "../context/MyContext";

export const Stats = ()=>{
  const { user, pomoData, breakData } = useContext(MyContext);
  const [ chartPage, setChartPage ] = useState(3);

  const dates = pomoData.length > 0 ? pomoData.map(element => element.date) : [];
  const data1 = pomoData.length > 0 ? pomoData.map(element => element.pomosCount) : [];
  const data2 = breakData.length > 0 ? breakData.map(element => element.breaksCount) : [];

  const pomoDataFourWeeks = [];
  const breakDataFourWeeks = [];
  const datesFourWeeks = [];

  for (let i = 0; i < 28; i = i + 7) {
    datesFourWeeks.push(dates.slice(i, i + 7));
    pomoDataFourWeeks.push(data1.slice(i, i + 7));
    breakDataFourWeeks.push(data2.slice(i, i + 7));
  }
  // console.log(datesFourWeeks, pomoDataFourWeeks);

  const maxPomo = max(data1);
  const maxBreak = max(data2);
  const maxValue = maxPomo > maxBreak ? maxPomo : maxBreak;
  function max(arr) {
    const max = arr.reduce((max, value) => {
      return max < value ? value : max;
    }, 0);
    return max;
  }

  const handleNextWeek = () => {
    if(chartPage < 3){
      setChartPage(preValue => preValue + 1);
    }
  }

  const handlePrevWeek = () => {
    if (chartPage > 0) {
      setChartPage(preValue => preValue - 1);
    }
  }

  return (
    <div className="timer">
      <h2 className="mb-4 mt-3">Activity Summary</h2>
      <div className="week-control-btn">
        <button className="left-btn" onClick={handlePrevWeek}>&lt;</button>
        <span className="week-btn">week</span>
        <button className="right-btn" onClick={handleNextWeek}>&gt;</button>
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
