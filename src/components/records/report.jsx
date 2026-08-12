import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./Report.css";

import Activity from "./Activity.jsx";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function Report() {

    const totalUnits = 80;
    const occupiedUnits = 68;
    const vacantUnits = totalUnits - occupiedUnits;

    const occupancyRate =
        (occupiedUnits / totalUnits) * 100;

    const data = {
        labels: ["Occupied", "Vacant"],
        datasets: [
            {
                data: [occupiedUnits, vacantUnits],
                backgroundColor: ["#DAA520", "#8b0000"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <>
            <h1 style={{ color: "#0c0c0c" }}>
                Occupancy Rate
            </h1>

            <div className="occupancy-chart">

                <Doughnut
                    data={data}
                    options={options}
                />

                <div className="occupancy-percentage">
                    {occupancyRate.toFixed(0)}%
                </div>

            </div>

            <p>
                {occupiedUnits} of {totalUnits} units occupied
            </p>

            <Activity />
        </>
    );
}

export default Report;