import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Icon, Tab, TabList, Tabs } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { UPDATE_FILTERS_AND_LOAD_TABLE } from "src/actions/AppContextActions"
import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"
import { getTableState, useSelector } from "src/selectors"

type PageSelectorProps = {
    tableId: string
}

const PageSelector: React.FC<PageSelectorProps> = ({
    tableId
}) => {
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const tableState = selector(getTableState(tableId))
    const [tabIndex, setTabIndex] = useState<number>(0)
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [numPages, setNumPages] = useState<number>(0)
    const [clickLabels, setClickLabels] = useState<number[]>([-1, 0, 1, 2, -2])

    const handleTabChange = useCallback((index: any) => {
        let currPage = 1
        if (numPages >= 3) {
            if (index === 0) {
                currPage = 1
            } else if (index === 4) {
                currPage = numPages
            } else {
                currPage = clickLabels[index] + 1
            }
        } else {
            currPage = index + 1
        }
        dispatch({
            type: UPDATE_FILTERS_AND_LOAD_TABLE,
            payload: {
                tableId,
                filters: {
                    ...tableState.filters,
                    currPage
                }
            }
        })
    }, [tableState, clickLabels, numPages])
    
    useEffect(() => {
        if (tableState?.totalRecords) {
            setTotalRecords(tableState.totalRecords)
            const currPage = tableState?.filters?.currPage
            const numPages = Math.ceil(tableState.totalRecords / tableState?.filters?.perPage)
            if (numPages < 3) {
                setTabIndex(currPage-1)
            } else {
                if (currPage === 1 || currPage === undefined) {
                    setClickLabels([-1, 0, 1, 2, -2])
                    setTabIndex(1)
                } else if (currPage !== numPages) {
                    setClickLabels([-1, currPage-2, currPage-1, currPage, -2])
                    setTabIndex(2)
                } else {
                    setClickLabels([-1, currPage-3, currPage-2, currPage-1, -2])
                    setTabIndex(3)
                }
            }
            setNumPages(isNaN(numPages) ? 0 : numPages)
        }
    }, [tableState])

    if (tableState === undefined || tableState?.isLoding) {
        return (
            <WidgetSkeletonLoader numLines={2}/>
        )
    }
    if (totalRecords !== 0) {
        return (
            <>
                <div className="py-3 ps-2">Recs: {totalRecords}</div>
                <div className="flex-grow-1 d-flex flex-row justify-content-center py-2">
                    <Tabs
                        variant="soft-rounded"
                        index={tabIndex} onChange={handleTabChange}>
                        <TabList>
                            {numPages < 3 &&
                            Array(numPages)
                                .fill(numPages)
                                .map((_, i) => i)
                                .map((node) => (
                                    <Tab key={node}>
                                        {node+1}
                                    </Tab>
                                ))}
                            {numPages >= 3 &&
                            Array(5)
                                .fill(5)
                                .map((_, i) => i)
                                .map((node, i) => (
                                    <Tab key={node}>
                                        
                                        {i === 0 && <Icon as={ArrowLeftIcon}/>}
                                        {i !== 0 && i !== 4 &&
                                        clickLabels[i]+1}
                                        {i === 4 && <Icon as={ArrowRightIcon}/>}
                                    </Tab>
                                ))}
                        </TabList>
                    </Tabs>
                </div>
            </>
        )
    }
    
}

export default PageSelector