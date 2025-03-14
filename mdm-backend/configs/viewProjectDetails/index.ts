export default {
    "config": {
        "label": "Project Details",
        "actions": {
            "order": [
                "editProject",
                "disableProject",
                "enableProject",
                // "deleteProject"
            ],
            "editProject": {
                "label": "Edit Project",
                "fields": {
                    "order": [
                        "projectName",
                        "projectAddress",
                        "projectCode",
                        "billingType",
                    ],
                    "projectName": {
                        "label": "Project Name",
                        "columnSize": 6,
                        "inputType": "textInput",
                    },
                    "projectAddress": {
                        "label": "Project Address",
                        "columnSize": 6,
                        "inputType": "textInput"
                    },
                    "projectCode": {
                        "label": "Project Code",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "disabled": true,
                    },
                    "billingType": {
                        "label": "Billing Type",
                        "columnSize": 6,
                        "disabled": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "kwh",
                                "description": "kWh"
                            },
                            {
                                "value": "kvah",
                                "description": "kVah"
                            }
                        ]
                    }
                },
                "data": {
                    "projectName": "Project1",
                    "projectAddress": "project Address",
                    "projectCode": "0001",
                    "billingType": "kWh"
                }
            },
            "disableProject": {
                "label": "Disable Project"
            },
            "deleteProject": {
                "label": "Delete Project"
            },
            "enableProject": {
                "label": "Enable Project"
            }
        },
        "fields": {
            "order": [
                "projectName",
                "projectAddress",
                "projectCode",
                "billingType",
                "enabled"
            ],
            "projectName": {
                "label": "Project Name",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "projectAddress": {
                "label": "Project Address",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "projectCode": {
                "label": "Project Code",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "billingType": {
                "label": "Billing Type",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "enabled": {
                "label": "Enabled",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            }
        }
    },
    "data": {
        "projectName": "Project1",
        "projectAddress": "project Address",
        "projectCode": "0001",
        "billingType": "kWh"
    }
}