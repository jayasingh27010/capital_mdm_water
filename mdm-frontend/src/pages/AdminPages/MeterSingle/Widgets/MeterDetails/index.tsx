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
import { viewMeterDetails } from "src/api/Pages/Meters"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import { editMeter } from "src/api/Meter"
import { CLOSE_ACTION_MODAL } from "src/actions/AppContextActions"
import { AppContext } from "src/contexts"
import { isActionModalOpen, useSelector } from "src/selectors"


const MeterDetails: React.FC = () => {
    const [id, setId] = useState<any>(undefined)
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiData, setApiData] = useState<any>({})
    const [config, setConfig] = useState<any>({})
    const [fields, setFields] = useState<Field[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [actions, setActions] = useState<any>(undefined)
    const [editMeterAction, setEditMeterAction] = useState<any>(undefined)
    const [editMeterFieldData, setEditMeterFieldData] = useState<any>({})
    const toast = useToast()
    const data: any = useLoaderData()
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const isOpenEditMeter = selector(isActionModalOpen("editMeter"))

    useEffect(() => {
        if (data?.config?.id) {
            setId(data?.config?.id)
        }
    }, [data])

    const loadAll = useCallback(() => {
        // setIsLoading(true)
        viewMeterDetails(id)
            .then(({ data }: any) => {
                // setIsLoading(false)
                setApiData(data?.data)
                setIsSuccess(true)
                const actions = convertObjectToList(data.config.actions)
                setActions(actions)
                const editMeterAction = actions.find((action: any) => action.id === 'editMeter')
                setEditMeterAction(editMeterAction)
                setEditMeterFieldData(editMeterAction.data)
                setFields(convertObjectToList(data.config.fields))
                setConfig(data?.config)
            })
    }, [id])

    useEffect(() => {
        if (id) {
            loadAll()
        }
    }, [id])

    useEffect(() => {
        if (editMeterAction?.data) {
            setEditMeterFieldData(editMeterAction.data)
        }
    }, [isOpenEditMeter])

    useEffect(() => {
       editMeterAction && console.log(editMeterAction)
    }, [editMeterAction])

    const editMeterPromise = () => {
        return new Promise((resolve, reject) => {
            if (editMeterFieldData.firmwareVersion.trim() !== '') {
                editMeterFieldData.firmwareVersion = editMeterFieldData.firmwareVersion;
              } else {
                delete editMeterFieldData.firmwareVersion;
              }
            editMeter({
                id,
                meterId: id,
                ...editMeterFieldData
            })
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: editMeterAction?.id
                    })
                    resolve({})
                    loadAll()
                })
                .catch(() => {
                    reject({})
                })
        })
    }

    const handleEditMeter = () => {
        toast.promise(
            editMeterPromise(),
            {
                success: { title: 'Meter Edited', description: 'Meter Edited Successfully', duration: 3000 },
                loading: { title: 'Editing Meter...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }

    const handleChange = (fieldId: string, value: any) => {
        setEditMeterFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

    const isInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!editMeterFieldData.hasOwnProperty("meterSerialNo") || (!editMeterFieldData.meterSerialNo || re.test(editMeterFieldData.meterSerialNo))) {
            return true
        }
        // if (!editMeterFieldData.hasOwnProperty("moduleNo") || (!editMeterFieldData.moduleNo || re.test(editMeterFieldData.moduleNo))) {
        //     return true
        // }
        if (editMeterFieldData.firmwareVersion && re.test(editMeterFieldData.firmwareVersion)) {
            return true
        }
        // if (!editMeterFieldData.hasOwnProperty("phaseType") || editMeterFieldData.phaseType === '-') {
        //     return true
        // }
        // if (!editMeterFieldData.hasOwnProperty("sourceType") || editMeterFieldData.sourceType === '-') {
        //     return true
        // }
        if (!editMeterFieldData.hasOwnProperty("consumptionType") || editMeterFieldData.consumptionType === '-') {
            return true
        }
        if (editMeterAction?.fields && editMeterAction.fields.order.includes("project")) {
            if (!editMeterFieldData.hasOwnProperty("project") || !editMeterFieldData.project) {
                return true
            }
        }
        return false
    }, [editMeterFieldData, editMeterAction])

    const validations = useCallback((fieldId: string) => {
        const re = /[^a-zA-Z0-9-_ ]/g
        const validationMap: Record<string, boolean> = {
            meterSerialNo: editMeterFieldData.hasOwnProperty("meterSerialNo") && (!editMeterFieldData.meterSerialNo || re.test(editMeterFieldData.meterSerialNo) || editMeterFieldData.meterSerialNo.length > 16),
            // moduleNo: editMeterFieldData.hasOwnProperty("moduleNo")  && (!editMeterFieldData.moduleNo || re.test(editMeterFieldData.moduleNo)),
            // phaseType: editMeterFieldData.hasOwnProperty("phaseType")  && editMeterFieldData.phaseType === '-',
            // sourceType: editMeterFieldData.hasOwnProperty("sourceType") && editMeterFieldData.sourceType === '-',
            consumptionType: editMeterFieldData.hasOwnProperty("consumptionType") && editMeterFieldData.consumptionType === '',
            firmwareVersion: editMeterFieldData.hasOwnProperty("firmwareVersion") && re.test(editMeterFieldData.firmwareVersion),
            project: editMeterFieldData.hasOwnProperty("project") && editMeterFieldData.project === '-',
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
                case "meterSerialNo":
                    errorMessage = "Only AlphaNumerics Allowed (MAX - 16 characters)";
                    break;
                case "moduleNo":
                    errorMessage = "Only AlphaNumerics Allowed (MAX - 16 characters)";
                    break;
                case "firmwareVersion":
                    errorMessage = "Only AlphaNumerics Allowed";
                    break;
                case "project":
                    errorMessage = "Invalid Project Name";
                    break;
                case "phaseType":
                    errorMessage = "Phase Type cannot be '-'";
                    break;
                case "sourceType":
                    errorMessage = "Source Type cannot be '-'";
                    break;

                default:
                    errorMessage = `Invalid input for ${fieldId}`;
                    break;
            }
        }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [editMeterFieldData])

    return (
        <Card>
            <div className="widget details-widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {isSuccess &&
                <>
                <div className="d-flex flex-row justify-content-center">
                    <span className="p-1 pe-2">
                        <SVGIcon iconName="Info"/>
                    </span>
                    <p className="flex-grow-1 mb-0" style={{fontWeight: "700", fontSize: "20px"}}>
                        {config.label}
                    </p>
                    <ActionMenu actions={actions} label={"Meter Actions"}/>
                </div>
                <Divider/>
                <FieldList data={apiData} fields={fields}/>
                </>}

                {editMeterAction &&
                <ActionModal
                    key={editMeterAction.id}
                    label={editMeterAction.label}
                    onOk={handleEditMeter}
                    isOkDisabled={isInvalid()}
                    actionModalId={editMeterAction.id}>
                    <FieldList
                        validations={validations}
                        onChange={handleChange}
                        data={editMeterFieldData}
                        fields={convertObjectToList(editMeterAction.fields)}/>
                </ActionModal>}
            </div>
        </Card>
    )
}

export default MeterDetails