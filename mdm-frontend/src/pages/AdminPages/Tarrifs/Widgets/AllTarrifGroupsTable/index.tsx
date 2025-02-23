import {  useEffect, useState } from "react"
// import { INIT_TABLE_WITH_FILTERS } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import Card from "src/components/Card"
import Table from "src/components/Table"
import TableFilters from "src/components/TableComponents/TableFilters"
import ReloadButton from "src/components/TableComponents/ReloadButton"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"-
// import { AppContext } from "src/contexts"
import { viewAllTarrifGroupsTable } from "src/api/Pages/Tarrifs"

const tableId = "allTarrifGroupsTable"

const AllTarrifGroupsTable: React.FC = () => {
    const { data, isLoading } = useApi(viewAllTarrifGroupsTable)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [filterConfig, setFilterConfig] = useState<any>(undefined)
    // const { dispatch } = useContext<any>(AppContext)
    const apiReference = (filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewAllTarrifGroupsTable(filters)
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

    return (
        <Card>
            <div className="widget widget-all-users-table">
                {/* {isLoading && <WidgetSkeletonLoader numLines={15}/>} */}
                {!isLoading && data &&
                <>
                    <div className="d-flex flex-row justify-content-center">
                        <p className="flex-grow-1" style={{fontWeight: "700", fontSize: "20px"}}>
                            {data.config.label}
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
                        enableQuickSeach={true}
                        defaultFilters={defaultFilters}
                        tableId={tableId}
                        apiReference={apiReference}/>
                </>}
            </div>
        </Card>
    )
}

export default AllTarrifGroupsTable