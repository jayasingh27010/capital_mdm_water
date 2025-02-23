import { useCallback, useContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { INIT_TABLE, INIT_TABLE_WITH_FILTERS } from "src/actions/AppContextActions"
import { viewUserUsersTable } from "src/api/Pages/Users"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Card from "src/components/Card"
import Table from "src/components/Table"
import ReloadButton from "src/components/TableComponents/ReloadButton"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { AppContext } from "src/contexts"

const tableId = "userUsersTable"

const UserUsersTable: React.FC = () => {
    const routeData: any = useLoaderData()
    const [id, setId] = useState<any>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [defaultFilters, setDefaultFilters] = useState<any>({})
    const [data, setData] = useState<any>(undefined)
    const [loaded, setLoaded] = useState<any>(false)
    const { dispatch } = useContext<any>(AppContext)

    const apiReference = useCallback((filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewUserUsersTable({id, filters})
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
        dispatch({
            type: INIT_TABLE,
            payload: tableId
        })
    }, [id])

    useEffect(() => {
        if (!loaded) {
            setLoaded(false)
            setIsLoading(true)
            viewUserUsersTable({id, filters: {}})
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
        }
    }, [data, isLoading])


    useEffect(() => {
        dispatch({
            type: INIT_TABLE_WITH_FILTERS,
            payload: {
                tableId,
                filters: defaultFilters
            }
        })
    }, [defaultFilters])

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
                        enableQuickSeach={true}
                        defaultFilters={defaultFilters}
                        tableId={tableId}
                        apiReference={apiReference}/>
                </>}
            </div>
        </Card>
    )
}

export default UserUsersTable