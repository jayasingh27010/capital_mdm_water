import { useCallback, useContext, useEffect, useState } from "react"
import { useApi } from "src/api"
import { setMeterActions } from "src/api/Pages/DevConfig"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Textarea,
    Text,
} from '@chakra-ui/react'
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
import { useToast } from "@chakra-ui/react"
import { viewCommunicationActions, viewSendSms } from "src/api/Pages/Communication"
import UserSelection from "../UserSelection"
import Recipient from "src/components/Recipient"
import FieldList from "src/components/FieldList"


const metersSelectionTableId = "usersSelectionTable"
const actionsSelectionTableId = "actionsSelectionTable"
const setMetersLoadingToast = "setMetersLoadingToast"
const SendSms: React.FC = () => {
    const { data, isLoading } = useApi(viewSendSms)
    const [actions, setActions] = useState<any[]>([])
    const [action, setAction] = useState<any>(undefined)
    const [cActions, setCActions] = useState<any[]>([])
    const [originalActions, setOriginalActions] = useState<any[]>([])
    const { dispatch } = useContext<any>(AppContext)
    const [meters, setMeters] = useState<any[]>([])
    const [fieldData, setFieldData] = useState<any>({})
    const [isActionSelectionValid, setIsActionSelectionValid] = useState<boolean>(true)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen("sendSms"))
    const maxLength = 100;
    const [text, setText] = useState("");
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
    
    

    const textHandleChange = (event:any) => {
        if (event.target.value.length <= maxLength) {
           setText(event.target.value);
        }
    };
    const toast = useToast()
    useEffect(() => {
        console.log("Actions", actions)
    }, [actions])
    useEffect(() => {
        if (!isLoading && data) {
            const actions = convertObjectToList(data?.config?.actions)
            setActions(actions)
            if (actions.length > 0) {
                setAction(actions[1])
            }
            setOriginalActions(actions[1].actions)
            setCActions(actions[1].actions)
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
        return { actions: requestRows }
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

        <div className="widget widget-user-actions">
            {action &&
                <ActionModal
                    size="xl"
                    key={action.id}
                    label={action.label}
                    onOk={handleSubmit}
                    okBtnText="Send Sms"
                    isOkDisabled={false}
                    actionModalId={action.id}>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Recipient Section
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <FieldList
                                    onChange={handleChange}
                                    data={fieldData}
                                    fields={convertObjectToList(action.fields).filter(field => field.id == "selectionType")} />

                                {fieldData.selectionType === "selectUsers" && <UserSelection users={meters} setUsers={setMeters} />}
                                {fieldData.selectionType === "allUsers" && <FieldList
                                    onChange={handleChange}
                                    data={fieldData}
                                    fields={convertObjectToList(action.fields)?.filter(field => ["userType", "project"].includes(field.id))} />}
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Template Section
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <FieldList
                                    onChange={handleChange}
                                    data={fieldData}
                                    fields={convertObjectToList(action.fields).filter(field => field.id == "templateType")} />
                                {fieldData.templateType === "custom" &&
                                    // <Textarea mt={5} placeholder='Type here...' />
                                    <Box mt={6}>
                                    <Textarea
                                      value={text}
                                      onChange={textHandleChange}
                                      placeholder="Enter text..."
                                      size="md"
                                      resize="vertical"
                                    />
                                    <Text fontSize="sm" m={2} color="gray.500">
                                      Maximum {maxLength} characters ({maxLength - text.length} remaining)
                                    </Text>
                                  </Box>
                                }
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                </ActionModal>}
        </div>

    )
}

export default SendSms