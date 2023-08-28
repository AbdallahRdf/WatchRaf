import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useContext } from "react";
import MyContext from "../MyContext";

export const BarChart = () => {
    const {state} = useContext(MyContext);

    const columnsData = [state.pomosCount*25, (state.lBreakCount*15 + state.sBreakCount*5)];
    // Chart.js configuration options
    const Data = {
        labels: ['Pomodoro', 'Break'],
        datasets: [
            {
                label: 'My First Dataset',
                data: columnsData,
                backgroundColor: ['#36A2EB', '#4BC0C0'],
            },
        ],
        borderColor: "black",
        borderWidth: 1
    };

    const options = {
        scales: {
            y: {
                suggestedMax: state.pomosCount*25 + 25, // Set the maximum value for the y-axis
            },
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        }
    }

    return (
        <Bar data={Data} options={options} />
    );
};