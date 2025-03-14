export default {
    "config": {
        "label": "Sanctioned Load",
        "fields": {
            "order": [
                "eBSanctionedLoad",
                "dGSanctionedLoad"
            ],
            "eBSanctionedLoad": {
                "label": "EB Sanctioned Load",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "dGSanctionedLoad": {
                "label": "DG Sanctioned Load",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            }
        }
    },
    "data": {
        "eBSanctionedLoad": "10.0KW",
        "dGSanctionedLoad": "8.0KW"
    }
}