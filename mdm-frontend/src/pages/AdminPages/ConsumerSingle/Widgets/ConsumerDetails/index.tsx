import { Divider, useToast } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import Card from "src/components/Card"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { Field } from "src/types"
import { convertObjectToList } from "src/utility"
import { SVGIcon } from "src/assets/SvgIcons/IconMap"
import { disableConsumer, enableConsumer, viewConsumerDetails, resetPasswordConsumer } from "src/api/Pages/Consumers"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import { editConsumer } from "src/api/Consumer"
import { AppContext } from "src/contexts"
import { CLOSE_ACTION_MODAL } from "src/actions/AppContextActions"
import GuideMessage from "src/components/GuideMessage"

const ConsumerDetails: React.FC = () => {
    const { dispatch } = useContext<any>(AppContext)
    const [id, setId] = useState<any>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiData, setApiData] = useState<any>({})
    const [config, setConfig] = useState<any>({})
    const [fields, setFields] = useState<Field[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [actions, setActions] = useState<any[]>([])
    const [editConsumerAction, setEditConsumerAction] = useState<any>(undefined)
    const [editConsumerFieldData, setEditConsumerFieldData] = useState<any>({})
    const [enableConsumerAction, setEnableConsumerAction] = useState<any>(undefined)
    const [disableConsumerAction, setDisableConsumerAction] = useState<any>(undefined)
    const [resetPasswordAction, setResetPasswordAction] = useState<any>(undefined)
    const [originalOptions, setOriginalOptions] = useState<any[]>([])
    const [originalMeterSerialOptions, setOriginalMeterSerialOptions] = useState<any[]>([])
    const toast = useToast()

    const data: any = useLoaderData()

    useEffect(() => {
        if (data?.config?.id) {
            setId(data?.config?.id)
        }
    }, [data])

    const loadAll = () => {
        setIsLoading(true)
            viewConsumerDetails(id)
                .then(({ data }: any) => {
                    setIsLoading(false)
                    setApiData(data?.data)
                    setFields(convertObjectToList(data.config.fields))
                    setConfig(data?.config)
                    setIsSuccess(true)
                    const actions = convertObjectToList(data.config.actions)
                    setActions(actions)
                    const editConsumerAction = actions.find((action: any) => action.id === 'editConsumer')
                    setOriginalOptions(editConsumerAction.fields.tarrifGroup.selectOptions)
                    setOriginalMeterSerialOptions(editConsumerAction.fields.tarrifGroup.selectOptions)
                    setEditConsumerAction(editConsumerAction)
                    setEnableConsumerAction(actions.find((action: any) => action.id === 'enable'))
                    setDisableConsumerAction(actions.find((action: any) => action.id === 'disable'))
                    setResetPasswordAction(actions.find(action => action.id === 'resetPassword'));
                    setEditConsumerFieldData(editConsumerAction.data ?? {})
                })
    }

    useEffect(() => {
        if (id) {
            loadAll()
        }
    }, [id])

    const handleChange = useCallback((fieldId: string, value: any) => {
        if (fieldId === 'project') {
            setEditConsumerAction((action: any) => {
                if (action?.fields?.tarrifGroup) {
                    action.fields.tarrifGroup.hide = !value || value === '-'
                    if (editConsumerAction?.fields?.order?.includes("project")) {
                        action.fields.tarrifGroup.selectOptions = originalOptions.filter((option) => option.forProject === value)
                        action.fields.meterSerialNo.selectOptions = originalMeterSerialOptions.filter((option) => option.forProject === value)
                    }
                }
                return action
            })
        }
        setEditConsumerFieldData((fieldData: any) => {
            const finalObj = {
                ...fieldData,
                [fieldId]: value
            }
            if (fieldId === "project") {
                finalObj.meterSerialNo = ""
            }
            return JSON.parse(JSON.stringify(finalObj))
        })
    }, [originalOptions, originalMeterSerialOptions, editConsumerAction?.fields])

    const isInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!editConsumerFieldData.mobileNo || editConsumerFieldData.mobileNo.length !== 10 || isNaN(editConsumerFieldData.mobileNo)) {
            return true
        }
        const mailRe = /\S+@\S+\.\S+/;
        if (editConsumerFieldData.email && (editConsumerFieldData.email.length < 1 || !mailRe.test(editConsumerFieldData.email) || editConsumerFieldData.email.length > 50) ) {
            return true
        }
        if (!editConsumerFieldData.firstName || (editConsumerFieldData.firstName && editConsumerFieldData.firstName.length > 50)){
            return true
        }
        if (!editConsumerFieldData.lastName || (editConsumerFieldData.lastName && editConsumerFieldData.lastName.length > 50)){
            return true
        }

        if (editConsumerFieldData.connectionNo && re.test(editConsumerFieldData.connectionNo)) {
            return true
        }
        if ((editConsumerFieldData.panNo && (re.test(editConsumerFieldData.panNo)) || (editConsumerFieldData.panNo && editConsumerFieldData.panNo.length > 10))) {
            return true
        }
        if ((editConsumerFieldData.gstNo && (re.test(editConsumerFieldData.gstNo)) || (editConsumerFieldData.gstNo && editConsumerFieldData.gstNo.length > 15))) {
            return true
        }
        if ((editConsumerFieldData.towerNo && (re.test(editConsumerFieldData.towerNo)) || (editConsumerFieldData.towerNo && editConsumerFieldData.towerNo.length > 16))) {
            return true
        }


        if (!editConsumerFieldData.shopNo) {
            if (editConsumerFieldData.flatType === "-" || !editConsumerFieldData.flatType) {
                return true
            }
            if (!editConsumerFieldData.flatNo || re.test(editConsumerFieldData.flatNo) || (editConsumerFieldData.flatNo && editConsumerFieldData.flatNo.length > 16)) {
                return true
            }
        }
        if (!editConsumerFieldData.flatType || !editConsumerFieldData.flatNo) {
            if (!editConsumerFieldData.shopNo || (editConsumerFieldData.shopNo && editConsumerFieldData.shopNo.length > 16)) {
                return true
            }
        }


        if (editConsumerFieldData.totalLoadGrid && !is6DigitDecimal(editConsumerFieldData.totalLoadGrid)) {
            return true
        }

        if (editConsumerFieldData.totalLoadGrid && !is6DigitDecimal(editConsumerFieldData.totalLoadGrid)) {
            return true
        }
        if (editConsumerFieldData.totalLoadDG && !is6DigitDecimal(editConsumerFieldData.totalLoadDG)) {
            return true
        }

        if (editConsumerFieldData.gridLoadR && !is6DigitDecimal(editConsumerFieldData.gridLoadR)) {
            return true
        }
        if (editConsumerFieldData.gridLoadY && !is6DigitDecimal(editConsumerFieldData.gridLoadY)) {
            return true
        }
        if (editConsumerFieldData.gridLoadB && !is6DigitDecimal(editConsumerFieldData.gridLoadB)) {
            return true
        }

        if (editConsumerFieldData.DGLoadR && !is6DigitDecimal(editConsumerFieldData.DGLoadR)) {
            return true
        }
        if (editConsumerFieldData.DGLoadY && !is6DigitDecimal(editConsumerFieldData.DGLoadY)) {
            return true
        }
        if (editConsumerFieldData.DGLoadB && !is6DigitDecimal(editConsumerFieldData.DGLoadB)) {
            return true
        }


        if (editConsumerFieldData.openingBalance && !is6DigitDecimal(editConsumerFieldData.openingBalance)) {
            return true
        }
        if (editConsumerFieldData.area && !is6DigitDecimal(editConsumerFieldData.area)) {
            return true
        }

        if (!editConsumerFieldData.meterSerialNo || re.test(editConsumerFieldData.meterSerialNo)) {
            return true
        }

        if (editConsumerAction?.fields?.order?.includes("project")) {
            if(!editConsumerFieldData.project)  {
                return true
            }
        }
        // if(!fieldData.tarrifGroup || fieldData.tarrifGroup === '-' || fieldData.tarrifGroup.length === 0) {
        //     return true
        // }
        return false
        
    }, [editConsumerFieldData, editConsumerAction?.fields])

    const is6DigitDecimal = (value: any) => {
        const val = String(value)
        const afterDecimal = val.split(".")?.[1] ?? ""
        const beforeDecimal = val.split(".")?.[0] ?? ""
        return (beforeDecimal.length <= 6 && afterDecimal.length <= 2) && !isNaN(parseFloat(val))
    }

    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const mailRe = /\S+@\S+\.\S+/;
        const re = /[^a-zA-Z0-9-_ ]/g
        const validationMap: Record<string, boolean> = {
            firstName: editConsumerFieldData.hasOwnProperty("firstName") && (!editConsumerFieldData.firstName || re.test(editConsumerFieldData.firstName) || editConsumerFieldData.firstName.length > 50),
            lastName: editConsumerFieldData.hasOwnProperty("lastName") && (!editConsumerFieldData.lastName || re.test(editConsumerFieldData.lastName) || editConsumerFieldData.lastName.length > 50),
            mobileNo: editConsumerFieldData.hasOwnProperty("mobileNo") && (!editConsumerFieldData.mobileNo || isNaN(editConsumerFieldData.mobileNo) || editConsumerFieldData.mobileNo.length !== 10),
            email: editConsumerFieldData.email && !mailRe.test(editConsumerFieldData.email),

            connectionNo: editConsumerFieldData.hasOwnProperty("connectionNo") && re.test(editConsumerFieldData.connectionNo),
            panNo: editConsumerFieldData.hasOwnProperty("panNo") && (re.test(editConsumerFieldData.panNo) || (editConsumerFieldData.panNo && editConsumerFieldData.panNo.length > 10)),
            gstNo: editConsumerFieldData.hasOwnProperty("gstNo") && (re.test(editConsumerFieldData.gstNo) || (editConsumerFieldData.gstNo && editConsumerFieldData.gstNo.length > 15)),
            towerNo: editConsumerFieldData.hasOwnProperty("towerNo") && (re.test(editConsumerFieldData.towerNo) || (editConsumerFieldData.towerNo && editConsumerFieldData.towerNo.length > 16)),
            flatNo: editConsumerFieldData.hasOwnProperty("flatNo") && (re.test(editConsumerFieldData.flatNo) || (editConsumerFieldData.flatNo && editConsumerFieldData.flatNo.length > 16)),

            totalLoadGrid: editConsumerFieldData.totalLoadGrid && !is6DigitDecimal(editConsumerFieldData.totalLoadGrid),
            totalLoadDG: editConsumerFieldData.totalLoadDG && !is6DigitDecimal(editConsumerFieldData.totalLoadDG),
            
            gridLoadR: editConsumerFieldData.gridLoadR && !is6DigitDecimal(editConsumerFieldData.gridLoadR),
            gridLoadY: editConsumerFieldData.gridLoadY && !is6DigitDecimal(editConsumerFieldData.gridLoadY),
            gridLoadB: editConsumerFieldData.gridLoadB && !is6DigitDecimal(editConsumerFieldData.gridLoadB),

            DGLoadR: editConsumerFieldData.DGLoadR && !is6DigitDecimal(editConsumerFieldData.DGLoadR),
            DGLoadY: editConsumerFieldData.DGLoadY && !is6DigitDecimal(editConsumerFieldData.DGLoadY),
            DGLoadB: editConsumerFieldData.DGLoadB && !is6DigitDecimal(editConsumerFieldData.DGLoadB),

            openingBalance: editConsumerFieldData.openingBalance && !is6DigitDecimal(editConsumerFieldData.openingBalance),
            area: editConsumerFieldData.area && !is6DigitDecimal(editConsumerFieldData.area),
            meterSerialNo: false,
            tarrifGroup: editConsumerFieldData.hasOwnProperty("tarrifGroup") && editConsumerFieldData.tarrifGroup === '-',

            project: editConsumerFieldData?.fields?.order?.includes("project") && !editConsumerFieldData.project
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
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [editConsumerFieldData])

    const createConsumerPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            editConsumer({
                ...editConsumerFieldData,
                id
            })
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'Consumer Edited Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: editConsumerAction?.id
                    })
                    setEditConsumerFieldData(editConsumerAction.data)
                    loadAll()
                    resolve({})
                })
                .catch((e) => {
                    toast({
                        title: 'Error',
                        description: e.response.data.message,
                        status: 'error'
                    })
                    reject({})
                })
        })
    }, [editConsumerFieldData])

    const enableConsumerPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            enableConsumer(id)
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: enableConsumerAction?.id
                    })
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, enableConsumerAction])

    const disableConsumerPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            disableConsumer(id)
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: disableConsumerAction?.id
                    })
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, disableConsumerAction])


     const resetPasswordPromise = useCallback(() => {
            dispatch({
                type: CLOSE_ACTION_MODAL,
                payload: resetPasswordAction?.id
            })
            return new Promise((resolve, reject) => {
                resetPasswordConsumer({consumerId: id})
                    .then(() => {
                       
                        setIsLoading(true)
                        loadAll()
                        resolve({})
                    })
                    .catch(() => {
                        reject({})
                    })
            })
        }, [id,resetPasswordAction])

    const handleSubmit = () => {
        
            createConsumerPromise()
        

    }

    useEffect(() => {
        const value = editConsumerFieldData?.project
        setEditConsumerAction((action: any) => {
            if (action?.fields?.tarrifGroup) {
                action.fields.tarrifGroup.hide = !value || value === '-'
                if (editConsumerAction?.fields?.order?.includes("project")) {
                    action.fields.tarrifGroup.selectOptions = originalOptions.filter((option) => option.forProject === value)
                }
            }
            return action
        })
    }, [editConsumerFieldData])

    const handleConsumerEnableSubmit = useCallback(() => {
        toast.promise(
            enableConsumerPromise(),
            {
                success: { title: 'Consumer Enable', description: 'Consumer Enabled Successfully', duration: 3000 },
                loading: { title: 'Enabling Consumer...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }, [enableConsumerAction])

    const handleConsumerDisableSubmit = useCallback(() => {
        toast.promise(
            disableConsumerPromise(),
            {
                success: { title: 'Consumer disable', description: 'Consumer disabled Successfully', duration: 3000 },
                loading: { title: 'Disabling Consumer...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }, [disableConsumerPromise])

    const handleResetPassword = useCallback(() => {
        toast.promise(
            resetPasswordPromise(),
            {
                success: { title: 'Password Reset', description: 'Password Reset Successfully', duration: 3000 },
                loading: { title: 'Resetting Password...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }, [resetPasswordPromise])

    return (
        <Card>
            <div className="widget details-widget widget-consumer-single">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {!isLoading && isSuccess &&
                <>
                <div className="d-flex flex-row justify-content-center">
                    <span className="p-1 pe-2">
                        <SVGIcon iconName="Info"/>
                    </span>
                    <p className="flex-grow-1 mb-0" style={{fontWeight: "700", fontSize: "20px"}}>
                        {config.label}
                    </p>
                    {!config?.actions?.hide  && <ActionMenu actions={actions} label={"Consumer Actions"}/>}
                </div>
                <Divider/>
                <FieldList data={apiData} fields={fields}/>
                </>}
                {editConsumerAction &&
                <ActionModal
                    key={editConsumerAction.id}
                    label={editConsumerAction.label}
                    onOk={handleSubmit}
                    isOkDisabled={isInvalid()}
                    actionModalId={editConsumerAction.id}>
                    <FieldList
                        validations={validations}
                        onChange={handleChange}
                        data={editConsumerFieldData}
                        fields={convertObjectToList(editConsumerAction.fields)}/>
                </ActionModal>}
                {enableConsumerAction &&
                    <ActionModal
                        label={enableConsumerAction.label}
                        onOk={handleConsumerEnableSubmit}
                        isOkDisabled={false}
                        actionModalId={enableConsumerAction.id}
                    >
                        <GuideMessage
                            messageType="warning"
                            guideMessage={`Are you sure you want to enable consumer, '${apiData?.consumerName}'?`}
                        />
                    </ActionModal>
                }
                {disableConsumerAction &&
                    <ActionModal
                        label={disableConsumerAction.label}
                        onOk={handleConsumerDisableSubmit}
                        isOkDisabled={false}
                        actionModalId={disableConsumerAction.id}
                    >
                        <GuideMessage
                            messageType="warning"
                            guideMessage={`Are you sure you want to disable consumer, '${apiData?.consumerName}'?`}
                        />
                    </ActionModal>
                }
                 {resetPasswordAction &&
                <ActionModal
                    label={resetPasswordAction.label}
                    onOk={handleResetPassword}
                    isOkDisabled={false}
                    actionModalId={resetPasswordAction.id}
                >
                    <GuideMessage
                    messageType="warning"
                    guideMessage={`Are you sure you want to reset password for '${apiData?.consumerName}'?`}
                    />
                </ActionModal>
                }
            </div>
        </Card>
    )
}

export default ConsumerDetails