export default {
    "config": {
        "label": "Current Consumption(This Month)",
        "fields": {
            "order": [
                "eBConsumption",
                "dGConsumption"
            ],
            "eBConsumption": {
                "label": "EB Consumption",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            "dGConsumption": {
                "label": "DG Consumption",
                "columnSize": 3,
                "inputType": "text",
                "maxLength": 10,
                "isSingleLineInput": true
            }
        }
    },
    "data": {
        "eBConsumption": "94.02kWh",
        "dGConsumption": "0.09kWh"
    }
}