import { BarChart } from "../components/BarChart";
import ChartButtons from "./ChartButtons";

export const NoUserBarChart = ({ user }) => {

    return (
        <div className="timer">
            <ChartButtons user={user} />
            <p className="text-secondary">* This report will be available when you are logged in</p>
            <BarChart
                pomoData={[]}
                breakData={[]}
                dates={[]}
                maxValue={0}
            />
        </div>
    )
}
