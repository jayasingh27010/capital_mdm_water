"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "actions": {
            "order": [
                "createMeter",
                "metersCSVUpload"
            ],
            "createMeter": {
                "label": "Add Meter",
                "fields": {
                    "order": [
                        "meterSerialNo",
                        "consumptionType",
                        "firmwareVersion",
                        "project",
                        "encryptionKey",
                    ],
                    "meterSerialNo": {
                        "label": "Enter Meter Id",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    // "phaseType": {
                    //     "label": "Select Phase Type",
                    //     "columnSize": 6,
                    //     "required": true,
                    //     "inputType": "selectInput",
                    //     "selectOptions": [
                    //         {
                    //             "value": "-",
                    //             "description": "-"
                    //         },
                    //         {
                    //             "value": "single",
                    //             "description": "Single"
                    //         },
                    //         {
                    //             "value": "threePhase",
                    //             "description": "Three Phase"
                    //         },
                    //         {
                    //             "value": "ht",
                    //             "description": "HT"
                    //         },
                    //         {
                    //             "value": "ct",
                    //             "description": "CT"
                    //         },
                    //         {
                    //             "value": "ltct",
                    //             "description": "LTCT"
                    //         }
                    //     ]
                    // },
                    // "sourceType": {
                    //     "label": "Select Source Type",
                    //     "columnSize": 6,
                    //     "inputType": "selectInput",
                    //     "required": true,
                    //     "selectOptions": [
                    //         {
                    //             "value": "-",
                    //             "description": "-"
                    //         },
                    //         {
                    //             "value": "single",
                    //             "description": "Single"
                    //         },
                    //         {
                    //             "value": "dual",
                    //             "description": "Dual"
                    //         }
                    //     ]
                    // },
                    "consumptionType": {
                        "label": "Select Consumption Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "gas",
                                "description": "Gas"
                            },
                            {
                                "value": "energy",
                                "description": "Energy"
                            },
                            {
                                "value": "water",
                                "description": "Water"
                            },
                            {
                                "value": "other",
                                "description": "Other"
                            }
                        ]
                    },
                    "firmwareVersion": {
                        "label": "Firmware Version",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "project": {
                        "label": "Project",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "isAutocomplete": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ]
                    },
                    "encryptionKey": {
                        "label": "Enter Encryption Key",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                },
            },
            "metersCSVUpload": {
                "label": "Meter CSV Upload"
            }
        }
    }
};
