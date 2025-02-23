"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_ACTION_CONSTS = exports.LOG_MODULE_CONSTS = void 0;
const LOG_CONSTS = {
    MODULE: {},
    ACTION: {
        "1": {
            "1": "Create User",
            "2": "Edit User",
            "3": "Enable User",
            "4": "Disable User"
        },
        "2": {}
    }
};
exports.LOG_MODULE_CONSTS = {
    Users: "1",
    Projects: "2",
    Meters: "3",
    Gateways: "4",
    Consumers: "5",
    MeterRecharge: "6",
    DeviceConfiguration: "7",
    SMS: "8",
    Tarrifs: "9",
};
exports.LOG_ACTION_CONSTS = {
    [exports.LOG_MODULE_CONSTS.Users]: {
        CREATE_USER: "1",
        EDIT_USER: "2",
        ENABLE_USER: "3",
        DISABLE_USER: "4",
        RESET_PASSWORD: "5"
    },
    [exports.LOG_MODULE_CONSTS.Projects]: {
        CREATE_PROJECT: "1",
        EDIT_PROJECT: "2",
        DISABLE_PROJECT: "3",
        ENABLE_PROJECT: "4"
    },
    [exports.LOG_MODULE_CONSTS.Gateways]: {
        CREATE_GATEWAY: "1",
    },
    [exports.LOG_MODULE_CONSTS.Meters]: {
        CREATE_METER: "1",
        EDIT_METER: "2",
        METER_CSV_UPLOAD: "3"
    },
    [exports.LOG_MODULE_CONSTS.Consumers]: {
        CREATE_CONSUMER: "1",
        EDIT_CONSUMER: "2",
        DISABLE_CONSUMER: "3",
        ENABLE_CONSUMER: "4",
        COSNUMER_UPLOAD: "5",
    },
    [exports.LOG_MODULE_CONSTS.SMS]: {
        LOW_CREDIT: "1",
        SMS_RELAY_DISCONNECT_ONE: "2",
        SMS_RELAY_DISCONNECT_TWO: "3",
        RELAY_DISCONNECT: "4",
        RELAY_CONNECT: "5",
        RESET_PASSWORD: "6",
        CONSUMRER_CREATED: "7"
    },
    [exports.LOG_MODULE_CONSTS.MeterRecharge]: {
        CREATE_MANUAL_RECHARGE: "1",
        CREATE_CREDIT_NOTE: "2",
        CREATE_DEBIT_NOTE: "3",
    },
    [exports.LOG_MODULE_CONSTS.DeviceConfiguration]: {
        SET_METER: "1",
    },
    [exports.LOG_MODULE_CONSTS.Tarrifs]: {
        ADD_TARRIF_GROUP: "1",
        CREATE_TARRIF: "2",
        ATTACH_TARRIF: "3",
        CHANGE_TARRIF: "4",
    },
    // [LOG_MODULE_CONSTS.SMS]: {
    //     LOW_CREDIT:"1",
    //     RELAY_CONNECT:"2",
    // },  
    // [LOG_MODULE_CONSTS.SMS]: {
    //     LOW_CREDIT:"1",
    //     SMS_RELAY_DISCONNECT_ONE:"2",
    //     SMS_RELAY_DISCONNECT_TWO:"3",
    //     RELAY_DISCONNECT:"4"
    // }, 
    // [LOG_MODULE_CONSTS.SMS]: {
    //     LOW_CREDIT:"1",
    //     RELAY_CONNECT:"2",
    // },
    // [LOG_MODULE_CONSTS.SMS]: {
    //     LOW_CREDIT:"1",
    //     SMS_RELAY_DISCONNECT_ONE:"2",
    //     SMS_RELAY_DISCONNECT_TWO:"3",
    //     RELAY_DISCONNECT:"4"
    // },
};
