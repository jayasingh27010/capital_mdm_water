export default {
    "config": {
        "label": "Meter Dynamic Params",
        "fields": {
            "order": [
                "relay",
                // "meterHealth"
            ],
            "relay": {
                "label": "Relay",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 10
            },
            // "meterHealth": {
            //     "label": "Meter Health",
            //     "columnSize": 3,
            //     "inputType": "text",
            //     "isSingleLineInput": true,
            //     "maxLength": 10
            // }
        }
    },
    "data": {
        "relay": "ON",
        "meterHealth": "EXCELLENT"
    }
}