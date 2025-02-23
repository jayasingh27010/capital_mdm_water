"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "id": "Diganta Ray",
        "label": "Meter Recharges",
        "defaultFilters": {
            "currPage": 1,
            "perPage": 5
        },
        "filterConfig": {
            "filterType": {
                "label": "Filter Type",
                "columnSize": 12,
                "inputType": "selectInput",
                "selectOptions": [
                    {
                        "value": "-",
                        "description": "-"
                    },
                    {
                        "value": "startDate",
                        "description": "Start Date"
                    },
                    {
                        "value": "endDate",
                        "description": "End Date"
                    }
                ]
            },
            "filterValue": {
                "startDate": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "dateInput"
                },
                "endDate": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "dateInput"
                }
            }
        },
        "columns": {
            "order": [
                "paymentType",
                "meter",
                "method",
                "transactionId",
                "checqueNo",
                "checqueDate",
                "bankName",
                "amount",
                "availableBalance",
                "comment",
                "venderCode",
                "createdAt",
            ],
            paymentType: {
                label: "Payment Type",
                renderType: "text"
            },
            meter: {
                label: "Meter",
                renderType: "text",
            },
            method: {
                label: "Method",
                renderType: "text",
            },
            transactionId: {
                label: "Tarnasaction Id",
                renderType: "text",
            },
            checqueNo: {
                label: "Cheque No",
                renderType: "text",
            },
            checqueDate: {
                label: "Cheque Date",
                renderType: "text",
            },
            bankName: {
                label: "Bank Name",
                renderType: "text",
            },
            amount: {
                label: "Amount",
                renderType: "text",
            },
            availableBalance: {
                label: "Previous Balance",
                renderType: "text"
            },
            comment: {
                label: "comment",
                renderType: "text"
            },
            venderCode: {
                label: "Vender Code",
                renderType: "text"
            },
            createdAt: {
                label: " Acion DateTime",
                renderType: "text"
            }
        }
    },
    "data": {
        totalRecords: 9,
        rows: [
            {
                id: 'manual_recharge_1_id',
                paymentType: 'credit note',
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_2_id',
                paymentType: 'debit note',
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_3_id',
                paymentType: 'Manual Recharge',
                meter: 'Meter 1',
                method: 'checque',
                transactionId: " dffs",
                checqueNo: "fsdf",
                checqueDate: "fsdsvv",
                bankName: "afdsdvd",
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_4_id',
                paymentType: 'credit note',
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_5_id',
                paymentType: 'debit note',
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            }
        ]
    }
};
