import { required } from "joi";

export default {
    "config": {
        "actions": {
            "order": [
                "createProject"
            ],
            "createProject": {
                "label": "Add Project",
                "fields": {
                    "order": [
                        "projectName",
                        "projectAddress",
                        // "projectCode",
                        "billingType",
                        // "fixedChargeCalculationType",
                        //"holidays",
                        // "happyHoursStart",
                        // "fixedChargeDiductionTime"
                    ],
                    "projectName": {
                        "label": "Project Name",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "projectAddress": {
                        "label": "Project Address",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "projectCode": {
                        "label": "Project Code",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    
                    "billingType": {
                        "label": "Billing Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "required": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "liter",
                                "description": "liter"
                            },
                            // {
                            //     "value": "kvah",
                            //     "description": "kVah"
                            // }
                        ]
                    },
                    "fixedChargeCalculationType":{
                        "label": "Fixed Charge Calculatiion Type",
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
                    // "holidays": {
                    //     "label": "Holidays",
                    //     "columnSize": 6,
                    //     "inputType": "dateInput",
                    //     "required": true
                    // },
                    // "happyHoursStart": {
                    //     "label": "Happy Hours Start Time",
                    //     "columnSize": 6,
                    //     "inputType": "timeInput",
                    //     "required": true
                    // },
                }
            }
        }
    }
}