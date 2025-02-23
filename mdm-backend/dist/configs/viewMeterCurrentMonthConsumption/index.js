"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Financials (This Month)",
        "fields": {
            "order": [
                "openingBalance",
                "currentBalance"
            ],
            "openingBalance": {
                "label": "Opening Balance",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "currentBalance": {
                "label": "Current Balance",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            }
        }
    },
    "data": {
        "openingBalance": "94.02kWh",
        "currentBalance": "0.09kWh"
    }
};
