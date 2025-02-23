
import express, { Request, Response } from "express";
import { deepCopy, parseAuthTokenFromReq } from "../../../utilities";
import DBservice from "../../../services/DBservice";
import viewMeterCurrentMonthConsumption from "../../../configs/viewMeterGraphConsumption";


const consumptiomRouter = express.Router()

consumptiomRouter.post("/meterConsumptionWeekly", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        let consumerId = req.body.consumerId
        const year = req.body.year
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerMeterConsumptionGraph(consumerId,year,requestType)
        configJSON.data = data;

        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})


consumptiomRouter.post("/meterConsumptionMonthly", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        let consumerId = req.body.consumerId
        const month = req.body.month
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerMeterConsumptionGraphweekly(consumerId,month,requestType)
        configJSON.data = data;

        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})

consumptiomRouter.post("/meterConsumptionDaily", async (req: Request, res: Response) => {
    try {
        const tokenObj = parseAuthTokenFromReq(req, true)
        let consumerId = req.body?.consumerId
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const requestType = req.body.filter
        const configJSON = deepCopy(viewMeterCurrentMonthConsumption)
        
        if (tokenObj.accountTypeValue === "consumer") {
            consumerId = tokenObj.consumerId
        }
        const data = await DBservice.Consumers.getConsumerMeterConsumptionGraphDaily(consumerId,startDate,endDate,requestType)
        configJSON.data = data;
        if (tokenObj.accountTypeValue === "consumer") {
            configJSON.config.id = tokenObj.consumerId
        }
        return res.status(200).json(configJSON)
    } catch (e: any) {
        if(e?.code === "ECONNREFUSED"){
            return res
            .status(500)
            .json({
                message: "Database ECONNREFUSED"
            }) 
        }
        return res
        .status(400)
        .json({
            message: e?.message
        })
    }
})


export default consumptiomRouter