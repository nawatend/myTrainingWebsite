/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
//chart
import { Bar } from 'react-chartjs-2'
import getLabels from '../../utils/labels'

export default function Chart({ labelType = "day", data = [], name = "Label", averageName = "average name", type = "reps", color = "#FF772E" }) {
    let getStepSize = (values) => {

        const max = Math.max(...values)
        const min = Math.min(...values)

        return parseInt(max / 2) + 20

    }


    const scope = {
        day: 7,
        week: 4,
        month: 12,
        year: 5
    }


    const [labels, setLabels] = useState(getLabels()[labelType])

    const [mainScope, setMainScope] = useState({
        day: {
            start: data.day.length,
            end: data.day.length - 7
        },
        week: {
            start: data.week.length,
            end: data.week.length - 4
        },
        month: {
            start: data.month.length,
            end: 0
        },
        year: {
            start: data.day.length,
            end: data.day.length - 5
        }
    })
    const [chartData, setChartData] = useState([])
    const [stepSize, setStepSize] = useState(getStepSize(data.day))


    useEffect(() => {
        if (labelType === "day") {
            //console.log(data.day)
            setChartData(data.day.slice(mainScope.day.end, mainScope.day.start))
        }

        if (labelType === "week") {
            //console.log(data.day)
            setChartData(data.week.slice(mainScope.week.end, mainScope.week.start))
        }
        if (labelType === "month") {
            //console.log(data.day)
            setChartData(data.month.slice(mainScope.month.end, mainScope.month.start))
        }

        console.log(getLabels())
        if (labelType === "year") {
            //console.log(data.day)
            setChartData(data.year)
        }
    }, [data])


    useEffect(() => {
        setLabels(getLabels()[labelType])
    }, [labelType])

    let data2 = {
        labels: labels,
        datasets: [{
            label: averageName,
            backgroundColor: color,
            borderColor: color,
            data: chartData,
        }],
        options: {
            curvature: 1,
            title: {
                display: true,
                text: name,

            },
            legend: {
                display: true,
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: stepSize,
                    },
                }]
            },
        }

    }

    return (
        < Bar
            data={data2}
            options={data2.options}
            height={500}
            width={700}
        />
    )
}
