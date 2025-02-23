export default {
    config: {
        actions: {
            order: [
                "addTarrifGroup",
                "createTarrif",
                "attachOrDetachTarrif",
                "changeTariff"
            ],
            createTarrif: {
                label: 'Create Tarrif',
                fields: {
                    order: [
                        "tarrifName",
                        "tarrifDescription",
                        "project",
                        "containsFixedCharges",
                        "fixedChargeCalculationType",
                        "fixedChargeDeductionTime"
                    ],
                    tarrifName: {
                        label: "Tarrif Name",
                        columnSize: 6,
                        required: true,
                        inputType: "textInput"
                    },
                    tarrifDescription: {
                        label: "Tarrif Description",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    containsFixedCharges: {
                        label: "Has Fixed Charges?",
                        columnSize: 6,
                        inputType: "switchInput"
                    },
                    project: {
                        label: "Project",
                        columnSize: 6,
                        inputType: "selectInput",
                        isAutocomplete: true,
                        required: true,
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },
                    "fixedChargeCalculationType": {
                        "label": "Fixed Charge Calculation Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "required": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "monthlyCalculation",
                                "description": "Monthly Calculation"
                            },
                            {
                                "value": "yearlyCalculation",
                                "description": "Yearly Calculation"
                            }
                        ]
                    },
                    "fixedChargeDeductionTime": {
                        "label": "Fixed Charge Deduction Time",
                        "columnSize": 6,
                        "inputType": "timeInput",
                        "required": true
                    }
                },
                fixedChargeFields: {
                    order: [
                        "fixedChargeField1",
                        "fixedChargeField2",
                        "fixedChargeField3",
                        "fixedChargeField4",
                        "fixedChargeField5",
                        "fixedChargeField6",
                    ],
                    fixedChargeField1: {
                        label: "Fixed Chrg 1",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    fixedChargeField2: {
                        label: "Fixed Chrg 2",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    fixedChargeField3: {
                        label: "Fixed Chrg 3",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    fixedChargeField4: {
                        label: "Fixed Chrg 4",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    fixedChargeField5: {
                        label: "Fixed Chrg 5",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    fixedChargeField6: {
                        label: "Fixed Chrg 6",
                        columnSize: 6,
                        inputType: "textInput"
                    }
                },
                slabFields: {
                    order: [
                        "unitOrSlab",
                        "volumeUnitRate",
                        "volumeUnitTax1",
                        "volumeUnitTax2",
                        "volumeUnitTax3",
                        // "gridUnitRate",
                        // "gridUnitTax1",
                        // "gridUnitTax2",
                        // "gridUnitTax3",
                    ],
                    unitOrSlab: {
                        label: "Tarrif Type",
                        columnSize: 6,
                        inputType: "selectInput",
                        required: true,
                        selectOptions: [
                            {
                                value: "-",
                                description: "-"
                            },
                            {
                                value: "unit",
                                description: "Unit Rate"
                            },
                            {
                                value: "slab",
                                description: "Slab Rates"
                            }
                        ]
                    },
                    volumeUnitRate: {
                        label: "Volume Unit Rate",
                        required: true,
                        columnSize: 12,
                        inputType: "textInput",
                        hide: true,
                    },
                    volumeUnitTax1: {
                        label: "Volume Unit Tax-1",
                        required: true,
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    volumeUnitTax2: {
                        label: "Volume Unit Tax-2",
                        required: true,
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    volumeUnitTax3: {
                        label: "Volume Unit Tax-3",
                        required: true,
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    // gridUnitRate: {
                    //     label: "Grid Unit Rate",
                    //     required: true,
                    //     columnSize: 12,
                    //     inputType: "textInput",
                    //     hide: true,
                    // },
                    // gridUnitTax1: {
                    //     label: "Grid Unit Tax-1",
                    //     required: true,
                    //     columnSize: 4,
                    //     inputType: "textInput",
                    //     hide: true,
                    // },
                    // gridUnitTax2: {
                    //     label: "Grid Unit Tax-2",
                    //     required: true,
                    //     columnSize: 4,
                    //     inputType: "textInput",
                    //     hide: true,
                    // },
                    // gridUnitTax3: {
                    //     label: "Grid Unit Tax-3",
                    //     required: true,
                    //     columnSize: 4,
                    //     inputType: "textInput",
                    //     hide: true,
                    // }
                },
                data: {
                    "tarrifName": "TarrifNAme",
                    "tarrifDescription": "Desc",
                    "project": "project_1",
                    "containsFixedCharges": true,
                    "unitOrSlab": "slab",
                    "slabs": [
                        {
                            "id": "9e9317c0-fdc2-48b3-bca7-66b957c4d91b",
                            "slabType": "dG",
                            "slabLimit": "18",
                            "slabRate": "9",
                            "tax1": "1",
                            "tax2": "2",
                            "tax3": "4"
                        }
                    ],
                    "fixedCharges": [
                        {
                            "id": "7081cdcf-f4f6-4f01-a8cd-7d3882472790",
                            "fixedChargeType": "areaSqft",
                            "chargeName": "Charg1 ",
                            "charge": "6",
                            "tax1": "1",
                            "tax2": "12",
                            "tax3": "3"
                        }
                    ]
                }
            },
            addTarrifGroup: {
                label: "Add Tarrif Group",
                fields: {
                    order: [
                        "tarrifGroupName",
                        "tarrifGroupDescription",
                        "project"
                    ],
                    tarrifGroupName: {
                        label: "Tarrif Group Name",
                        columnSize: 6,
                        inputType: "textInput",
                        required: true
                    },
                    tarrifGroupDescription: {
                        label: "Tarrif Group Description",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    project: {
                        label: "Project",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    }
                }
            },
            attachOrDetachTarrif: {
                label: "Attach Tarrif",
                fields: {
                    order: [
                        "project",
                        "tarrifGroup",
                        "tarrif"
                    ],
                    project: {
                        label: "Project",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },
                    tarrifGroup: {
                        label: "Tarrif Group",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },
                    tarrif: {
                        label: "Tarrif",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    }
                }
            },
            changeTariff: {
                label: "Change Tarrif",
                fields: {
                    order: [
                        "project",
                        "tarrifGroup",
                        "tarrif",
                         "applicableDate"
                    ],
                    project: {
                        label: "Project",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },
                    tarrifGroup: {
                        label: "Tarrif Group",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },
                    tarrif: {
                        label: "Tarrif",
                        columnSize: 6,
                        isAutocomplete: true,
                        required: true,
                        inputType: "selectInput",
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },
                    applicableDate: {
                        label: "Applicable Date",
                        columnSize: 6,
                        required: true,
                        inputType: "dateTimeInput",
                    }
                }
            },
            consumersCSVUpload: {
                label: "Consumer CSV Upload"
            }
        }
    }
}