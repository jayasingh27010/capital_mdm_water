export default {
    "config": {
        "label": "Meters",
        "fields": {
            "order": [
                "total",
                "down",
                "unalloted",
                // "unstate",
                "relayOff",
                "lowBalance",
                "overloaded"
            ],
            "total": {
                "label": "Total",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "down": {
                "label": "Down",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "unalloted": {
                "label": "Un-Alloted",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "unstate": {
                "label": "Un-State",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "relayOff": {
                "label": "Relay Off",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "lowBalance": {
                "label": "Low Balance",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "overloaded": {
                "label": "Overloaded",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            }
        }
    },
    "data": {
        "total": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "total"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "1000"
        },
        "down": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "down"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "60"
        },
        "unalloted": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "un-alloted"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "20"
        },
        "unstate": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "unstate"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "20"
        },
        "relayOff": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "relayOff"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "20"
        },
        "lowBalance": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "lowBalance"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "20"
        },
        "overloaded": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "overloaded"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "20"
        }
    }
}