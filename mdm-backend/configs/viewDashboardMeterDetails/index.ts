export default {
    "config": {
        "label": "Meters",
        "fields": {
            "order": [
                "total",
                // "down",
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
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        },
        "down": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "down"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        },
        "unalloted": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "un-alloted"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        },
        "unstate": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "un-state"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        },
        "relayOff": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "relayOff"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        },
        "lowBalance": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "lowBalance"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        },
        "overloaded": {
            "link": "/admin/meters",
            "tableId": "allMetersTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "meters",
                        "filterValue": "overloaded"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "NO-DATA"
        }
    }
}