import { useCallback, useContext, useEffect, useState } from "react"
import { CLOSE_ACTION_MODAL, INIT_TABLE, OPEN_ACTION_MODAL } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewAllGatewaysTable } from "src/api/Pages/Gateway"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Card from "src/components/Card"
import Table from "src/components/Table"
import TableFilters from "src/components/TableComponents/TableFilters"
import ReloadButton from "src/components/TableComponents/ReloadButton"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { IconButton, useToast } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { convertObjectToList } from "src/utility"
import ActionModal from "src/components/ActionModal"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide"
import { editGateway } from "src/api/Gateway"

const tableId = "allGatewaysTable"
const gatewayLoadingToastId = "editGatewayLoadingToastId"

const AllCommunicationsTable: React.FC = () => {
    const { data, isLoading } = useApi(viewAllGatewaysTable)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [filterConfig, setFilterConfig] = useState<any>(undefined)
    const { dispatch } = useContext<any>(AppContext)
    const [editGatewayAction, setEditGatewayAction] = useState<any>(undefined)
    const [fieldData, setFieldData] = useState<any>({})
    const toast = useToast()


    const handleOpenEditGateway = (row: any) => {
        console.log("Edit gateway row", row);
        setFieldData({
            ...row,
            project: row?.project?.link?.split("/").pop(),
            connectivityType: row.connectivityTypeValue
        })
        setEditGatewayAction((action: any) => {
            if (action) {
                action.fields.simNo.hide = row.connectivityTypeValue !== 'gprs'
                action.fields.ipAddress.hide = row.connectivityTypeValue !== 'ethernet'
            }
            return action
        })
        dispatch({
            type: OPEN_ACTION_MODAL,
            payload: "editGateway"
        })
    }

    const handleSubmit = useCallback(() => {
        toast({
            id: gatewayLoadingToastId,
            status: 'loading',
            title: 'Editing Gateway ...',
            duration: null
        })
        editGateway(fieldData)
            .then(() => {
                toast({
                    title: 'Success',
                    description: 'Gateway Edited Successfully',
                    status: 'success'
                })
                dispatch({
                    type: CLOSE_ACTION_MODAL,
                    payload: editGatewayAction?.id
                })
                dispatch({
                    type: INIT_TABLE,
                    payload: 'allGatewaysTable'
                })
                setFieldData({})
            })
            .catch((e: any) => {
                toast({
                    title: 'Error',
                    description: e.response.data.message,
                    status: 'error'
                })
            })
            .finally(() => {
                toast.close(gatewayLoadingToastId)
            })
    }, [editGatewayAction, fieldData])

    const isAlphanumeric = (value: string) => /^[a-zA-Z0-9]*$/.test(value);
    const isInvalid = useCallback(() => {
        if (!fieldData.gatewayNumber || !isAlphanumeric(fieldData.gatewayNumber) || fieldData.gatewayNumber.length > 32) {
            return true
        }
        if (!fieldData.connectivityType || fieldData.connectivityType === '-') {
            return true
        }
        // if (fieldData.connectivityType === 'gprs') {
        //     if (!isAlphanumeric(fieldData.simNo ?? "")) {
        //         return true
        //     }
        // }
        if (fieldData.connectivityType === 'ethernet') {
            if (fieldData.ipAddress) {
                const ipAddress = fieldData.ipAddress
                return isInvalidIP(ipAddress)
            }
        }
        if (fieldData.connectivityType === 'gprs') {
            if (fieldData.simNo) {
                const simNo = fieldData.simNo
                return isInvalidSimNo(simNo)
            }
        }
        if (editGatewayAction?.fields && editGatewayAction.fields.order.includes("project")) {
            if (!fieldData.project) {
                return true
            }
        }
        return false
    }, [fieldData, editGatewayAction])


    const isInvalidSimNo = (simNo: any) => {
        if (simNo.length !== 19 || isNaN(simNo)) {
            return true
        }
        return false
    }


    const isInvalidIP = (ipAddress: any) => {
        if (ipAddress.split(".").length !== 4) {
            return true
        }
        if (ipAddress
            .split(".")
            .map((piece: any) => String(piece).length)
            .includes(0)) {
            return true
        }
        if (ipAddress
            .split(".")
            .find((piece: any) => isNaN(piece))) {
            return true
        }
        if (ipAddress
            .split(".")
            .find((piece: any) => parseInt(piece) < 0 || parseInt(piece) > 255)) {
            return true
        }
        return false
    }


    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const validationMap: Record<string, boolean> = {
            gatewayNumber: fieldData.hasOwnProperty("gatewayNumber") && (!isAlphanumeric(fieldData.gatewayNumber) || fieldData.gatewayNumber.length > 32),
            connectivityType: fieldData.hasOwnProperty("connectivityType") && fieldData.connectivityType === '-',
            ipAddress: fieldData.connectivityType === 'ethernet' && fieldData.ipAddress && isInvalidIP(fieldData.ipAddress),
            project: fieldData.hasOwnProperty("project") && !fieldData.project,
            simNo: fieldData.connectivityType === 'gprs' && fieldData.simNo && isInvalidSimNo(fieldData.simNo)
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
                case "gatewayNumber":
                    errorMessage = "Only AlphaNumerics Allowed (MAX - 32 characters)";
                    break;
                case "connectivityType":
                    errorMessage = "Connectivity Type cannot be '-'";
                    break;
                case "ipAddress":
                    errorMessage = "Invalid IP not Allowed";
                    break;
                case "simNo":
                    errorMessage = "19 Numeric digits required";
                    break;

                default:
                    errorMessage = `Invalid input for ${fieldId}`;
                    break;
            }
        }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [fieldData])

    const handleChange = (fieldId: string, value: string) => {
        if (fieldId === 'connectivityType') {
            setEditGatewayAction((action: any) => {
                if (action) {
                    action.fields.simNo.hide = value !== 'gprs'
                    action.fields.ipAddress.hide = value !== 'ethernet'
                }
                return action
            })
        }
        setFieldData((fieldData: any) => ({
            ...fieldData,
            [fieldId]: value
        }))
    }

    const apiReference = (filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewAllGatewaysTable(filters)
                .then(({ data }: any) => {
                    const newColumns = {
                        ...data.config.columns,
                        order: [...(data?.config?.columns?.order ?? []), "actions"],
                        actions: {
                            label: "Action",
                            renderType: "customComponent",
                            render: (row: any) => {
                                return (
                                    <IconButton
                                        aria-label="edit-btn"
                                        onClick={() => handleOpenEditGateway(row)}
                                        icon={
                                            <EditIcon />
                                        } />
                                )
                            }
                        }
                    }
                    resolve({
                        columns: newColumns,
                        rowData: data.data.rows,
                        totalRecords: data.data.totalRecords
                    })
                })
        })
    }

    useEffect(() => {
        if (!isLoading && data) {
            setDefaultFilters(data.config.defaultFilters)
            setFilterConfig(data.config.filterConfig)
            const actions = convertObjectToList(data.config.actions)
            setEditGatewayAction(actions.find(a => a.id === "editGateway"))
        }
    }, [data, isLoading])

    // useEffect(() => {
    //     dispatch({
    //         type: INIT_TABLE_WITH_FILTERS,
    //         payload: {
    //             tableId,
    //             filters: defaultFilters
    //         }
    //     })
    // }, [defaultFilters])

    return (
        <Card>
            {editGatewayAction &&
                <ActionModal
                    key={editGatewayAction.id}
                    label={editGatewayAction.label}
                    onOk={handleSubmit}
                    isOkDisabled={isInvalid()}
                    actionModalId={editGatewayAction.id}>
                    <FieldList
                        validations={validations}
                        onChange={handleChange}
                        data={fieldData}
                        fields={convertObjectToList(editGatewayAction.fields)} />
                </ActionModal>}
            <div className="widget widget-all-users-table">
                {/* {isLoading && <WidgetSkeletonLoader numLines={15}/>} */}
                {!isLoading && data &&
                    <>
                        <div className="d-flex flex-row justify-content-center">
                            <div className="flex-grow-1" style={{ fontWeight: "700", fontSize: "20px" }}>
                                <div className='d-flex align-items-center '>
                                    <p>{getIcon('Link', { fill: 'black', width: '20px' })} </p>
                                    <p className="px-2">{data.config.label}</p>
                                </div>

                            </div>
                            {filterConfig &&
                                <div className="me-2">
                                    <TableFilters filterConfig={filterConfig} tableId={tableId} />
                                </div>}

                            <div>
                                <ReloadButton tableId={tableId} />
                            </div>
                        </div>
                        <Table
                            enableQuickSeach={true}
                            defaultFilters={defaultFilters}
                            tableId={tableId}
                            apiReference={apiReference} />
                    </>}
            </div>
        </Card>
    )
}

export default AllCommunicationsTable