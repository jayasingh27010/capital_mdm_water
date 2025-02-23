"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../../utilities");
const users_1 = __importDefault(require("./users"));
const users = (0, utilities_1.deepCopy)(users_1.default).rows;
const targetDate = 1722409799433;
const rows = [];
const categories = {
    'users': {
        description: 'Users',
        actions: {
            createUser: {
                description: "Create User"
            },
            enableUser: {
                description: "Enable User"
            },
            disableUser: {
                description: "Disable User"
            },
            editUser: {
                description: "Edit User"
            },
            deleteUser: {
                description: "Delete User"
            }
        }
    },
    'projects': {
        description: 'Projects',
        actions: {
            createProject: {
                description: "Create Project"
            },
            enableProject: {
                description: "Enable Project"
            },
            disableProject: {
                description: "Disable Project"
            },
            editProject: {
                description: "Edit Project"
            },
            deleteProject: {
                description: "Delete Project"
            }
        }
    },
    'meters': {
        description: 'Meters',
        actions: {
            createMeter: {
                description: "Create Meter"
            },
            editMeter: {
                description: "Edit Meter"
            },
        }
    },
    'consumers': {
        description: 'Consumers',
        actions: {
            createConsumer: {
                description: "Create Consumer"
            },
            editConsumer: {
                description: "Edit Consumer"
            },
        }
    },
    'gateways': {
        description: 'Gateways',
        actions: {
            createGateway: {
                description: "Create Gateway"
            },
        }
    }
};
const createAuditLogRow = (auditLogId, user, moduleNameValue, actionNameValue, time) => {
    const { userId, userName } = user;
    return {
        auditLogId,
        userId,
        userName,
        moduleNameValue,
        moduleNameDescription: categories[moduleNameValue].description,
        actionNameValue,
        actionNameDescription: categories[moduleNameValue].actions[actionNameValue].description,
        time: new Date(time).toLocaleString()
    };
};
let counter = 1;
const mockTimeDifference = 24 * 60 * 60 * 1000;
for (const user of users) {
    const modules = Object.keys(categories);
    for (const module of modules) {
        const actions = Object.keys(categories[module].actions);
        for (const action of actions) {
            const time = targetDate - (counter * mockTimeDifference);
            rows.push(createAuditLogRow(`ALOG_${counter}`, user, module, action, time));
            counter++;
        }
    }
}
exports.default = {
    rows
};
