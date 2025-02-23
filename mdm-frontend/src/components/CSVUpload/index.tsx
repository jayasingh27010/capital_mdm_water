import { Step, StepIcon, StepIndicator, StepNumber, StepStatus, Stepper, useSteps, StepTitle, Box, StepDescription, StepSeparator, Divider } from "@chakra-ui/react"
import ActionModal from "../ActionModal"
import Button from "../Button"
import Colors from "src/Colors"
import { csvDownloader, csvToData, dataToCsv, stringToPieces } from "src/utility"
import { useCallback, useContext, useEffect, useState } from "react"
import Table from "../Table"
import { AppContext } from "src/contexts"
import { INIT_TABLE } from "src/actions/AppContextActions"
import GuideMessage from "../GuideMessage"
import { isActionModalOpen, useSelector } from "src/selectors"
const pieceSize: number = 10

type CSVUploadProps = {
    uploadPath: string
    actionModalId: string
    uploadCaller:(payload:any)=>Promise<any>
    config: any,
    type: string
}

const steps = [
    { title: 'First', description: 'Select File' },
    { title: 'Second', description: 'Confirm' },
    { title: 'Third', description: 'Export Errors(If Any)' },
]

const OK_BTN_TEXT_MAP: Record<string, string> = {
    "0": "Next",
    "1": "Confirm & Upload",
    "2": "Export Errors"
}

// const getRandomBoolean = () => Math.random() * 10 <= 6

