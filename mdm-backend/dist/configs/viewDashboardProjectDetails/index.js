"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Projects",
        "fields": {
            "order": [
                "totalProjects",
                "liveProjects"
            ],
            "totalProjects": {
                "label": "Total Projects",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "liveProjects": {
                "label": "Live Projects",
                "columnSize": 3,
                "inputType": "filterAndLink",
                "isSingleLineInput": true,
                "maxLength": 10
            }
        }
    },
    "data": {
        "totalProjects": {
            "link": "/admin/projects",
            "tableId": "allProjectsTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "projects",
                        "filterValue": "total"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "80"
        },
        "liveProjects": {
            "link": "/admin/projects",
            "tableId": "allProjectsTable",
            "tableFilters": {
                "additionalFilters": [
                    {
                        "filterType": "projects",
                        "filterValue": "live"
                    }
                ],
                "perPage": 5,
                "currPage": 1
            },
            "value": "60"
        }
    }
};
