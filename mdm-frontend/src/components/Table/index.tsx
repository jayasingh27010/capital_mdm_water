import {
    TableContainer,
    Table as ChakraTable,
    Thead,
    Tr,
    Th,
    Tbody,
    useToast,
    filter
} from "@chakra-ui/react"
import "./styles.css"
import { convertObjectToList, isEmpty } from "src/utility"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import TableCell from "../TableComponents/TableCell"
import { getTableSelections, getTableState, useSelector } from "src/selectors"
import { AppContext } from "src/contexts"
import { ADD_ADDITIONAL_FILTER, ADD_SELECTION, ADD_SELECTIONS, INIT_TABLE, INIT_TABLE_WITH_FILTERS, LOAD_END_TABLE, REMOVE_SELECTION, REMOVE_SELECTIONS, START_LOADING_TABLE, UPDATE_FILTERS_AND_LOAD_TABLE } from "src/actions/AppContextActions"
// import WidgetSkeletonLoader from "../WidgetSkeletonLoader"
import FieldList from "../FieldList"
import { Field } from "src/types"
import PageSelector from "../TableComponents/PageSelector"
import ScrollHere from "../TableComponents/ScrollHere"
import Colors from "src/Colors"
import Button from "../Button"


const identifierKey = 'id'
type TableProps = {
    showCheckbox?: boolean,
    tableId: string,
    defaultFilters?: any,
    noFooter?: boolean,
    enableQuickSeach?: boolean;
    customHeight?: string
    apiReference: (filter: any) => Promise<any>
}

const fields: Field[] = [
    {
        id: 'perPage',
        label: 'Per Page',
        inputType: "selectInput",
        columnSize: 12,
        defaultOption: "5",
        isSingleLineInput: true,
        selectOptions: [
            {
                value: "5",
                description: "5"
            },
            {
                value: "10",
                description: "10"
            }
        ]
    }
]

const QuickSearchField = {
    order: [
        "quickSearch"
    ],
    quickSearch: {
        label: "Search",
        isSingleLineInput: true,
        inputType: 'textInput'
    }
}

