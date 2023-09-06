import { BarChart } from "../components/BarChart";
import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import { useInitializeDataFromDb } from "../hooks/useInitializeDataFromDb";

export const Stats = ()=>{
  const { user } = useContext(MyContext);

  return (
    <div className="timer">
      <h2 className="mb-4 mt-3">Activity Summary</h2>
      <div className="week-control-btn">
        <button className="left-btn">&lt;</button><span className="week-btn">week</span><button className="right-btn">&gt;</button>
      </div>
      {!user && <p className="text-secondary">* This report will be available when you are logged in</p>}
      <BarChart user={user}/>
    </div>
  )
}
