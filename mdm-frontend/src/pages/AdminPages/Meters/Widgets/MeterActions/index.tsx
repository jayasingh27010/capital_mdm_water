import { config } from "src/config"
import { axiosInstance } from "src/api"
const { runMode } = config;
import { useToast } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewMeterActions, viewMetersBulkUpload } from "src/api/Pages/Meters"
import { createMeter } from "src/api/Meter"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import Card from "src/components/Card"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide";
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { convertObjectToList } from "src/utility"
import CSVUpload from "src/components/CSVUpload"
import { isActionModalOpen, useSelector } from "src/selectors"

const bulkUploadActionModalId = "metersCSVUpload"
const meterLoadingToast = "meterLoadingToast"

const MeterActions: React.FC = () => {
    const [config, setConfig] = useState<any>(undefined)
    const { data, isLoading } = useApi(viewMeterActions)
    const [actions, setActions] = useState<any[]>([])
    const [addMeterAction, setAddMeterAction] = useState<any>(undefined)
    const [fieldData, setFieldData] = useState<any>({})
    const [action, setAction] = useState<any>(undefined)
    const { dispatch } = useContext<any>(AppContext)
    const toast = useToast()
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen(bulkUploadActionModalId))
    const isOpenAddMeter = selector(isActionModalOpen("createMeter"))

    useEffect(() => {
        if (!isLoading && data) {
            const actions = convertObjectToList(data?.config?.actions)
            setActions(actions)
            const addMeterAction = actions.find(action => action.id === "createMeter")
            setAddMeterAction(addMeterAction)
            if (actions.length > 0) {
                setAction(actions[0])
            }
        }
    }, [data, isLoading])

    useEffect(() => {
        isOpen && viewMetersBulkUpload()
            .then(({ data }: any) => {
                setConfig(data)
            })
    }, [isOpen])

    const getRandomBoolean = () => Math.random() * 10 <= 6

    const uploadCaller = useCallback((sendObj: UploadSendObj) => {
        if (runMode == 'dev') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (sendObj.messageType === "FINISH") {
                        getRandomBoolean() ?
                            resolve({
                                totalErrRecs: getRandomBoolean() ? 1 : 0
                            }) :
                            reject({})
                    } else {
                        resolve({})
                    }
                }, 100)
            })
        }
        return axiosInstance().post("/viewReceivedMeters", { ...sendObj, nonce: config?.config?.uploadNonce })
    }, [config])



    type UploadSendObj = {
        nonce: string
        uploadPath: string
        messageType: "START" | "IN_PROG" | "FINISH"
        currPieceIndex: number
        piece: string
        totalPieces?: number
    }
    // const handleChange = (fieldId: string, value: any) => {
    //     setFieldData((fieldData: any) => {
    //         return {
    //             ...fieldData,
    //             [fieldId]: value
    //         }
    //     })
    // }
    const handleChange = useCallback((fieldId: string, value: any) => {
        if (fieldId === 'encryptionKey' ) {
            const encryptionKey = (fieldId === 'encryptionKey') ? value: fieldData.encryptionKey 
            if (encryptionKey) {
                if (fieldData.hasOwnProperty("deveui")) {
                    delete fieldData.deveui
                }
            }
            setAddMeterAction((action: any) => {
                if (Object.keys(action?.fields ?? {}).length > 0) {
                    if (fieldId ==='encryptionKey') {
                        action.fields.deveui.disabled = value.length > 0
                    }
                   
                }
                return action
            })
        }

        if (fieldId === 'deveui') {
            if (value) {
                if (fieldData.hasOwnProperty("encryptionKey")) {
                    delete fieldData.encryptionKey
                }
            }
            setAddMeterAction((action: any) => {
                if (Object.keys(action?.fields ?? {}).length > 0) {
                    action.fields.encryptionKey.disabled = value.length > 0
                }
                return action
            })
       }
        const finalObj = {
            ...fieldData,
            [fieldId]: value
        }
        setFieldData(JSON.parse(JSON.stringify(finalObj)))
    },[ addMeterAction?.fields,fieldData])

    const createMeterPromise = () => {
        return new Promise((resolve, reject) => {
            toast({
                id: meterLoadingToast,
                status: 'loading',
                title: 'Adding Meter ...',
                duration: null
            })
            const trimmedFieldData = {
                ...fieldData,
                meterSerialNo: fieldData?.meterSerialNo?.trim(),
                moduleNo: fieldData?.moduleNo?.trim(),
                firmwareVersion: fieldData?.firmwareVersion?.trim()
            };
            createMeter(trimmedFieldData)
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'Meter Added Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: action?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: 'allMetersTable'
                    })
                    setFieldData({})
                    resolve({})
                })
                .catch((e: any) => {
                    toast({
                        title: 'Error',
                        description: e.response.data.message,
                        status: 'error',
                    })
                    reject({})
                })
                .finally(() => {
                    toast.close(meterLoadingToast)
                })
        })
    }

    const handleSubmit = () => {
        createMeterPromise()
    }

    const isInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!fieldData.hasOwnProperty("meterSerialNo") || (!fieldData.meterSerialNo || re.test(fieldData.meterSerialNo) || fieldData.meterSerialNo.length > 16)) {
            return true
        }
        // if (!fieldData.hasOwnProperty("moduleNo") || (!fieldData.moduleNo || re.test(fieldData.moduleNo) || fieldData.moduleNo.length > 16)) {
        //     return true
        // }
        if (fieldData.firmwareVersion && (re.test(fieldData.firmwareVersion) || String(fieldData.firmwareVersion ?? "").length > 32)) {
            return true
        }
        // if (!fieldData.hasOwnProperty("phaseType") || fieldData.phaseType === '-') {
        //     return true
        // }
        // if (!fieldData.hasOwnProperty("sourceType") || fieldData.sourceType === '-') {
        //     return true
        // }

        if (!fieldData.deveui) {
            if (!fieldData.encryptionKey) {
                return true
            }
        }
        if (!fieldData.encryptionKey) {
            if (!fieldData.deveui) {
                return true
            }
        }
        if (!fieldData.hasOwnProperty("consumptionType") || fieldData.consumptionType === '-') {
            return true
        }
        if (action?.fields && action.fields.order.includes("project")) {
            if (!fieldData.hasOwnProperty("project") || !fieldData.project) {
                return true
            }
        }
        return false
    }, [fieldData, action?.fields])

    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const re = /[^a-zA-Z0-9-_ ]/g
        const validationMap: Record<string, boolean> = {
            meterSerialNo: fieldData.hasOwnProperty("meterSerialNo") && (!fieldData.meterSerialNo || re.test(fieldData.meterSerialNo) || fieldData.meterSerialNo.length > 16),
            // moduleNo: fieldData.hasOwnProperty("moduleNo") && (!fieldData.moduleNo || re.test(fieldData.moduleNo) || fieldData.moduleNo.length > 16),
            // phaseType: fieldData.hasOwnProperty("phaseType") && fieldData.phaseType === '-',
            // sourceType: fieldData.hasOwnProperty("sourceType") && fieldData.sourceType === '-',
            consumptionType: fieldData.hasOwnProperty("consumptionType") && fieldData.consumptionType === '-',
            firmwareVersion: fieldData.hasOwnProperty("firmwareVersion") && re.test(fieldData.firmwareVersion),
            project: fieldData.hasOwnProperty("project") && fieldData.project === '-',
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
              case "meterSerialNo":
                errorMessage = "Only AlphaNumerics Allowed (MAX - 16 characters)";
                break;
            //   case "moduleNo":
            //     errorMessage = "Only AlphaNumerics Allowed (MAX - 16 characters)";
            //     break;
              case "firmwareVersion":
                errorMessage = "Only AlphaNumerics Allowed";
                break;
              case "project":
                    errorMessage = "Invalid Project Name";
                break;
              
              default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [fieldData])

    useEffect(() => {
        setFieldData({})
    }, [isOpenAddMeter])

    return (
        <Card>
            <div className="widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2} />} */}
                {!isLoading && data &&
                    <ActionMenu actions={actions} label={"Meter Actions"} />}
            </div>
            {action &&
                <ActionModal
                    key={action.id}
                    label={action.label}
                    onOk={handleSubmit}
                    isOkDisabled={isInvalid()}
                    actionModalId={action.id}>
                    <FieldList
                        validations={validations}
                        onChange={handleChange}
                        data={fieldData}
                        fields={convertObjectToList(action.fields)} />
                </ActionModal>}
            {config &&
                <CSVUpload
                    uploadPath="/metersCSVUpload"
                    uploadCaller={uploadCaller}
                    config={config}
                    actionModalId={bulkUploadActionModalId}
                    type="meters"
                />}

        </Card>
    )
}

export default MeterActions;