// const uploadCaller = (sendObj: UploadSendObj) => {
//     if (runMode == 'dev') {
//         console.log(sendObj)
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 if (sendObj.messageType === "FINISH") {
//                     getRandomBoolean() ?
//                         resolve({
//                             totalErrRecs: getRandomBoolean() ? 1 : 0
//                         }) :
//                         reject({})
//                 } else {
//                     resolve({})
//                 }
//             }, 100)
//         })
//     }
//     return axiosInstance().post("/viewReceivedMeters", { ...sendObj })
// }

// type UploadSendObj = {
//     nonce: string
//     uploadPath: string
//     messageType: "START" | "IN_PROG" | "FINISH"
//     currPieceIndex: number
//     piece: string
//     totalPieces?: number
// }

const CSVUpload: React.FC<CSVUploadProps> = ({
    actionModalId,
    uploadCaller,
    config,
    type
}) => {
    const [errRecs, setErrRecs] = useState([])
    const [rows, setRows] = useState<any[]>([])
    const [hasUploadError, setHasUploadError] = useState<boolean>(false)
    const [totalErrRecs, setTotalErrRecs] = useState<number>(0)
    const [isBulkUploadComplete, setIsBulkUploadComplete] = useState<boolean>(false)
    const [isBulkUploadStarted, setIsBulkUploadStarted] = useState<boolean>(false)
    const { dispatch } = useContext<any>(AppContext)

    const { activeStep, goToNext, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const selector = useSelector()
    const isOpen = selector(isActionModalOpen(actionModalId))

    useEffect(() => {
        if (!isOpen && activeStep > 0) {
            setActiveStep(0)
        }
    }, [activeStep, isOpen])

    const handleNext = useCallback(async () => {
        if (activeStep === 1) {
            reloadErrorTable()
            setIsBulkUploadStarted(true)
            setHasUploadError(false)
            try {
                const data: any = await bulkUploadPromise()
                setTotalErrRecs(data.data.totalErrRecs)
                setErrRecs(data.data.errorRecords)
            } catch (e) {
                reloadTable()
                setHasUploadError(true)
                return
            } finally {
                setIsBulkUploadComplete(true)
                setIsBulkUploadStarted(false)
            }
        }
        if (activeStep === 2) {
            getWithError(config.config.columns, errRecs, 'download-errors.csv')
        }
        goToNext()
    }, [activeStep, totalErrRecs, config])


    const get = (columns: any, data: any, filename: string) => {
        const csvdata = dataToCsv(columns, data, ['error']);
        csvDownloader(csvdata, filename);
    }

    const getWithError = (columns: any, data: any, filename: string) => {
        const csvdata = dataToCsv(columns, data, []);
        csvDownloader(csvdata, filename);
    }


    const mailRe = /\S+@\S+\.\S+/;

    const is6DigitDecimal = (value: any) => {
        const val = String(value)
        const reg = new RegExp('^[0-9.]+$')
        if (!reg.test(val)) {
            return false
        }
        const afterDecimal = val.split(".")?.[1] ?? ""
        const beforeDecimal = val.split(".")?.[1] ?? ""
        return (beforeDecimal.length <= 6 && afterDecimal.length <= 2) && !isNaN(parseFloat(val))
    }

    const Dateregex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

const isValidDate = (dateString : any) => {
    if (!dateString) return 'Date is required.';
    const matches = dateString.match(Dateregex);
    if (!matches) return false;

    const day = parseInt(matches[1]);
    const month = parseInt(matches[2]);
    const year = parseInt(matches[3]);

    if (month < 1 || month > 12) return false;
    const daysInMonth = [
        31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    if (day < 1 || day > daysInMonth[month - 1]) return false;
    return true;
};
const isLeapYear = (year: any) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
};

    const validateFields = (columns: any, type: string, field: string, value: string, row: any): string | null => {
        const normalizedValue = (value ?? "").trim()
        const re = /[^a-zA-Z0-9-_ ]/g
        const validators: any = {
            meters: {
                meterSerialNo: (value: any) => value.length == 0 && 'Invalid Meter Serial No.',
                moduleNo: (value: any) => value.length == 0 && 'Invalid Module No.',
                phaseType: (value: any) => (value === '-' || !columns.phaseType.allowedOptions.includes(value)) && 'Invalid Phase Type',
                sourceType: (value: any) => (value === '-' || !columns.sourceType.allowedOptions.includes(value)) && 'Invalid Source Type',
                consumptionType: (value: any) => (value === '-' || !columns.consumptionType.allowedOptions.includes(value)) && 'Invalid Consumption Type'
            },
            consumers:{
                firstName: (val: string) => (!val || re.test(val) || val?.length > 50) && 'Invalid First Name',
                lastName: (val: string) => (!val || re.test(val) || val?.length > 50) && 'Invalid Last Name',
                address: (val: string) => (!val || re.test(val) || val?.length > 250) && 'Invalid Address',
                mobileNo: (val: string) =>(!val || isNaN(parseInt(val)) || val.length !== 10) && 'Invalid mobile number',
                email: (val: string) => (val && (!mailRe.test(val) || val?.length > 50)) && 'Invalid Email',

                panNo: (val: string) => val && (re.test(val) || val?.length > 10) && 'Invalid PAN No',
                gstNo: (val: string) => val && (re.test(val) || val?.length > 15) && 'Invalid GST No',
                towerNo: (val: string) => val && (re.test(val) || val?.length > 16) && 'Invalid Tower No',
                flatNo: (val: string, row: any) => {
                    if (row.shopNo) {
                        if (val) {
                            return '[Flat No, Flat Type] and [Shop No] both are not required'
                        }
                    } else {
                        return (!val || re.test(val) || val?.length > 16) && 'Invalid Flat No'
                    }
                },
                flatType: (val: string, rowI: any) => {
                    console.log("row in", rowI, "val", val, "shopNo", Object.keys(rowI), rowI.shopNo)
                    if (rowI.shopNo) {
                        if (val && (val !== "-" || columns.flatType.allowedOptions.includes(val))) {
                            return '[Flat No, Flat Type] and [Shop No] both are not required'
                        }
                    } else {
                        console.log("row in", row, "val", val, "shopNo", row["shopNo"], row)
                        console.log("in side else")
                        return (!val || !columns.flatType.allowedOptions.includes(val)) && 'Invalid Flat Type'
                    }
                },
                shopNo: (val: string, row: any) => {
                    if (row.flatNo || row.flatType) {
                        if (val) {
                            return '[Flat No, Flat Type] and [Shop No] both are not required'
                        }
                    }
                    return val && (re.test(val) || val?.length > 16) && 'Invalid Shop No'
                },

                // totalLoadGrid: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Total Load Grid',
                // totalLoadDG: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Total Load DG',

                // gridLoadR: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Grid Load R',
                // gridLoadY: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Grid Load Y',
                // gridLoadB: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Grid Load B',

                // DGLoadR: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid DG Load R',
                // DGLoadY: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid DG Load Y',
                // DGLoadB: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid DG Load B',
                installationDate: (val: string) => {
                    return !isValidDate(val) && 'Invalid Installation Date';
                },

                openingBalance: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Opening Balance',
                area: (val: string) => (isNaN(parseFloat(val)) || !is6DigitDecimal(val)) && 'Invalid Area',

                meterSerialNo: (val: string) => !val && 'Invalid Meter Serial No',
                tarrifGroup: (val: any) => val.length == 0 && 'Tarrif Group Cannot Be Empty',
            }
        }
        console.log("fieldType", field, row)
        return validators[type]?.[field] ? validators[type][field](normalizedValue, row) : null;
    }

    const reloadTable = useCallback(() => {
        dispatch({
            type: INIT_TABLE,
            payload: config.config.tableId
        })
    }, [config])

    const reloadErrorTable = () => {
        dispatch({
            type: INIT_TABLE,
            payload: config.config.errorTableId
        })
    }

    const handleDownloadSampleCSV = useCallback(() => {
        const columns = config.config.columns
        const rows = config.config.sampleCSV.rows
        get(columns, rows, 'download.csv')
    }, [config])

    const handleFileChange = useCallback((e: any, type: string) => {
        const files = e.target.files
        if (files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                if (event.target?.result && typeof event.target?.result === typeof ' ') {
                    const result: any = event.target.result
                    try {

                        const data = csvToData(
                            config.config.columns,
                            result,
                            // validateHeaders,
                            (field: string, value: string, row: any) => validateFields(config.config.columns, type, field, value, row)
                        )
                        setTotalErrRecs(data.rowErrRecs)

                        setRows(data.rows);
                        goToNext()
                        reloadTable()
                    } catch (e) {
                        console.log(e)
                    }
                }
            });
            reader.readAsText(files[0]);
        }
    }, [reloadTable, config])

    const apiReference = useCallback((_: any): Promise<any> => {
        return new Promise((resolve) => {
            // const perPage = filters?.perPage ?? 5
            // const currPage = filters?.currPage ?? 1
            // let startIndex = perPage * (currPage - 1)
            // let endIndex = startIndex + perPage
            // if (startIndex > rows.length) {
            //     startIndex = 0
            // }
            // if (endIndex > rows.length) {
            //     endIndex = rows.length
            // }
            // const displayRows = rows.slice(startIndex, endIndex)
            resolve({
                columns: config.config.columns,
                rowData: rows,
                totalRecords: rows.length
            })
        })
    }, [rows, config])

    const finalErrorApiReference = useCallback((_: any) => {
        return new Promise((resolve) => {
            // const perPage = filters?.perPage ?? 5
            // const currPage = filters?.currPage ?? 1
            // let startIndex = perPage * (currPage - 1)
            // let endIndex = startIndex + perPage
            // if (startIndex > rows.length) {
            //     startIndex = 0
            // }
            // if (endIndex > rows.length) {
            //     endIndex = rows.length
            // }
            // const displayRows = rows.slice(startIndex, endIndex)
            resolve({
                columns: config.config.columns,
                rowData: errRecs,
                totalRecords: errRecs.length
            })
        })
    }, [config, errRecs])


    const bulkUploadPromise = useCallback(async () => {
        const dataString = JSON.stringify(rows)
        const pieces = stringToPieces(dataString, pieceSize)
        const numPieces = pieces.length
        const nonce = config.config.uploadNonce
        const uploadPath = config.config.uploadPath
        try {
            await uploadCaller({
                nonce,
                uploadPath,
                messageType: "START",
                currPieceIndex: -1,
                piece: "",
                totalPieces: numPieces
            })
            for (let i = 0; i < numPieces; i++) {
                await uploadCaller({
                    nonce,
                    uploadPath,
                    messageType: "IN_PROG",
                    currPieceIndex: i,
                    piece: pieces[i],
                })
            }
            const data = await uploadCaller({
                nonce,
                uploadPath,
                messageType: "FINISH",
                currPieceIndex: -1,
                piece: "",
            })
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject({})
        }
    }, [rows])



    return (
        <ActionModal
            size={activeStep === 0 ? 'xl' : 'full'}
            actionModalId={actionModalId}
            label="CSV Upload"
            okBtnText={OK_BTN_TEXT_MAP[String(activeStep)]}
            isOkDisabled={activeStep === 0 || (activeStep === 1 && totalErrRecs != 0) || (activeStep === 2 && totalErrRecs === 0)}
            onOk={handleNext}
        >
            <div style={{ maxWidth: "700px", margin: "0px auto" }}>
                <Stepper
                    index={activeStep}
                    orientation='horizontal'
                    gap='0'>
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            onClick={() => {
                                if (activeStep === 0) {
                                    return
                                }
                                if (index === 2) {
                                    return
                                }
                                // setRows([])
                                setActiveStep(index)
                                if (index === 1 || index === 2) {
                                    setIsBulkUploadStarted(false)
                                    reloadTable()
                                    reloadErrorTable()
                                }
                            }}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            </div>
            {activeStep === 0 &&
                <div className="d-flex flex-column justify-content-center py-2">
                    <div className="mb-0 text-center">Click On The Button Below To Download Sample CSV</div>
                    <div className="d-flex flex-row justify-content-center py-2">
                        <Button
                            onClick={handleDownloadSampleCSV}
                            bgColor={Colors.primary}
                            color={Colors.primaryNegative}
                            size="sm"
                        >
                            Download Sample CSV
                        </Button>
                    </div>
                    <Divider />
                    <div className="d-flex flex-row justify-content-center">
                        <input type="file" onChange={(e) => handleFileChange(e, type)} />
                    </div>
                </div>}
            {activeStep === 1 &&
                <div>
                    <div className="d-flex py-2">
                        <GuideMessage
                            messageType="info"
                            guideMessage="Not Satisfied With The Preview? Select File Again" />
                        <div className="d-flex align-items-center justify-content-center ps-2">
                            <Button
                                bgColor={Colors.primary}
                                color={Colors.primaryNegative}
                                onClick={() => setActiveStep(0)}
                                size="lg">
                                Go Back
                            </Button>
                        </div>
                    </div>
                    {hasUploadError &&
                        <GuideMessage messageType="error" guideMessage="Error Uploading CSV File, Try Again" />}
                    {!isBulkUploadStarted &&
                        <Table
                            noFooter={true}
                            defaultFilters={{
                                perPage: 5,
                                currPage: 1
                            }}
                            tableId={config.config.tableId}
                            apiReference={apiReference} />}
                    {isBulkUploadStarted &&
                        <div className="py-3">
                            <div className="pb-3">
                                <GuideMessage
                                    messageType="loading"
                                    guideMessage="Please wait while we upload the CSV.." />
                            </div>
                        </div>
                    }
                </div>}
            {activeStep === 2 &&
                isBulkUploadComplete &&
                <div>
                  <div className="py-2">
    {totalErrRecs !== 0 ? (
        <GuideMessage
            guideMessage={`${totalErrRecs} record(s) failed in bulk upload.`}
            messageType="error"
        />
    ) : (
        <GuideMessage
            guideMessage="Bulk Upload Complete!"
            messageType="success"
        />
    )}
</div>
                    {totalErrRecs !== 0 &&
                        <div className="pb-2 d-flex">
                            <GuideMessage
                                guideMessage="You can export rejected entries! and try again"
                                messageType="warning" />
                            <div className="d-flex align-items-center justify-content-center ps-2">
                                <Button
                                    bgColor={Colors.primary}
                                    color={Colors.primaryNegative}
                                    onClick={() => getWithError(config.config.columns, errRecs, 'download-errors.csv')}
                                    size="lg">
                                    Export Errors And Try Again
                                </Button>
                            </div>
                        </div>}
                    {totalErrRecs !== 0 &&
                        <Table
                            noFooter={true}
                            defaultFilters={{
                                perPage: 5,
                                currPage: 1,
                                nonce: config.config.uploadNonce
                            }}
                            tableId={config.config.errorTableId}
                            apiReference={finalErrorApiReference} />}
                </div>}

        </ActionModal>
    )
}

export default CSVUpload