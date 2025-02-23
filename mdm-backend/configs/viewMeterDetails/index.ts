export default {
    "config": {
        "label": "Meter Details",
        "fields": {
            "order": [
                "meterSerialNo",
                "consumptionType",
                "firmwareVersion",
                "project",
                "consumer",
                "encryptionKey"
            ],
            "meterSerialNo": {
                "label": "Meter Serial No",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "consumptionType": {
                "label": "Consumption Type",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "project": {
                "label": "Project",
                "columnSize": 3,
                "inputType": "link",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "consumer": {
                "label": "Consumer",
                "columnSize": 3,
                "inputType": "link",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "firmwareVersion": {
                "label": "Firmware Version",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            },
            "encryptionKey":{
                "label": "Encryption Key",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            }
        },
        actions: {
            order: [
                "editMeter"
            ],
            editMeter: {
                label: "Edit Meter",
                fields: {
                    order: [
                        "meterSerialNo",
                        "consumptionType",
                        "firmwareVersion",
                        "project",
                        "encryptionKey"
                    ],
                    meterSerialNo: {
                        label: "Meter Serial No",
                        columnSize: 6,
                        disabled: true,
                        inputType: "textInput",
                    },
                    consumptionType: {
                        label: "Select Consumption Type",
                        columnSize: 6,
                        inputType: "selectInput",
                        required: true,
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            },
                            {
                                value: 'gas',
                                description: 'Gas'
                            },
                            {
                                value: 'energy',
                                description: 'Energy'
                            },
                            {
                                value: 'water',
                                description: 'Water'
                            },
                            {
                                value: 'other',
                                description: 'Other'
                            }

                        ]
                    },
                    firmwareVersion: {
                        label: "Firmware Version",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    project: {
                        label: "Project",
                        columnSize: 6,
                        inputType: "selectInput",
                        isAutocomplete: true,
                        required: true,
                        disabled: true,
                        selectOptions: [
                            {
                                value: '',
                                description: ''
                            }
                        ]
                    },  
                    encryptionKey: {
                        label: "Encryption Key",
                        columnSize: 6,
                        inputType: "textInput"
                    },
                    
                },
                data: {
                    meterSerialNo: "CPS-0001",
                    consumptionType: "gas"
                }
            }
        }
    },
    "data": {
        "meterSerialNo": "CPS-00001",
        "consumptionType": "Gas",
        "project": {
            "value": "",
            "link": "/admin/users"
        }
    }
}