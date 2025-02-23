import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import Card from 'src/components/Card';
import { useLoaderData } from "react-router-dom"
import { Month, graphData } from 'src/types';
import { initAppState } from 'src/api/AppState';
import { projectMeterConsumptionDailyGraph,projectMeterConsumptionMonthlyGraph,projectMeterConsumptionWeeklyGraph } from 'src/api/Project';

const ConsumptionChart: React.FC = () => {
    const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [frequency, setFrequency] = useState<'week1' | 'week2' | 'week3' | 'week4' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '2023' | '2024'>('1');
    const [projectId, setId] = useState<any>(undefined)
    const [userIdd, setUserId] = useState<any>(undefined)
    const [yearlygraphData, setYearlyGraphData] = useState<any>([])
    const [monthlyGraphData, setMontlyGraphData] = useState<any>([])
    const [dailyGraphData, setDailyGraphData] = useState<any>([])
    const consumerIds: any = useLoaderData()


    useEffect(() => {
        if (consumerIds?.config?.id) {
            setId(consumerIds?.config?.id)
        }
      
        initAppState()
        .then((resp: any) => {
            setUserId(resp?.userInfo?.userId)
        })
    }, [consumerIds])

    const months: Month[] = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const data: graphData = {
        dailyData: dailyGraphData,
        weeklyData: monthlyGraphData,
        monthlyData: yearlygraphData
    };

   

    useEffect(() => {
        const currentDate = new Date();
        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
        const weekNumber = Math.ceil(firstDayOfWeek / 7);
        const currentWeek = `${weekNumber}` as any;
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (filter === 'weekly') {
            setFrequency(currentMonth.toString() as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12');
        } else if (filter === 'monthly') {
            setFrequency(currentYear.toString() as '2023' | '2024');
        } else {
            setFrequency(currentWeek);
            setFilter('daily');
        }
    }, [filter]);

    useEffect(() => {
        sendWeekData(frequency as any);
    }, [frequency]);


    const getWeekDates = (weekNumber: number) => {

        const currentMonth = new Date().getMonth() + 1;
        const firstDayOfMonth = new Date(new Date().getFullYear(), currentMonth - 1, 1);
        const startDay = (weekNumber - 1) * 7 + 1; 
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDay);

        const endDate = new Date(startDate);
        if (weekNumber === 5) {
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(0); 
        } else {
            endDate.setDate(startDate.getDate() + 6); 
        }

        return { start: startDate, end: endDate };
        // const currentMonth = new Date().getMonth() + 1;
        // const firstDayOfMonth = new Date(new Date().getFullYear(), currentMonth - 1, 1);
        // const startDay = (weekNumber - 1) * 7 + 1;
        // const startDate = new Date(firstDayOfMonth);
        // startDate.setDate(startDay);
        // const endDate = new Date(startDate);
        // endDate.setDate(startDate.getDate() + 6);
        // return {
        //     start: startDate,
        //     end: endDate
        // };
    };


    const sendWeekData = async (frequency: number) => {
        const { start, end } = getWeekDates(frequency);
        const year = frequency as any;
        const month = frequency as any;
        const endDate = end.toISOString().split('T')[0];;
        const startDate = start.toISOString().split('T')[0];;
        const userId = userIdd as any

        if (filter === 'monthly') {
            projectMeterConsumptionMonthlyGraph({ year,userId, projectId, filter })
                .then(({ data }: any) => {
                    setYearlyGraphData(data?.data?.rows)
                }).catch((error) => {
                    console.error(error)
                })
        } else if (filter === "weekly") {
            projectMeterConsumptionWeeklyGraph({ month,userId, projectId, filter })
                .then(({ data }: any) => {
                    setMontlyGraphData(data?.data?.rows)
                }).catch((error) => {
                    console.error(error)
                })
        } else {
            projectMeterConsumptionDailyGraph({ startDate, endDate,userId, projectId, filter })
                .then(({ data }: any) => {
                    setDailyGraphData(data?.data?.rows)
                }).catch((error) => {
                    console.log(error)
                })
        }
    };

    const getDataByFilter = () => {
        switch (filter) {
            case 'monthly':
                return {
                    days: data?.monthlyData?.map(val => val?.month_name),
                    eBValues: data?.monthlyData?.map(val => val?.ebReading),
                    dGValues: data?.monthlyData?.map(val => val?.dgReading),
                };
            case 'weekly':
                return {
                    days: data?.weeklyData?.map(val => val?.week),
                    eBValues: data?.weeklyData?.map(val => val?.ebReading),
                    dGValues: data?.weeklyData?.map(val => val?.dgReading),
                };
            case 'daily':
            default:
                return {
                    days: data?.dailyData?.map(val => val?.day),
                    eBValues: data?.dailyData?.map(val => val?.ebReading),
                    dGValues: data?.dailyData?.map(val => val?.dgReading),
                };
        }
    };

    const { days, eBValues, dGValues } = getDataByFilter();

    const option: EChartsOption = {
        title: {
            text: 'Energy Consumption',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['eBConsumption (kWh)', 'dGConsumption (kWh)'],
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: days,
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: 'Consumption (kWh)',
            min: 0,
            axisLabel: {
                formatter: '{value} kWh'
            }
        },
        series: [
            {
                name: 'eBConsumption (kWh)',
                type: 'bar',
                data: eBValues,
                itemStyle: {
                    color: '#1f78b4'
                },
                emphasis: {
                    focus: 'series'
                }
            },
            {
                name: 'dGConsumption (kWh)',
                type: 'bar',
                data: dGValues,
                itemStyle: {
                    color: '#33a02c'
                },
                emphasis: {
                    focus: 'series'
                }
            }
        ]
    };

    const renderFrequencyOptions = () => {
        const currentYear = new Date().getFullYear();
        const last10Years = Array.from({ length: 10 }, (_, index) => currentYear - index);

        switch (filter) {
            case 'daily':
                return (
                    <>
                        <option value="1">Week 1</option>
                        <option value="2">Week 2</option>
                        <option value="3">Week 3</option>
                        <option value="4">Week 4</option>
                        <option value="5">Week 4</option>
                    </>
                );
            case 'weekly':
                return (
                    <>
                        {months.map(month => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </>
                );
            case 'monthly':
                return (
                    <>
                     {last10Years.map(year => (
                        <option key={year} value={year.toString()}>
                            {year}
                        </option>
                    ))}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <div className="d-flex align-items-center mb-3">
                <button
                    className={`btn ${filter === 'daily' ? 'btn-primary' : 'btn-secondary'} me-2`}
                    onClick={() => setFilter('daily')}
                >
                    Daily
                </button>
                <button
                    className={`btn ${filter === 'weekly' ? 'btn-primary' : 'btn-secondary'} me-2`}
                    onClick={() => setFilter('weekly')}
                >
                    weekly
                </button>
                <button
                    className={`btn ${filter === 'monthly' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFilter('monthly')}
                >
                    monthly
                </button>
                <select
                    className="form-select form-select-sm ms-2"
                    aria-label="Select frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as 'week1' | 'week2' | 'week3' | 'week4' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '2023' | '2024')}
                    style={{ width: 'auto' }}
                >
                    {renderFrequencyOptions()}
                </select>
            </div>
            <ReactECharts option={option} />
        </Card>
    );
};

export default ConsumptionChart;
