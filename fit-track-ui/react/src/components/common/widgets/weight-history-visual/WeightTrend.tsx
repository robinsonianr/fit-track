import React, {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import moment from "moment";
import {WeightTrendDTO} from "../../../../api/generated/models";
import {getAuditHistory} from "../../../../api/generated/endpoints/audit-history/audit-history.ts";
import {authenticatedMember} from "../../../../pages/layout.tsx";

const WeightTrend = () => {
    const member = authenticatedMember();
    const chartInstance = useRef<any>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const hasAddedHeader = useRef(false);
    const [monthSpan, setMonthSpan] = useState("one-month");
    const [weightHistory, setWeightHistory] = useState<WeightTrendDTO[]>([]);
    const {getMemberWeightTrend} = getAuditHistory()

    useEffect(() => {
        const fetchWeightData = async () => {
            getMemberWeightTrend(member.id).then(setWeightHistory);
        };

        fetchWeightData();
    }, []);

    useEffect(() => {
        if (weightHistory.length === 0 && !hasAddedHeader.current) {
            const noDataDom = document.getElementById("weight-history-graph");
            const noDataText = document.createElement("h2");
            noDataText.textContent = "No Weight History Available";
            if (noDataDom) {
                noDataDom.appendChild(noDataText);
                hasAddedHeader.current = true;
            }
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonthSpan(event.target.value);
    };

    const getMonthData = (span: string) => {
        const data = [];
        let days = 0;

        if (span === "one-month") {
            days = 29;
        } else if (span === "three-months") {
            days = 89;
        } else if (span === "six-months") {
            days = 179;
        } else if (span === "year") {
            days = 364;
        }

        for (let i = days; i >= 0; i--) {
            const date = moment().subtract(i, "days");
            data.push(date.format("YYYY-MM-D"));
        }

        return data;
    };

    const getWeightData = (weights: WeightTrendDTO[], span: string) => {
        const spanData = getMonthData(span);
        const data: any[] = [];
        let date;
        let j = 0;

        data.push([spanData[0], weights[0].weight]);
        for (let i = 1; i < spanData.length - 1; i++) {
            if (j >= weights.length) {
                data.push([spanData[i], null]);
            } else {
                date = weights[j].date;
                const newDate = moment(date).format("YYYY-MM-D");

                if (newDate === spanData[i]) {
                    data.push([spanData[i], weights[j].weight]);
                    j++;
                } else {
                    data.push([spanData[i], null]);
                }
            }
        }
        data.push([spanData[spanData.length - 1], weights[weights.length - 1].weight]);


        return data;
    };

    useEffect(() => {
        if (weightHistory.length !== 0 && chartRef.current) {
            if (!chartInstance.current) {
                chartInstance.current = echarts.init(chartRef.current);
                hasAddedHeader.current = false;
            }

            chartInstance.current.setOption({
                color: "whites",
                title: {
                    text: "Weight History",
                    left: "center",
                    textStyle: {
                        color: "white",
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                calculable: true,
                xAxis: {
                    nameLocation: "middle",
                    nameTextStyle: {
                        color: "white"
                    },
                    type: "time",
                    boundaryGap: false,
                    axisLabel: {
                        color: "white",
                        formatter: (value: moment.MomentInput) => moment(value).format("MMM D"),
                    },
                    splitNumber: 5,
                },
                yAxis: {
                    name: "Weight (lbs)",
                    nameTextStyle: {
                        color: "white"
                    },
                    axisLabel: {
                        color: "white"
                    }
                },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        color: "#3f76c0",
                        symbolSize: 7,
                        data: getWeightData(weightHistory, monthSpan).map(val => val !== null ? val : undefined),
                        connectNulls: true,
                    }
                ]
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }

        };
    }, [monthSpan, weightHistory]);

    return (
        <div>
            <div className="visual-widget">
                <div ref={chartRef} id="weight-history-graph" style={{width: "425px", height: "300px"}}/>
                <div style={{textAlign: "center", marginTop: "10px"}}>
                    <select style={{width: "120px", height: "30px", borderRadius: "4px"}} onChange={handleChange}>
                        <option value="one-month">1 Month</option>
                        <option value="three-months">3 Months</option>
                        <option value="six-months">6 Months</option>
                        <option value="year">1 Year</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default WeightTrend;