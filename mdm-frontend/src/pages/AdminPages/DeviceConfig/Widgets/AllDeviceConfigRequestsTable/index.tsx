import { useEffect, useState, useCallback } from "react"
// import { INIT_TABLE_WITH_FILTERS } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Card from "src/components/Card"
import Table from "src/components/Table"
import TableFilters from "src/components/TableComponents/TableFilters"
import ReloadButton from "src/components/TableComponents/ReloadButton"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
// import { AppContext } from "src/contexts"
import { viewAllDeviceConfigRequestsTable } from "src/api/Pages/DevConfig"
import DownloadCSV from "src/components/TableComponents/DownloadCSV"

const tableId = "allDeviceConfigRequestsTable"

const AllDeviceConfigRequestsTable: React.FC = () => {
    const { data, isLoading } = useApi(viewAllDeviceConfigRequestsTable)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [filterConfig, setFilterConfig] = useState<any>(undefined)
    // const { dispatch } = useContext<any>(AppContext)
    const apiReference = (filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewAllDeviceConfigRequestsTable(filters)
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

    
    const csvLoadableApi = useCallback((filters: any) => {
        return viewAllDeviceConfigRequestsTable(filters)
    }, [])

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
                        <div className="flex-grow-1" style={{fontWeight: "700", fontSize: "20px"}}>
                            <div className='d-flex align-items-center '>
                               <p>{getIcon('Link', { fill: 'black', width: '20px' })} </p>
                               <p className="px-2">{data.config.label}</p>
                            </div>
                            
                        </div>
                        <div className="me-2">
                            <DownloadCSV
                                api={csvLoadableApi}
                                tableId={tableId}
                            />
                        </div>
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

export default AllDeviceConfigRequestsTable