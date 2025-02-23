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
const express_1 = __importDefault(require("express"));
const utilities_1 = require("../../utilities");
const viewUserActions_1 = __importDefault(require("../../configs/viewUserActions"));
const viewAllUsersTable_1 = __importDefault(require("../../configs/viewAllUsersTable"));
const viewUserAuditLogTable_1 = __importDefault(require("../../configs/viewUserAuditLogTable"));
const viewUserDetails_1 = __importDefault(require("../../configs/viewUserDetails"));
const viewUserUsersTableTable_1 = __importDefault(require("../../configs/viewUserUsersTableTable"));
const DBservice_1 = __importDefault(require("../../services/DBservice"));
const viewEditPermissionsTable_1 = __importDefault(require("../../configs/viewEditPermissionsTable"));
const joi_1 = __importDefault(require("joi"));
const logConsts_1 = require("../logConsts");
const { Users } = logConsts_1.LOG_MODULE_CONSTS;
const { CREATE_USER, EDIT_USER, ENABLE_USER, DISABLE_USER } = logConsts_1.LOG_ACTION_CONSTS[Users];
const usersRouter = express_1.default.Router();
usersRouter.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "name": joi_1.default.string().required().min(1),
        "username": joi_1.default.string().required().min(1),
        "designation": joi_1.default.string().required().valid("admin", "vendingManager", "accountManager", "operationManager"),
        "projectName": joi_1.default.number(),
        "email": joi_1.default.string().required().min(1),
        "mobileNo": joi_1.default.string().required().min(10).max(10)
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        console.log(tokenObj);
        yield schema.validateAsync(data);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.projectName = tokenObj.projectId;
        }
        console.log(data);
        data.userName = data.username;
        const nameParts = data.name.split(" ");
        data.firstName = nameParts[0];
        data.lastName = (_b = nameParts === null || nameParts === void 0 ? void 0 : nameParts[1]) !== null && _b !== void 0 ? _b : "";
        data.projectId = data.projectName;
        const result = yield DBservice_1.default.User.createUser(data);
        (0, utilities_1.createLog)(tokenObj, Users, CREATE_USER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
usersRouter.post("/editUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
        "name": joi_1.default.string().required().min(1),
        "username": joi_1.default.string().required().min(1),
        "designation": joi_1.default.string().required().valid("admin", "vendingManager", "accountManager", "operationManager"),
        "projectName": joi_1.default.string(),
        "email": joi_1.default.string().required().min(1),
        "mobileNo": joi_1.default.number()
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        if (tokenObj.accountTypeValue !== "superAdmin") {
            data.projectName = tokenObj.projectId;
        }
        console.log(data);
        const result = yield DBservice_1.default.User.editUser(Object.assign(Object.assign({}, data), { projectId: data.projectName, userId: data.id }));
        (0, utilities_1.createLog)(tokenObj, Users, EDIT_USER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: e.error });
    }
}));
usersRouter.post("/enableUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        console.log("enableUser Called", data);
        const result = yield DBservice_1.default.User.enableUser(data);
        (0, utilities_1.createLog)(tokenObj, Users, ENABLE_USER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
usersRouter.post("/disableUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        console.log("disableUser Called", data);
        const result = yield DBservice_1.default.User.disableUser(Object.assign(Object.assign({}, data), { userId: data.id }));
        (0, utilities_1.createLog)(tokenObj, Users, DISABLE_USER, data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
usersRouter.post("/changePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        // await schema.validateAsync(data)
        console.log("changePassword Called", data);
        const result = yield DBservice_1.default.User.changePassword(Object.assign({}, data));
        // createLog(tokenObj, Users, DISABLE_USER, data)
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(400).json({ message: e === null || e === void 0 ? void 0 : e.message });
    }
}));
usersRouter.post("/resetPassord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        // await schema.validateAsync(data)
        console.log("resetPassword Called", data);
        const result = yield DBservice_1.default.User.resetPassword(Object.assign({}, data));
        // createLog(tokenObj, Users, DISABLE_USER, data)
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
usersRouter.post("/deleteUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
    const schema = joi_1.default.object({
        "id": joi_1.default.string().required().min(1),
    });
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        yield schema.validateAsync(data);
        console.log("deleteUser Called", data);
        const result = yield DBservice_1.default.User.deleteUser(data);
        (0, utilities_1.createLog)(tokenObj, "users", "deleteUser", data);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
usersRouter.post("/viewUserActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewUserActions_1.default);
        let selectOptions = configJSON.config.actions.createUser.fields.projectName.selectOptions;
        if (tokenObj.accountTypeValue === "superAdmin") {
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            console.log("projects", projects);
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [{ value: "-", description: "-" }, ...projectSelectOptions];
            configJSON.config.actions.createUser.fields.projectName.selectOptions = selectOptions;
        }
        else {
            const order = configJSON.config.actions.createUser.fields.order;
            const projectNameExludedOrder = order.filter((fieldId) => fieldId !== "projectName");
            configJSON.config.actions.createUser.fields.order = projectNameExludedOrder;
            const userDesignationOptions = configJSON.config.actions.createUser.fields.designation.selectOptions;
            const excludedAdminDesignationOptions = userDesignationOptions.filter(({ value }) => value !== "admin");
            configJSON.config.actions.createUser.fields.designation.selectOptions = excludedAdminDesignationOptions;
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
usersRouter.post("/viewAllUsersTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const configJSON = (0, utilities_1.deepCopy)(viewAllUsersTable_1.default);
        const usersResponse = yield DBservice_1.default.User.getSubUsers(tokenObj.userId, filters);
        const users = usersResponse.rows;
        configJSON.data.totalRecords = usersResponse.totalRecords;
        configJSON.data.rows = users.map((user) => {
            delete user.password;
            user.name = {
                label: `${user.firstName} ${user.lastName}`,
                link: `/admin/users/${encodeURIComponent(user.userId)}`
            };
            user.designation = user.accountTypeDescription;
            return user;
        });
        if (tokenObj.accountTypeValue !== "superAdmin") {
            const selectOptions = configJSON.config.filterConfig.filterType.selectOptions;
            const excludedProjectOptions = selectOptions.filter(({ value }) => value !== "project");
            configJSON.config.filterConfig.filterType.selectOptions = excludedProjectOptions;
        }
        else {
            let selectOptions = configJSON.config.filterConfig.filterValue.project.selectOptions;
            const projects = (yield DBservice_1.default.Project.getProjects()).rows;
            const projectSelectOptions = projects.map(project => ({
                value: project.projectId,
                description: project.projectName
            }));
            selectOptions = [...selectOptions, ...projectSelectOptions];
            configJSON.config.filterConfig.filterValue.project.selectOptions = selectOptions;
        }
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
usersRouter.post("/viewUserAuditLogTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const id = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewUserAuditLogTable_1.default);
        configJSON.config.id = id;
        configJSON.config.label = `Audit Log`;
        const auditLogResponse = yield DBservice_1.default.AuditLogs.getAuditLogsByUserId(id, filters);
        const auditLogs = auditLogResponse.rows;
        configJSON.data = {
            rows: auditLogs.map(row => {
                return {
                    id: row.auditLogId,
                    user: {
                        label: row.userName,
                        link: `/admin/users/${row.userId}`
                    },
                    module: row.moduleNameDescription,
                    moduleAction: row.actionNameDescription,
                    time: row.time
                };
            }),
            totalRecords: auditLogResponse.totalRecords
        };
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
usersRouter.post("/viewUserDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const id = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewUserDetails_1.default);
        configJSON.config.id = id;
        const users = (yield DBservice_1.default.User.getUserById(id)).rows;
        const user = users[0];
        configJSON.data = {
            "name": `${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}`,
            "designation": user === null || user === void 0 ? void 0 : user.accountTypeDescription,
            "userName": user === null || user === void 0 ? void 0 : user.userName,
            "email": user === null || user === void 0 ? void 0 : user.email,
            "mobileNo": user === null || user === void 0 ? void 0 : user.mobileNo,
            "projectName": user === null || user === void 0 ? void 0 : user.projectName
        };
        let hiddenFields = [];
        if (tokenObj.accountTypeValue !== "superAdmin" || (tokenObj.accountTypeValue === "superAdmin" && tokenObj.userId == user.userId)) {
            hiddenFields.push("resetPassword");
        }
        if (tokenObj.userId != user.userId) {
            hiddenFields.push("changePassword");
        }
        if (user.accountTypeValue === "superAdmin") {
            const order = configJSON.config.fields.order;
            const excludedProjectNameOrder = order
                .filter((fieldId) => fieldId !== "projectName");
            configJSON.config.fields.order = excludedProjectNameOrder;
        }
        if (tokenObj.accountTypeValue === "superAdmin" && tokenObj.accessLevel < user.accessLevel) {
            configJSON.config.fields.projectName.inputType = "link";
            configJSON.data = Object.assign(Object.assign({}, (0, utilities_1.deepCopy)(configJSON.data)), { projectName: {
                    value: user.projectName,
                    link: `/admin/projects/${encodeURIComponent((_a = user.projectId) !== null && _a !== void 0 ? _a : "")}`
                } });
        }
        if (tokenObj.accessLevel >= user.accessLevel) {
            hiddenFields = hiddenFields.concat(["editUser", "disableUser", "enableUser"]);
        }
        else {
            if (tokenObj.accountTypeValue !== "superAdmin") {
                hiddenFields.push("editUser");
            }
            else {
                configJSON.config.actions.editUser.data = {
                    name: `${user.firstName} ${user.lastName}`,
                    username: user.userName,
                    designation: user.accountTypeValue,
                    email: user.email,
                    mobileNo: user.mobileNo,
                    projectName: user.projectId
                };
                let selectOptions = configJSON.config.actions.editUser.fields.projectName.selectOptions;
                const projects = (yield DBservice_1.default.Project.getProjects()).rows;
                const projectSelectOptions = projects.map(project => ({
                    value: project.projectId,
                    description: project.projectName
                }));
                selectOptions = [...selectOptions, ...projectSelectOptions];
                configJSON.config.actions.editUser.fields.projectName.selectOptions = selectOptions;
            }
        }
        if (user.enabled) {
            hiddenFields.push("enableUser");
        }
        else {
            hiddenFields.push("disableUser");
        }
        const order = configJSON.config.actions.order;
        const excludedDisableUserOrder = order.filter((fieldId) => !hiddenFields.includes(fieldId));
        configJSON.config.actions.order = excludedDisableUserOrder;
        // configJSON.config.label = `${capitalizeFirstLetter(String(id).toLowerCase())} Audit Log`
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
usersRouter.post("/viewUserUsersTableTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const filters = (0, utilities_1.extractFiltersFromRequest)(req);
        const id = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewUserUsersTableTable_1.default);
        configJSON.config.id = id;
        configJSON.config.label = `Related Users`;
        const usersResponse = yield DBservice_1.default.User.getSubUsers(id, filters);
        const users = usersResponse.rows;
        configJSON.data.totalRecords = usersResponse.totalRecords;
        configJSON.data.rows = users.map(user => {
            return ({
                id: user.userId,
                user: {
                    label: `${user.firstName} ${user.lastName}`,
                    link: `/admin/users/${user.userId}`
                },
                userName: user === null || user === void 0 ? void 0 : user.userName,
                email: user.email,
                accountType: user.accountTypeDescription,
                assignedProject: user.projectName,
                projectName: user.projectName
            });
        });
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
usersRouter.post("/viewEditUserPermissionsTable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenObj = (0, utilities_1.parseAuthTokenFromReq)(req);
        const id = req.body.id;
        const configJSON = (0, utilities_1.deepCopy)(viewEditPermissionsTable_1.default);
        return res.status(200).json(configJSON);
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e === null || e === void 0 ? void 0 : e.message
        });
    }
}));
// `${capitalizeFirstLetter(String(id).toLowerCase())} Audit Log`
// `${capitalizeFirstLetter(String(id).toLowerCase())} Users`
exports.default = usersRouter;
