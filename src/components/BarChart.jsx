import { Bar } from "react-chartjs-2";
import { Chart, elements } from "chart.js/auto";
import { useThisWeek } from "../hooks/useThisWeek";

export const BarChart = ({ dates, pomoData, breakData, maxValue }) => {
    
    // Chart.js configuration options
    const Data = {
        labels: useThisWeek(dates),
        datasets: [
            {
                label: 'Pomodoro Count',
                data: pomoData,
                backgroundColor: ['#43B0F190'],
                borderWidth: 1,
                borderColor: '#43B0F1'
            },
            {
                label: 'Breaks Count',
                data: breakData,
                backgroundColor: ['#45AD7990'],
                borderWidth: 1,
                borderColor: '#45AD79'
            },
        ],
    }

    const options = {
        scales: {
            y: {
                suggestedMax: maxValue + 20, // Set the maximum value for the y-axis
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