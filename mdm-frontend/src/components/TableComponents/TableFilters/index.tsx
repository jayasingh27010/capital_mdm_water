import { Badge, Divider } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import Colors from "src/Colors"
import { ADD_ADDITIONAL_FILTER, CLEAR_ALL_FILTERS, MODIFY_ADDITIONAL_FILTER, OPEN_ACTION_MODAL, REMOVE_ADDITIONAL_FILTER  } from "src/actions/AppContextActions"
import ActionModal from "src/components/ActionModal"
import Button from "src/components/Button"
import FieldList from "src/components/FieldList"
import FieldSingle from "src/components/FieldSingle"
import GuideMessage from "src/components/GuideMessage"
import { AppContext } from "src/contexts"
import {  getTableState, useSelector } from "src/selectors"

type TableFiltersProps = {
    tableId: string;
    filterConfig: any
}

const EMPTY_VALS = ["",  "-"]


type FilterDesc = {
    trackId: string;
    filterType: string;
    filterValue: any;
}

const TableFilters: React.FC<TableFiltersProps> = ({
    tableId,
    filterConfig
}) => {
    const selector = useSelector()
    const [selectedFilter, setSelectedFilter] = useState<any>(undefined)
    const [filterType, setFilterType] = useState<string>("")
    const [filterValue, setFilterValue] = useState<any>(undefined)
    const [isInvalid, setIsInvalid] = useState<boolean>(true)
    const { dispatch } = useContext<any>(AppContext)
    const [errorMsg, setErrorMsg] = useState<any>(undefined)
    const tableData = selector(getTableState(tableId))
    const oldFilters = tableData?.filters ?? {}
    const filters = tableData?.filters?.additionalFilters ?? []

    const actionModalId = tableId.replace("Id", "FilterModal")
    const filterOptions = filterConfig.filterType.selectOptions

    const handleOpenActionModal = () => {
        openActionModal(actionModalId)
    }

    const openActionModal = (actionId: string) => {
        dispatch({
            type: OPEN_ACTION_MODAL,
            payload: actionId
        })
    }

    const handleFilterTypeChange = (value: string) => {
        setFilterType(value)
        setFilterValue("")
        setSelectedFilter(undefined)
    }

    const handleFilterValueChange = (value: any) => {
        setFilterValue(value)
    }

    const filterShowValueReducerCallback = (acc: any, filter: FilterDesc) => {
        const isSelectInput = filterConfig.filterValue[filter.filterType].inputType === "selectInput"
        let value: any = filter?.filterValue
        if (isSelectInput) {
            const selectOptions = filterConfig.filterValue[filter.filterType].selectOptions
            value = selectOptions.find((option: any) => option.value === filter.filterValue).description
        }
        return {
            ...acc,
            [filter.trackId]: value
        }
    }

    const filterShowValueReducer = (filters: any[]) => {
        return filters.reduce(filterShowValueReducerCallback, {})
    }

    const filterValueReducer = (filters: any[]) => {
        return filters.reduce((acc: any, filter: FilterDesc) => ({...acc, [filter.trackId]: filter.filterValue}), {})
    }

    const filterTypeReducer = (filters: any[]) => {
        return filters.reduce((acc: any, filter: FilterDesc) => ({...acc, [filter.trackId]: filter.filterType}), {})
    }

    useEffect(() => {
        setIsInvalid(EMPTY_VALS.includes(filterType) || EMPTY_VALS.includes(filterValue))
    }, [filterType, filterValue])

    const canAddNewFilter = useCallback(() => {
        if (!["startDate", "endDate"].includes(filterType)) {
            console.log("first if")
            return true
        }
        const foundDateFilter = filters.find((filter: any) => filter.filterType === "startDate" || filter.filterType === "endDate")
        if (foundDateFilter) {
            const startDate = foundDateFilter?.filterType === "startDate" ? foundDateFilter?.filterValue : filterValue
            const endDate = foundDateFilter?.filterType === "endDate" ? foundDateFilter?.filterValue : filterValue

            console.log("reached end", startDate, endDate)
            if (startDate && endDate) {
                const startDateValue = (new Date(startDate)).getTime()
                const endDateValue = (new Date(endDate)).getTime()
                if (endDateValue < startDateValue) {
                    setErrorMsg("Start Date Can't Be Lesser Than End Date")
                    return false
                } else if (endDateValue - startDateValue > 1000 * 60 * 60 * 24 * 31) {
                    setErrorMsg("Max selection of only 31 days allowed")
                    return false
                }
            }
        }
        console.log("reached end")
        return true
    }, [filters, filterType, filterValue])

    const handleSaveFilter = useCallback(() => {
        setErrorMsg("")
        if (EMPTY_VALS.includes(filterType) || EMPTY_VALS.includes(filterValue)) {
            return
        }
        if (canAddNewFilter()) {
            if (selectedFilter) {
                dispatch({
                    type: MODIFY_ADDITIONAL_FILTER,
                    payload: {
                        tableId,
                        trackId: selectedFilter,
                        filterType,
                        filterValue
                    }
                })
            } else {
                dispatch({
                    type: ADD_ADDITIONAL_FILTER,
                    payload: {
                        tableId,
                        filterType,
                        filterValue
                    }
                })
            }
            setFilterType("-")
            setFilterValue("")
            setSelectedFilter(undefined)
        } else {
            setFilterValue("")
        }
    }, [filterType, filterValue, filters, oldFilters, canAddNewFilter])

    const handleRemoveFilter = useCallback(() => {
        if (selectedFilter) {
            dispatch({
                type: REMOVE_ADDITIONAL_FILTER,
                payload: {
                    tableId,
                    trackId: selectedFilter
                }
            })
            setFilterType("-")
            setFilterValue("")
            setSelectedFilter(undefined)
        }
    }, [selectedFilter])

    const handleFilterClick = useCallback((fieldId: string, _: any) => {
        setSelectedFilter(fieldId)
        setFilterType(filterTypeReducer(filters)[fieldId])
        setFilterValue(filterValueReducer(filters)[fieldId])
    }, [filters])

    // useEffect(() => {
    //     let errorMsg = ""
    //     const startDate = filters.find((filter: any) => filter.filterType === "startDate")
    //     const endDate = filters.find((filter: any) => filter.filterType === "endDate")
    //     if (startDate && endDate) {
    //         const startDateValue = (new Date(startDate.filterValue)).getTime()
    //         const endDateValue = (new Date(endDate.filterValue)).getTime()
    //         if (endDateValue < startDateValue) {
    //             errorMsg = "Start Date Can't Be Lesser Than End Date"
    //         } else if (endDateValue - startDateValue > 1000 * 60 * 60 * 24 * 31) {
    //             errorMsg = "Max selection of only 31 days allowed"
    //         }
    //     }
    //     setErrorMsg(errorMsg)
    // }, [filters])

    function handleClearAllFilters(): void {
        dispatch({
            type: CLEAR_ALL_FILTERS,
            payload: {
                tableId
            }
        })
    }

    return (
        <>
            <Button size="sm" onClick={handleOpenActionModal}>
                Filters
                <Badge
                    bgColor="#000"
                    color="#FFF"
                    padding="3px 7px"
                    marginLeft="10px"
                    borderRadius="10px">
                    {filters?.length ?? 0}
                </Badge>
            </Button>
            <Button
                marginLeft="10px"
                size="sm"
                onClick={handleClearAllFilters}>
                Clear Filters
            </Button>
            <ActionModal
                label="Filters"
                actionModalId={actionModalId}>
                <div className="p-2">
                    {errorMsg && <GuideMessage
                        messageType="error"
                        guideMessage={errorMsg}/>}
                    <FieldSingle
                        {...filterConfig.filterType}
                        id="filterType"
                        isInvalid={false}
                        value={filterType}
                        onChange={handleFilterTypeChange}/>
                    {!EMPTY_VALS.includes(filterType) &&
                    <FieldSingle
                        onChange={handleFilterValueChange}
                        {...filterConfig?.filterValue?.[filterType]}
                        id={filterType}
                        isInvalid={false}
                        value={filterValue}
                        />}
                    <div className="d-flex flex-row">
                        <Button
                            disabled={isInvalid}
                            bgColor={Colors.primary}
                            color={Colors.primaryNegative}
                            onClick={handleSaveFilter}>
                            {selectedFilter ? 'Edit': 'Add'} Filter
                        </Button>
                        {selectedFilter &&
                        <Button
                            onClick={handleRemoveFilter}
                            className="ms-2"
                            bgColor="#dc3545"
                            color={Colors.primaryNegative}>
                            Remove Filter
                        </Button>}
                    </div>
                </div>
                <Divider/>
                <div className="details-widget">
                    <FieldList
                        onChange={handleFilterClick}
                        fields={(filters).map((filter: FilterDesc) => ({
                            id: filter.trackId,
                            inputType: "eventButton",
                            label: filterOptions
                                .find((option: any) => option.value === filter.filterType)
                                .description,
                            columnSize: 12,
                            isSingleLineInput: true
                        }))}
                        data={filterShowValueReducer(filters)}/>
                </div>
            </ActionModal>
        </>
    )
}

export default TableFilters