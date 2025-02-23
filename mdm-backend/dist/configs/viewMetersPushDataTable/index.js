"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    config: {
        id: "CPS-00005",
        label: "CPS-00005 Meter Push Data",
        defaultFilters: {
            currPage: 1,
            perPage: 5,
        },
        filterConfig: {
            filterType: {
                label: "Filter Type",
                columnSize: 12,
                inputType: "selectInput",
                selectOptions: [
                    {
                        value: "-",
                        description: "-",
                    },
                    {
                        value: "startDate",
                        description: "Start Date",
                    },
                    {
                        value: "endDate",
                        description: "End Date",
                    },
                ],
            },
            filterValue: {
                startDate: {
                    label: "Filter Value",
                    columnSize: 12,
                    inputType: "dateInput",
                },
                endDate: {
                    label: "Filter Value",
                    columnSize: 12,
                    inputType: "dateInput",
                },
            },
        },
        columns: {
            order: [
                "serialNumber",
                "volume",
                "rsrp",
                "voltage",
                "snr",
                "ecl",
                "rtc",
                "stateByte",
                "batteryEfficiency",
                "software",
                "temperature",
                "padBytes",
            ],
            serialNumber: {
                label: "Meter Serial No",
                renderType: "text",
            },
            volume: {
                label: "Volume",
                renderType: "text",
            },
            rsrp: {
                label: "RSRP",
                renderType: "text",
            },
            voltage: {
                label: "Voltage",
                renderType: "text",
            }, snr: {
                label: "SNR",
                renderType: "text",
            },
            ecl: {
                label: "ECL",
                renderType: "text",
            },
            rtc: {
                label: "RTC",
                renderType: "text",
            },
            stateByte: {
                label: "State Byte",
                renderType: "text",
            },
            batteryEfficiency: {
                label: "Battery Efficiency",
                renderType: "text",
            },
            software: {
                label: "Software",
                renderType: "text",
            },
            temperature: {
                label: "Temperature",
                renderType: "text",
            },
            padBytes: {
                label: "Pad Bytes",
                renderType: "text",
            },
        },
    },
    data: {
        totalRecords: 9,
        rows: [
            {
                id: "meter_6_id",
                meterSerialNo: "CPS-00005",
                project: {
                    link: "/admin/projects/project_1",
                    label: "Vasundhara",
                },
                volume: "100",
                rsrp: "9999999",
                voltage: "9999999",
                snr: "2",
                ecl: "7/31/2024, 12:39:59 PM",
            },
            {
                id: "meter_6_id",
                meterSerialNo: "CPS-00005",
                project: {
                    link: "/admin/projects/project_1",
                    label: "Vasundhara",
                },
                volume: "100",
                rsrp: "9999999",
                voltage: "9999999",
                snr: "2",
                ecl: "7/31/2024, 12:39:59 PM",
            },
            {
                id: "meter_6_id",
                meterSerialNo: "CPS-00005",
                project: {
                    link: "/admin/projects/project_1",
                    label: "Vasundhara",
                },
                volume: "100",
                rsrp: "9999999",
                voltage: "9999999",
                snr: "2",
                ecl: "7/31/2024, 12:39:59 PM",
            },
            {
                id: "meter_6_id",
                meterSerialNo: "CPS-00005",
                project: {
                    link: "/admin/projects/project_1",
                    label: "Vasundhara",
                },
                volume: "100",
                rsrp: "9999999",
                voltage: "9999999",
                snr: "2",
                ecl: "7/31/2024, 12:39:59 PM",
            },
        ],
    },
};
