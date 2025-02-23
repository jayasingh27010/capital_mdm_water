import { useCallback, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
// import { INIT_TABLE_WITH_FILTERS } from "src/actions/AppContextActions"
import { viewMeterRechargesTable } from "src/api/Pages/Consumers"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Card from "src/components/Card"
import Table from "src/components/Table"
import ReloadButton from "src/components/TableComponents/ReloadButton"
import TableFilters from "src/components/TableComponents/TableFilters"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import DownloadCSV from "src/components/TableComponents/DownloadCSV"
// import { AppContext } from "src/contexts"

const tableId = "meterRechargesTable"

const MeterRechargesTable: React.FC = () => {
    const routeData: any = useLoaderData()
    const [id, setId] = useState<any>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [filterConfig, setFilterConfig] = useState<any>(undefined)
    const [data, setData] = useState<any>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)
    // const { dispatch } = useContext<any>(AppContext)
    const apiReference = useCallback((filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewMeterRechargesTable({id, filters})
            .then(({ data }: any) => {
                resolve({
                    columns: data.config.columns,
                    rowData: data.data.rows,
                    totalRecords: data.data.totalRecords
                })
            })
        })
    }, [id])

    useEffect(() => {
        if (routeData?.config?.id) {
            setId(routeData?.config?.id)
        }
    }, [routeData])

    useEffect(() => {
        if (!loaded) {
            setIsLoading(true)
            viewMeterRechargesTable({id, filters: {}})
            .then(({ data }: any) => {
                setData(data)
            })
            .finally(() => {
                setIsLoading(false)
                setLoaded(true)
            })
        }
        if (!isLoading && data) {
            setDefaultFilters(data.config.defaultFilters)
            setFilterConfig(data.config.filterConfig)
        }
    }, [data, isLoading])

    const csvLoadableApi = useCallback((filters: any) => {
        return viewMeterRechargesTable({id, filters})
    }, [id])


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
                        defaultFilters={defaultFilters}
                        tableId={tableId}
                        apiReference={apiReference}/>
                </>}
            </div>
        </Card>
    )
}

export default MeterRechargesTable