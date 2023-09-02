import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import { useThisWeek } from "../hooks/useThisWeek";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const BarChart = ({user}) => {
    const {state} = useContext(MyContext);

    const chartRef = collection(db, "chart");
    const chartDocs = doc(chartRef);
    const getChartDocs = async ()=>{
        const data = await getDocs(chartDocs);
        console.log(data)
    }
    getChartDocs();

    const pomodoroCounts = state.pomosCount*25;
    const breaksCount = (state.lBreakCount * 15 + state.sBreakCount * 5);
    // Chart.js configuration options
    const Data = user ? {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [
                {
                    label: 'Pomodoro Count',
                    data: [pomodoroCounts, pomodoroCounts+25],
                    backgroundColor: ['#43B0F1'],
                },
                {
                    label: 'Breaks Count',
                    data: [breaksCount, breaksCount+15],
                    backgroundColor: ['#45AD79'],
                }
            ]
        } 
        :
        {
            labels: useThisWeek(),
            datasets: [
                {
                    label: 'Pomodoro Count',
                    data: [],
                    backgroundColor: ['#43B0F1'],
                },
                {
                    label: 'Breaks Count',
                    data: [],
                    backgroundColor: ['#45AD79'],
                }
            ]
        }

    const options = {
        scales: {
            y: {
                suggestedMax: pomodoroCounts + 50, // Set the maximum value for the y-axis
            },
        },
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                enabled: true
            }
        }
    }

    return (
        <>
            <Bar data={Data} options={options} />
        </>
    );
};