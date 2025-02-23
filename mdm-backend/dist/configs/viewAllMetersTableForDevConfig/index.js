"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "All Meters",
        "defaultFilters": {
            "currPage": 1,
            "perPage": 5
        },
        "filterConfig": {
            "filterType": {
                "label": "Filter Type",
                "columnSize": 12,
                "inputType": "selectInput",
                "selectOptions": [
                    {
                        "value": "-",
                        "description": "-"
                    },
                    {
                        "value": "meters",
                        "description": "Meters"
                    },
                    {
                        "value": "project",
                        "description": "Project"
                    },
                    {
                        "value": "q",
                        "description": "Quick Search"
                    }
                ]
            },
            "filterValue": {
                "meters": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "selectInput",
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        },
                        {
                            "value": "total",
                            "description": "Total"
                        },
                        {
                            "value": "down",
                            "description": "Down"
                        },
                        {
                            "value": "un-alloted",
                            "description": "Un-alloted"
                        },
                        // {
                        //     "value": "un-state",
                        //     "description": "Un-state"
                        // },
                        {
                            "value": "relayOff",
                            "description": "Relay Off"
                        },
                        {
                            "value": "lowBalance",
                            "description": "Low Balance"
                        },
                        {
                            "value": "overloaded",
                            "description": "Overloaded"
                        }
                    ]
                },
                "project": {
                    "label": "Project",
                    "columnSize": 12,
                    "inputType": "selectInput",
                    "isAutocomplete": true,
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        }
                    ]
                },
                "q": {
                    "label": "Quick Search",
                    "columnSize": 12,
                    "inputType": "textInput"
                }
            }
        },
        "columns": {
            "order": [
                "meterSerialNo",
                "project",
                "consumer",
                "firmwareVersion",
                "moduleNo",
                "phaseType",
                "sourceType",
                "consumptionType",
            ],
            "meterSerialNo": {
                "label": "Meter Serial No",
                "renderType": "link"
            },
            "moduleNo": {
                "label": "Module No.",
                "renderType": "text"
            },
            "phaseType": {
                "label": "Phase Type",
                "renderType": "text"
            },
            "sourceType": {
                "label": "Source Type",
                "renderType": "text"
            },
            "consumptionType": {
                "label": "Consumption Type",
                "renderType": "text"
            },
            "firmwareVersion": {
                "label": "Firmware Version",
                "renderType": "text"
            },
            "project": {
                "label": "Project",
                "renderType": "link"
            },
            "consumer": {
                "label": "Consumer",
                "renderType": "link"
            }
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": [
            {
                "id": "meter_1_id",
                "meterSerialNo": {
                    "label": "CPS-00001",
                    "link": "/admin/meters/CPS-00001"
                },
                "moduleNo": "342",
                "phaseType": "Single",
                "sourceType": "Dual",
                "consumptionType": "Gas"
            },
            {
                "id": "meter_2_id",
                "meterSerialNo": {
                    "label": "CPS-00002",
                    "link": "/admin/meters/CPS-00002"
                },
                "moduleNo": "342",
                "phaseType": "Single",
                "sourceType": "Dual",
                "consumptionType": "Gas"
            },
            {
                "id": "meter_3_id",
                "meterSerialNo": {
                    "label": "CPS-00003",
                    "link": "/admin/meters/CPS-00003"
                },
                "moduleNo": "342",
                "phaseType": "Single",
                "sourceType": "Dual",
                "consumptionType": "Gas"
            },
            {
                "id": "meter_4_id",
                "meterSerialNo": {
                    "label": "CPS-00004",
                    "link": "/admin/meters/CPS-00004"
                },
                "moduleNo": "342",
                "phaseType": "Single",
                "sourceType": "Dual",
                "consumptionType": "Gas"
            },
            {
                "id": "meter_5_id",
                "meterSerialNo": {
                    "label": "CPS-00005",
                    "link": "/admin/meters/CPS-00005"
                },
                "moduleNo": "342",
                "phaseType": "Single",
                "sourceType": "Dual",
                "consumptionType": "Gas"
            }
        ]
    }
};
