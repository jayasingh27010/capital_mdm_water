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
                "isSingleLineInput": true,
                "maxLength": 10
            }
        }
    },
    "data": {
        "openingBalance": "₹2.5L",
        "currentBalance": "₹2L"
    }
};
