import { useToast } from "@chakra-ui/react"
import {  useCallback, useContext, useEffect, useState } from "react"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewGatewayActions } from "src/api/Pages/Gateway"
import { createGateway } from "src/api/Gateway"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import ActionModal from "src/components/ActionModal"
import Card from "src/components/Card"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide";
import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { convertObjectToList } from "src/utility"
import { isActionModalOpen, useSelector } from "src/selectors"
const gatewayLoadingToastId = "gatewayLoadingToastId"
const GatewayActions: React.FC = () => {
    const { data, isLoading } = useApi(viewGatewayActions)
    const [actions, setActions] = useState<any[]>([])
    const [fieldData, setFieldData] = useState<any>({
        userType: 'OTHER'
    })
    const [action, setAction] = useState<any>(undefined)
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen("createGateway"))

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

        if (fieldId === 'connectivityType') {
            setAction((action: any) => {
                if (action) {
                    action.fields.simNo.hide = value !== 'gprs'
                    action.fields.ipAddress.hide = value !== 'ethernet'
                }
                return action
            })
        }
        setFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

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
        if (action?.fields && action.fields.order.includes("project")) {
            if (!fieldData.project) {
                return true
            }
        }
        return false
    }, [fieldData, action])


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
            ipAddress: fieldData.connectivityType === 'ethernet' && fieldData.hasOwnProperty("ipAddress") && isInvalidIP(fieldData.ipAddress),
            project: fieldData.hasOwnProperty("project") && fieldData.project === '-',
            simNo: fieldData.connectivityType === 'gprs' && fieldData.hasOwnProperty("simNo") && isInvalidSimNo(fieldData.simNo)
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

    const createGatewayPromise = () => {
        return new Promise((resolve, reject) => {
            toast({
                id: gatewayLoadingToastId,
                status: 'loading',
                title: 'Adding Gateway ...',
                duration: null
            })
           // trim value before submitting
            const trimmedFieldData = {
                ...fieldData,
                gatewayNumber: fieldData?.gatewayNumber?.trim(),
                ipAddress: fieldData?.ipAddress?.trim(),
                simNo: fieldData?.simNo?.trim()
            };
            createGateway(trimmedFieldData)
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'Gateway Added Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: action?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: 'allGatewaysTable'
                    })
                    setFieldData({})
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
                    toast.close(gatewayLoadingToastId)
                })
        })
    }

    const handleSubmit = () => {
        createGatewayPromise()
    }
    useEffect(() => {
        handleChange('connectivityType', '')
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
                isOkDisabled={isInvalid()}
                actionModalId={action.id}>
                <FieldList
                    validations={validations}
                    onChange={handleChange}
                    data={fieldData}
                    fields={convertObjectToList(action.fields)}/>
            </ActionModal>}
            
        </Card>
    )
}

export default GatewayActions;