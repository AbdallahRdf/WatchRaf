import { Bar } from "react-chartjs-2";
import { Chart, elements } from "chart.js/auto";
import { useThisWeek } from "../hooks/useThisWeek";
import { useContext } from "react";
import MyContext from "../context/MyContext";

export const BarChart = ({user}) => {
    const {pomoData, breakData} = useContext(MyContext);

    const labels = pomoData.length > 0 ? pomoData.map(element => element.date) : null;
    const data1 = pomoData.length > 0 ? pomoData.map(element => element.pomosCount) : [];
    const data2 = breakData.length > 0 ? breakData.map(element => element.breaksCount) : [];

    const maxPomo = maxValue(data1);
    const maxBreak = maxValue(data2);

    function maxValue(arr) {
        const max = arr.reduce((max, value) => {
            return max < value ? value : max;
        }, 0);
        return max;
    }

    // Chart.js configuration options
    const Data = {
            labels: useThisWeek(labels),
            datasets: [
                {
                    label: 'Pomodoro Count',
                    data: data1,
                    backgroundColor: ['#43B0F1'],
                },
                {
                    label: 'Breaks Count',
                    data: data2,
                    backgroundColor: ['#45AD79'],
                }
            ]
        } 

    const options = {
        scales: {
            y: {
                suggestedMax: (maxBreak>maxPomo ? maxBreak : maxPomo) + 20, // Set the maximum value for the y-axis
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