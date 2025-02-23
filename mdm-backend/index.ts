import express, { Express, NextFunction, Request, Response, Errback, Send } from "express";
import dotenv from "dotenv";
import cors from "cors"
import authRouter from "./controllers/auth";
import forgetPasswordRouter from "./controllers/auth/userRecovery.ts/userRecovery";
import verifyOtpRouter from "./controllers/auth/verify_Otp";
import resetPasswordRouter from "./controllers/auth/resetPassword";
import navigationRouter from "./controllers/navigation";
import userRouter from "./controllers/user";
import pageRouter from "./controllers/pages";
import dashboardRouter from "./controllers/dashboard";
import usersRouter from "./controllers/users";
import metersRouter from "./controllers/meters";
import gatewaysRouter from "./controllers/gateways";
import projectsRouter from "./controllers/projects";
import tarrifsRouter from "./controllers/tarrifs";
import consumersRouter from "./controllers/consumers";
import billingRouter from "./controllers/billing";
import devConfigRouter from "./controllers/devConfig";
import meterPushData from "./services/DBservice/MockDBData/meterPushData";
import meterRechargeRouter from "./controllers/ManualRecharge";
import { Hijack } from "express-multi-hijack"
import { parseAuthTokenFromReq } from "./utilities";
import AuthService from "./services/AuthService";
import consumptiomRouter from "./controllers/graph/consumer";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


app.use(Hijack({
    json: true,
    handler: (body, req, res) => {
        if (!req.path.includes("tryLogin")) {
            let token: any  = {}
            try {
                token = parseAuthTokenFromReq(req)
                token.tokenCreationTime = Date.now()
                return res.json({
                    ...body,
                    refreshedToken: AuthService.encode(token)
                })
            } catch (e) {
            }
        }
    }
}))
app.use(cors())
app.use(express.json())
app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log(err)
        res.status(400).json({
            message: "UNKNOWN EXCEPTION"
        })
    } else {
        next()
    }
})

app.get("/test", (req: Request, res: Response) => {
    res.send("Application is working");
});

app.use(authRouter)
app.use(forgetPasswordRouter)
app.use(verifyOtpRouter)
app.use(resetPasswordRouter)
app.use(navigationRouter)
app.use(consumptiomRouter)
app.use(userRouter)
app.use(pageRouter)
app.use(dashboardRouter)
app.use(usersRouter)
app.use(metersRouter)
app.use(gatewaysRouter)
app.use(consumersRouter)
app.use(projectsRouter)
app.use(tarrifsRouter)
app.use(billingRouter)
app.use(devConfigRouter)
app.use(meterRechargeRouter)

app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(400).json({
            message: "UNKNOWN EXCEPTION"
        })
    } else {
        next()
    }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

require('./eureka-client');