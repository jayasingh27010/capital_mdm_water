import { useToast } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewUserActions } from "src/api/Pages/Users"
import { adminExists, createUser, usernameExists } from "src/api/User"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import Card from "src/components/Card"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide";
import GuideMessage from "src/components/GuideMessage"
import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { isActionModalOpen, useSelector } from "src/selectors"
import { convertObjectToList } from "src/utility"

type UsernameLoadingStat = {
    sentForUsername: string,
    loading: boolean
}

type GuideMessage = {
    messageType: "info" | "loading" | "warning" | "success" | "error" | undefined,
    guideMessage?: string,
    isLoading: boolean
}

const UsernameMINLength = 5
const UsernameAlreadyExists = (username: string) => `Sorry, '${username}' username already exists`
const addUserLoadingToast = "addUserLoadingToastId"

const UserActions: React.FC = () => {
    const { data, isLoading } = useApi(viewUserActions)
    const [actions, setActions] = useState<any[]>([])
    const [fieldData, setFieldData] = useState<any>({
        userType: 'OTHER'
    })
    const [action, setAction] = useState<any>(undefined)
    const [isOkDisabled, setIsOkDisabled] = useState<any>(true)
    const [guideMessage, setGuideMessage] = useState<GuideMessage>({ isLoading: false, messageType: 'info' })
    const { dispatch } = useContext<any>(AppContext)
    const [isUsernameExists, setIsUsernameExists] = useState<boolean>(false)
    const [showAdminExistsGuideMessage, setShowAdminExistsGuideMessage] = useState<boolean>(false)
    const [adminExistsIsLoading, setAdminExistsIsLoading] = useState<boolean>(false)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen("createUser"))
    const [projectNameDescriptionValue, setProjectNameDescriptionValue] = useState<string>("")

    const [unameStat, setUnameStat] = useState<UsernameLoadingStat>({
        sentForUsername: "",
        loading: false
    })
    const toast = useToast()

    useEffect(() => {
        if (!isLoading && data) {
            const actions = convertObjectToList(data?.config?.actions)
            setActions(actions)
            if (actions.length > 0) {
                setAction(actions[0])
            }
        }
    }, [data, isLoading])

    const handleChange = (fieldId: string, value: any) => {
        setFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
        if (fieldId === "username") {
            if (value.length < UsernameMINLength) {
                setGuideMessage({ 
                    isLoading: false,
                    messageType: 'warning',
                    guideMessage: `Username must be greater than ${UsernameMINLength - 1} characters`
                })
            }
        }
    }

    useEffect(() => {
        if (!unameStat.loading &&
            unameStat.sentForUsername !== fieldData.username &&
            fieldData?.username &&
            fieldData?.username?.length >= UsernameMINLength) {
            setIsUsernameExists(false)
            const sentForUsername = fieldData?.username
            setUnameStat({
                ...unameStat,
                sentForUsername,
                loading: true
            })
            setGuideMessage({
                isLoading: true,
                messageType: 'info',
                guideMessage: "Verifying.. if the username exists"
            })
            usernameExists({
                username: fieldData.username
            })
                .then(() => {
                    const isFinalResult = sentForUsername === fieldData?.username
                    setIsUsernameExists(false)
                    setGuideMessage({
                        isLoading: false,
                        messageType: 'success',
                        guideMessage: isFinalResult ?
                        `Congrats! You can use '${sentForUsername}' as username`:
                        undefined
                    })
                    setUnameStat({
                        ...unameStat,
                        sentForUsername,
                        loading: false
                    })
                })
                .catch(() => {
                    const isFinalResult = sentForUsername === fieldData?.username
                    if (isFinalResult)
                        setIsUsernameExists(true)
                    setGuideMessage({
                        isLoading: false,
                        messageType: 'warning',
                        guideMessage: isFinalResult ? UsernameAlreadyExists(sentForUsername) : undefined
                    })
                    setUnameStat({
                        ...unameStat,
                        sentForUsername,
                        loading: false
                    })
                })
        }
    }, [unameStat.loading, unameStat.sentForUsername, fieldData?.username])

    useEffect(() => {
        setShowAdminExistsGuideMessage(false)
        if (fieldData?.designation &&
            fieldData?.projectName &&
            fieldData.designation === 'admin' &&
            fieldData.projectName.length > 0 &&
            fieldData.projectName !== '-'
        ) {
            setAdminExistsIsLoading(true)
            setProjectNameDescriptionValue(
                action?.fields?.projectName?.selectOptions?.find((option: any) =>  option.value === fieldData.projectName)?.description
            )
            adminExists({
                projectName: fieldData.projectName
            })
                .then(({data}: any) => {
                    const isAdminExists = Boolean(data?.adminExists)
                    setShowAdminExistsGuideMessage(isAdminExists)
                })
                .finally(() => {
                    setAdminExistsIsLoading(false)
                })
        }
    }, [fieldData?.designation, fieldData?.projectName, action])

    const createUserPromise = () => {
        return new Promise((resolve, reject) => {
            toast({
                id: addUserLoadingToast,
                status: 'loading',
                title: 'Adding User ...',
                duration: null
            })
            const trimmedFieldData = {
                ...fieldData,
                name: fieldData?.name?.trim(),
                username: fieldData?.username?.trim(),
            };
            createUser(trimmedFieldData)
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'User Added Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: action?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: 'allUsersTable'
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
                .finally(() => toast.close(addUserLoadingToast))
        })
    }

    const handleSubmit = () => {
        createUserPromise()
    }

    useEffect(() => {
        setIsOkDisabled(unameStat.loading || isInvalid())
    }, [fieldData, isUsernameExists, unameStat.loading])

    const isInvalid = useCallback(() => {
        if (!fieldData.mobileNo || fieldData.mobileNo.length !== 10 || isNaN(fieldData.mobileNo)) {
            return true
        }
        if (!fieldData.designation || fieldData.designation === '-') {
            return true
        }
        const re = /\S+@\S+\.\S+/;
        const alphanumericRe = /^\w+$/;
        if (!fieldData.email || fieldData.email.length < 1 || !re.test(fieldData.email) || fieldData.email.length > 50) {
            return true
        }
        if (!fieldData.username || fieldData.username.length < 5 || !alphanumericRe.test(fieldData.username) || fieldData.username.length > 15) {
            return true
        }
        if (!fieldData.name || !alphanumericRe.test(fieldData.name.split(" ").join("")) || fieldData.name.length > 50) {
            return true
        }
        if ( action && action?.fields?.order?.includes("projectName")) {
            if (!fieldData.projectName) {
                return true
            }
        }
        // if (action && action.fields.order.includes("projectName")) {
        //     if (!fieldData.projectName || !fieldData.projectName) {
        //         return true
        //     }
        // }
        return isUsernameExists
    }, [fieldData, isUsernameExists, action])

    
    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const re = /\S+@\S+\.\S+/;
        const alphanumericRe = /^\w+$/;
        const mobileNoRe = /^\d{10}$/;
        const validationMap: Record<string, boolean> = {
            name: fieldData.hasOwnProperty("name") && (fieldData.name.length === 0 || fieldData.name.length > 50 || !alphanumericRe.test(fieldData.name.split(" ").join(""))),
            designation: fieldData.hasOwnProperty("designation") && fieldData.designation === '',
            projectName: fieldData.hasOwnProperty("projectName") && fieldData.projectName === '',
            mobileNo: fieldData.mobileNo && (fieldData.mobileNo.length !== 10 || isNaN(fieldData.mobileNo) || !mobileNoRe.test(fieldData.mobileNo.replace(/\s+/g, ""))),
            username: isUsernameExists || (fieldData.username && (fieldData.username.length < UsernameMINLength || !alphanumericRe.test(fieldData.username) || fieldData.username.length > 15)),
            email: fieldData.email && (!re.test(fieldData.email) || fieldData.email.length > 50)
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
              case "name":
                errorMessage = "special characters not allowed";
                break;
              case "mobileNo":
                errorMessage = "10 digits required (0 - 9)";
                break;
              case "email":
                errorMessage = "valid email required";
                break;
              case "projectName":
                errorMessage = "Invalid Project Name";
                break;
              case "designation":
                errorMessage = "Designation cannot be '-'";
                break;
              default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [isUsernameExists, fieldData])


    useEffect(() => {
        setFieldData({})
    }, [isOpen])


    return (
        <Card>
            <div className="widget widget-user-actions">
                {isLoading && <WidgetSkeletonLoader numLines={2}/>}
                {!isLoading && data &&
                <ActionMenu actions={actions} label={"User Actions"}/>}
            </div>
            {action &&
            <ActionModal
                key={action.id}
                label={action.label}
                onOk={handleSubmit}
                isOkDisabled={isOkDisabled}
                actionModalId={action.id}>
                {<GuideMessage
                    messageType={guideMessage?.messageType}
                    guideMessage={guideMessage.guideMessage }
                    isLoading={guideMessage.isLoading}/>}
                <br/>
                {(adminExistsIsLoading || showAdminExistsGuideMessage) &&
                <GuideMessage
                messageType={adminExistsIsLoading ? "info": "warning" }
                guideMessage={
                    showAdminExistsGuideMessage ? 
                    `Admin already assigned for the project '${projectNameDescriptionValue}'`: 
                    `Checking if admin already exists for '${projectNameDescriptionValue}'`
                }
                isLoading={adminExistsIsLoading}/>}
                <FieldList
                    validations={validations}
                    onChange={handleChange}
                    data={fieldData}
                    fields={convertObjectToList(action.fields)}/>
            </ActionModal>}
            
        </Card>
    )
}

export default UserActions