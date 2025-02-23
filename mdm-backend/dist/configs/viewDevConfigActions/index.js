"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "actions": {
            "order": [
                "setMeters"
            ],
            "setMeters": {
                "label": "SET METERS",
                "actions": [
                    {
                        "id": "DI",
                        "label": "Manual Disconnect",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "R Phase"
                                },
                                {
                                    "value": "2",
                                    "description": "Y Phase"
                                },
                                {
                                    "value": "3",
                                    "description": "B Phase"
                                },
                                {
                                    "value": "4",
                                    "description": "RY Phase"
                                },
                                {
                                    "value": "5",
                                    "description": "RB Phase"
                                },
                                {
                                    "value": "6",
                                    "description": "YB Phase"
                                },
                                {
                                    "value": "7",
                                    "description": "RYB Phase"
                                }
                            ]
                        }
                    },
                    {
                        "id": "RC",
                        "label": "Manual Connect",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "R Phase"
                                },
                                {
                                    "value": "2",
                                    "description": "Y Phase"
                                },
                                {
                                    "value": "3",
                                    "description": "B Phase"
                                },
                                {
                                    "value": "4",
                                    "description": "RY Phase"
                                },
                                {
                                    "value": "5",
                                    "description": "RB Phase"
                                },
                                {
                                    "value": "6",
                                    "description": "YB Phase"
                                },
                                {
                                    "value": "7",
                                    "description": "RYB Phase"
                                }
                            ]
                        }
                    },
                    {
                        "id": "SI",
                        "label": "Source ID",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "GRID"
                                },
                                {
                                    "value": "2",
                                    "description": "DG"
                                }
                            ]
                        }
                    },
                    {
                        "id": "GL",
                        "label": "Sanction load GRID",
                        "isParent": true,
                    },
                    {
                        "id": "GL-R",
                        "label": " - Load R(GRID)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "GL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "GL-Y",
                        "label": " - Load Y(GRID)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "GL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "GL-B",
                        "label": " - Load B(GRID)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "GL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "GL-Total",
                        "label": " - Total Load(GRID)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "GL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "DL",
                        "label": "Sanction load DG",
                        "isParent": true
                    },
                    {
                        "id": "DL-R",
                        "label": " - Load R(DG)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "DL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "DL-Y",
                        "label": " - Load Y(DG)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "DL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "DL-B",
                        "label": " - Load B(DG)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "DL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "DL-Total",
                        "label": " - Total Load(DG)",
                        "hasValue": true,
                        "hasParent": true,
                        "parentId": "DL",
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "OG",
                        "label": "Overload cut-off Mode Grid",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "Normal"
                                },
                                {
                                    "value": "2",
                                    "description": "Cut-Off"
                                }
                            ]
                        }
                    },
                    {
                        "id": "OD",
                        "label": "Overload cut-off Mode DG",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "Normal"
                                },
                                {
                                    "value": "2",
                                    "description": "Cut-Off"
                                }
                            ]
                        }
                    },
                    {
                        "id": "PI",
                        "label": "Push Interval In Minute",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "BG",
                        "label": "Meter Balance Grid",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "BD",
                        "label": "Meter Balance DG",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "MC",
                        "label": "Master Relay Status",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "Connect Normal"
                                },
                                {
                                    "value": "2",
                                    "description": "Disconnect Cut-Off ALL"
                                }
                            ]
                        }
                    },
                    {
                        "id": "MS",
                        "label": "Mode Selection (only DG/Grid or both)",
                        "hasValue": true,
                        "isSingleLineInput": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "GRID"
                                },
                                {
                                    "value": "2",
                                    "description": "DG"
                                },
                                {
                                    "value": "2",
                                    "description": "BOTH"
                                }
                            ]
                        }
                    },
                    {
                        "id": "RE",
                        "label": "RS 485 Enable Disable",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "isSingleLineInput": true,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "IW",
                        "label": "Index Writing for RS485",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "isSingleLineInput": true,
                            "columnSize": 12,
                            "required": true,
                            "inputType": "textInput"
                        }
                    },
                    {
                        "id": "PP",
                        "label": "PUSH PORT Configuration",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "LoraWAN"
                                },
                                {
                                    "value": "2",
                                    "description": "RS485"
                                },
                                {
                                    "value": "3",
                                    "description": "BOTH"
                                }
                            ]
                        }
                    },
                    {
                        "id": "GD",
                        "label": "Grid Enable/Disable",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "isSingleLineInput": true,
                            "inputType": "selectInput",
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "LoraWAN"
                                },
                                {
                                    "value": "2",
                                    "description": "RS485"
                                },
                                {
                                    "value": "3",
                                    "description": "BOTH"
                                }
                            ]
                        }
                    },
                    {
                        "id": "DG",
                        "label": "DG Enable/Disable",
                        "hasValue": true,
                        "inputDefinition": {
                            "label": "",
                            "columnSize": 12,
                            "required": true,
                            "inputType": "selectInput",
                            "isSingleLineInput": true,
                            "defaultOption": "-",
                            "selectOptions": [
                                {
                                    "value": "-",
                                    "description": "-"
                                },
                                {
                                    "value": "1",
                                    "description": "LoraWAN"
                                },
                                {
                                    "value": "2",
                                    "description": "RS485"
                                },
                                {
                                    "value": "3",
                                    "description": "BOTH"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
};
