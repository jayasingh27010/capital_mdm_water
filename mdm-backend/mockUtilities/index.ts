import { DBResponse } from "../services/DBservice/types";
import { FilterInfo } from "../utilities/types";
import { DBRawResponse } from "./types";

export const getPaginatedResponse = (dBResponse: DBRawResponse, filters: FilterInfo): DBResponse => {
    const rows = dBResponse.rows
    const perPage = filters?.perPage ?? 1
    const currPage = filters?.currPage ?? 1
    let startIndex = perPage * (currPage-1)
    let endIndex = startIndex + perPage
    if (startIndex > rows.length) {
        startIndex = 0
    }
    if (endIndex > rows.length) {
        endIndex = rows.length
    }
    const displayRows = rows.slice(startIndex, endIndex)
    return {
        rows: displayRows,
        totalRecords: rows.length
    }
}

export const createMeterSerialNoFromCounter = (counter: number): string => {
    const counterStr = String(counter)
    return `CPS-${"0".repeat(4-counterStr.length)}${counterStr}`
}

export const createConsumerIdFromCounter = (counter: number): string => {
    const counterStr = String(counter)
    return `CRN-${"0".repeat(6-counterStr.length)}${counterStr}`
}

export const createConsumerNameFromCounter = (counter: number): string => {
    const counterStr = String(counter)
    return `Consumer ${counterStr}`
}