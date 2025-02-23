import { deepCopy } from "../../../utilities"
import ConsumersMockData from "../MockDBData/consumers"
import { ConsumerDBDTO } from "../ConsumersDBService/types"

const rows: any[] = []
let counter = 1

const NUM_RECHARGES = 20
const targetDate: number = 1722409799433
const dateDiff = 1000 * 60 * 60 * 24 * 31

const consumers: ConsumerDBDTO[] = deepCopy(ConsumersMockData).rows
for (const consumer of consumers) {
    for (let i = 0; i < NUM_RECHARGES; i++) {
        const rechargeId = `RECHARGE_${counter}`
        if (consumer.meterId.length === 0) {
            continue
        }
        rows.push({
            rechargeId,
            meterId: consumer.meterId,
            meterSerialNo: consumer.meterSerialNo,
            consumerId: consumer.consumerId,
            rechargeDate: new Date(targetDate - (i*dateDiff)).toLocaleString(),
            rechargeAmount: "₹3000"
        })
        counter++
    }
}
export default {
    rows
}