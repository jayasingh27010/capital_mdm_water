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
const billingRouter = express_1.default.Router();
const stripObjectGen = (obj, replaceWith) => {
    const replaceKey = replaceWith.replace("_", "");
    const keys = Object.keys(obj).filter(key => key.includes(replaceWith));
    return {
        [replaceKey]: keys.reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key.replace(replaceWith, "")]: obj[key] })), {})
    };
};
const slabCalc = (consumption, slabs) => {
    console.log("slabs in calc", slabs);
    return slabs.reduce((acc, slab, i) => {
        var _a, _b, _c, _d, _e;
        const prevSlabLimit = (_b = (_a = slabs === null || slabs === void 0 ? void 0 : slabs[i - 1]) === null || _a === void 0 ? void 0 : _a.slabLimit) !== null && _b !== void 0 ? _b : "0";
        const taxedSlabRate = parseInt(slab.slabRate) * (1 + (parseFloat((_c = slab === null || slab === void 0 ? void 0 : slab.tax1) !== null && _c !== void 0 ? _c : 0) + parseFloat((_d = slab === null || slab === void 0 ? void 0 : slab.tax2) !== null && _d !== void 0 ? _d : "0") + parseFloat((_e = slab === null || slab === void 0 ? void 0 : slab.tax3) !== null && _e !== void 0 ? _e : "0")) / 100);
        // const taxedSlabRate = 0
        let newRemainingLimit = consumption <= parseFloat(slab.slabLimit) ? 0 : acc.remainingLimit - (parseFloat(slab.slabLimit) - parseInt(prevSlabLimit));
        let effConsumption = consumption <= parseFloat(slab.slabLimit) ? consumption - parseInt(prevSlabLimit) : parseFloat(slab.slabLimit) - parseInt(prevSlabLimit);
        console.log(acc, effConsumption, acc.remainingLimit != 0 ? acc.sum + (effConsumption * (1 + taxedSlabRate / 100)) : acc.sum);
        return Object.assign(Object.assign({}, acc), { remainingLimit: newRemainingLimit, sum: acc.remainingLimit != 0 ? acc.sum + (effConsumption * (1 + taxedSlabRate / 100)) : acc.sum });
    }, {
        remainingLimit: consumption,
        sum: 0
    });
};
const slabMap = (slabs) => {
    return slabs.map(slab => {
        return Object.assign(Object.assign({}, slab), { slabType: slab.slab_type, slabRate: slab.slab_rate, slabLimit: slab.slab_limit, tax1: slab.tax_1, tax2: slab.tax_2, tax3: slab.tax_3 });
    });
};
const attachTarrif = (meters, relations, tarrifs, slabs) => {
    const relationsMap = relations.reduce((acc, rel) => {
        return Object.assign(Object.assign({}, acc), { [rel.consumer_id]: rel });
    }, {});
    const tarrifsMap = tarrifs.reduce((acc, tarrif) => {
        return Object.assign(Object.assign({}, acc), { [tarrif.tariff_id]: tarrif });
    }, {});
    return meters.map(m => {
        var _a;
        let rel = undefined;
        let tarrif = {};
        let tariffSlabs = [];
        if (m.consumerId) {
            rel = relationsMap === null || relationsMap === void 0 ? void 0 : relationsMap[String(m === null || m === void 0 ? void 0 : m.consumerId)];
            console.log("rel", rel);
        }
        if (rel) {
            tarrif = tarrifsMap === null || tarrifsMap === void 0 ? void 0 : tarrifsMap[String((_a = rel === null || rel === void 0 ? void 0 : rel.tariff_id) !== null && _a !== void 0 ? _a : "")];
        }
        if (tarrif && rel) {
            slabs = slabs.filter(slab => String(slab === null || slab === void 0 ? void 0 : slab.tariff_id) === String(rel === null || rel === void 0 ? void 0 : rel.tariff_id));
            tarrif.slabs = slabs;
        }
        return Object.assign(Object.assign({}, m), { tarrif });
    });
};
const finalizeKeys = (obj) => {
    const keys = Object.keys(obj);
    console.log("keys", keys);
    const newKeys = keys
        .map(key => key.split("_")
        .map(keyPart => `${String(keyPart).charAt(0).toUpperCase()}${String(keyPart).slice(1)}`)
        .join(""))
        .map(key => `${String(key).charAt(0).toLowerCase()}${String(key).slice(1)}`);
    console.log("newKeys", keys);
    return keys.reduce((acc, key, i) => {
        return Object.assign(Object.assign({}, acc), { [newKeys[i]]: obj[key] });
    }, {});
};
const performCal = (energyDiff) => {
};
billingRouter.post("/prepaid_bill_calculation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hellhgghghfff", req.body);
    // console.log("old meters", attachTarrif(req.body.months_first_data, req.body.consumer_relation, req.body.tariff, req.body.tariffSlabs))
    const oldMeters = [...req.body.months_first_data];
    const newMeters = attachTarrif(req.body.months_latest_data, req.body.consumer_relation, req.body.tariff, req.body.tariffSlabs);
    const metersDiff = newMeters
        .map(m => {
        const oldMeter = oldMeters.find(om => om.meter_s_no === m.meter_s_no);
        if (oldMeter) {
            m.kwh_grid_diff = m.cumulative_wh_grid - oldMeter.cumulative_wh_grid;
            m.kvah_grid_diff = m.cumulative_vah_grid - oldMeter.cumulative_vah_grid;
            m.kwh_dg_diff = m.cumulative_wh_genset - oldMeter.cumulative_wh_genset;
            m.kvah_dg_diff = m.cumulative_vah_genset - oldMeter.cumulative_vah_genset;
        }
        return m;
    })
        .map(m => {
        var _a;
        if ((_a = m === null || m === void 0 ? void 0 : m.tarrif) === null || _a === void 0 ? void 0 : _a.slabs) {
            m.kwh_grid_diff_slab = slabCalc(m.kwh_grid_diff, slabMap(m.tarrif.slabs).filter((s) => s.slabType === "grid"));
            m.kvah_grid_diff_slab = slabCalc(m.kvah_grid_diff, slabMap(m.tarrif.slabs).filter((s) => s.slabType === "grid"));
            m.kwh_dg_diff_slab = slabCalc(m.kwh_dg_diff, slabMap(m.tarrif.slabs).filter((s) => s.slabType === "dG"));
            m.kvah_dg_diff_slab = slabCalc(m.kvah_dg_diff, slabMap(m.tarrif.slabs).filter((s) => s.slabType === "dG"));
        }
        else {
            m.kwh_grid_diff_slab = { sum: "0" };
            m.kvah_grid_diff_slab = { sum: "0" };
            m.kwh_dg_diff_slab = { sum: "0" };
            m.kvah_dg_diff_slab = { sum: "0" };
        }
        if (m.billing_type === "kvah") {
            m.gridAmt = m.kvah_grid_diff_slab.sum;
            m.dgAmt = m.kvah_dg_diff_slab.sum;
        }
        else {
            m.gridAmt = m.kwh_grid_diff_slab.sum;
            m.dgAmt = m.kwh_dg_diff_slab.sum;
        }
        return m;
    });
    console.log("metersDiff", JSON.stringify(metersDiff));
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
        console.log("send data", metersDiff.map(m => (Object.assign({}, m))));
        return res
            .status(200)
            .json({ success: true,
            statusCode: "OK",
            body: {
                update: [
                    ...metersDiff
                ]
            }
        });
    }
    catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({
            message: "INVALID_REQUEST"
        });
    }
}));
exports.default = billingRouter;
