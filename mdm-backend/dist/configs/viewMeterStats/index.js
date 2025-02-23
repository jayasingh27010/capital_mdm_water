"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Meter Stats",
        "fields": {
            "order": [
                "eBReading",
                "dGReading",
                "unit",
                "meter",
                "cutStatus",
                "dG",
                "currentLoad"
            ],
            "eBReading": {
                "label": "EB Reading",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "dGReading": {
                "label": "DG Reading",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "unit": {
                "label": "Unit",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "meter": {
                "label": "Meter",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "cutStatus": {
                "label": "Cut Status",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "dG": {
                "label": "DG",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "currentLoad": {
                "label": "Current Load",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            }
        }
    },
    "data": {
        "eBReading": "6526.38kWh",
        "dGReading": "302.46kWh",
        "unit": "LGF-01",
        "meter": "CPS-00001",
        "cutStatus": "Warning",
        "dG": "OFF",
        "currentLoad": "0.0052kWh"
    }
};
