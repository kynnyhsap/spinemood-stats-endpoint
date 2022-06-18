import QuickChart from "quickchart-js";
import { getAverageScoreByDate } from "./data.js";

export function buildTimeseriesChart(records) {
    const meanScoreByDate = getAverageScoreByDate(records);

    // data points
    const data = meanScoreByDate.map(({ date, mean }) => ({
        x: date,
        y: mean,
    }));

    const gradient = QuickChart.getGradientFillHelper("vertical", [
        "#FF0D0D",
        "#FF4E11",
        "#FF8E15",
        "#FAB733",
        "#ACB334",
        "#69B34C",
    ]);

    return new QuickChart()
        .setConfig({
            type: "line",

            data: {
                datasets: [
                    {
                        // @ts-ignore
                        data,

                        label: "Average Pain Score",
                        // fill: true,
                        backgroundColor: gradient,
                        borderColor: gradient,
                    },
                ],
            },

            options: {
                layout: {
                    padding: 10,
                },

                plugins: {
                    legend: {
                        display: false,
                    },
                },

                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                        },
                    },

                    y: {
                        min: 0,
                        max: 10,
                    },
                },

                elements: {
                    point: {
                        radius: 5,
                    },

                    line: {
                        tension: 0.3,
                        borderWidth: 4,
                    },
                },
            },
        })
        .setWidth(800)
        .setHeight(400)
        .setVersion("3")
        .setBackgroundColor("transparent");
}