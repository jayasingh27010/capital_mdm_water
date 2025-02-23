import { config } from "src/config"
import { axiosInstance } from "src/api"
const { runMode } = config;
import { useToast } from "@chakra-ui/react"
import {  useCallback, useContext, useEffect, useState } from "react"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewConsumerActions, viewConsumersBulkUpload } from "src/api/Pages/Consumers"
import { createConsumer } from "src/api/Consumer"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import Card from "src/components/Card"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide";
import GuideMessage from "src/components/GuideMessage"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { convertObjectToList } from "src/utility"
import CSVUpload from "src/components/CSVUpload"
import { isActionModalOpen, useSelector } from "src/selectors"
import AddTarrifGroupAction from "src/actionComponents/AddTarrifGroupAction"
import CreateTarrifGroupAction from "src/actionComponents/CreateTarrifGroupAction"


const bulkUploadActionModalId = "consumersCSVUpload"
const addConsumerLoadingToast = "addConsumerLoadingToast"

type GuideMessage = {
    messageType: "info" | "loading" | "warning" | "success" | "error" | undefined,
    guideMessage?: string,
    isLoading: boolean
}

const ConsumerActions: React.FC = () => {
    const { data, isLoading, refresh } = useApi(viewConsumerActions)
    const [actions, setActions] = useState<any[]>([])
    const [fieldData, setFieldData] = useState<any>({
        userType: 'OTHER'
    })
    const selector = useSelector()
    const [bulkUploadConfig, setBulkUploadConfig] = useState<any>(undefined)
    const [addConsumerAction, setAddConsumerAction] = useState<any>(undefined)
    const [addTarrifGroupAction, setAddTarrifGroupAction] = useState<any>(undefined)
    const [createTarrifAction, setCreateTarrifAction] = useState<any>(undefined)
    const [originalOptions, setOriginalOptions] = useState<any[]>([])
    const [originalMeterSerialOptions, setOriginalMeterSerialOptions] = useState<any[]>([])
   // const [isOkDisabled, setIsOkDisabled] = useState<any>(true)
    const [guideMessage] = useState<GuideMessage>({ isLoading: false, messageType: 'info' })
    const { dispatch } = useContext<any>(AppContext)
    const isOpen = selector(isActionModalOpen(bulkUploadActionModalId))
    const isOpenCreateConsumer = selector(isActionModalOpen("addConsumer"))
    const toast = useToast()
    const getRandomBoolean = () => Math.random() * 10 <= 6

    const uploadCaller = useCallback((sendObj: UploadSendObj) => {
        if (runMode == 'dev') {
            console.log(sendObj)
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
        return axiosInstance().post("/viewReceivedConsumers", { ...sendObj, nonce: bulkUploadConfig?.config?.uploadNonce })
    }, [bulkUploadActionModalId])

    type UploadSendObj = {
        nonce: string
        uploadPath: string
        messageType: "START" | "IN_PROG" | "FINISH"
        currPieceIndex: number
        piece: string
        totalPieces?: number
    }

    const handleChange = useCallback((fieldId: string, value: any) => {
        if (fieldId === 'project') {
            setAddConsumerAction((action: any) => {
                if (action?.fields?.tarrifGroup) {
                    action.fields.tarrifGroup.hide = !value || value === '-'
                    if (addConsumerAction?.fields?.order?.includes("project")) {
                        action.fields.tarrifGroup.selectOptions = originalOptions.filter((option) => option.forProject === value)
                        action.fields.meterSerialNo.selectOptions = originalMeterSerialOptions.filter((option) => option.forProject == value)
                        console.log(action.fields.meterSerialNo.selectOptions)
                    }
                }
                return action
            })
        }
        if (fieldId === 'flatNo' || fieldId === 'flatType') {
            const flatNo = (fieldId === 'flatNo') ? value: fieldData.flatNo 
            const flatType = fieldId === 'flatType' ? value: fieldData.flatType
            if (flatNo || flatType !== "-") {
                if (fieldData.hasOwnProperty("shopNo")) {
                    delete fieldData.shopNo
                }
            }
            setAddConsumerAction((action: any) => {
                if (Object.keys(action?.fields ?? {}).length > 0) {
                    console.log("", action.fields)
                    if (fieldId === 'flatNo') {
                        action.fields.shopNo.disabled = Boolean(flatNo)
                    }
                    if (fieldId === 'flatType') {
                        action.fields.shopNo.disabled = flatType !== '-'
                    }
                }
                return action
            })
        }
       if (fieldId === 'shopNo') {
            if (value) {
                if (fieldData.hasOwnProperty("flatNo")) {
                    delete fieldData.flatNo
                }
            }
            setAddConsumerAction((action: any) => {
                if (Object.keys(action?.fields ?? {}).length > 0) {
                    action.fields.flatNo.disabled = value.length > 0
                    action.fields.flatType.disabled = value.length > 0
                }
                return action
            })
       }

        // setAddConsumerAction((action: any) => {
        //     if (Object.keys(action?.fields ?? {}).length > 0) {
        //         console.log("", action.fields)
        //         action.fields.shopNo.disabled = !(fieldData.flatNo || (fieldData.flatType && fieldData.flatType !== "-"))
                
        //         action.fields.flatNo.disabled = !Boolean(fieldData.shopNo)
        //         action.fields.flatType.disabled = !Boolean(fieldData.shopNo)
        //     }
        //     return action
        // })
        const finalObj = {
            ...fieldData,
            [fieldId]: value
        }
        if (fieldId === "project") {
            finalObj.meterSerialNo = ""
        }
        if (fieldId === "shopNo") {
            if (fieldData.hasOwnProperty("flatType")) {
                finalObj.flatType = "-"
            }
        }
        setFieldData(JSON.parse(JSON.stringify(finalObj)))
    }, [originalOptions, originalMeterSerialOptions,  addConsumerAction?.fields, fieldData])

    useEffect(() => {
        if (!isLoading && data) {
            const actions = convertObjectToList(data?.config?.actions)
            setActions(actions)
            const addConsumerAction = actions.find(action => action.id === "addConsumer")
            setAddConsumerAction(addConsumerAction)
            setOriginalOptions(addConsumerAction.fields.tarrifGroup.selectOptions)
            setOriginalMeterSerialOptions(addConsumerAction.fields.meterSerialNo.selectOptions)
            setAddTarrifGroupAction(actions.find(action => action.id === "addTarrifGroup"))
            setCreateTarrifAction(actions.find(action => action.id === "createTarrif"))
        }
    }, [data, isLoading])

    const createConsumerPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            toast({
                id: addConsumerLoadingToast,
                status: 'loading',
                title: 'Adding Consumer ...',
                duration: null
            })

            const trimmedFieldData = {
                ...fieldData,
                meterSerialNo: fieldData?.meterSerialNo?.trim(),
                firstName: fieldData?.firstName?.trim(),
                lastName: fieldData?.lastName?.trim(),
                address: fieldData?.address?.trim()
            };
            createConsumer(trimmedFieldData)
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'Consumer Added Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: addConsumerAction?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: 'allConsumersTable'
                    })
                    setFieldData({})
                    refresh?.()
                    resolve({})
                })
                .catch((e: any) => {
                    toast({
                        title: 'Error',
                        description: e.response.data.message,
                        status: 'error'
                    })
                    reject({})
                })
                .finally(() => {
                    toast.close(addConsumerLoadingToast)
                })
        })
    }, [fieldData, refresh])

    const handleSubmit = useCallback(() => {
        createConsumerPromise()
    }, [refresh, createConsumerPromise])


    useEffect(() => {
        isOpen && viewConsumersBulkUpload()
            .then(({ data }: any) => {

                console.log("columns.order", data)
                setBulkUploadConfig(data)
            })
    }, [isOpen])

    useEffect(() => {
        setFieldData({})
        if (addConsumerAction?.fields?.order?.includes("project")) {
            handleChange('project', '')
        }
    }, [isOpenCreateConsumer, addConsumerAction?.fields])
    

    // const isInvalid = useCallback(() => {
    //     const re = /[^a-zA-Z0-9-_ ]/g
    //     if (!fieldData.mobileNo || fieldData.mobileNo.length !== 10 || isNaN(fieldData.mobileNo)) {
    //         return true
    //     }
    //     const mailRe = /\S+@\S+\.\S+/;
    //     if (fieldData.email && (fieldData.email.length < 1 || !mailRe.test(fieldData.email) || fieldData.email.length > 50) ) {
    //         return true
    //     }
    //     if (!fieldData.firstName || (fieldData.firstName && fieldData.firstName.length > 50)){
    //         return true
    //     }
    //     if (!fieldData.lastName  || (fieldData.lastName && fieldData.lastName.length > 50)){
    //         return true
    //     }
    //     if (!fieldData.address || (fieldData.address && fieldData.address.length > 250)) {
    //         return true
    //     }
    //     console.log("fieldData values before eval", fieldData)
    //     if (!fieldData.shopNo) {
    //         if (fieldData.flatType === "-" || !fieldData.flatType) {
    //             return true
    //         }
    //         if (!fieldData.flatNo || re.test(fieldData.flatNo) || (fieldData.flatNo && fieldData.flatNo.length > 16)) {
    //             return true
    //         }
    //     }
    //     if (!fieldData.flatType || !fieldData.flatNo) {
    //         if (!fieldData.shopNo || (fieldData.shopNo && fieldData.shopNo.length > 16)) {
    //             return true
    //         }
    //     }
    //     if (fieldData.connectionNo && re.test(fieldData.connectionNo)) {
    //         return true
    //     }
    //     if (fieldData.panNo && (re.test(fieldData.panNo))) {
    //         return true
    //     }
    //     if (fieldData.gstNo && (re.test(fieldData.gstNo))) {
    //         return true
    //     }
    //     if (fieldData.towerNo && (re.test(fieldData.towerNo))) {
    //         return true
    //     }
    //     if (String(fieldData.totalLoadGrid ?? "").length !== 0 && !is6DigitDecimal(fieldData.totalLoadGrid)) {
    //         return true
    //     }
    //     if (String(fieldData.totalLoadDG ?? "").length !== 0 && !is6DigitDecimal(fieldData.totalLoadDG)) {
    //         return true
    //     }

    //     if (String(fieldData.gridLoadR ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.gridLoadR)) {
    //         return true
    //     }
    //     if (String(fieldData.gridLoadY ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.gridLoadY)) {
    //         return true
    //     }
    //     if (String(fieldData.gridLoadB ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.gridLoadB)) {
    //         return true
    //     }

    //     if (String(fieldData.DGLoadR ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.DGLoadR)) {
    //         return true
    //     }
    //     if (String(fieldData.DGLoadY ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.DGLoadY)) {
    //         return true
    //     }
    //     if (String(fieldData.DGLoadB ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.DGLoadB)) {
    //         return true
    //     }


    //     if (String(fieldData.openingBalance ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.openingBalance)) {
    //         return true
    //     }
    //     if (!fieldData.installationDate) {
    //         return true
    //     }
    //     if (String(fieldData.area ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.area)) {
    //         return true
    //     }

    //     if (!fieldData.meterSerialNo) {
    //         return true
    //     }

    //     if (!fieldData.tarrifGroup || fieldData.tarrifGroup === "-") {
    //         return true
    //     }

    //     if (addConsumerAction?.fields?.order?.includes("project")) {
    //         if(!fieldData.project)  {
    //             return true
    //         }
    //     }
    //     // if(!fieldData.tarrifGroup || fieldData.tarrifGroup === '-' || fieldData.tarrifGroup.length === 0) {
    //     //     return true
    //     // }
    //     return false
        
    // }, [fieldData, addConsumerAction?.fields])

    const isInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!fieldData.mobileNo || fieldData.mobileNo.length !== 10 || isNaN(fieldData.mobileNo)) {
            return true
        }
        const mailRe = /\S+@\S+\.\S+/;
        if (fieldData.email && (fieldData.email.length < 1 || !mailRe.test(fieldData.email)) ) {
            return true
        }
        if (!fieldData.firstName){
            return true
        }
        if (!fieldData.lastName){
            return true
        }
        if (!fieldData.address) {
            return true
        }
        console.log("fieldData values before eval", fieldData)
        if (!fieldData.shopNo) {
            if (fieldData.flatType === "-" || !fieldData.flatType) {
                return true
            }
            if (!fieldData.flatNo || re.test(fieldData.flatNo)) {
                return true
            }
        }
        if (!fieldData.flatType || !fieldData.flatNo) {
            if (!fieldData.shopNo) {
                return true
            }
        }
        if (fieldData.connectionNo && re.test(fieldData.connectionNo)) {
            return true
        }
        if (fieldData.panNo && re.test(fieldData.panNo)) {
            return true
        }
        if (fieldData.gstNo && re.test(fieldData.gstNo)) {
            return true
        }
        if (fieldData.towerNo && re.test(fieldData.towerNo)) {
            return true
        }
        if (String(fieldData.totalLoadGrid ?? "").length !== 0 && !is6DigitDecimal(fieldData.totalLoadGrid)) {
            return true
        }
        if (String(fieldData.totalLoadDG ?? "").length !== 0 && !is6DigitDecimal(fieldData.totalLoadDG)) {
            return true
        }

        if (String(fieldData.gridLoadR ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.gridLoadR)) {
            return true
        }
        if (String(fieldData.gridLoadY ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.gridLoadY)) {
            return true
        }
        if (String(fieldData.gridLoadB ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.gridLoadB)) {
            return true
        }

        if (String(fieldData.DGLoadR ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.DGLoadR)) {
            return true
        }
        if (String(fieldData.DGLoadY ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.DGLoadY)) {
            return true
        }
        if (String(fieldData.DGLoadB ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.DGLoadB)) {
            return true
        }


        if (String(fieldData.openingBalance ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.openingBalance)) {
            return true
        }
        if (!fieldData.installationDate) {
            return true
        }
        if (String(fieldData.area ?? "").length !== 0 &&  !is6DigitDecimal(fieldData.area)) {
            return true
        }

        if (!fieldData.meterSerialNo) {
            return true
        }

        if (!fieldData.tarrifGroup || fieldData.tarrifGroup === "-") {
            return true
        }

        if (addConsumerAction?.fields?.order?.includes("project")) {
            if(!fieldData.project)  {
                return true
            }
        }
        // if(!fieldData.tarrifGroup || fieldData.tarrifGroup === '-' || fieldData.tarrifGroup.length === 0) {
        //     return true
        // }
        return false
        
    }, [fieldData, addConsumerAction?.fields])

    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const re = /[^a-zA-Z0-9-_ ]/g
        const mailRe = /\S+@\S+\.\S+/;
        const validationMap: Record<string, boolean> = {
            firstName: fieldData.hasOwnProperty("firstName") && (!fieldData.firstName || re.test(fieldData.firstName) || fieldData.firstName.length > 50),
            lastName: fieldData.hasOwnProperty("lastName") && (!fieldData.lastName || re.test(fieldData.lastName) || fieldData.lastName.length > 50),
            mobileNo: fieldData.hasOwnProperty("mobileNo") && (!fieldData.mobileNo || isNaN(fieldData.mobileNo) || fieldData.mobileNo.length !== 10),
            email: fieldData.email && (!mailRe.test(fieldData.email) || (fieldData.flatNo && fieldData.flatNo.length > 50)),
            address: fieldData.hasOwnProperty("address") && (!fieldData.address || fieldData.address.length > 250),

            connectionNo: fieldData.hasOwnProperty("connectionNo") && re.test(fieldData.connectionNo),
            panNo: fieldData.hasOwnProperty("panNo") && (re.test(fieldData.panNo) || (fieldData.panNo && fieldData.panNo.length > 10)),
            gstNo: fieldData.hasOwnProperty("gstNo") && (re.test(fieldData.gstNo) || (fieldData.gstNo && fieldData.gstNo.length > 15)),
            towerNo: fieldData.hasOwnProperty("towerNo") && (re.test(fieldData.towerNo) || (fieldData.towerNo && fieldData.towerNo.length > 15)),
            flatNo: fieldData.hasOwnProperty("flatNo") && ((re.test(fieldData.flatNo) || !fieldData.flatNo) || (fieldData.flatNo && fieldData.flatNo.length > 16)),
            flatType: fieldData.hasOwnProperty("flatType") && (fieldData.flatType === "-" && !fieldData.shopNo),
            shopNo: fieldData.hasOwnProperty("shopNo") && (!fieldData.shopNo || (fieldData.shopNo && fieldData.shopNo.length > 16)),

            totalLoadGrid: fieldData.hasOwnProperty("totalLoadGrid") && (parseFloat(fieldData.totalLoadGrid) !== 0.0 && !is6DigitDecimal(fieldData.totalLoadGrid)),
            totalLoadDG: fieldData.hasOwnProperty("totalLoadDG") && parseFloat(fieldData.totalLoadDG) !== 0.0 && !is6DigitDecimal(fieldData.totalLoadDG),
            
            gridLoadR: fieldData.hasOwnProperty("gridLoadR") && parseFloat(fieldData.gridLoadR) !== 0.0 && !is6DigitDecimal(fieldData.gridLoadR),
            gridLoadY: fieldData.hasOwnProperty("gridLoadY") && parseFloat(fieldData.gridLoadY) !== 0.0 && !is6DigitDecimal(fieldData.gridLoadY),
            gridLoadB: fieldData.hasOwnProperty("gridLoadB") && parseFloat(fieldData.gridLoadB) !== 0.0 && !is6DigitDecimal(fieldData.gridLoadB),

            DGLoadR: fieldData.hasOwnProperty("DGLoadR") && parseFloat(fieldData.DGLoadR) !== 0.0 && !is6DigitDecimal(fieldData.DGLoadR),
            DGLoadY: fieldData.hasOwnProperty("DGLoadY") && parseFloat(fieldData.DGLoadY) !== 0.0 && !is6DigitDecimal(fieldData.DGLoadY),
            DGLoadB: fieldData.hasOwnProperty("DGLoadB") && parseFloat(fieldData.DGLoadB) !== 0.0 && !is6DigitDecimal(fieldData.DGLoadB),

            installationDate: fieldData.hasOwnProperty("installationDate") && !fieldData.installationDate,
            openingBalance: fieldData.hasOwnProperty("openingBalance") && parseFloat(fieldData.openingBalance) !== 0.0 && !is6DigitDecimal(fieldData.openingBalance),
            area: fieldData.hasOwnProperty("area") && parseFloat(fieldData.area) !== 0.0 && !is6DigitDecimal(fieldData.area),
            meterSerialNo: fieldData.hasOwnProperty("meterSerialNo") && !fieldData.meterSerialNo,
            tarrifGroup: fieldData.hasOwnProperty("tarrifGroup") && fieldData.tarrifGroup === "-",
            project: fieldData.hasOwnProperty("project") && fieldData.project === "-",
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
                case "firstName":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 50 characters)";
                break;
                case "lastName":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 50 characters)";
                break;
                case "mobileNo":
                errorMessage = "10 Digits Required (0-9)";
                break;
                case "email":
                errorMessage = "Valid Email Required";
                break;

                case "address":
                errorMessage = "(MAX - 250 characters)";
                break;
                case "connectionNo":
                errorMessage = "Only AlphaNumerics Allowed (MAX - 50 characters)";
                break;
                case "panNo":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 10 characters)";
                break;
                case "gstNo":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 15 characters)";
                break;

                case "towerNo":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 15 characters)";
                break;
                case "flatNo":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 16 characters)";
                break;
                case "flatType":
                errorMessage = "Flat Type cannot be '-'";
                break;
                case "shopNo":
                errorMessage = "(MAX - 16 characters)";
                break;

                case "totalLoadGrid":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;
                case "totalLoadDG":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;
                case "gridLoadR":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;
                case "gridLoadY":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;

                case "gridLoadB":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;
                case "DGLoadR":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;
                case "DGLoadY":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;
                case "DGLoadB":
                errorMessage = "Max - 6 digits allowed upto Two Decimal value";
                break;

                case "installationDate":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 250 characters)";
                break;
                case "openingBalance":
                errorMessage = "Non negative value required (Max - 6 digits allowed upto Two Decimal value)";
                break;
                case "area":
                errorMessage = "Non negative value required (Max - 6 digits allowed upto Two Decimal value)";
                break;
                case "meterSerialNo":
                errorMessage = "MeterSerialNo cannot be '-'";
                break;
                case "tarrifGroup":
                errorMessage = "Project Code cannot be '-'";
                break;
                case "project":
                errorMessage = "Project Type cannot be '-'";
                break;
                default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
          return { isValid, errorMessage };
        // return validationMap?.[fieldId] ?? false
    }, [fieldData])

    const is6DigitDecimal = (value: any) => {
        const val = String(value)
        const reg = new RegExp('^[0-9.]+$')
        if (!reg.test(val)) {
            return false
        }
        const afterDecimal = val.split(".")?.[1] ?? ""
        const beforeDecimal = val.split(".")?.[0] ?? ""
        return (beforeDecimal.length <= 6 && afterDecimal.length <= 2) && !isNaN(parseFloat(val))
    }


    return (
        <Card>
            <div className="widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {!isLoading && data &&
                <ActionMenu actions={actions} label={"Consumer Actions"}/>}
            </div>
            {addConsumerAction &&
            <ActionModal
                key={addConsumerAction.id}
                label={addConsumerAction.label}
                onOk={handleSubmit}
                isOkDisabled={isInvalid()}
                actionModalId={addConsumerAction.id}>
                {<GuideMessage
                    messageType={guideMessage?.messageType}
                    guideMessage={guideMessage.guideMessage }
                    isLoading={guideMessage.isLoading}/>}
                <FieldList
                    validations={validations}
                    onChange={handleChange}
                    data={fieldData}
                    fields={convertObjectToList(addConsumerAction.fields)}/>
            </ActionModal>}
            {addTarrifGroupAction &&
            <AddTarrifGroupAction action={addTarrifGroupAction}/>}
            {createTarrifAction &&
            <CreateTarrifGroupAction action={createTarrifAction}/>}
            {bulkUploadConfig &&
            <CSVUpload
                uploadPath="/consumersCSVUpload"
                uploadCaller={uploadCaller}
                type="consumers"
                config={bulkUploadConfig}
                actionModalId={bulkUploadActionModalId}
            />}
        </Card>
    )
}

export default ConsumerActions;