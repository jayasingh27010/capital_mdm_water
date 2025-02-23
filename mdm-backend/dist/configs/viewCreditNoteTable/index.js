"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    config: {
        label: 'Credit Note',
        defaultFilters: {
            currPage: 1,
            perPage: 5
        },
        filterConfig: {
            filterType: {
                label: "Filter Type",
                columnSize: 12,
                inputType: "selectInput",
                selectOptions: [
                    {
                        value: '',
                        description: ''
                    },
                    {
                        value: 'q',
                        description: "Quick Search"
                    },
                    {
                        value: 'project',
                        description: 'Project'
                    }
                ]
            },
            filterValue: {
                q: {
                    label: "Quick Search",
                    columnSize: 12,
                    inputType: "textInput"
                },
                project: {
                    label: "Filter Value",
                    columnSize: 12,
                    inputType: "selectInput",
                    isAutocomplete: true,
                    selectOptions: [
                        {
                            value: '',
                            description: ''
                        }
                    ]
                },
            }
        },
        columns: {
            order: [
                "consumer",
                "meter",
                "amount",
                //"availableBalance",
                "comment",
                "venderCode",
                "createdAt"
            ],
            consumer: {
                label: "Consumer",
                renderType: "link"
            },
            meter: {
                label: "Meter",
                renderType: "text",
            },
            amount: {
                label: "Amount",
                renderType: "text",
            },
            // availableBalance: {
            //     label: "Available Balance",
            //     renderType: "text"
            // },
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
    data: {
        totalRecords: 9,
        rows: [
            {
                id: 'manual_recharge_1_id',
                consumer: {
                    label: 'Consumer 1',
                    link: `/admin/consumer/1`
                },
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_2_id',
                consumer: {
                    label: 'Consumer 1',
                    link: `/admin/consumer/1`
                },
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_3_id',
                consumer: {
                    label: 'Consumer 1',
                    link: `/admin/consumer/1`
                },
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_4_id',
                consumer: {
                    label: 'Consumer 1',
                    link: `/admin/consumer/1`
                },
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            },
            {
                id: 'manual_recharge_5_id',
                consumer: {
                    label: 'Consumer 1',
                    link: `/admin/consumer/1`
                },
                meter: 'Meter 1',
                amount: '123',
                availableBalance: '235',
                comment: 'sfgwsjkcvjhwscekhwj',
                venderCode: 'jhdijkshweksjvwghvsb'
            }
        ]
    }
};
