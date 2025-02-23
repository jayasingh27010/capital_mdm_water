import { useCallback, useContext, useEffect } from "react"
import { CLEAR_ALL_SELECTIONS, INIT_TABLE } from "src/actions/AppContextActions"
import FieldSingle from "src/components/FieldSingle"
import Table from "src/components/Table"
import { AppContext } from "src/contexts"
import { getTableSelections, isActionModalOpen, useSelector } from "src/selectors"

interface ActionSelectionProps {
    originalActions: any[],
    actions: any[],
    setActions: (meters: any) => void,
    setActionSelectionStatus: (status: boolean) => void
}

const actionsSelectionTableId = "actionsSelectionTable"

const ActionSelection: React.FC<ActionSelectionProps> = ({
    actions,
    setActions,
    setActionSelectionStatus
}) => {
    const selector = useSelector()
    const tableSelections = selector(getTableSelections("actionsSelectionTable"))
    const { dispatch } = useContext<any>(AppContext)
    const isOpen = selector(isActionModalOpen("setMeters"))

    const handleChange = useCallback((value: string, id: string) => {
        let finalActions = [...actions]
        if (finalActions.find(action => action.id === id)) {
            finalActions = finalActions.map(action => {
                if (action.id === id) {
                    action.value = value
                }
                return action
            })
            finalActions = finalActions.map((action) => {
                if (action.isParent) {
                    action.value = JSON.stringify(finalActions
                    .filter(childAction => childAction.parentId === action.id)
                    .map(childAction => childAction.value))
                }
                return action
            })
        }
        setActions(finalActions)
        dispatch({
            type: INIT_TABLE,
            payload: actionsSelectionTableId
        })
    }, [actions])

    useEffect(() => {
        if (actions.filter(a => a?.checked).length !== tableSelections.length) {
            let finalActions = [...actions]
            finalActions = finalActions.map((action: any) => {
                action.checked = tableSelections.includes(action.id)
                return action
            })
            setActions(finalActions)
        }
    }, [tableSelections, actions, isOpen])

    useEffect(() => {
        dispatch({
            type: CLEAR_ALL_SELECTIONS,
            payload: {
                tableId: actionsSelectionTableId
            }
        })
        setActions((actions: any[]) => {
            return actions.map(action => {
                action.value = ""
                return action
            })
        })
    }, [isOpen])

    const actionsSelectionApiReference = useCallback((_: any): Promise<any> => {
        let rows: any[] = [...actions]
        rows = rows.map((row: any) => ({
            ...row,
            hasParent: row?.hasParent,
            isParent: row?.isParent,
            parentId: row?.parentId
        }))

        return new Promise((resolve) => {
            resolve({
                columns: {
                    order: [
                        "label",
                        "value"
                    ],
                    label: {
                        label: "Action Name",
                        renderType: "text",
                    },
                    value: {
                        label: "Value",
                        renderType: "customComponent",
                        render: (row: any) => {
                            if (row.hasValue && row.hasOwnProperty("inputDefinition")) {
                                return <FieldSingle
                                    {...row.inputDefinition}
                                    value={row.value}
                                    isInvalid={isInvalid(row.id)}
                                    onChange={(value: any) => handleChange(value, row.id)}
                                />
                            }
                            if (row.hasValue)
                                return <input
                                    style={{border: "1px solid #c2c2c2", padding: "5px"}}
                                    type="text"
                                    value={row.value ?? ""}
                                    onChange={e => handleChange(e.target.value, row.id)}
                                    />
                            return <></>
                        }
                    }
                },
                rowData: rows,
                totalRecords: rows.length
            })
        })
    }, [actions])
    
    const isInvalid = useCallback((actionId: string) => {
        const field = actions.find(action => action.id === actionId)
        if (field.checked && isInvalidById(field.id, field.value)) {
            return true
        }
        return false
    }, [actions])

    const isAnyInvalid = useCallback(() => {
        for (const { id } of actions) {
            const field = actions.find(action => action.id === id)
            if (field.checked && isInvalidById(field.id, field.value)) {
                return true
            }
        }
        return false
    }, [isInvalid, actions])

    const is6DigitDecimal = (value: any) => {
        const val = String(value)
        const reg = new RegExp('^[0-9.]+$')
        if (!reg.test(val)) {
            return false
        }
        const afterDecimal = val.split(".")?.[1] ?? ""
        return afterDecimal.length <= 6 && !isNaN(parseFloat(val))
    }

    const isInvalidById = (actionId: string, value: any) => {
        const validationsMap: Record<string, boolean> = {
            "DI": value === "-" || !value,
            "RC": value === "-" || !value,
            "SI": value === "-" || !value,
            "GL": false,
            "GL-R": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "GL-Y": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "GL-B": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "GL-Total": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "DL": false,
            "DL-R": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "DL-Y": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "DL-B": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "DL-Total": (value ?? "").length === 0 || !is6DigitDecimal(value),
            "OG": value === "-" || !value,
            "OD": value === "-" || !value,
            "PI": (value ?? "").length === 0 || isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 65500,
            "BG": (value ?? "").length === 0 || isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 65500,
            "BD": (value ?? "").length === 0 || isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 65500,
            "MC": value === "-" || !value,
            "MS": value === "-" || !value,
            "RE": (value ?? "").length === 0 || isNaN(parseInt(value)) || parseInt(value) < 0 || parseInt(value) > 65535,
            "IW": (value ?? "").length === 0 || isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 65534,
            "PP": value === "-" || !value,
            "GD": value === "-" || !value,
            "DG": value === "-" || !value,
        }
        return validationsMap?.[actionId] ?? false
    }

    useEffect(() => {
        setActionSelectionStatus(isAnyInvalid())
    }, [actions, isAnyInvalid])

    return (
        <div>
            <div className="py-2">
                <h3 className="pt-2">Selected Actions ({actions.filter(a => a?.checked).length}) </h3>
                <Table
                    showCheckbox={true}
                    tableId={actionsSelectionTableId}
                    defaultFilters={{
                        perPage: 5,
                        currPage: 1
                    }}
                    noFooter={true}
                    apiReference={actionsSelectionApiReference} />
            </div>
        </div>
    )
}

export default ActionSelection