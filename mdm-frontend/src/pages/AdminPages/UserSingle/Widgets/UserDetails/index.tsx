import { Divider, useToast } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { viewEditUserPermissionsTable, viewUserDetails } from "src/api/Pages/Users"
import Card from "src/components/Card"
import FieldList from "src/components/FieldListWithGuide"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { Field } from "src/types"
import { convertObjectToList } from "src/utility"
import { getIcon, SVGIcon } from "src/assets/SvgIcons/IconMap"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import GuideMessage from "src/components/GuideMessage"
import { isActionModalOpen, useSelector } from "src/selectors"
import ReloadButton from "src/components/TableComponents/ReloadButton"
import Table from "src/components/Table"
import { AppContext } from "src/contexts"
import { changePassword, deleteUser, disableUser, editUser, enableUser, resetPassword } from "src/api/User"
import { CLOSE_ACTION_MODAL, } from "src/actions/AppContextActions"

type GuideMessage = {
    messageType: "info" | "loading" | "warning" | "success" | "error" | undefined,
    guideMessage?: string,
    isLoading: boolean
}

const tableId = "editPermissionsTable"
const userLoadingToastId = "userLoadingToast"

const UserDetails: React.FC = () => {
    const [id, setId] = useState<any>(undefined)
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiData, setApiData] = useState<any>({})
    const [config, setConfig] = useState<any>({})
    const [fields, setFields] = useState<Field[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [actions, setActions] = useState<any>({})
    const [editUserAction, setEditUserAction] = useState<any>(undefined)
    const [disableUserAction, setDisableUserAction] = useState<any>(undefined)
    const [enableUserAction, setEnableUserAction] = useState<any>(undefined)
    const [deleteUserAction, setDeleteUserAction] = useState<any>(undefined)
    const [editPermissionAction, setEditPermisssionAction] = useState<any>(undefined)
    const [changePasswordAction, setChangePasswordAction] = useState<any>(undefined)
    const [resetPasswordAction, setResetPasswordAction] = useState<any>(undefined)
    const [editUserFieldData, setEditUserFieldData] = useState<any>({})
    const [changePasswordFieldData, setChangePasswordFieldData] = useState<any>({})
    const data: any = useLoaderData()
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [tableData, setTableData] = useState<any>(undefined)
    const toast = useToast()

    const isOpenEditUser = selector(isActionModalOpen("editUser"))

    useEffect(() => {
        if (data?.config?.id) {
            setId(data?.config?.id)
        }
    }, [data])


    useEffect(() => {
        if (tableData === undefined) {
            setIsLoading(true)
            viewEditUserPermissionsTable({id, filters: {}})
                .then(({ data }: any) => {
                    setTableData(data)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        if (!isLoading && tableData) {
            setDefaultFilters(tableData.config.defaultFilters)
        }
    }, [tableData, isLoading])

    const handleChange = (fieldId: string, value: any) => {
        setEditUserFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

    const handleChangePasswordFieldData = (fieldId: string, value: any) => {
        setChangePasswordFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

    const loadAll = useCallback(() => {
        viewUserDetails(id)
            .then(({ data }: any) => {
                setIsLoading(false)
                setApiData(data?.data)
                const actions = convertObjectToList(data?.config?.actions)
                const editUserAction = actions.find(action => action.id === 'editUser')
                setEditUserFieldData(editUserAction?.data)
                setFields(convertObjectToList(data.config.fields))
                setConfig(data?.config)
                setActions(actions)
                setEditUserAction(actions.find(action => action.id === 'editUser'))
                setEditPermisssionAction(actions.find(action => action.id === 'editPermissions'))
                setDisableUserAction(actions.find(action => action.id === 'disableUser'))
                setEnableUserAction(actions.find(action => action.id === 'enableUser'))
                setDeleteUserAction(actions.find(action => action.id === 'deleteUser'))
                setChangePasswordAction(actions.find(action => action.id === 'changePassword'));
                setResetPasswordAction(actions.find(action => action.id === 'resetPassword'));
                setIsSuccess(true)
            })
    }, [id])


    useEffect(() => {
        if (id) {
            setIsLoading(true)
            loadAll()
        }
    }, [id])

    useEffect(() => {
        if (!isOpenEditUser) {
            setEditUserFieldData(apiData)
        }
    }, [isOpenEditUser])

    useEffect(() => {
        if (editUserAction?.data) {
            setEditUserFieldData(editUserAction?.data)
        }
    }, [isOpenEditUser])


    const isInvalid = useCallback(() => {
        if (!editUserFieldData.projectName) {
            return true
        }
        if (!editUserFieldData.mobileNo ||  editUserFieldData.mobileNo.toString().length !== 10  || isNaN(editUserFieldData.mobileNo)) {
            return true
        }
        if (!editUserFieldData.designation || editUserFieldData.designation === '-') {
            return true
        }
        const re = /\S+@\S+\.\S+/;
        const alphanumericRe = /^\w+$/;
        if (!editUserFieldData.email || editUserFieldData.email.length < 1 || !re.test(editUserFieldData.email) || editUserFieldData.email.length > 50) {
            return true
        }
        if (!editUserFieldData.username || editUserFieldData.username.length < 5 || !alphanumericRe.test(editUserFieldData.username) || editUserFieldData.username.length > 15) {
            return true
        }
        if (!editUserFieldData.name || !alphanumericRe.test(editUserFieldData.name.split(" ").join("")) || editUserFieldData.name.length > 50) {
            return true
        }
        return false
    }, [editUserFieldData])

    console.log(editUserFieldData,"editUserFieldData")

        const validations = useCallback((fieldId: string) => {
            let isValid = true;
            let errorMessage = "";
            const re = /\S+@\S+\.\S+/;
            const alphanumericRe = /^\w+$/;
            const validationMap: Record<string, boolean> = {
                name: editUserFieldData.hasOwnProperty("name") && (editUserFieldData.name.length === 0 || editUserFieldData.name.length > 50 || !alphanumericRe.test(editUserFieldData.name.split(" ").join(""))),
                designation: editUserFieldData.hasOwnProperty("designation") && editUserFieldData.designation === '',
                projectName: editUserFieldData.hasOwnProperty("projectName") && editUserFieldData.projectName === '',
                mobileNo:editUserFieldData.hasOwnProperty("mobileNo") && (editUserFieldData.mobileNo.toString().length !== 10 || isNaN(editUserFieldData.mobileNo)),
                username: (editUserFieldData.username && (editUserFieldData.username.length < !alphanumericRe.test(editUserFieldData.username) || editUserFieldData.username.length > 15)),
                email: editUserFieldData.email && (!re.test(editUserFieldData.email) || editUserFieldData.email.length > 50)
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
            return { isValid, errorMessage };
        }, [editUserFieldData])

    const isInvalidChangePassword = useCallback(() => {
        if (!changePasswordFieldData.oldPassword) {
            return true
        }
        if (!changePasswordFieldData.newPassword || changePasswordFieldData.newPassword.length < 8 || changePasswordFieldData.newPassword.length > 50) {
            return true
        }
        if (!changePasswordFieldData.newPasswordAgain || changePasswordFieldData.newPasswordAgain.length < 8 || changePasswordFieldData.newPasswordAgain.length > 50) {
            return true
        }
        if (changePasswordFieldData.newPasswordAgain !== changePasswordFieldData.newPassword) {
            return true
        }
        return false
    }, [changePasswordFieldData])

    const apiReference = useCallback((filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewEditUserPermissionsTable({id, filters})
            .then(({ data }: any) => {
                resolve({
                    columns: data.config.columns,
                    rowData: data.data.rows,
                    totalRecords: data.data.totalRecords
                })
            })
        })
    }, [id])

    const editUserPromise = () => {
        return new Promise((resolve, reject) => {
            editUser({
                id,
                ...editUserFieldData
            })
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: editUserAction?.id
                    })
                    setIsLoading(true)
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }

    const handleSubmit = () => {
        toast.promise(
            editUserPromise(),
            {
                success: { title: 'User Edited', description: 'User Edited Successfully', duration: 3000 },
                loading: { title: 'Editing User...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }

    const enableUserPromise = useCallback(() => {
        dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: enableUserAction?.id
        })
        return new Promise((resolve, reject) => {
            enableUser({id})
                .then(() => {
                    setDisableUserAction(undefined)
                    setIsLoading(true)
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, enableUserAction])

    const disableUserPromise = useCallback(() => {
        dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: disableUserAction?.id
        })
        return new Promise((resolve, reject) => {
            disableUser({id})
                .then(() => {
                    setIsLoading(true)
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, disableUserAction])

    const handleUserDisableSubmit = () => {
        toast.promise(
            disableUserPromise(),
            {
                success: { title: 'User Disabled', description: 'User Disabled Successfully', duration: 3000 },
                loading: { title: 'Disabling User...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }
    
    const handleUserEnableSubmit = () => {
        toast.promise(
            enableUserPromise(),
            {
                success: { title: 'User Enabled', description: 'User Enabled Successfully', duration: 3000 },
                loading: { title: 'Enabling User...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }
    const deleteUserPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            deleteUser({id})
                .then(() => {
                    setIsLoading(true)
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id])

    const resetPasswordPromise = useCallback(() => {
        dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: resetPasswordAction?.id
        })
        return new Promise((resolve, reject) => {
            resetPassword({userId: id})
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

    const handleUserDeleteSubmit = () => {
        toast.promise(
            deleteUserPromise(),
            {
                success: { title: 'User Deleted', description: 'User Deleted Successfully', duration: 3000 },
                loading: { title: 'Deleting User...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }

    const changePasswordPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            toast({
                id: userLoadingToastId,
                status: 'loading',
                title: 'Changing Password ...',
                duration: null
            })
            changePassword({...changePasswordFieldData, userId: id})
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'Password Changed Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: changePasswordAction?.id
                    })
                    setChangePasswordFieldData({})
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
                    toast.close(userLoadingToastId)
                })
        })
    }, [changePasswordAction, id, changePasswordFieldData])
    
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

    const handleChangePassword = useCallback(() => {
        changePasswordPromise()
    }, [changePasswordPromise])

    return (
        <Card>
            <div className="widget details-widget widget-user-actions">
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
                    {(actions.length > 0) && <ActionMenu actions={actions} label={"User Actions"}/>}
                </div>
                <Divider/>
                <FieldList data={apiData} fields={fields}/>
                </>}

                {editUserAction &&
                <ActionModal
                    key={editUserAction.id}
                    label={editUserAction.label}
                    onOk={handleSubmit}
                    isOkDisabled={isInvalid()}
                    actionModalId={editUserAction.id}>
                    <FieldList
                        validations={validations}
                        onChange={handleChange}
                        data={editUserFieldData}
                        fields={convertObjectToList(editUserAction.fields)}/>
                </ActionModal>}

                {changePasswordAction &&
                <ActionModal
                    key={changePasswordAction.id}
                    label={changePasswordAction.label}
                    onOk={handleChangePassword}
                    isOkDisabled={isInvalidChangePassword()}
                    actionModalId={changePasswordAction.id}>
                    <FieldList
                        onChange={handleChangePasswordFieldData}
                        data={changePasswordFieldData}
                        fields={convertObjectToList(changePasswordAction.fields)}/>
                </ActionModal>}

                {editPermissionAction &&
                <ActionModal
                    key={editPermissionAction.id}
                    label={editPermissionAction.label}
                    actionModalId={editPermissionAction.id}>
                        <div className="widget widget-all-users-table">
                            {/* {isLoading && <WidgetSkeletonLoader numLines={15}/>} */}
                            {!isLoading && tableData &&
                            <>
                                <div className="d-flex flex-row justify-content-center">
                                    <div className="flex-grow-1" style={{fontWeight: "700", fontSize: "20px"}}>
                                        <div className='d-flex align-items-center '>
                                           <p>{getIcon('Link', { fill: 'black', width: '20px' })} </p>
                                           <p className="px-2">{tableData.config.label}</p>
                                        </div>
                                        
                                    </div>
                                    <div>
                                        <ReloadButton tableId={tableId}/>
                                    </div>
                                </div>
                                <Table
                                    defaultFilters={defaultFilters}
                                    tableId={tableId}
                                    apiReference={apiReference}/>
                            </>}
                        </div>
                </ActionModal>}

                {disableUserAction &&
                <ActionModal
                    label={disableUserAction.label}
                    onOk={handleUserDisableSubmit}
                    isOkDisabled={false}
                    actionModalId={disableUserAction.id}
                >
                    <GuideMessage
                    messageType="warning"
                    guideMessage={`Are you sure you want to disable user, '${apiData?.name}'?`}
                    />
                </ActionModal>
                }
                {enableUserAction &&
                <ActionModal
                    label={enableUserAction.label}
                    onOk={handleUserEnableSubmit}
                    isOkDisabled={false}
                    actionModalId={enableUserAction.id}
                >
                    <GuideMessage
                    messageType="warning"
                    guideMessage={`Are you sure you want to enable user, '${apiData?.name}'?`}
                    />
                </ActionModal>
                }
                {deleteUserAction &&
                <ActionModal
                    label={deleteUserAction.label}
                    onOk={handleUserDeleteSubmit}
                    isOkDisabled={false}
                    actionModalId={deleteUserAction.id}
                >
                    <GuideMessage
                    messageType="warning"
                    guideMessage={`Are you sure you want to delete user, '${apiData?.name}'?`}
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
                    guideMessage={`Are you sure you want to reset password for '${apiData?.name}'?`}
                    />
                </ActionModal>
                }
                
            </div>
        </Card>
    )
}

export default UserDetails