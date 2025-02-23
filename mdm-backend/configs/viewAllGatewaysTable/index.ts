export default {
    "config": {
        "label": "All Gateways",
        "actions": {
            "order": [
                "editGateway"
            ],
            "editGateway": {
                "fields": {
                    "order": [
                        "gatewayNumber",
                        "project",
                        "connectivityType",
                        "simNo",
                        "ipAddress"
                    ],
                    "gatewayNumber": {
                        "label": "Gateway Number",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "disabled": true,
                        "required": true
                    },
                    "project": {
                        "label": "Project",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
                        "disabled": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ]
                    },
                    "connectivityType": {
                        "label": "Connectivity Type",
                        "columnSize": 6,
                        "required": true,
                        "inputType": "selectInput",
                        "defaultOption": "-",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "gprs",
                                "description": "GPRS"
                            },
                            {
                                "value": "ethernet",
                                "description": "Ethernet"
                            }
                        ]
                    },
                    "simNo": {
                        "label": "SIM No",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "hide": true
                    },
                    "ipAddress": {
                        "label": "IP Address",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "hide": true
                    }

                }
            }
        },
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
                        "value": "gateways",
                        "description": "Gateways"
                    },
                    {
                        "value": "project",
                        "description": "Project"
                    },
                    // {
                    //     "value": "gatewayNumberSearch",
                    //     "description": "Gateway Number Search"
                    // },
                    {
                        "value": "q",
                        "description": "Quick Search"
                    }
                ]
            },
            "filterValue": {
                "gateways": {
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
                            "value": "live",
                            "description": "Live"
                        }
                    ]
                },
                "q": {
                    "label": "Quick Search",
                    "columnSize": 12,
                    "inputType": "textInput"
                },
                "project": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "isAutocomplete": true,
                    "inputType": "selectInput",
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        }
                    ]
                },
                "gatewayNumberSearch": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "textInput"
                }
            }
        },
        "columns": {
            "order": [
                "gatewayNumber",
                "project",
                "status",
                "lastReportedTime",
                "connectivityType",
                "ipAddress",
                "simNo"
            ],
            "gatewayNumber": {
                "label": "Gateway Number",
                "renderType": "text"
            },
            "project": {
                "label": "Project",
                "renderType": "link"
            },
            "connectivityType": {
                "label": "Connectivity Type",
                "renderType": "text"
            },
            "status": {
                "label": "Status",
                "renderType": "text"
            },
            "lastReportedTime": {
                "label": "Last Reported Time",
                "renderType": "text"
            },
            "ipAddress": {
                "label": "IP Address",
                "renderType": "text"
            },
            "simNo": {
                "label": "SIM No",
                "renderType": "text"
            },
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": [
            {
                "id": "gateway_1_id",
                "gatewayNumber": "1110000000009817",
                "location": "vasundhara",
                "connectivityType": "GPRS",
                "status": "ON",
                "lastReportedTime": "12-06-2024",
                "isLive": false
            },
            {
                "id": "gateway_2_id",
                "gatewayNumber": "1110000000009818",
                "location": "vasundhara",
                "connectivityType": "GPRS",
                "status": "OFF",
                "lastReportedTime": "12-06-2024",
                "isLive": false
            },
            {
                "id": "gateway_3_id",
                "gatewayNumber": "1110000000009819",
                "location": "vasundhara",
                "connectivityType": "Internet",
                "status": "ON",
                "lastReportedTime": "12-06-2024",
                "isLive": true
            },
            {
                "id": "gateway_4_id",
                "gatewayNumber": "1110000000009820",
                "location": "vasundhara",
                "connectivityType": "Internet",
                "status": "ON",
                "lastReportedTime": "12-06-2024",
                "isLive": false
            },
            {
                "id": "gateway_5_id",
                "gatewayNumber": "1110000000009821",
                "location": "vasundhara",
                "connectivityType": "GPRS",
                "status": "ON",
                "lastReportedTime": "12-06-2024",
                "isLive": false
            }
        ]
    }
}