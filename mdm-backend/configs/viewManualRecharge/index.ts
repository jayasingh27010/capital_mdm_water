export default {
    "config": {
        "actions": {
            "order": [
                "manualRecharge",
                "creditNote",
                "debitNote",
            ],
            "manualRecharge": {
                "label": "Manual Recharge",
                "fields": {
                    "order": [
                        "crnNo",
                        "consumer",
                        "meter",
                        "method",
                        // "transactionId",
                        "checqueNo",
                        "checqueDate",
                        "bankName",
                        "amount",
                        "availableBalance",
                        "comments",
                        // "vendingCode"
                    ],
                    "crnNo": {
                        "label": "Select CRN No.",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                        ]
                    },
                    "consumer": {
                        "label": "Select Consumer",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                        ]
                    },
                    "meter": {
                        "label": "Meters",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "isAutocomplete": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ],
                        "required": true
                    },
                    "method": {
                        "label": "Method",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            {
                                "value": "cash",
                                "description": "Cash"
                            },
                            {
                                "value": "cheque",
                                "description": "Cheque"
                            },
                            {
                                "value": "token",
                                "description": "Token"
                            },
                            {
                                "value": "online",
                                "description": "Online"
                            },
                            {
                                "value": "creditCard",
                                "description": "Online Credit Card"
                            },
                            {
                                "value": "debitCard",
                                "description": "Online Debit Card"
                            }
                        ]
                    },
                    "transactionId": {
                        "label": "Transaction Id",
                        "columnSize": 6,
                        "inputType": "textInput",
                        //"isVisible"
                        //"required": true,
                    },
                    "checqueNo": {
                        "label": "Cheque No.",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "checqueDate": {
                        "label": "Checque Date",
                        "columnSize": 6,
                        "inputType": "dateInput",
                        "required": true,
                    },
                    "bankName": {
                        "label": "Bank Name",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "isAutocomplete": true,
                        "required": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ]
                    },
                    "amount": {
                        "label": "Amount",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true,
                    },
                    "availableBalance": {
                        "label": "Available Balance",
                        "columnSize": 6,
                        "inputType": "textInput",
                        // "required": true,
                        "disabled":true,
                    },
                    "comments": {
                        "label": "Comments",
                        "columnSize": 6,
                        "inputType": "textInput",
                    },
                    "vendingCode": {
                        "label": "Vending Code",
                        "columnSize": 6,
                        "inputType": "textInput",
                    }
                }
            },
            "creditNote": {
                "label": "Credit Note",
                "fields": {
                    "order": [
                        "crnNo",
                        "consumer",
                        "meter",
                        "amount",
                        "availableBalance",
                        "comments",
                        // "vendingCode"
                    ],
                    "crnNo": {
                        "label": "Select CRN No.",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                        ]
                    },
                    "consumer": {
                        "label": "Select Consumer",
                        "columnSize": 6,
                        "required": true,
                        "isAutocomplete": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                        ]
                    },
                    "meter": {
                        "label": "Meters",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "isAutocomplete": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ],
                        "required": true
                    },
                    "amount": {
                        "label": "Amount",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "availableBalance": {
                        "label": "Available Balance",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "disabled": true,
                    },
                    "comments": {
                        "label": "Comments",
                        "columnSize": 6,
                        "inputType": "textInput",
                    },
                    "vendingCode": {
                        "label": "Vending Code",
                        "columnSize": 6,
                        "inputType": "textInput",
                    }
                }
            },
            "debitNote": {
                "label": "Debit Note",
                "fields": {
                    "order": [
                        "crnNo",
                        "consumer",
                        "meter",
                        "amount",
                        "availableBalance",
                        "comments",
                        // "vendingCode"
                    ],
                    "crnNo": {
                        "label": "Select CRN No.",
                        "columnSize": 6,
                        "isAutocomplete": true,
                        "required": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                        ]
                    },
                    "consumer": {
                        "label": "Select Consumer",
                        "columnSize": 6,
                        "required": true,
                        "isAutocomplete": true,
                        "inputType": "selectInput",
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            },
                            
                        ]
                    },
                    "meter": {
                        "label": "Meters",
                        "columnSize": 6,
                        "inputType": "selectInput",
                        "isAutocomplete": true,
                        "selectOptions": [
                            {
                                "value": "-",
                                "description": "-"
                            }
                        ],
                        "required": true
                    },
                    "amount": {
                        "label": "Amount",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true
                    },
                    "availableBalance": {
                        "label": "Available Balance",
                        "columnSize": 6,
                        "inputType": "textInput",
                        "required": true,
                        "disabled":true,
                    },
                    "comments": {
                        "label": "Comments",
                        "columnSize": 6,
                        "inputType": "textInput",
                    },
                    "vendingCode": {
                        "label": "Vending Code",
                        "columnSize": 6,
                        "inputType": "textInput",
                    }
                }
            }
        }
    }
}