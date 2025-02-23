import {useEffect, useState } from "react"
// import { INIT_TABLE_WITH_FILTERS } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewAllMetersTable } from "src/api/Pages/Meters"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Card from "src/components/Card"
import Table from "src/components/Table"
import TableFilters from "src/components/TableComponents/TableFilters"
import ReloadButton from "src/components/TableComponents/ReloadButton"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
// import { AppContext } from "src/contexts"
// import { getTableState, useSelector } from "src/selectors"



interface AllMetersTableProps {
    tableId?: string
    showCheckbox?: boolean
}

const AllMetersTable: React.FC<AllMetersTableProps> = ({
    tableId = "allMetersTable",
    showCheckbox = false,
}) => {
    const { data, isLoading } = useApi(viewAllMetersTable)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [filterConfig, setFilterConfig] = useState<any>(undefined)
    // const { dispatch } = useContext<any>(AppContext)
    // const selector = useSelector()
    // const tableState = selector(getTableState(tableId))

    const apiReference = (filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewAllMetersTable(filters)
            .then(({ data }: any) => {
                resolve({
                    columns: data.config.columns,
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

    // useEffect(() => {
    //     console.log("table state from allMetersTable", tableState)
    // }, [tableState])

    return (
        <Card>
            <div className="widget widget-all-users-table">
                {/* {isLoading && <WidgetSkeletonLoader numLines={15}/>} */}
                {!isLoading && data &&
                <>
                    <div className="d-flex flex-row justify-content-center">
                        <p className="flex-grow-1" style={{fontWeight: "700", fontSize: "20px"}}>
                            <div className='d-flex align-items-center '>
                               <p>{getIcon('speedometer', { fill: 'black', width: '20px' })} </p>
                               <p className="px-2">{data.config.label}</p>
                            </div>
                            
                        </p>
                        {filterConfig &&
                        <div className="me-2">
                            <TableFilters filterConfig={filterConfig} tableId={tableId}/>
                        </div>}
                        <div>
                            <ReloadButton tableId={tableId}/>
                        </div>
                    </div>
                    <Table
                        showCheckbox={showCheckbox}
                        enableQuickSeach={true}
                        defaultFilters={defaultFilters}
                        tableId={tableId}
                        apiReference={apiReference}/>
                </>}
            </div>
        </Card>
    )
}

export default AllMetersTable