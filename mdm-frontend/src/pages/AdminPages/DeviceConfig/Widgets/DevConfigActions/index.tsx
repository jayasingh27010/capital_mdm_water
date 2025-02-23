import { useCallback, useContext, useEffect, useState } from "react"
import { useApi } from "src/api"
import { setMeterActions, viewDevConfigActions } from "src/api/Pages/DevConfig"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import Card from "src/components/Card"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { isActionModalOpen, useSelector } from "src/selectors"
import { convertObjectToList } from "src/utility"
import MeterSelection from "../MeterSelection"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import ActionSelection from "../ActionSelection"
import { useToast } from "@chakra-ui/react"

const metersSelectionTableId = "metersSelectionTable"
const actionsSelectionTableId = "actionsSelectionTable"
const setMetersLoadingToast = "setMetersLoadingToast"
const DevConfigActions: React.FC = () => {
    const { data, isLoading } = useApi(viewDevConfigActions)
    const [actions, setActions] = useState<any[]>([])
    const [action, setAction] = useState<any>(undefined)
    const [cActions, setCActions] = useState<any[]>([])
    const [originalActions, setOriginalActions] = useState<any[]>([])
    const { dispatch } = useContext<any>(AppContext)
    const [meters, setMeters] = useState<any[]>([])
    const [isActionSelectionValid, setIsActionSelectionValid] = useState<boolean>(true)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen("setMeters"))

    const toast = useToast()

    useEffect(() => {
        if (!isLoading && data) {
            const actions = convertObjectToList(data?.config?.actions)
            setActions(actions)
            if (actions.length > 0) {
                setAction(actions[0])
            }
            setOriginalActions(actions[0].actions)
            setCActions(actions[0].actions)
        }
    }, [data, isLoading])

    useEffect(() => {
        setCActions(originalActions)
    }, [isOpen, originalActions])

    useEffect(() => {
        dispatch({
            type: INIT_TABLE,
            payload: "allMetersTable"
        })
        dispatch({
            type: INIT_TABLE,
            payload: metersSelectionTableId
        })
        dispatch({
            type: INIT_TABLE,
            payload: actionsSelectionTableId
        })
        setMeters([])
    }, [isOpen])

    const prepareRequest = (meters: any[], actions: any[]) => {
        let requestRows = []
        for (const meter of meters) {
            for (const action of actions
                .filter(action => action.checked)
                .filter(action => !Boolean(action?.hasParent))
            ) {
                const finalRow = {
                    ...meter,
                    ...action
                }
                requestRows.push(finalRow)
            }
        }
        return {actions: requestRows}
    }

    const handleSubmit = useCallback(() => {
        const req = prepareRequest(meters, cActions)
        createSetRequestPromise(req)
    }, [meters, cActions])

    const createSetRequestPromise = (req: any) => {
        toast({
            id: setMetersLoadingToast,
            status: 'loading',
            title: 'Adding Set Requests...',
            duration: null
        })
        setMeterActions(req)
            .then(() => {
                dispatch({
                    type: CLOSE_ACTION_MODAL,
                    payload: action?.id
                })
                dispatch({
                    type: INIT_TABLE,
                    payload: 'allDeviceConfigRequestsTable'
                })
                toast({
                    title: 'Success',
                    description: 'Requests Added Successfully',
                    status: 'success'
                })
            })
            .catch((e) => {
                toast({
                    title: 'Error',
                    description: e.response.data.message,
                    status: 'error',
                })
            })
            .finally(() => {
                toast.close(setMetersLoadingToast)
            })
    }

    return (
        <Card>
            <div className="widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {!isLoading && data &&
                <ActionMenu actions={actions} label={"Dev Config Actions"}/>}
                {action && 
            <ActionModal
                size="xl"
                key={action.id}
                label={action.label}
                onOk={handleSubmit}
                okBtnText="Set Meters"
                isOkDisabled={meters.length === 0 ||
                    cActions.filter(r => r.checked).length === 0 ||
                    isActionSelectionValid}
                actionModalId={action.id}>
                <MeterSelection
                    meters={meters}
                    setMeters={setMeters}/>
                <ActionSelection
                    setActionSelectionStatus={setIsActionSelectionValid}
                    actions={cActions}
                    setActions={setCActions}
                    originalActions={originalActions}
                    />
            </ActionModal>}
            </div>
        </Card>
    )
}

export default DevConfigActions