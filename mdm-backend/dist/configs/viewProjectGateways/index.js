"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Gateways",
        "fields": {
            "order": [
                "totalGateways",
                "liveGateways"
            ],
            "totalGateways": {
                "label": "Total Gateways",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "liveGateways": {
                "label": "Live Gateways",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            }
        }
    },
    "data": {
        "totalGateways": {
            "link": "/admin/gateways",
            "tableId": "allGatewaysTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "gateways",
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
        "liveGateways": {
            "link": "/admin/gateways",
            "tableId": "allGatewaysTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "gateways",
                        "filterValue": "live"
                    },
                    {
                        "filterType": "project",
                        "filterValue": ""
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "300"
        }
    }
};
