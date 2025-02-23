"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "actions": {
            "order": [
                "createGateway"
            ],
            "createGateway": {
                "label": "Add Gateway",
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
                        "required": true
                    },
                    "project": {
                        "label": "Project",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
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
        }
    }
};
