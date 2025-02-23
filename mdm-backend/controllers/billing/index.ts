import express, { Request, Response } from "express";
import Joi from "joi";
import { TarrifDBDTO } from "../../services/DBservice/TarrifsDBService/types";
import DBservice from "../../services/DBservice";
import { BillingRequestDTORow } from "./types";

const billingRouter = express.Router()

const stripObjectGen = (obj: any, replaceWith: string) => {
    const replaceKey = replaceWith.replace("_", "")
    const keys = Object.keys(obj).filter(key => key.includes(replaceWith))
    return {
        [replaceKey]: keys.reduce((acc: any, key: string) => ({
            ...acc,
            [key.replace(replaceWith, "")]: obj[key]
        }), {})
    }
}

const slabCalc = (consumption: number, slabs: any[]): number => {
    console.log("slabs in calc", slabs)
    return slabs.reduce((acc, slab, i) => {
        const prevSlabLimit = slabs?.[i-1]?.slabLimit ?? "0"
        const taxedSlabRate = parseInt(slab.slabRate) * (1 + (parseFloat(slab?.tax1 ?? 0) +  parseFloat(slab?.tax2 ?? "0") + parseFloat(slab?.tax3 ?? "0"))/100)
        // const taxedSlabRate = 0
        let newRemainingLimit = consumption <= parseFloat(slab.slabLimit) ? 0 : acc.remainingLimit - (parseFloat(slab.slabLimit) - parseInt(prevSlabLimit))
        let effConsumption = consumption <= parseFloat(slab.slabLimit) ? consumption - parseInt(prevSlabLimit): parseFloat(slab.slabLimit) - parseInt(prevSlabLimit)
        console.log(acc, effConsumption, acc.remainingLimit != 0 ? acc.sum + (effConsumption * (1 + taxedSlabRate/100)) : acc.sum)
        return {
            ...acc,
            remainingLimit: newRemainingLimit,
            sum: acc.remainingLimit != 0 ? acc.sum + (effConsumption * (1 + taxedSlabRate/100)) : acc.sum
        }
    }, {
        remainingLimit: consumption,
        sum: 0
    })
}

const slabMap = (slabs: any[]) => {
    return slabs.map(slab => {
        return {
            ...slab,
            slabType: slab.slab_type,
            slabRate: slab.slab_rate,
            slabLimit: slab.slab_limit,
            tax1: slab.tax_1,
            tax2: slab.tax_2,
            tax3: slab.tax_3
        }
    })
}

const attachTarrif = (meters: any[], relations: any[], tarrifs: any[], slabs: any[]) => {
    const relationsMap = relations.reduce((acc: any, rel) => {
        return {
            ...acc,
            [rel.consumer_id]: rel
        }
    }, {})
    const tarrifsMap = tarrifs.reduce((acc: any, tarrif) => {
        return {
            ...acc,
            [tarrif.tariff_id]: tarrif
        }
    }, {})
    return meters.map(m => {
        let rel = undefined
        let tarrif: any = {}
        let tariffSlabs = []
        if (m.consumerId) {
            rel = relationsMap?.[String(m?.consumerId)]
            console.log("rel", rel)
        }
        if (rel) {
            tarrif = tarrifsMap?.[String(rel?.tariff_id ?? "")]
        }
        if (tarrif && rel) {
            slabs = slabs.filter(slab => String(slab?.tariff_id) === String(rel?.tariff_id))
            tarrif.slabs = slabs
        }
        return {
            ...m,
            tarrif
        }
    })
}

const finalizeKeys = (obj: any) => {
    const keys = Object.keys(obj)
    console.log("keys", keys)
    const newKeys = keys
        .map(key => key.split("_")
            .map(keyPart => `${String(keyPart).charAt(0).toUpperCase()}${String(keyPart).slice(1)}`)
            .join("")
        )
        .map(key => `${String(key).charAt(0).toLowerCase()}${String(key).slice(1)}`)
    console.log("newKeys", keys)
    return keys.reduce((acc: any, key: string, i: number) => {
        return {
            ...acc,
            [newKeys[i]]: obj[key]
        }
    }, {})
}

const performCal = (energyDiff: number, ) => {

}

