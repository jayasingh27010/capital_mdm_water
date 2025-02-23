import { useCallback, useContext, useEffect, useState } from "react"
import { useApi } from "src/api"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import Card from "src/components/Card"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { convertObjectToList } from "src/utility"
import AddTarrifGroupAction from "src/actionComponents/AddTarrifGroupAction"
import { attachOrDetachTarrif, viewTarrifActions } from "src/api/Pages/Tarrifs"
import CreateTarrifAction from "src/actionComponents/CreateTarrifGroupAction"
import ChangeTariffAction from "src/actionComponents/ChangeTariffAction"
import { useToast } from "@chakra-ui/react"
import ActionModal from "src/components/ActionModal"
import FieldList from "src/components/FieldList"
import GuideMessage from "src/components/GuideMessage"
import { isActionModalOpen, useSelector } from "src/selectors"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import { AppContext } from "src/contexts"

type GuideMessage = {
    messageType: "info" | "loading" | "warning" | "success" | "error" | undefined,
    guideMessage?: string,
    isLoading: boolean
}


const TarrifActions: React.FC = () => {
    const toast = useToast()
    const { data, isLoading, refresh } = useApi(viewTarrifActions)
    const [actions, setActions] = useState<any[]>([])
    const [addTarrifGroupAction, setAddTarrifGroupAction] = useState<any>(undefined)
    const [createTarrifAction, setCreateTarrifAction] = useState<any>(undefined)
    const [changeTariff, setChangeTariff] = useState<any>(undefined)
    const [attachOrDetachTarrifAction, setAttachOrDetachTarrifAction] = useState<any>(undefined)
    const [fieldData, setFieldData] = useState<any>({})
    const [originalTarrifOptions, setOriginalTarrifOptions] = useState<any[]>([])
    const [originalTarrifGroupOptions, setOriginalTarrifGroupOptions] = useState<any[]>([])
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen("attachOrDetachTarrif"))
    const [guideMessage, setGuideMessage] = useState<any>({
        messageType: "info",
        guideMessage: "",
        isLoading: false
    })

    useEffect(() => {
        if (!isLoading && data) {
            const actions = convertObjectToList(data?.config?.actions)
            setActions(actions)
            setAddTarrifGroupAction(actions.find(action => action.id === "addTarrifGroup"))
            setCreateTarrifAction(actions.find(action => action.id === "createTarrif"))
            setChangeTariff(actions.find(action => action.id === "changeTariff"))
            const action = actions.find(action => action.id === "attachOrDetachTarrif")
            setOriginalTarrifGroupOptions(action.fields.tarrifGroup.selectOptions)
            setOriginalTarrifOptions(action.fields.tarrif.selectOptions)
            setAttachOrDetachTarrifAction(action)
        }
    }, [data, isLoading])

    useEffect(() => {
        setFieldData({})
    }, [isOpen])


    const handleChange = useCallback((fieldId: string, value: any) => {
        if (fieldId === "project") {
            const hide = !value || value === "-"
            setAttachOrDetachTarrifAction((action: any) => {
                action.fields.tarrif.hide = hide
                action.fields.tarrifGroup.hide = hide
                action.fields.tarrif.selectOptions = originalTarrifOptions.filter(opt => opt.value === '-' || opt.forProject === value)
                action.fields.tarrifGroup.selectOptions = originalTarrifGroupOptions.filter(opt => opt.value === '-' || opt.forProject === value)
                return action
            })
        }
        setFieldData((fieldData: any) => {
            if (fieldId === "tarrifGroup" && fieldData?.tarrif) {
                delete fieldData.tarrif
            }
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }, [attachOrDetachTarrifAction, originalTarrifGroupOptions, originalTarrifOptions])

    const attachOrDetachTarrifPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            attachOrDetachTarrif(fieldData)
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: attachOrDetachTarrifAction?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: 'allTarrifsTable'
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: 'allTarrifGroupsTable'
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: "allAttachTable",
                    })
                    refresh()
                    setFieldData({})
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [refresh, fieldData])

    const handleSubmit = useCallback(() => {
        toast.promise(
            attachOrDetachTarrifPromise(),
            {
                success: { title: 'Success', description: 'Tarrif Attach/Detach Successful', duration: 3000 },
                loading: { title: 'Tarrif Attaching/Detaching...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }, [attachOrDetachTarrifPromise])

    const handleGuides = useCallback(() => {
        let guideMessage = "Select Tarrif Group"
        let hide = true
        if (fieldData?.tarrifGroup && fieldData?.tarrifGroup !== '-') {
            const selectedTarrifGroup = originalTarrifGroupOptions?.find(tG => tG.value === fieldData?.tarrifGroup)
            if (!selectedTarrifGroup?.tarrifName) {
                guideMessage = "No Tarrif Selected for this Tarrif Group, Select a Tarrif To Proceed!"
            } else {
                if (!fieldData.hasOwnProperty("tarrif")) {
                    setFieldData((fieldData: any) => {
                        return  {
                            ...fieldData,
                            tarrif: selectedTarrifGroup?.tarrifId
                        }
                    })
                }
                // guideMessage = "This Tarrif Group Already has a Tarrif. Select any other Tariff to assign a different value"
                guideMessage = ""
            }
            hide = false
        } else {
            hide = true
        }
        setAttachOrDetachTarrifAction(((action: any) => {
            if (action) {
                action.fields.tarrif.hide = hide
            }
            return action
        }))
        setGuideMessage({
            messageType: "info",
            guideMessage,
            isLoading: false
        })
    }, [originalTarrifGroupOptions, originalTarrifOptions, fieldData])

    useEffect(() => {
        if (attachOrDetachTarrifAction?.fields?.order?.includes("project")) {
            if (!fieldData?.project || fieldData?.project === "-") {
                setGuideMessage({
                    messageType: "info",
                    guideMessage: "Select Project To Proceed",
                    isLoading: false
                })
            } else {
                handleGuides()
            }
        } else {
           handleGuides()
        }
    }, [attachOrDetachTarrifAction, fieldData, handleGuides])

    const isInvalid = useCallback(() => {
        if (!fieldData?.tarrifGroup || fieldData?.tarrifGroup === '-') {
            return true
        }
        const selectedTarrifGroup = originalTarrifGroupOptions?.find(tG => tG.value === fieldData?.tarrifGroup)
        if (!fieldData?.tarrif || fieldData?.tarrif === '-') {
            return true
        }
        if (selectedTarrifGroup?.tarrifId === fieldData.tarrif) {
            return true
        }

        return false
    }, [originalTarrifGroupOptions, fieldData])

    return (
        <Card>
            <div className="widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {!isLoading && data &&
                <ActionMenu actions={actions} label={"Tarrif Actions"}/>}
            </div>
            {addTarrifGroupAction &&
            <AddTarrifGroupAction
                refresh={refresh}
                action={addTarrifGroupAction}/>}
            {createTarrifAction &&
            <CreateTarrifAction
                refresh={refresh}
                action={createTarrifAction}/>}
            {changeTariff &&
            <ChangeTariffAction
                refresh={refresh}
                action={changeTariff}/>}
            {attachOrDetachTarrifAction &&
            <ActionModal
                key={attachOrDetachTarrifAction.id}
                label={attachOrDetachTarrifAction.label}
                onOk={handleSubmit}
                isOkDisabled={isInvalid()}
                actionModalId={attachOrDetachTarrifAction.id}>
                <GuideMessage
                    messageType={guideMessage?.messageType}
                    guideMessage={guideMessage.guideMessage }
                    isLoading={guideMessage.isLoading}/>
                <FieldList
                    onChange={handleChange}
                    data={fieldData}
                    fields={convertObjectToList(attachOrDetachTarrifAction.fields)}/>
            </ActionModal>}
        </Card>
    )
}

export default TarrifActions;