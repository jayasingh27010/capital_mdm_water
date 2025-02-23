"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "Service Status",
        "fields": {
            "order": [
                // "databaseService",
                "hesConnectorService",
                "kafkaConsumer",
                // "nodejsService",
                "parsingService",
                "mqttSubscriber",
                "androidConnector"
            ],
            // "databaseService": {
            //     "label": "Database Service",
            //     "columnSize": 3,
            //     "inputType": "text",
            //     "isSingleLineInput": true,
            //     "maxLength": 20
            // },
            "hesConnectorService": {
                "label": "Hes-Connector Service",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 20
            },
            "kafkaConsumer": {
                "label": "Kafka Consumer",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 20
            },
            // "nodejsService":{
            //     "label": "NodeJs Service",
            //     "columnSize": 3,
            //     "inputType": "text",
            //     "isSingleLineInput": true,
            //     "maxLength": 20 
            // },
            "parsingService": {
                "label": "Parsing Service",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 20
            },
            "mqttSubscriber": {
                "label": "Mqtt Subscriber",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 20
            },
            "androidConnector": {
                "label": "Android Connector",
                "columnSize": 3,
                "inputType": "text",
                "isSingleLineInput": true,
                "maxLength": 20
            }
        }
    },
    "data": {
        // "databaseService": "DOWN",
        "hesConnectorService": "DOWN",
        "kafkaConsumer": "DOWN",
        // "nodejsService": "DOWN",
        "parsingService": "DOWN",
        "mqttSubscriber": "DOWN"
    }
};
