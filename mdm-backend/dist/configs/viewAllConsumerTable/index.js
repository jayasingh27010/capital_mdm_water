"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "config": {
        "label": "All Consumers",
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
                        "value": "project",
                        "description": "Project"
                    },
                    {
                        "value": "q",
                        "description": "Quick Search"
                    }
                ]
            },
            "filterValue": {
                "consumerNameSearch": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "textInput"
                },
                "project": {
                    "label": "Project",
                    "columnSize": 12,
                    "isAutocomplete": true,
                    "inputType": "selectInput",
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        }
                    ]
                },
                "q": {
                    "label": "Quick Search",
                    "columnSize": 12,
                    "inputType": "textInput"
                }
            }
        },
        "columns": {
            "order": [
                "consumerName",
                "project",
                "meter",
                "address",
                "connectionNo",
                "panNo",
                "gstNo",
                "towerNo",
                "flatNo",
                "shopNo",
                "mobileNo",
                "emailId",
                // "totalLoadGrid",
                // "gridLoadR",
                // "gridLoadY",
                // "gridLoadB",
                // "totalLoadDG",
                // "DGLoadR",
                // "DGLoadY",
                // "DGLoadB",
                "installationDate",
                "openingBalance",
                "consumptionReadingGridKwh",
                // "consumptionReadingDGKwh",
                // "consumptionReadingGridKvah",
                // "consumptionReadingDGKvah",
                "area",
                "flatType",
                "crnNo",
                // "password"
            ],
            "crnNo": {
                "label": "Crn No",
                "renderType": "text"
            },
            "password": {
                "label": "Password",
                "renderType": "text"
            },
            "consumerName": {
                "label": "Consumer Name",
                "renderType": "link"
            },
            "address": {
                "label": "Address",
                "renderType": "text"
            },
            "connectionNo": {
                "label": "Connection No.",
                "renderType": "text"
            },
            "project": {
                "label": "Project",
                "renderType": "link"
            },
            "panNo": {
                "label": "Pan NO.",
                "renderType": "text"
            },
            "gstNo": {
                "label": "GST NO.",
                "renderType": "text"
            },
            "towerNo": {
                "label": "Tower NO.",
                "renderType": "text"
            },
            "flatNo": {
                "label": "Flat NO.",
                "renderType": "text"
            },
            "shopNo": {
                "label": "Shop NO.",
                "renderType": "text"
            },
            "mobileNo": {
                "label": "Mobile No.",
                "renderType": "text"
            },
            "emailId": {
                "label": "Email",
                "renderType": "text"
            },
            // "totalLoadGrid": {
            //     "label": "Total Load GRID",
            //     "renderType": "text"
            // },
            // "gridLoadR": {
            //     "label": "GRID Load R",
            //     "renderType": "text"
            // },
            // "gridLoadY": {
            //     "label": "GRID Load Y",
            //     "renderType": "text"
            // },
            // "gridLoadB": {
            //     "label": "GRID Load B",
            //     "renderType": "text"
            // },
            // "totalLoadDG": {
            //     "label": "Total Load DG",
            //     "renderType": "text"
            // },
            // "DGLoadR": {
            //     "label": "DG Load R",
            //     "renderType": "text"
            // },
            // "DGLoadY": {
            //     "label": "DG Load Y",
            //     "renderType": "text"
            // },
            // "DGLoadB": {
            //     "label": "DG Load B",
            //     "renderType": "text"
            // },
            "installationDate": {
                "label": "Installation Date",
                "renderType": "text"
            },
            "openingBalance": {
                "label": "Opening Balance",
                "renderType": "text"
            },
            "consumptionReadingGridKwh": {
                "label": "Consumption Reading (KWH For GRID)",
                "renderType": "text"
            },
            // "consumptionReadingGridKvah": {
            //     "label": "Consumption Reading (KVAH For GRID)",
            //     "renderType": "text"
            // },
            // "consumptionReadingDGKwh": {
            //     "label": "Consumption Reading (KWH For DG)",
            //     "renderType": "text"
            // },
            // "consumptionReadingDGKvah": {
            //     "label": "Consumption Reading (KVAH For DG)",
            //     "renderType": "text"
            // },
            "area": {
                "label": "Area",
                "renderType": "text"
            },
            "flatType": {
                "label": "Flat Type ",
                "renderType": "text"
            },
            "meter": {
                "label": "Meter",
                "renderType": "link"
            }
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": [
            {
                "id": "consumer_1_id",
                "crnNo": "Vasundhara enclave",
                "password": "Vasundhara enclave",
                "consumerName": {
                    "link": "/admin/consumers/Diganta%20Ray",
                    "label": "Diganta Ray"
                },
                "address": "Vasundhara enclave",
                "connectionNo": "CN123456",
                "project": "Project 1",
                "panNo": "A1B2C3D4E5",
                "gstNo": "12ABCDE3456F7Z8",
                "towerNo": "Tower A",
                "flatNo": "145",
                "shopNo": "S101",
                "mobileNo": "+912255225522",
                "emailId": "jaya.gusain27@gmail.com",
                // "totalLoadGrid": "10 kW",
                // "gridLoadR": "3.5 kW",
                // "gridLoadY": "3 kW",
                // "gridLoadB": "3.4 kW",
                // "totalLoadDG": "8 kW",
                // "DGLoadR": "2.7 kW",
                // "DGLoadY": "2.6 kW",
                // "DGLoadB": "2.6 kW",
                "installationDate": "22-06-2024",
                "openingBalance": "100 units",
                "consumptionReadingGridKwh": "250 units",
                // "consumptionReadingGridKvah": "200 units",
                // "consumptionReadingDGKwh": "250 units",
                // "consumptionReadingDGKvahh": "200 units",
                "area": "1500",
                "flatType": "3BHK"
            },
            {
                "id": "consumer_2_id",
                "crnNo": "Vasundhara enclave",
                "password": "Vasundhara enclave",
                "consumerName": {
                    "link": "/admin/consumers/Harshit%20Shrivastava",
                    "label": "Harshit Shrivastava"
                },
                "address": "Vasundhara enclave",
                "connectionNo": "CN123456",
                "project": "Project 2",
                "panNo": "A1B2C3D4E5",
                "gstNo": "12ABCDE3456F7Z8",
                "towerNo": "Tower A",
                "flatNo": "145",
                "shopNo": "S101",
                "mobileNo": "+912255225522",
                "emailId": "jaya.gusain27@gmail.com",
                // "totalLoadGrid": "10 kW",
                // "gridLoadR": "3.5 kW",
                // "gridLoadY": "3 kW",
                // "gridLoadB": "3.4 kW",
                // "totalLoadDG": "8 kW",
                // "DGLoadR": "2.7 kW",
                // "DGLoadY": "2.6 kW",
                // "DGLoadB": "2.6 kW",
                "installationDate": "22-06-2024",
                "openingBalance": "100 units",
                "consumptionReadingGridKwh": "250 units",
                // "consumptionReadingGridKvah": "200 units",
                // "consumptionReadingDGKwh": "250 units",
                // "consumptionReadingDGKvahh": "200 units",
                "area": "1500",
                "flatType": "3BHK"
            },
            {
                "id": "consumer_3_id",
                "crnNo": "Vasundhara enclave",
                "password": "Vasundhara enclave",
                "consumerName": {
                    "link": "/admin/consumers/Jaya%20Gusain",
                    "label": "Jaya Gusain"
                },
                "address": "Vasundhara enclave",
                "connectionNo": "CN123456",
                "project": "Project 3",
                "panNo": "A1B2C3D4E5",
                "gstNo": "12ABCDE3456F7Z8",
                "towerNo": "Tower A",
                "flatNo": "145",
                "shopNo": "S101",
                "mobileNo": "+912255225522",
                "emailId": "jaya.gusain27@gmail.com",
                // "totalLoadGrid": "10 kW",
                // "gridLoadR": "3.5 kW",
                // "gridLoadY": "3 kW",
                // "gridLoadB": "3.4 kW",
                // "totalLoadDG": "8 kW",
                // "DGLoadR": "2.7 kW",
                // "DGLoadY": "2.6 kW",
                // "DGLoadB": "2.6 kW",
                "installationDate": "22-06-2024",
                "openingBalance": "100 units",
                "consumptionReadingGridKwh": "250 units",
                // "consumptionReadingGridKvah": "200 units",
                // "consumptionReadingDGKwh": "250 units",
                // "consumptionReadingDGKvahh": "200 units",
                "area": "1500",
                "flatType": "3BHK"
            },
            {
                "id": "consumer_4_id",
                "crnNo": "Vasundhara enclave",
                "password": "Vasundhara enclave",
                "consumerName": {
                    "link": "/admin/consumers/Diganta%20Ray",
                    "label": "Diganta Ray"
                },
                "address": "Vasundhara enclave",
                "connectionNo": "CN123456",
                "project": "Project 1",
                "panNo": "A1B2C3D4E5",
                "gstNo": "12ABCDE3456F7Z8",
                "towerNo": "Tower A",
                "flatNo": "145",
                "shopNo": "S101",
                "mobileNo": "+912255225522",
                "emailId": "jaya.gusain27@gmail.com",
                // "totalLoadGrid": "10 kW",
                // "gridLoadR": "3.5 kW",
                // "gridLoadY": "3 kW",
                // "gridLoadB": "3.4 kW",
                // "totalLoadDG": "8 kW",
                // "DGLoadR": "2.7 kW",
                // "DGLoadY": "2.6 kW",
                // "DGLoadB": "2.6 kW",
                "installationDate": "22-06-2024",
                "openingBalance": "100 units",
                "consumptionReadingGridKwh": "250 units",
                // "consumptionReadingGridKvah": "200 units",
                // "consumptionReadingDGKwh": "250 units",
                // "consumptionReadingDGKvahh": "200 units",
                "area": "1500",
                "flatType": "3BHK"
            },
            {
                "id": "consumer_5_id",
                "crnNo": "Vasundhara enclave",
                "password": "Vasundhara enclave",
                "consumerName": {
                    "link": "/admin/consumers/Diganta%20Ray",
                    "label": "Diganta Ray"
                },
                "address": "Vasundhara enclave",
                "connectionNo": "CN123456",
                "project": "Project 2",
                "panNo": "A1B2C3D4E5",
                "gstNo": "12ABCDE3456F7Z8",
                "towerNo": "Tower A",
                "flatNo": "145",
                "shopNo": "S101",
                "mobileNo": "+912255225522",
                "emailId": "jaya.gusain27@gmail.com",
                // "totalLoadGrid": "10 kW",
                // "gridLoadR": "3.5 kW",
                // "gridLoadY": "3 kW",
                // "gridLoadB": "3.4 kW",
                // "totalLoadDG": "8 kW",
                // "DGLoadR": "2.7 kW",
                // "DGLoadY": "2.6 kW",
                // "DGLoadB": "2.6 kW",
                "installationDate": "22-06-2024",
                "openingBalance": "100 units",
                "consumptionReadingGridKwh": "250 units",
                // "consumptionReadingGridKvah": "200 units",
                // "consumptionReadingDGKwh": "250 units",
                // "consumptionReadingDGKvahh": "200 units",
                "area": "1500",
                "flatType": "3BHK"
            }
        ]
    }
};
