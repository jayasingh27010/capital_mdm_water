"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCall = exports.createLog = exports.capitalizeFirstLetter = exports.extractFiltersFromRequest = exports.parseAuthTokenFromReq = exports.deepCopy = void 0;
const axios_1 = __importDefault(require("axios"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const DBservice_1 = __importDefault(require("../services/DBservice"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { parse, stringify } = JSON;
const tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME || "2M";
const deepCopy = (value) => {
    return parse(stringify(value));
};
exports.deepCopy = deepCopy;
const parseAuthTokenFromReq = (req, isConsumerRoute = false) => {
    var _a, _b, _c;
    // console.log("req", req.headers)
    if (!(req === null || req === void 0 ? void 0 : req.headers) || !((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
        throw new Error("Token Not Found");
    }
    const authorization = req.headers.authorization;
    const token = (_c = (_b = authorization.split(" ")) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "";
    const decoded = AuthService_1.default.verify(token);
    if (decoded === false) {
        throw new Error("Token Expired");
    }
    if ((tokenExpirationTime === null || tokenExpirationTime === void 0 ? void 0 : tokenExpirationTime.length) <= 1) {
        throw new Error("Invalid Token Expiration Configuration");
    }
    if (!tokenExpirationTime.includes("M")) {
        throw new Error("Invalid Token Expiration Time Unit");
    }
    if (!(decoded === null || decoded === void 0 ? void 0 : decoded.accountTypeValue)) {
        throw new Error("Access Denied");
    }
    if (!isConsumerRoute && (decoded === null || decoded === void 0 ? void 0 : decoded.accountTypeValue) === "consumer") {
        throw new Error("Access Denied");
    }
    const expirationTimeInMins = parseInt(tokenExpirationTime);
    const expirationTimeInMilliSecs = expirationTimeInMins * 60 * 1000;
    const timeDifference = Date.now() - parseInt(decoded.tokenCreationTime);
    if (timeDifference > expirationTimeInMilliSecs) {
        throw new Error("Token Expired");
    }
    return decoded;
};
exports.parseAuthTokenFromReq = parseAuthTokenFromReq;
const extractFiltersFromRequest = (req) => {
    var _a, _b;
    if (!req.hasOwnProperty("body")) {
        return {
            currPage: 1,
            perPage: 5,
        };
    }
    let filters = req === null || req === void 0 ? void 0 : req.body;
    if (req.body.hasOwnProperty("filters")) {
        filters = req.body.filters;
    }
    const finalFilters = {
        currPage: (_a = parseInt(filters === null || filters === void 0 ? void 0 : filters.currPage)) !== null && _a !== void 0 ? _a : 1,
        perPage: (_b = parseInt(filters === null || filters === void 0 ? void 0 : filters.perPage)) !== null && _b !== void 0 ? _b : 5,
        getAll: (filters === null || filters === void 0 ? void 0 : filters.getAll) === true ? true : false
    };
    if (filters === null || filters === void 0 ? void 0 : filters.additionalFilters) {
        finalFilters.additionalFilters = filters.additionalFilters;
    }
    return finalFilters;
};
exports.extractFiltersFromRequest = extractFiltersFromRequest;
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const createLog = (tokenObj, module, action, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield DBservice_1.default.AuditLogs.log(Object.assign({ userId: tokenObj.userId, userName: tokenObj.userName, moduleNameValue: module, actionNameValue: action }, payload));
        console.log({
            userId: tokenObj.userId,
            module,
            action,
            payloadJSONStr: JSON.stringify(payload),
        });
    }
    catch (e) {
        console.log("error logging", e);
    }
});
exports.createLog = createLog;
const getApiInstance = () => {
    const instance = axios_1.default.create({
        baseURL: "http://localhost:9099",
        // baseURL: "http://192.168.29.214:9097",
        timeout: 20000
    });
    return instance;
};
const makeCall = (method, path, sendObj) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("wjhbcwcbikcvhjqbivqkc", sendObj);
    return new Promise((resolve, reject) => {
        switch (method) {
            case "GET":
                getApiInstance()
                    .get(path, sendObj)
                    .then(({ data }) => {
                    resolve(data === null || data === void 0 ? void 0 : data.body);
                })
                    .catch((e) => {
                    console.log(e);
                    reject(e);
                });
                break;
            case "POST":
                getApiInstance()
                    .post(path, sendObj, { headers: {
                        'Content-Type': 'application/json', // Set the content type to application/json
                        'Accept': 'application/json'
                    }, })
                    .then((obj) => {
                    var _a;
                    if (obj.data) {
                        const { data } = obj;
                        console.log(`Request Path: ${path}`);
                        console.log(`Response: ${JSON.stringify(data.body)}`);
                        // Check if `status` exists, and if so, delete it
                        if ((_a = data === null || data === void 0 ? void 0 : data.body) === null || _a === void 0 ? void 0 : _a.status) {
                            // delete data.body.status;
                        }
                        // Resolve the promise with the body of the response
                        resolve(data === null || data === void 0 ? void 0 : data.body);
                    }
                    else {
                        reject(new Error("No Data Found"));
                    }
                    console.log("");
                })
                    .catch((e) => {
                    var _a, _b, _c, _d;
                    console.error(`Error on request to ${path}:`, e);
                    // Log detailed error information
                    if (e.response) {
                        console.error(`Response Data: ${JSON.stringify(e.response.data)}`);
                        console.error(`Status: ${e.response.status}`);
                        console.error(`Headers: ${JSON.stringify(e.response.headers)}`);
                    }
                    else if (e.request) {
                        console.error(`No response received: ${e.name}`);
                        reject(e);
                    }
                    else {
                        console.error(`Error: ${e === null || e === void 0 ? void 0 : e.message}`);
                    }
                    if ((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.body) {
                        reject((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.body); // Reject the promise with the error
                    }
                });
                break;
            case "PUT":
                getApiInstance()
                    .put(path, sendObj)
                    .then(({ data }) => {
                    resolve(data);
                })
                    .catch((e) => {
                    console.log(e);
                    reject(e);
                });
                break;
        }
    });
});
exports.makeCall = makeCall;
