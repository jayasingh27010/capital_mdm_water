"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rows = [
    {
        id: 1,
        firstName: "Diganta",
        lastName: "Ray",
        address: "Vasundhara enclave",
        connectionNo: "CN123456",
        project: "Project 1",
        panNo: "A1B2C3D4E5",
        gstNo: "12ABCDE3456F7Z8",
        towerNo: "Tower A",
        flatNo: "145",
        shopNo: "S101",
        mobileNo: "+912255225522",
        emailId: "jaya.gusain27@gmail.com",
        totalLoadGrid: "10 kW",
        gridLoadR: "3.5 kW",
        gridLoadY: "3 kW",
        gridLoadB: "3 kW",
        totalLoadDG: "8 kW",
        DGLoadR: "2.7 kW",
        DGLoadY: "2.6 kW",
        DGLoadB: "2.6 kW",
        installationDate: "22-06-2024",
        openingBalance: "100 units",
        consumptionReadingGrid: "250 units",
        consumptionReadingDG: "200 units",
        area: "1500",
        flatType: "3BHK"
    },
    {
        id: 2,
        firstName: "Jaya",
        lastName: "Singh",
        address: "Vasundhara enclave",
        connectionNo: "CN123456",
        project: "Project 1",
        panNo: "A1B2C3D4E5",
        gstNo: "12ABCDE3456F7Z8",
        towerNo: "Tower A",
        flatNo: "145",
        shopNo: "S101",
        mobileNo: "+912255225522",
        emailId: "jaya.gusain27@gmail.com",
        totalLoadGrid: "10 kW",
        gridLoadR: "3.5 kW",
        gridLoadY: "3 kW",
        gridLoadB: "3 kW",
        totalLoadDG: "8 kW",
        DGLoadR: "2.7 kW",
        DGLoadY: "2.6 kW",
        DGLoadB: "2.6 kW",
        installationDate: "22-06-2024",
        openingBalance: "100 units",
        consumptionReadingGrid: "250 units",
        consumptionReadingDG: "200 units",
        area: "1500",
        flatType: "3BHK",
        error: "Duplicate Record"
    }
];
exports.default = {
    config: {
        tableId: "CSVConsumersBulkUploadResultTable",
        errorTableId: "errorCSVConsumersBulkUploadResultTable",
        // uploadNonce: uuid(),
        uploadNonce: "uuid()",
        uploadPath: "<static upload path>",
        rows: rows,
        columns: {
            order: [
                "id",
                "firstName",
                "lastName",
                "address",
                "connectionNo",
                "project",
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
                "consumptionReadingGrid",
                // "consumptionReadingDG",
                "area",
                "flatType",
                "error"
            ],
            id: {
                label: "ID",
                renderType: "text"
            },
            firstName: {
                label: "Consumer Name",
                renderType: "text"
            },
            lastName: {
                label: "Consumer Name",
                renderType: "text"
            },
            address: {
                label: "Address",
                renderType: "text"
            },
            connectionNo: {
                label: "Connection No.",
                renderType: "text"
            },
            project: {
                label: "Project",
                renderType: "text"
            },
            panNo: {
                label: "Pan NO.",
                renderType: "text"
            },
            gstNo: {
                label: "GST NO.",
                renderType: "text"
            },
            towerNo: {
                label: "Tower NO.",
                renderType: "text"
            },
            flatNo: {
                label: "Flat NO.",
                renderType: "text"
            },
            shopNo: {
                label: "Shop NO.",
                renderType: "text"
            },
            mobileNo: {
                label: "Mobile No.",
                renderType: "text"
            },
            emailId: {
                label: "Email",
                renderType: "text"
            },
            // totalLoadGrid: {
            //     label: "Total Load GRID",
            //     renderType: "text"
            // },
            // gridLoadR: {
            //     label: "GRID Load R",
            //     renderType: "text"
            // },
            // gridLoadY: {
            //     label: "GRID Load Y",
            //     renderType: "text"
            // },
            // gridLoadB: {
            //     label: "GRID Load B",
            //     renderType: "text"
            // },
            // totalLoadDG: {
            //     label: "Total Load DG",
            //     renderType: "text"
            // },
            // DGLoadR: {
            //     label: "DG Load R",
            //     renderType: "text"
            // },
            // DGLoadY: {
            //     label: "DG Load Y",
            //     renderType: "text"
            // },
            // DGLoadB: {
            //     label: "DG Load B",
            //     renderType: "text"
            // },
            installationDate: {
                label: "Installation Date",
                renderType: "text"
            },
            openingBalance: {
                label: "Opening Balance",
                renderType: "text"
            },
            consumptionReadingGrid: {
                label: "Consumption Reading (For GRID)",
                renderType: "text"
            },
            // consumptionReadingDG: {
            //     label: "Consumption Reading (For DG)",
            //     renderType: "text"
            // },
            area: {
                label: "Area",
                renderType: "text"
            },
            flatType: {
                label: "Flat Type ",
                renderType: "text"
            },
            error: {
                label: "Error",
                renderType: "text"
            }
        },
        totalRecords: rows.length
    }
};
