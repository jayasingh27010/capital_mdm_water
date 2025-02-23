import React, {useContext, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
// import { initAppState } from 'src/api/AppState';
import Card from 'src/components/Card';

import { Month, graphData } from 'src/types';
import { dashboardConsumptionDailyGraph, dashboardConsumptionMonthlyGraph, dashboardConsumptionWeeklyGraph } from 'src/api/Pages/Dashboard';
import { AppContext } from 'src/contexts';


const ConsumptionChart: React.FC = () => {
    const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    // const [userId, setUserId] = useState<any>(undefined)
    const [yearlygraphData, setYearlyGraphData] = useState<any>([])
    const [monthlyGraphData, setMontlyGraphData] = useState<any>([])
    const [dailyGraphData, setDailyGraphData] = useState<any>([])
    const { context } = useContext<any>(AppContext)

    const userId = context?.userInfo?.userId;

   

    // useEffect(() => {
    //     initAppState()
    //         .then((resp: any) => {
    //             setUserId(resp?.userInfo?.userId)
    //         })

    // }, [])

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
      
    const currentDate = new Date();
          const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
          const weekNumber = Math.ceil(firstDayOfWeek / 7);
          const currentWeek = `${weekNumber}` as any;
    // const [frequency, setFrequency] = useState<'week1' | 'week2' | 'week3' | 'week4' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '2023' | '2024'>('');
     const [frequency, setFrequency] = useState<string>(currentWeek); 

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


      const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
        return `${year}-${month}-${day}`;
    };
    
    const getWeekDates = (weekNumber: number) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); 
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const startDay = (weekNumber - 1) * 7 + 1; 
        const startDate = new Date(firstDayOfMonth); 
        startDate.setDate(startDay); 
        let endDate = new Date(startDate);


        if (weekNumber > 4) {
            const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
            endDate = lastDayOfCurrentMonth;
        } else {
            endDate.setDate(startDate.getDate() + 6);
        }
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

    
        return { start: formattedStartDate, end: formattedEndDate };
    };
    

    const sendWeekData = async (frequency: number) => {
        const { start, end } = getWeekDates(frequency);
        const year = frequency as any;
        const month = frequency as any;
        const endDate = end;
        const startDate = start;

        if (filter === 'monthly') {
            dashboardConsumptionMonthlyGraph({ year, userId, filter })
                .then(({ data }: any) => {
                    setYearlyGraphData(data?.data?.rows)
                }).catch((error) => {
                    console.error(error)
                })
        } else if (filter === "weekly") {
            dashboardConsumptionWeeklyGraph({ month, userId, filter })
                .then(({ data }: any) => {
                    setMontlyGraphData(data?.data?.rows)
                }).catch((error) => {
                    console.error(error)
                })
        } else {
            dashboardConsumptionDailyGraph({ startDate, endDate, userId, filter })
                .then(({ data }: any) => {
                    setDailyGraphData(data?.data?.rows)
                }).catch((error) => {
                    console.log(error)
                })
        }

    };

    useEffect(() => {
        sendWeekData(frequency as any)
    }, [frequency])

    const getDataByFilter = () => {
        switch (filter) {
            case 'monthly':
                return {
                    days: data.monthlyData.map(item => item.month_name),
                    eBValues: data.monthlyData.map(item => item.ebReading),
                    dGValues: data.monthlyData.map(item => item.dgReading),
                };
            case 'weekly':
                return {
                    days: data.weeklyData.map(item => item.week),
                    eBValues: data.weeklyData.map(item => item.ebReading),
                    dGValues: data.weeklyData.map(item => item.dgReading),
                };
            case 'daily':
            default:
                return {
                    days: data.dailyData.map(item => item.day),
                    eBValues: data.dailyData.map(item => item.ebReading),
                    dGValues: data.dailyData.map(item => item.dgReading),
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
                        <option value="5">Week 5</option>
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
