import React from 'react'

const ChartButtons = ({ user, chartPage=0, setChartPage=0, datesFourWeeks=[] }) => {

    //* handles next week button
    const handleNextWeek = () => {
        if (chartPage < datesFourWeeks.length - 1) {
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
    <>
        <h2 className="mb-4 mt-3">Activity Summary</h2>
        <div className="week-control-btn">
            <button title="previous week" className="left-btn" onClick={handlePrevWeek} disabled={user && chartPage <= 0}>&lt;</button>
            <span className="week-btn">week</span>
            <button title="next week" className="right-btn" onClick={handleNextWeek} disabled={user && chartPage >= datesFourWeeks.length - 1}>&gt;</button>
        </div>
    </>
    )
}

export default ChartButtons
