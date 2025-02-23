export default {
    "config": {
        "actions": {
            "order": [
                "setCommunication",
                "sendSms"
            ],
            "setCommunication": {
                "label": "SEND EMAIL",
                 "fields": {

                    "order": [
                        "selectionType",
                        "userType",
                        "project"

                    ],
                    "selectionType": {
                        "label": "Receipient",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "allUsers",
                                "description": "All Users"
                            },
                            {
                                "value": "selectUsers",
                                "description": "Select Users"
                            },

                        ]
                    },
                    "userType": {
                        "label": "Select User Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "mdmUsers",
                                "description": "MDM Users"
                            },
                            {
                                "value": "consumers",
                                "description": "Consumers"
                            },
                        
                        ]
                    },
                "project": {
                        "label": "Select Project",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            
                            
                        
                        ]
                    },
                },
            },
            "sendSms": {
                "label": "SEND SMS",
                "fields": {

                    "order": [
                        "selectionType",
                        "userType",
                        "project",
                        "templateType"

                    ],
                    "selectionType": {
                        "label": "Receipient",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "allUsers",
                                "description": "All Users"
                            },
                            {
                                "value": "selectUsers",
                                "description": "Select Users"
                            },

                        ]
                    },
                    "userType": {
                        "label": "Select User Type",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "mdmUsers",
                                "description": "MDM Users"
                            },
                            {
                                "value": "consumers",
                                "description": "Consumers"
                            },
                        
                        ]
                    },
                "project": {
                        "label": "Select Project",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            
                            
                        
                        ]
                    },
                    "templateType": {
                        "label": "Select Template",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "lowCredit",
                                "description": "Low Credit"
                            },
                            {
                                "value": "relayDisconnect",
                                "description": "Relay Disconnect"
                            },
                            {
                                "value": "custom",
                                "description": "Custom"
                            },
                        ]
                    },
                },
            },

        }
    }
}