export default {
    config: {
        tableId: "CSVConsumersBulkUploadTable",
        errorTableId: "errorCSVConsumersBulkUploadTable",
        // uploadNonce: uuid(),
        uploadNonce: "uuid()",
        uploadPath: "<static upload path>",
        sampleCSV: {
            rows: [
                {
                    id: 1,
                    firstName: "Diganta",
                    lastName: "Ray",
                    address: "Vasundhara enclave",
                    isVVIP: "No",
                    // connectionNo: "CN123456",
                    project: "Noida",
                    panNo: "A1B2C3D4E5",
                    gstNo: "12ABCDE3456F7Z8",
                    towerNo: "Tower A",
                    flatType: "3 BHK",
                    flatNo: "145",
                    shopNo: "S101",
                    mobileNo: "2255225522",
                    email: "jaya.gusain27@gmail.com",
                    // totalLoadGrid: "10",
                    // gridLoadR: "3.5",
                    // gridLoadY: "3",
                    // gridLoadB: "3",
                    // totalLoadDG: "8",
                    // DGLoadR: "2.7",
                    // DGLoadY: "2.6",
                    // DGLoadB: "2.6",
                    installationDate: "22-06-2024",
                    openingBalance: "100",
                    // consumptionReadingGrid: 0,
                    // consumptionReadingDG: 0,
                    consumptionReadingGridKwh: 0,
                    // consumptionReadingGridKvah: 0,
                    // consumptionReadingDGKwh: 0,
                    // consumptionReadingDGKvah: 0,
                    tarrifGroup: "TG1",
                    meterSerialNo: "1234567892",
                    area: "1500"
                },
                {
                    id: 2,
                    firstName: "Jaya",
                    lastName: "Singh",
                    address: "Vasundhara enclave",
                    isVVIP: "Yes",
                    // connectionNo: "CN123456",
                    project: "Project 1",
                    panNo: "A1B2C3D4E5",
                    gstNo: "12ABCDE3456F7Z8",
                    towerNo: "Tower A",
                    flatNo: "145",
                    shopNo: "S101",
                    mobileNo: "2255225522",
                    email: "jaya.gusain2@gmail.com",
                    // totalLoadGrid: "10",
                    // gridLoadR: "3.5",
                    // gridLoadY: "3",
                    // gridLoadB: "3",
                    // totalLoadDG: "8",
                    // DGLoadR: "2.7",
                    // DGLoadY: "2.6",
                    // DGLoadB: "2.6",
                    installationDate: "22-06-2024",
                    openingBalance: "100",
                    // consumptionReadingGrid: "250",
                    // consumptionReadingDG: "200",
                    consumptionReadingGridKwh: 0,
                    // consumptionReadingGridKvah: 0,
                    // consumptionReadingDGKwh: 0,
                    // consumptionReadingDGKvah: 0,
                    tarrifGroup: "TG1",
                    meterSerialNo: "1234567893",
                    area: "1500",
                    flatType: "3 BHK"
                }
            ]
        },
        columns: {
            order: [
                "id",
                "firstName",
                "lastName",
                "address",
                "isVVIP",
                // "connectionNo",
                "panNo",
                "gstNo",
                "towerNo",
                "flatNo",
                "flatType",
                "shopNo",
                "mobileNo",
                "email",
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
                "area",
                "consumptionReadingGridKwh",
                // "consumptionReadingGridKvah",
                // "consumptionReadingDGKwh",
                // "consumptionReadingDGKvah",
                "project",
                "meterSerialNo",
                "tarrifGroup",
                "error"
            ],
            id: {
                label: "ID",
                renderType: "text"
            },
            firstName: {
                label: "First Name",
                renderType: "text"
            },
            lastName: {
                label: "Last Name",
                renderType: "text"
            },
            isVVIP: {
                label: "Is VVIP",
                renderType: "text",
                allowedOptions: ['Yes', 'No']
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
            email: {
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
            // consumptionReadingGrid: {
            //     label: "Consumption Reading (For GRID)",
            //     renderType: "text"
            // },
            // consumptionReadingDG: {
            //     label: "Consumption Reading (For DG)",
            //     renderType: "text"
            // },
            consumptionReadingGridKwh: {
                label: "Consumption Reading (For GRID) Kwh",
                renderType: "text"
            },
            // consumptionReadingGridKvah: {
            //     label: "Consumption Reading (For GRID) Kvah",
            //     renderType: "text"
            // },
            // consumptionReadingDGKwh: {
            //     label: "Consumption Reading (For DG) Kwh",
            //     renderType: "text"
            // },
            // consumptionReadingDGKvah: {
            //     label: "Consumption Reading (For DG) Kvah",
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
            meterSerialNo: {
                label: "Meter Serial No",
                renderType: "text"
            },
            tarrifGroup: {
                label: "Tarrif Group",
                renderType: "text"
            },
            error: {
                label: "Error",
                renderType: "text"
            }
        }
    }
}