import { useCallback, useContext, useEffect, useState } from "react"
import { useApi } from "src/api"
import { setMeterActions } from "src/api/Pages/DevConfig"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import Card from "src/components/Card"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { isActionModalOpen, useSelector } from "src/selectors"
import { convertObjectToList } from "src/utility"
//import MeterSelection from "../MeterSelection"
import { ADD_ADDITIONAL_FILTER, CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
//import ActionSelection from "../ActionSelection"
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react"
import { viewCommunicationActions } from "src/api/Pages/Communication"
import UserSelection from "../UserSelection"
import SendSms from "../SendSms"
import EmailEditor from "src/components/EmailEditor"
import FieldList from "src/components/FieldList"
const metersSelectionTableId = "usersSelectionTable"
const actionsSelectionTableId = "actionsSelectionTable"
const setMetersLoadingToast = "setMetersLoadingToast"
const CommunicationActions: React.FC = () => {
    const { data, isLoading } = useApi(viewCommunicationActions)
    const [actions, setActions] = useState<any[]>([])
    const [action, setAction] = useState<any>(undefined)
    const [cActions, setCActions] = useState<any[]>([])
    const [fieldData, setFieldData] = useState<any>({})
    const [originalActions, setOriginalActions] = useState<any[]>([])
    const { dispatch } = useContext<any>(AppContext)
    const [users, setUsers] = useState<any[]>([])
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isActionSelectionValid, setIsActionSelectionValid] = useState<boolean>(true)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen("setCommunication"))
    const handleChange = (fieldId: string, value: any) => {
        setFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }
    useEffect(() => {
        setFieldData({})
    }, [isOpen])
    useEffect(() => {
        console.log("my data", data)
    }, [data])
    useEffect(() => {
        console.log("metersSel", users)
    }, [users])

    const toast = useToast()
    useEffect(() => {
        console.log("comm Action", actions)
    }, [actions])
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
            payload: "allUsersTable2"
        })
        dispatch({
            type: INIT_TABLE,
            payload: metersSelectionTableId
        })
        dispatch({
            type: INIT_TABLE,
            payload: actionsSelectionTableId
        })
        dispatch({
            type: ADD_ADDITIONAL_FILTER,
            payload: {
                tableId: "allUsersTable2",
                filterType: "userType",
                filterValue: "consumers"
            }
        })
        setUsers([])
    }, [isOpen])

    const prepareRequest = (users: any[], actions: any[]) => {
        let requestRows = []
        for (const user of users) {
            for (const action of actions
                .filter(action => action.checked)
                .filter(action => !Boolean(action?.hasParent))
            ) {
                const finalRow = {
                    ...user,
                    ...action
                }
                requestRows.push(finalRow)
            }
        }
        return { actions: requestRows }
    }

    const handleSubmit = useCallback(() => {
        const req = prepareRequest(users, cActions)
        createSetRequestPromise(req)
    }, [users, cActions])

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
                    <ActionMenu actions={actions} label={"Communication Actions"} />}
                {action &&
                    <ActionModal
                        minHeight="600px"
                        size="xl"
                        key={action.id}
                        label={action.label}
                        onOk={handleSubmit}
                        okBtnText="Send Email"
                        isOkDisabled={false}
                        actionModalId={action.id}>
                        <Tabs key={action?.id}>
                            <TabList>
                                <Tab>Recepients</Tab>
                                <Tab>Email</Tab>
                                <Tab>Variables</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <FieldList
                                        onChange={handleChange}
                                        data={fieldData}
                                        fields={convertObjectToList(action?.fields).filter(field => field.id == "selectionType")} />

                                    {fieldData.selectionType === "selectUsers" && <UserSelection users={users} setUsers={setUsers} />}
                                    {fieldData.selectionType === "allUsers" && <FieldList
                                        onChange={handleChange}
                                        data={fieldData}
                                        fields={convertObjectToList(action.fields)?.filter(field => ["userType", "project"].includes(field.id))} />}
                                </TabPanel>
                                <TabPanel>
                                    <EmailEditor />
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                        {/* <div style={{ display: "flex", flexDirection: "row", gap: "8px", padding: "8px" }}>
                            <div style={{ padding: "8px"}}>
                                Recipient Section
                            </div>
                            <div style={{ padding: "8px", width: "500px", height: "1000px", border: "1px solid #c2c2c2"}}>
                                <EmailEditor/>
                            </div>
                            <div style={{ padding: "8px"}}>hello3</div>
                        </div> */}

                        {/* <UserSelection
                    users={users}
                    setUsers={setUsers}/>  */}


                        {/* <ActionSelection
                    setActionSelectionStatus={setIsActionSelectionValid}
                    actions={cActions}
                    setActions={setCActions}
                    originalActions={originalActions}
                    /> */}
                    </ActionModal>}
                <SendSms />

            </div>
        </Card>
    )
}

export default CommunicationActions