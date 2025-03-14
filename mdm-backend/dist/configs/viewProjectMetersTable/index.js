"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "id": "Project1",
        "label": "Meters For Project1 ",
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
                        "description": "Meters "
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
                            "value": "unalloted",
                            "description": "Un-alloted"
                        },
                        {
                            "value": "unstate",
                            "description": "Un-state"
                        },
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
                }
            }
        },
        "columns": {
            "order": [
                "meterSerialNo",
                // "deviceId",
                "consumerName",
                "firmwareVersion"
                // "relayStatus"
            ],
            "meterSerialNo": {
                "label": "Meter Serial No",
                "renderType": "link"
            },
            "project": {
                "label": "Project",
                "renderType": "link"
            },
            "consumerName": {
                "label": "Consumer Name",
                "renderType": "link"
            },
            "firmwareVersion": {
                "label": "Firmare Version",
                "renderType": "text"
            }
            // "relayStatus": {
            //     "label": "Relay Status ",
            //     "renderType": "text"
            // }
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
                "project": {
                    "label": "Project1",
                    "link": "/admin/projects/Project1"
                },
                "consumerName": {
                    "label": "Diganta Ray ",
                    "link": "/admin/consumers/Diganta%20Ray"
                },
                "relayStatus": "OFF",
                "firmwareVersion": "FM001"
            },
            {
                "id": "meter_2_id",
                "meterSerialNo": {
                    "label": "CPS-00002",
                    "link": "/admin/meters/CPS-00002"
                },
                "project": {
                    "label": "Project1",
                    "link": "/admin/projects/Project1"
                },
                "consumerName": {
                    "label": "Diganta Ray ",
                    "link": "/admin/consumers/Diganta%20Ray"
                },
                "relayStatus": "ON",
                "firmwareVersion": "FM001"
            },
            {
                "id": "meter_3_id",
                "meterSerialNo": {
                    "label": "CPS-00003",
                    "link": "/admin/meters/CPS-00003"
                },
                "project": {
                    "label": "Project1",
                    "link": "/admin/projects/Project1"
                },
                "consumerName": {
                    "label": "Diganta Ray ",
                    "link": "/admin/consumers/Diganta%20Ray"
                },
                "relayStatus": "OFF"
            },
            {
                "id": "meter_4_id",
                "meterSerialNo": {
                    "label": "CPS-00004",
                    "link": "/admin/meters/CPS-00004"
                },
                "project": {
                    "label": "Project1",
                    "link": "/admin/projects/Project1"
                },
                "consumerName": {
                    "label": "Diganta Ray ",
                    "link": "/admin/consumers/Diganta%20Ray"
                },
                "relayStatus": "ON",
                "firmwareVersion": "FM001"
            },
            {
                "id": "meter_5_id",
                "meterSerialNo": {
                    "label": "CPS-00005",
                    "link": "/admin/meters/CPS-00005"
                },
                "project": {
                    "label": "Project1",
                    "link": "/admin/projects/Project1"
                },
                "consumerName": {
                    "label": "Diganta Ray ",
                    "link": "/admin/consumers/Diganta%20Ray"
                },
                "relayStatus": "OFF",
                "firmwareVersion": "FM001"
            }
        ]
    }
};
