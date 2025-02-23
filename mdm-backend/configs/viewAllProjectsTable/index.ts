export default {
    "config": {
        "label": "All Projects",
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
                        "value": "q",
                        "description": "Quick Search"
                    },
                    {
                        "value": "projects",
                        "description": "Projects"
                    }
                ]
            },
            "filterValue": {
                "projects": {
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
                "projectNameSearch": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "textInput"
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
                "projectName",
                "projectAddress",
                "projectCode",
                "billingType"
            ],
            "projectName": {
                "label": "Project Name",
                "renderType": "link"
            },
            "projectAddress": {
                "label": "Project Address",
                "renderType": "text"
            },
            "projectCode": {
                "label": "Project Code",
                "renderType": "text"
            },
            "billingType": {
                "label": "Billing Type",
                "renderType": "text"
            }
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": [
            {
                "id": "project_1_id",
                "projectName": {
                    "link": "/admin/projects/Project1",
                    "label": "Project 1"
                },
                "projectAddress": "",
                "projectCode": "0001",
                "billingType": "kWh",
                "isLive": false
            },
            {
                "id": "project_2_id",
                "projectName": {
                    "link": "/admin/projects/Vardhaman",
                    "label": "Vardhaman"
                },
                "projectAddress": "",
                "projectCode": "0001",
                "billingType": "kWh",
                "isLive": false
            },
            {
                "id": "project_3_id",
                "projectName": {
                    "link": "/admin/projects/Vardhaman",
                    "label": "Vardhaman"
                },
                "projectAddress": "",
                "projectCode": "0001",
                "billingType": "kWh",
                "isLive": false
            },
            {
                "id": "project_4_id",
                "projectName": {
                    "link": "/admin/projects/Vardhaman",
                    "label": "Vardhaman"
                },
                "projectAddress": "",
                "projectCode": "0001",
                "billingType": "kWh",
                "isLive": true
            },
            {
                "id": "project_5_id",
                "projectName": {
                    "link": "/admin/projects/Vardhaman",
                    "label": "Vardhaman"
                },
                "projectAddress": "",
                "projectCode": "0001",
                "billingType": "kWh",
                "isLive": true
            }
        ]
    }
}