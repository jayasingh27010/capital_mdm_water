"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rows = [
    {
        id: 1,
        meterSerialNo: "Geeks",
        moduleNo: "developer",
        phaseType: "Single",
        sourceType: "Single",
        consumptionType: "Energy",
        error: "Duplicate Record"
    },
    {
        id: 2,
        meterSerialNo: "Geeks2",
        moduleNo: "developer2",
        phaseType: "Single",
        sourceType: "Single",
        consumptionType: "Energy",
        error: "Duplicate Record"
    }
];
exports.default = {
    config: {
        tableId: "CSVMetersBulkUploadResultTable",
        errorTableId: "errorCSVMetersBulkUploadResultTable",
        // uploadNonce: uuid(),
        uploadNonce: "uuid()",
        uploadPath: "<static upload path>",
        rows: rows,
        columns: {
            order: [
                "id",
                "meterSerialNo",
                "moduleNo",
                "phaseType",
                "sourceType",
                "consumptionType",
                "error"
            ],
            id: {
                label: "ID",
                renderType: "text"
            },
            meterSerialNo: {
                label: "Meter Serial No",
                renderType: "text"
            },
            moduleNo: {
                label: "Module No",
                renderType: "text"
            },
            phaseType: {
                label: "Phase Type",
                renderType: "text"
            },
            sourceType: {
                label: "Source Type",
                renderType: "text"
            },
            consumptionType: {
                label: "Consumption Type",
                renderType: "text"
            },
            error: {
                label: "Error",
                renderType: "text"
            },
        },
        totalRecords: rows.length
    }
};
