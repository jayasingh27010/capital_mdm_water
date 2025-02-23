import { FieldObject } from "./types";



export const convertObjectToList = (fieldObject: FieldObject): any[] => {
    const keys = fieldObject.order
    return keys.map(key => ({
        id: key,
        ...fieldObject[key]
    }))
}

export const chainRoutes = (...args: string[]) => {
    return args.join("")
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const replaceRelativeAdminPath = (path: string, replacePath: string): string => {
    const baseUrl = path.split("/").slice(0, 3).join("/")
    return `${baseUrl}${replacePath}`
}

export const setToken = (token: string) => {
    localStorage.clear()
    localStorage.setItem("token", token)
}

export const clearToken = () => {
    localStorage.clear()
    localStorage.removeItem("token")
}

export const isEmpty = (object: any) => {
    return Object.keys(object).length === 0
}

const extractHeadersFromColumns = (columns: any) => {
    if (!columns?.order || !Array.isArray(columns?.order)) {
        return ""
    }
    return columns.order.join(",")
}

export const dataToCsv = (columns: any, rows: any[], hideColumns?: string[]) => {
    if (rows.length > 0) {
        let headers: string = extractHeadersFromColumns(columns)
        if (hideColumns && hideColumns.length > 0) {
            headers = headers
                .split(",")
                .filter(column => !hideColumns.includes(column))
                .join(",")
        }
        const extractedColumns: string[] = headers.split(",")
        return [
            headers,
            ...rows
                .map(row => {
                    const values = []
                    for (const column of extractedColumns) {
                        values.push(row.hasOwnProperty(column) ? row[column] : "-")
                    }
                    return values.join(",")
                })
        ].join('\n')
    }
    throw new Error("Invalid CSV")
}

export const csvDownloader = (dataStr: string, downloadFilename: string) => {
    const blob = new Blob([dataStr], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFilename;
    a.click();
}
export const csvToData = (
    columns: any,
    csvStr: any,
    // validateHeaders: (headers: string[]) => boolean,
    validateFields: (field: string, value: string, row: any) => string | null
) => {
    const normalizedCsvStr = csvStr.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const allRows = normalizedCsvStr.split("\n");

    if (allRows.length > 0) {
        const headers = columns.order
        // headers.push("error");
        console.log('headers', headers);

        // if (!validateHeaders(headers)) {
        //     throw new Error("Invalid Headers");
        // }
        let bigErr = false

        for (const col of (allRows?.[0] ?? "").split(",")) {
            if (!headers.includes(col)) {
                bigErr = true
                break
            }
        }

        const getRows = allRows.slice(1, allRows.length);
        const dataRows = getRows.filter((row: any) => row.trim().length > 0);
        console.log('dataRows', dataRows);
        if (dataRows.length === 0) {
            throw new Error("No Data Found");
        }

        let rows = [];
        console.log('row data length', dataRows.length);
        for (let i = 0; i < dataRows.length; i++) {
            let errorExists = false
            const rowDataArr: any[] = dataRows[i].split(",");
            let rowData: any = {};
            let rowErrors: string[] = [];

            for (let j = 0; j < headers.length - 1; j++) {
                const header = headers[j];
                const value = rowDataArr[j];
                rowData[header] = value;
            }

            for (let j = 0; j < headers.length - 1; j++) {
                const header = headers[j];
                const value = rowDataArr[j];
                if (!errorExists) {
                    const errorMessage = validateFields(header, value, rowData);
    
                    if (errorMessage) {
                        rowErrors.push(errorMessage);
                        errorExists = true
                    }

                }
                rowData[header] = value;
            }

            rowData["error"] = rowErrors.length > 0 ? rowErrors.join("; ") : "-";
            if (bigErr) {
                rowData["error"] = "Unknown Column Exists"
            }
            rows.push(rowData);
        }
        let rowErrRecs = 0;
        for (let j = 0; j < rows.length; j++) {
            if (rows[j].error != '-') {
                rowErrRecs += 1;
            }
        }
        return {
            rows,
            rowErrRecs
        };

    }

    throw new Error("Invalid CSV");
};
// export const csvToData = (csvStr: any, validateHeaders: (headers: string[]) => boolean) => {
//     const allRows = csvStr.split("\n")
//     if (allRows.length > 0) {
//         const headers = allRows[0].split(",")
//         if (!validateHeaders(headers)) {
//             throw new Error("Invalid Headers")
//         }
//         const dataRows = allRows.slice(1, allRows.length)
//         if (dataRows.length === 0) {
//             throw new Error("No Data Found")
//         }
//         let rows = []
//         for (let i = 0; i < dataRows.length; i++) {
//             const rowDataArr: any[] = dataRows[i].split(",")
//             let rowData = {}
//             for (let j = 0; j < headers.length; j++) {
//                 rowData = {
//                     ...rowData,
//                     [headers[j]]: rowDataArr[j]
//                 }
//             }
//             rows.push(rowData)
//         }
//         return rows
//     }
//     throw new Error("Invalid CSV")
// }

export const stringToPieces = (str: string, pieceSize: number): string[] => {
    let pieces: string[] = []
    let strBuffer: string = str.slice(0)
    while (strBuffer.length !== 0) {
        if (pieceSize >= strBuffer.length) {
            pieces.push(strBuffer.slice(0, strBuffer.length))
            strBuffer = ""
        } else {
            pieces.push(strBuffer.slice(0, pieceSize))
            strBuffer = strBuffer.slice(pieceSize, strBuffer.length)
        }
    }
    return pieces
}

export const secsToDate = (value: number) => {

    const dateObj = value ? new Date(value * 1000) : undefined
    if (dateObj === undefined) {
        return ''
    }
    console.log("called with value", value, dateObj.getMonth(), Math.floor(dateObj.getDate() / 10))
    const monthStr = Math.floor((dateObj.getMonth() + 1) / 10) === 0 ? `0${dateObj.getMonth() + 1}` : `${dateObj.getMonth() + 1}`
    const dayStr = Math.floor(dateObj.getDate() / 10) === 0 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`
    return `${dateObj.getFullYear()}-${monthStr}-${dayStr}`
}