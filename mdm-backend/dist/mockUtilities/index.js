"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsumerNameFromCounter = exports.createConsumerIdFromCounter = exports.createMeterSerialNoFromCounter = exports.getPaginatedResponse = void 0;
const getPaginatedResponse = (dBResponse, filters) => {
    var _a, _b;
    const rows = dBResponse.rows;
    const perPage = (_a = filters === null || filters === void 0 ? void 0 : filters.perPage) !== null && _a !== void 0 ? _a : 1;
    const currPage = (_b = filters === null || filters === void 0 ? void 0 : filters.currPage) !== null && _b !== void 0 ? _b : 1;
    let startIndex = perPage * (currPage - 1);
    let endIndex = startIndex + perPage;
    if (startIndex > rows.length) {
        startIndex = 0;
    }
    if (endIndex > rows.length) {
        endIndex = rows.length;
    }
    const displayRows = rows.slice(startIndex, endIndex);
    return {
        rows: displayRows,
        totalRecords: rows.length
    };
};
exports.getPaginatedResponse = getPaginatedResponse;
const createMeterSerialNoFromCounter = (counter) => {
    const counterStr = String(counter);
    return `CPS-${"0".repeat(4 - counterStr.length)}${counterStr}`;
};
exports.createMeterSerialNoFromCounter = createMeterSerialNoFromCounter;
const createConsumerIdFromCounter = (counter) => {
    const counterStr = String(counter);
    return `CRN-${"0".repeat(6 - counterStr.length)}${counterStr}`;
};
exports.createConsumerIdFromCounter = createConsumerIdFromCounter;
const createConsumerNameFromCounter = (counter) => {
    const counterStr = String(counter);
    return `Consumer ${counterStr}`;
};
exports.createConsumerNameFromCounter = createConsumerNameFromCounter;
