"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./controllers/auth"));
const userRecovery_1 = __importDefault(require("./controllers/auth/userRecovery.ts/userRecovery"));
const verify_Otp_1 = __importDefault(require("./controllers/auth/verify_Otp"));
const resetPassword_1 = __importDefault(require("./controllers/auth/resetPassword"));
const navigation_1 = __importDefault(require("./controllers/navigation"));
const user_1 = __importDefault(require("./controllers/user"));
const pages_1 = __importDefault(require("./controllers/pages"));
const dashboard_1 = __importDefault(require("./controllers/dashboard"));
const users_1 = __importDefault(require("./controllers/users"));
const meters_1 = __importDefault(require("./controllers/meters"));
const gateways_1 = __importDefault(require("./controllers/gateways"));
const projects_1 = __importDefault(require("./controllers/projects"));
const tarrifs_1 = __importDefault(require("./controllers/tarrifs"));
const consumers_1 = __importDefault(require("./controllers/consumers"));
const billing_1 = __importDefault(require("./controllers/billing"));
const devConfig_1 = __importDefault(require("./controllers/devConfig"));
const ManualRecharge_1 = __importDefault(require("./controllers/ManualRecharge"));
const express_multi_hijack_1 = require("express-multi-hijack");
const utilities_1 = require("./utilities");
const AuthService_1 = __importDefault(require("./services/AuthService"));
const consumer_1 = __importDefault(require("./controllers/graph/consumer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, express_multi_hijack_1.Hijack)({
    json: true,
    handler: (body, req, res) => {
        if (!req.path.includes("tryLogin")) {
            let token = {};
            try {
                token = (0, utilities_1.parseAuthTokenFromReq)(req);
                token.tokenCreationTime = Date.now();
                return res.json(Object.assign(Object.assign({}, body), { refreshedToken: AuthService_1.default.encode(token) }));
            }
            catch (e) {
            }
        }
    }
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((err, _, res, next) => {
    if (err) {
        console.log(err);
        res.status(400).json({
            message: "UNKNOWN EXCEPTION"
        });
    }
    else {
        next();
    }
});
app.get("/test", (req, res) => {
    res.send("Application is working");
});
app.use(auth_1.default);
app.use(userRecovery_1.default);
app.use(verify_Otp_1.default);
app.use(resetPassword_1.default);
app.use(navigation_1.default);
app.use(consumer_1.default);
app.use(user_1.default);
app.use(pages_1.default);
app.use(dashboard_1.default);
app.use(users_1.default);
app.use(meters_1.default);
app.use(gateways_1.default);
app.use(consumers_1.default);
app.use(projects_1.default);
app.use(tarrifs_1.default);
app.use(billing_1.default);
app.use(devConfig_1.default);
app.use(ManualRecharge_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
require('./eureka-client');
