import { useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions";
import { createTarrifGroup } from "src/api/Pages/Tarrifs";
import ActionModal from "src/components/ActionModal";
// import FieldList from "src/components/FieldList";
import FieldList from "src/components/FieldListWithGuide";
import { AppContext } from "src/contexts";
import { isActionModalOpen, useSelector } from "src/selectors";
import { convertObjectToList } from "src/utility";

type AddTarrifGroupActionProps = {
    action: any;
    refresh?: () => void
}

const createTarrifGroupLoading = "createTarrifGroupLoading"

const AddTarrifGroupAction: React.FC<AddTarrifGroupActionProps> = ({
    action,
    refresh = () => {}
}) => {
    const toast = useToast()
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const [addTarrifGroupFieldData, setAddTarrifGroupFieldData] = useState<any>({})
    const isOpen = selector(isActionModalOpen(action.id))

    const addTarrifGroupPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            toast({
                id: createTarrifGroupLoading,
                status: 'loading',
                title: 'Adding User ...',
                duration: null
            })
            createTarrifGroup(addTarrifGroupFieldData)
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: action?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: "allTarrifGroupsTable",
                    });
                    toast({
                        title: 'Success',
                        description: 'Tarrif Group Added Successfully',
                        status: 'success'
                    })
                    refresh?.()
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
                    toast.close(createTarrifGroupLoading)
                })
        })
    }, [addTarrifGroupFieldData, refresh])

    const handleAddTarrifGroup = useCallback(() => {
        addTarrifGroupPromise()
    }, [addTarrifGroupPromise])

    const handleChangeAddTarrifGroup = (fieldId: string, value: any) => {
        setAddTarrifGroupFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

    useEffect(() => {
        setAddTarrifGroupFieldData({})
    }, [isOpen])

    const isInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!addTarrifGroupFieldData.tarrifGroupName || re.test(addTarrifGroupFieldData.tarrifGroupName) || String(addTarrifGroupFieldData?.tarrifGroupName ?? "").length > 50) {
            return true
        }
        if (addTarrifGroupFieldData.tarrifGroupDescription && (re.test(addTarrifGroupFieldData.tarrifGroupDescription) || String(addTarrifGroupFieldData?.tarrifGroupDescription ?? "").length > 128)) {
            return true
        }
        if (action?.fields?.order?.includes("project")) {
            if (!addTarrifGroupFieldData.project || !addTarrifGroupFieldData.project) {
                return true
            }
        }
        return false
    }, [addTarrifGroupFieldData, action])


    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const re = /[^a-zA-Z0-9-_ ]/g
        const validationMap: Record<string, boolean> = {
            tarrifGroupName: addTarrifGroupFieldData.hasOwnProperty("tarrifGroupName") && (re.test(addTarrifGroupFieldData.tarrifGroupName) || String(addTarrifGroupFieldData.tarrifGroupName ?? "").length > 50),
            tarrifGroupDescription: addTarrifGroupFieldData.tarrifGroupDescription && (re.test(addTarrifGroupFieldData.tarrifGroupDescription) || String(addTarrifGroupFieldData.tarrifGroupDescription ?? "").length > 128),
            project: addTarrifGroupFieldData.hasOwnProperty("project") && !addTarrifGroupFieldData.project,
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
              case "tarrifGroupName":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 50 Characters)";
                break;
              case "tarrifGroupDescription":
                errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 128 Characters)";
                break;
              case "project":
                errorMessage = "Invalid Project Name";
                break;
              
              default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [addTarrifGroupFieldData])

    if (action)
    return (
            <ActionModal
                key={action.id}
                label={action.label}
                onOk={handleAddTarrifGroup}
                isOkDisabled={isInvalid()}
                actionModalId={action.id}>
                <FieldList
                    onChange={handleChangeAddTarrifGroup}
                    data={addTarrifGroupFieldData}
                    validations={validations}
                    fields={convertObjectToList(action.fields)}/>
            </ActionModal>
    )
    return <></>
}

export default AddTarrifGroupAction