const Table: React.FC<TableProps> = ({
    showCheckbox = false,
    tableId,
    defaultFilters = {},
    noFooter = false,
    enableQuickSeach = false,
    customHeight = "500px",
    apiReference
}) => {
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const toast = useToast()
    const tableState = selector(getTableState(tableId))
    const tableSelections = selector(getTableSelections(tableId))
    const [columns, setColumns] = useState<any[]>([])
    const [rowData, setRowData] = useState<any[]>([])
    const [filters, setFilters] = useState<any>({})
    const [perPageData, setPerPageData] = useState<any>({})
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [quickSearch, setQuickSearch] = useState<string>("")
    const [changes, setChanges] = useState<any>({})
    const [isTableLoadedOnce, setIsTableLoadedOnce] = useState(false)

    const ref: any = useRef(null)

    const handlePerPageChange = useCallback((fieldId: string, value: any) => {
        setPerPageData({
            [fieldId]: value
        })
        dispatch({
            type: UPDATE_FILTERS_AND_LOAD_TABLE,
            payload: {
                tableId,
                filters: {
                    ...filters,
                    [fieldId]: parseInt(value)
                }
            }
        })
    }, [filters])

    useEffect(() => {
        if (tableState?.isLoaded === false && tableState?.isLoading === false) {
            dispatch({
                type: START_LOADING_TABLE,
                payload: tableId
            })
            setRowData([])
            setChanges({})
            apiReference(tableState.filters ?? {})
                .then(({ columns, rowData: inpRowData, totalRecords }) => {
                    setColumns(convertObjectToList(columns))
                    if (isEditing) {
                        setRowData(overlayChanges(inpRowData, changes))
                    } else {
                        setRowData(inpRowData)
                    }
                    dispatch({
                        type: LOAD_END_TABLE,
                        payload: {
                            totalRecords,
                            tableId
                        }
                    })
                })
                .catch(() => console.error)
            return
        }
    }, [tableState, filters, changes])

    const handleQuickSearchChange = (_: string, value: any) => {
        setQuickSearch(value)
    }

    const overlayChanges = (rows: any[], changes: any) => {
        return rows.map(
            (row: any) => {
                const rowId = row?.[identifierKey]
                if (!changes.hasOwnProperty(rowId)) {
                    return row
                }
                const changedColumns = Object.keys(changes[rowId])
                for (const col of changedColumns) {
                    row[col] = {
                        ...row[col],
                        data: {
                            ...changes[rowId][col]
                        }
                    }
                }
                return row
            }
        )
    }

    useEffect(() => {
        if (!isEmpty(defaultFilters)) {
            setFilters(defaultFilters)
        }
    }, [defaultFilters])

    useEffect(() => {
        setPerPageData({
            "perPage": String(tableState?.filters?.perPage ?? "5")
        })
    }, [tableState, filters])

    const handleChange = (rowId: string, columnId: string, value: any) => {
        setChanges((changes: any) => {
            return {
                ...changes,
                [rowId]: {
                    ...(changes?.[rowId] ?? {}),
                    [columnId]: {
                        ...(changes?.[rowId]?.[columnId] ?? {}),
                        ...value
                    }
                }
            }
        })
        setIsEditing(true)
    }

    const saveTablePromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            const finalFilters = {
                ...filters,
                changes
            }
            apiReference(finalFilters)
                .then(() => {
                    dispatch({
                        type: INIT_TABLE,
                        payload: tableId
                    })
                    setIsEditing(false)
                    setChanges({})
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [filters, changes])

    const handleSave = () => {
        toast.promise(
            saveTablePromise(),
            {
                success: { title: 'Changes Saved', description: 'Changes Saved Successfully', duration: 3000 },
                loading: { title: 'Saving Changes..', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000}
            }
        )
    }

    useEffect(() => {
        if (isEditing) {
            setRowData(rowData => overlayChanges(rowData, changes))
        }
    }, [changes, isEditing])

    // useEffect(() => {
    //     if (!quickSearch && enableQuickSeach) {
    //         apiReference({
    //             ...filter
    //         })
    //             .then(() => {
    //                 dispatch({
    //                     type: ADD_ADDITIONAL_FILTER,
    //                     payload: {
    //                         tableId,
    //                         filterType: "q",
    //                         filterValue: quickSearch
    //                     }
    //                 })
    //             })
    //     }
    // }, [quickSearch])




    useEffect(() => {
        console.log(filters,"filtersfiltersfiltersfilters")
        if (!isTableLoadedOnce && !isEmpty(filters)) {
            console.log("inside load once")
            dispatch({
                type: INIT_TABLE_WITH_FILTERS,
                payload: {
                    tableId,
                    filters
                }
            })
            setIsTableLoadedOnce(true)
        }
    }, [isTableLoadedOnce, filters])

    const handleOnEnterPress = useCallback(() => {
        if (enableQuickSeach) {
            dispatch({
                type: ADD_ADDITIONAL_FILTER,
                payload: {
                    tableId,
                    filterType: "q",
                    filterValue: quickSearch
                }
            })
            // apiReference({
            //     ...filter
            // })
            //     .then(() => {
            //     })
        }
    }, [quickSearch, filter])

    function handleQuickSearchFocus(e: any): void {
        e.target.select()
    }

    const handleCheck = useCallback((checked: boolean, id: string) => {
        const row = rowData.find(r => r.id === id)
        if (row?.hasParent || row?.isParent) {
            const parentId = row?.hasParent ? row?.parentId: row?.id
            const childIds = rowData.filter(r => r?.parentId === parentId).map(row => row.id)
            dispatch({
                type: checked ? ADD_SELECTIONS: REMOVE_SELECTIONS,
                payload: {
                    tableId,
                    selectionIds: [parentId, ...childIds]
                }
            })
        } else {
            dispatch({
                type: checked ? ADD_SELECTION: REMOVE_SELECTION,
                payload: {
                    tableId,
                    selectionId: id
                }
            })
        }
    }, [rowData])

    const handleAllChecked = useCallback(() => {
        const allChecked = rowData.map(row => row.checked).length === tableSelections.length
        dispatch({
            type: !allChecked ? ADD_SELECTIONS: REMOVE_SELECTIONS,
            payload: {
                tableId,
                selectionIds: rowData.map(row => row.id)
            }
        })
    }, [rowData, tableSelections])

    useEffect(() => {
        if (showCheckbox && rowData.filter(r => r.checked).length !== tableSelections.length) {
            setRowData(rowData => rowData.map(r => {
                r.checked = (tableSelections.includes(r.id))
                return r
            }))
        }
    }, [tableSelections, showCheckbox, rowData])



    // if (tableState?.isLoading) return <WidgetSkeletonLoader numLines={15}/>

    return (
        <div>
            {enableQuickSeach && 
            <div style={{width: "400px"}}>
                <FieldList
                    ref={ref}
                    onClick={handleQuickSearchFocus}
                    onEnterPress={handleOnEnterPress}
                    onChange={handleQuickSearchChange}
                    fields={convertObjectToList(QuickSearchField)}
                    data={{quickSearch}}
                />
            </div>}
            <TableContainer style={{ overflowY: 'scroll', overflowX: "scroll", height: customHeight }}>
                <ScrollHere tableId={tableId}/>
                {isEditing &&
                <div
                    className="d-flex flex-row"
                    style={{backgroundColor: Colors.primary, width: '100%'}}>
                    <Button
                        onClick={() => {
                            setIsEditing(false)
                            setChanges({})
                            dispatch({
                                type: INIT_TABLE,
                                payload: tableId
                            })
                        }}
                        _hover={{
                            bgColor: Colors.primary,
                            color: Colors.primaryNegative
                        }}
                        bgColor={Colors.primary}
                        color={Colors.primaryNegative}>
                        Reset
                    </Button>
                    <div className="flex-grow-1" style={{height: '30px'}}></div>
                    <Button
                        onClick={handleSave}
                        _hover={{
                            bgColor: Colors.primary,
                            color: Colors.primaryNegative
                        }}
                        bgColor={Colors.primary}
                        color={Colors.primaryNegative}>
                        Save
                    </Button>
                </div>}
                
                <ChakraTable variant="striped">
                    <Thead style={{position: "sticky", top: 0, backgroundColor: '#FFF', zIndex: '1000'}}>
                        <Tr>
                            {columns.map((column: any, index: number) => {
                                return (
                                    <Th key={column.id}>
                                        {showCheckbox && index === 0 &&
                                        <input
                                            type="checkbox"
                                            style={{
                                                border: "1px solid #c2c2c2",
                                                height: "20px",
                                                width: "20px",
                                                padding: "0",
                                                marginRight: "10px"
                                            }}
                                            checked={rowData.map(r => r.checked).length === tableSelections.length}
                                            onChange={handleAllChecked}
                                        />}
                                        {column.label}
                                    </Th>
                                )
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowData.map((row: any) => {
                            return (
                                <Tr key={row[identifierKey]}>
                                    {columns.map((column, i) => {
                                        const props = {
                                            fetchKey: column.id,
                                            row,
                                            renderType: column.renderType
                                        }
                                        return <TableCell
                                            isChecked={tableSelections.includes(props?.row?.id)}
                                            setIsChecked={handleCheck}
                                            showCheckbox={showCheckbox}
                                            index={i}
                                            render={column?.render}
                                            onChange={(value: any) => handleChange(row[identifierKey], column.id, value)}
                                            key={`${row[identifierKey]}-${column.id}`}
                                            {...props}/>
                                    })}
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <div style={{
                        height: "100px",
                        display: "block"
                    }}></div>
                </ChakraTable>

            {!noFooter &&
            <div
                className="d-flex flex-row"
                style={{
                    backgroundColor: "#fff",
                    position: "absolute", bottom: "30px", left: 0, width: "100%", zIndex: "1002"}}>
                <PageSelector tableId={tableId}/>
                <div>
                    <FieldList
                        onChange={handlePerPageChange}
                        fields={fields}
                        data={perPageData}/>
                </div>
            </div>}
            </TableContainer>
        </div>
    )
}

export default Table