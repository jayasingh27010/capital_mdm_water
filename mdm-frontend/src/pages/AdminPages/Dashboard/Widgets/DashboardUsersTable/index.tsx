import { useEffect, useState } from "react"
// import { INIT_TABLE_WITH_FILTERS } from "src/actions/AppContextActions"
import { useApi } from "src/api"
import { viewDashboardUsersTable } from "src/api/Pages/Dashboard"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Card from "src/components/Card"
import Table from "src/components/Table"
import ReloadButton from "src/components/TableComponents/ReloadButton"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
// import { AppContext } from "src/contexts"

const tableId = "dashboardUsersTable"

const DashboardUsersTable: React.FC = () => {
    const { data, isLoading } = useApi(viewDashboardUsersTable)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    // const { dispatch } = useContext<any>(AppContext)
    const apiReference = (filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewDashboardUsersTable(filters)
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
                        <div className="flex-grow-1" style={{fontWeight: "700", fontSize: "20px"}}>
                            <div className='d-flex align-items-center '>
                               <p>{getIcon('Link', { fill: 'black', width: '20px' })} </p>
                               <p className="px-2">{data.config.label}</p>
                            </div>
                            
                        </div>
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

export default DashboardUsersTable