billingRouter.post("/prepaid_bill_calculation", async (req: Request, res: Response) => {
    console.log("hellhgghghfff", req.body)
    // console.log("old meters", attachTarrif(req.body.months_first_data, req.body.consumer_relation, req.body.tariff, req.body.tariffSlabs))
    const oldMeters = [...req.body.months_first_data]
    const newMeters = attachTarrif(req.body.months_latest_data, req.body.consumer_relation, req.body.tariff, req.body.tariffSlabs)
    const metersDiff = newMeters
    .map(m => {
        const oldMeter = oldMeters.find(om => om.meter_s_no === m.meter_s_no)
        if (oldMeter) {
            m.kwh_grid_diff = m.cumulative_wh_grid - oldMeter.cumulative_wh_grid
            m.kvah_grid_diff = m.cumulative_vah_grid - oldMeter.cumulative_vah_grid
            m.kwh_dg_diff = m.cumulative_wh_genset - oldMeter.cumulative_wh_genset
            m.kvah_dg_diff = m.cumulative_vah_genset - oldMeter.cumulative_vah_genset
        }
        return m
    })
    .map(m => {
        if (m?.tarrif?.slabs) {
            m.kwh_grid_diff_slab = slabCalc(m.kwh_grid_diff, slabMap(m.tarrif.slabs).filter((s: any) => s.slabType === "grid"))
            m.kvah_grid_diff_slab = slabCalc(m.kvah_grid_diff, slabMap(m.tarrif.slabs).filter((s: any) => s.slabType === "grid"))
            m.kwh_dg_diff_slab = slabCalc(m.kwh_dg_diff, slabMap(m.tarrif.slabs).filter((s: any) => s.slabType === "dG"))
            m.kvah_dg_diff_slab = slabCalc(m.kvah_dg_diff, slabMap(m.tarrif.slabs).filter((s: any) => s.slabType === "dG"))
        } else {
            m.kwh_grid_diff_slab = {sum: "0"}
            m.kvah_grid_diff_slab = {sum: "0"}
            m.kwh_dg_diff_slab = {sum: "0"}
            m.kvah_dg_diff_slab = {sum: "0"}
        }
        if (m.billing_type === "kvah") {
            m.gridAmt = m.kvah_grid_diff_slab.sum
            m.dgAmt = m.kvah_dg_diff_slab.sum
        } else {
            m.gridAmt = m.kwh_grid_diff_slab.sum
            m.dgAmt = m.kwh_dg_diff_slab.sum
        }
        return m
    })
    console.log("metersDiff", JSON.stringify(metersDiff))
    try {

        // if (!req?.body?.billing_meters_info || !Array.isArray(req.body.billing_meters_info)) {
        //     throw new Error("Invalid Parameters")
        // }
        // const tarrifsTotalRecords = (await DBservice.Tarrifs.getTarrifs({
        //     perPage: 1,
        //     currPage: 1
        // })).totalRecords
        // const allTarrifs: TarrifDBDTO[] = (await DBservice.Tarrifs.getTarrifs({
        //     perPage: tarrifsTotalRecords,
        //     currPage: 1
        // })).rows
        // const billingMetersInfo: BillingRequestDTORow[] = req.body.billing_meters_info
        // const formattedInfo: any = billingMetersInfo.map((obj: any) => {
        //     const extractMeterInfo = (obj: any) => {
        //         const keys = Object.keys(obj).filter(key => !key.includes("kwh") && !key.includes("kvah"))
        //         return {
        //             ["meterInfo"]: keys.reduce((acc: any, key: string) => ({
        //                 ...acc,
        //                 [key]: obj[key]
        //             }), {})
        //         }
        //     }
        //     return {
        //         ...extractMeterInfo(obj),
        //         ...stripObjectGen(obj, "_kwh"),
        //         ...stripObjectGen(obj, "_kvah"),
        //         ["tarrif_group"]: allTarrifs.find(t => t.id === obj.tarrif_group)
        //     }
        // }).map((obj: any) => ({
        //     ...obj,
        //     "kwh": {
        //         ...stripObjectGen(obj["kwh"], "grid_"),
        //         ...stripObjectGen(obj["kwh"], "dg_"),
        //     },
        //     "kvah": {
        //         ...stripObjectGen(obj["kvah"], "grid_"),
        //         ...stripObjectGen(obj["kvah"], "dg_"),
        //     },
        // }))
        // .map((row: any) => {
        //     return {
        //         ...row,
        //         ["VALS"]: row[row.meterInfo.billing_type.toLowerCase()]
        //     }
        // })
        // .map((row) => {
        //     return  {
        //         ...row,
        //         "dgVALS": row["VALS"]["dg"],
        //         "gridVALS": row["VALS"]["grid"]
        //     }
        // })
        // .map((row) => {
        //     const isValidDGConsumption = (row.dgVALS.current - row.dgVALS.previous_reading) > 0
        //     const isValidGridConsumption = (row.gridVALS.current - row.gridVALS.previous_reading) > 0
        //     return {
        //         ...row,
        //         "dgConsumption": isValidDGConsumption ? row.dgVALS.current - row.dgVALS.previous_reading : "ERROR",
        //         "gridConsumption": isValidGridConsumption ? row.gridVALS.current - row.gridVALS.previous_reading : "ERROR",
        //     }
        // })
        // .map((row) => {
        //     const hasSlabConsumption = row.tarrif_group.unitOrSlab === 'slab'
        //     const slabs = row.tarrif_group.slabs
        //     const dgSlabs = slabs.filter((slab: any) => slab.slabType === 'dG')
        //     const gridSlabs = slabs.filter((slab: any) => slab.slabType === 'grid')
        //     return {
        //         ...row,
        //         "dgSlabAmt": hasSlabConsumption ? slabCalc(row.dgConsumption, dgSlabs) : 0,
        //         "gridSlabAmt": hasSlabConsumption ? slabCalc(row.gridConsumption, gridSlabs) : 0,
        //     }
        // })
        console.log("send data", metersDiff.map(m => ({
            ...m
        })))
        return res
        .status(200)
        .json({ success: true,
            statusCode: "OK",
            body: {
                update: [
                    ...metersDiff
                ]
            }
         })
    } catch (e: any) {
        console.log(e)
        return res
        .status(400)
        .json({
            message: "INVALID_REQUEST"
        })
    }
})

export default billingRouter