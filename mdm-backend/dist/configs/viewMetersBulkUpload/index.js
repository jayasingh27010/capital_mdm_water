"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    config: {
        tableId: "CSVMetersBulkUploadTable",
        errorTableId: "errorCSVMetersBulkUploadTable",
        // uploadNonce: uuid(),
        uploadNonce: "uuid()",
        uploadPath: "<static upload path>",
        sampleCSV: {
            rows: [
                {
                    id: 1,
                    meterSerialNo: "1234567890",
                    // moduleNo: "MOD-2",
                    // phaseType: "Single",
                    // sourceType: "Single",
                    consumptionType: "Energy",
                    firmwareVerison: "Ver-1",
                    project: "Noida"
                },
                {
                    id: 2,
                    meterSerialNo: "1234567891",
                    // moduleNo: "MOD-1",
                    // phaseType: "Single",
                    // sourceType: "Single",
                    consumptionType: "Energy",
                    firmwareVersion: "Ver-2",
                    project: "Vasundhara"
                }
            ]
        },
        columns: {
            order: [
                "id",
                "meterSerialNo",
                // "moduleNo",
                // "phaseType",
                // "sourceType",
                "consumptionType",
                "firmwareVersion",
                "project",
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
            // moduleNo: {
            //     label: "Module No",
            //     renderType: "text"
            // },
            // phaseType: {
            //     label: "Phase Type",
            //     renderType: "text"
            // },
            // sourceType: {
            //     label: "Source Type",
            //     renderType: "text"
            // },
            consumptionType: {
                label: "Consumption Type",
                renderType: "text"
            },
            firmwareVersion: {
                label: "Firmware Version",
                renderType: "text"
            },
            project: {
                label: "Project",
                renderType: "text"
            },
            error: {
                label: "Error",
                renderType: "text"
            }
        }
    }
};
