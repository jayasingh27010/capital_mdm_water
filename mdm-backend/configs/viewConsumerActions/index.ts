export default {
    "config": {
        "actions": {
            "order": [
                "addConsumer",
                "consumersCSVUpload"
            ],
            "addConsumer": {
                "label": "Add Consumer",
                "fields": {
                    "order": [
                        "firstName",
                        "lastName",
                        "address",
                        "isVVIP",
                        // "connectionNo",
                        "panNo",
                        "gstNo",
                        "towerNo",
                        "flatNo",
                        "flatType",
                        "shopNo",
                        "mobileNo",
                        "email",
                        // "totalLoadGrid",
                        // "gridLoadR",
                        // "gridLoadY",
                        // "gridLoadB",
                        // "totalLoadDG",
                        // "DGLoadR",
                        // "DGLoadY",
                        // "DGLoadB",
                        "installationDate",
                        "openingBalance",
                        "area",
                        "consumptionReadingGridKwh",
                        // "consumptionReadingGridKvah",
                        // "consumptionReadingDGKwh",
                        // "consumptionReadingDGKvah",
                        "project",
                        "meterSerialNo",
                        "tarrifGroup"
                    ],
                    "firstName": {
                        "label": "First Name",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "lastName": {
                        "label": "Last Name",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "isVVIP": {
                        "label": "Is VVIP?",
                        "columnSize": 6,
                        "inputType": "switchInput",

                    },
                    "address": {
                        "label": "Address",
                        "columnSize": 12,
                        "required": true,
                        "inputType": "textInput"
                    },
                    "connectionNo": {
                        "label": "Connection No.",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "panNo": {
                        "label": "PAN No.",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "gstNo": {
                        "label": "GST No.",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "towerNo": {
                        "label": "Tower No.",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "flatNo": {
                        "required": true,
                        "label": "Flat No.",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "flatType": {
                        "required": true,
                        "label": "Flat Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "1bhk",
                                "description": "1 BHK"
                            },
                            {
                                "value": "2bhk",
                                "description": "2 BHK"
                            },
                            {
                                "value": "3bhk",
                                "description": "3 BHK"
                            },
                            {
                                "value": "4bhk",
                                "description": "4 BHK"
                            },
                            {
                                "value": "other",
                                "description": "Other"
                            }
                        ]
                    },
                    "shopNo": {
                        "required": true,
                        "label": "Shop No",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "mobileNo": {
                        "label": "Mobile No.",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "email": {
                        "label": "Email",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    // "totalLoadGrid": {
                    //     "required": true,
                    //     "label": "Total Load Grid",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "gridLoadR": {
                    //     "required": true,
                    //     "label": "GRID Load R",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "gridLoadY": {
                    //     "required": true,
                    //     "label": "GRID Load Y",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "gridLoadB": {
                    //     "required": true,
                    //     "label": "GRID Load B",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "totalLoadDG": {
                    //     "required": true,
                    //     "label": "Total Load DG",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "DGLoadR": {
                    //     "required": true,
                    //     "label": "DG Load R",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "DGLoadY": {
                    //     "required": true,
                    //     "label": "DG Load Y",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "DGLoadB": {
                    //     "required": true,
                    //     "label": "DG Load B",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    "installationDate": {
                        "required": true,
                        "label": "Installation Date",
                        "columnSize": 6,
                        "inputType": "dateInput"
                    },
                    "openingBalance": {
                        "required": true,
                        "label": "Opening Balance",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "consumptionReadingGridKwh": {
                        "label": "Consumption Reading(Liter)",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    // "consumptionReadingGridKvah": {
                    //     "label": "Consumption Reading (KVAH For GRID)",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "consumptionReadingDGKwh": {
                    //     "label": "Consumption Reading (KWH For DG)",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    // "consumptionReadingDGKvah": {
                    //     "label": "Consumption Reading (KVAH For DG)",
                    //     "columnSize": 6,
                    //     "inputType": "textInput"
                    // },
                    "area": {
                        "required": true,
                        "label": "Area (Sq. ft)",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "project": {
                        "label": "Project",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "inputType": "selectInput",
                        "required": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ]
                    },
                    "meterSerialNo": {
                        "label": "Meter Serial No",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "inputType": "selectInput",
                        "required": true,
                        "selectOptions": [
                            {
                                "value": "",
                                "description": ""
                            }
                        ]
                    },
                    "tarrifGroup": {
                        "required": true,
                        "label": "Tarrif Group",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                        ]
                    }
                }
            },
            "createTarrif": {
                "label": "Create Tarrif",
                "fields": {
                    "order": [
                        "tarrifName",
                        "tarrifDescription",
                        "containsFixedCharges"
                    ],
                    "tarrifName": {
                        "label": "Tarrif Name",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "tarrifDescription": {
                        "label": "Tarrif Description",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "containsFixedCharges": {
                        "label": "Has Fixed Charges?",
                        "columnSize": 6,
                        "inputType": "switchInput"
                    }
                },
                "fixedChargeFields": {
                    "order": [
                        "fixedChargeField1",
                        "fixedChargeField2",
                        "fixedChargeField3",
                        "fixedChargeField4",
                        "fixedChargeField5",
                        "fixedChargeField6"
                    ],
                    "fixedChargeField1": {
                        "label": "Fixed Chrg 1",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "fixedChargeField2": {
                        "label": "Fixed Chrg 2",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "fixedChargeField3": {
                        "label": "Fixed Chrg 3",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "fixedChargeField4": {
                        "label": "Fixed Chrg 4",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "fixedChargeField5": {
                        "label": "Fixed Chrg 5",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "fixedChargeField6": {
                        "label": "Fixed Chrg 6",
                        "columnSize": 6,
                        "inputType": "textInput"
                    }
                },
                "slabFields": {
                    "order": [
                        "unitOrSlab",
                        "unitRate"
                    ],
                    "unitOrSlab": {
                        "label": "Tarrif Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "unit",
                                "description": "Unit Rate"
                            },
                            {
                                "value": "slab",
                                "description": "Slab Rates"
                            }
                        ]
                    },
                    "unitRate": {
                        "label": "Unit Rate",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "hide": true
                    }
                }
            },
            "addTarrifGroup": {
                "label": "Add Tarrif Group",
                "fields": {
                    "order": [
                        "tarrifGroupName",
                        "tarrifGroupDescription",
                        "project"
                    ],
                    "tarrifGroupName": {
                        "label": "Tarrif Group Name",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "tarrifGroupDescription": {
                        "label": "Tarrif Group Description",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "project": {
                        "label": "Project",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "project1",
                                "description": "Project 1"
                            },
                            {
                                "value": "project2",
                                "description": "Project 2"
                            }
                        ]
                    }
                }
            },
            "consumersCSVUpload": {
                "label": "Consumer CSV Upload"
            }
        }
    }
}