"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    config: {
        label: 'Tarrif Details',
        fields: {
            order: [
                "name",
                "tarrifType",
                "project",
                "tarrifGroup",
            ],
            name: {
                label: "Tarrif Name",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                disabled: true,
                maxLength: 10
            },
            tarrifType: {
                label: "Tarrif Type",
                columnSize: 3,
                inputType: "text",
                isSingleLineInput: true,
                disabled: true,
                maxLength: 10
            },
            project: {
                label: "Project",
                columnSize: 3,
                inputType: "link",
                disabled: true,
                maxLength: 10,
                isSingleLineInput: true
            },
            tarrifGroup: {
                label: "Tarrif Group",
                columnSize: 3,
                inputType: "text",
                maxLength: 10,
                isSingleLineInput: true,
                disabled: true,
            }
        },
        actions: {
            order: [
                "viewTarrif",
                // "duplicateTarrif"
            ],
            viewTarrif: {
                label: 'View Tarrif',
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
                        disabled: true,
                        inputType: "textInput"
                    },
                    tarrifDescription: {
                        label: "Tarrif Description",
                        columnSize: 6,
                        disabled: true,
                        inputType: "textInput"
                    },
                    containsFixedCharges: {
                        label: "Has Fixed Charges?",
                        columnSize: 6,
                        disabled: true,
                        inputType: "switchInput"
                    },
                    project: {
                        label: "Project",
                        columnSize: 6,
                        inputType: "textInput",
                        //isAutocomplete: true,
                        disabled: true,
                        required: true,
                        // selectOptions: [
                        //     {
                        //         value: '',
                        //         description: ''
                        //     }
                        // ]
                    },
                    "fixedChargeCalculationType": {
                        "label": "Fixed Charge Calculation Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "required": true,
                        "disabled": true,
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
                        "required": true,
                        "disabled": true
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
                        disabled: true,
                        inputType: "textInput"
                    },
                    fixedChargeField2: {
                        label: "Fixed Chrg 2",
                        columnSize: 6,
                        disabled: true,
                        inputType: "textInput"
                    },
                    fixedChargeField3: {
                        label: "Fixed Chrg 3",
                        columnSize: 6,
                        disabled: true,
                        inputType: "textInput"
                    },
                    fixedChargeField4: {
                        label: "Fixed Chrg 4",
                        columnSize: 6,
                        disabled: true,
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
                        disabled: true,
                        inputType: "textInput"
                    }
                },
                slabFields: {
                    order: [
                        "unitOrSlab",
                        "dGUnitRate",
                        "dGUnitTax1",
                        "dGUnitTax2",
                        "dGUnitTax3",
                        "gridUnitRate",
                        "gridUnitTax1",
                        "gridUnitTax2",
                        "gridUnitTax3",
                    ],
                    unitOrSlab: {
                        label: "Tarrif Type",
                        columnSize: 6,
                        disabled: true,
                        inputType: "selectInput",
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
                    dGUnitRate: {
                        label: "DG Unit Rate",
                        columnSize: 12,
                        inputType: "textInput",
                        disabled: true,
                        hide: true,
                    },
                    dGUnitTax1: {
                        label: "DG Unit Tax-1",
                        columnSize: 4,
                        inputType: "textInput",
                        disabled: true,
                        hide: true,
                    },
                    dGUnitTax2: {
                        label: "DG Unit Tax-2",
                        columnSize: 4,
                        inputType: "textInput",
                        disabled: true,
                        hide: true,
                    },
                    dGUnitTax3: {
                        label: "DG Unit Tax-3",
                        columnSize: 4,
                        inputType: "textInput",
                        disabled: true,
                        hide: true,
                    },
                    gridUnitRate: {
                        label: "Grid Unit Rate",
                        columnSize: 12,
                        disabled: true,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitTax1: {
                        label: "Grid Unit Tax-1",
                        columnSize: 4,
                        disabled: true,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitTax2: {
                        label: "Grid Unit Tax-2",
                        columnSize: 4,
                        disabled: true,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitTax3: {
                        label: "Grid Unit Tax-3",
                        columnSize: 4,
                        disabled: true,
                        inputType: "textInput",
                        hide: true,
                    }
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
            duplicateTarrif: {
                label: 'Duplicate Tarrif',
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
                        "disabled": true,
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
                        "required": true,
                        "disabled": true
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
                        "dGUnitRate",
                        "dGUnitTax1",
                        "dGUnitTax2",
                        "dGUnitTax3",
                        "gridUnitRate",
                        "gridUnitTax1",
                        "gridUnitTax2",
                        "gridUnitTax3",
                    ],
                    unitOrSlab: {
                        label: "Tarrif Type",
                        columnSize: 6,
                        inputType: "selectInput",
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
                    dGUnitRate: {
                        label: "DG Unit Rate",
                        columnSize: 12,
                        inputType: "textInput",
                        hide: true,
                    },
                    dGUnitTax1: {
                        label: "DG Unit Tax-1",
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    dGUnitTax2: {
                        label: "DG Unit Tax-2",
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    dGUnitTax3: {
                        label: "DG Unit Tax-3",
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitRate: {
                        label: "Grid Unit Rate",
                        columnSize: 12,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitTax1: {
                        label: "Grid Unit Tax-1",
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitTax2: {
                        label: "Grid Unit Tax-2",
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    },
                    gridUnitTax3: {
                        label: "Grid Unit Tax-3",
                        columnSize: 4,
                        inputType: "textInput",
                        hide: true,
                    }
                },
                data: {
                    "tarrifName": "",
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
        }
    },
    data: {
        name: "Tarrif 1",
        tarrifType: 'Unit + Fixed Charges',
        tarrifGroup: 'VAR 1',
        project: {
            link: '/admin/projects/Vardhaman',
            value: 'Vardhaman'
        },
    }
};
