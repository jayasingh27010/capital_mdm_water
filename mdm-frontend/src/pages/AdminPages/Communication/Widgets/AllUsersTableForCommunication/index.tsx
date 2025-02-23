import { useEffect, useState } from "react"
import { viewAllUsersTable } from "src/api/Pages/Users"
import Card from "src/components/Card"
import Table from "src/components/Table"
import TableFilters from "src/components/TableComponents/TableFilters"
import ReloadButton from "src/components/TableComponents/ReloadButton"
import { useApi } from "src/api"
import { viewAllUsersTableForCommunication } from "src/api/Pages/Communication"

//const tableId = "allUsersTable"
interface AllUsersTableProps {
    tableId?: string
    showCheckbox?: boolean
}
const AllUsersTableForCommunication: React.FC<AllUsersTableProps> = ({
    tableId = "allUsersTable2",
    showCheckbox = false
}) => {
    const { data, isLoading } = useApi(viewAllUsersTableForCommunication)
    const [filterConfig, setFilterConfig] = useState<any>(undefined)
    const [defaultFilters, setDefaultFilters] = useState<any>(undefined)
    const apiReference = (filters: any): Promise<any> => {
        return new Promise((resolve) => {
            viewAllUsersTableForCommunication(filters)
                .then(({ data }: any) => {
                    resolve({
                        columns: data.config.columns,
                        rowData: data.data.rows?.map((row: any) => ({ ...row, id: row.userId })),
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


    return (
        <Card>
            <div className="widget widget-all-users-table">
                {/* {isLoading && <WidgetSkeletonLoader numLines={15}/>} */}
                {!isLoading && data &&
                    <>
                        <div className="d-flex flex-row justify-content-center">
                            <p className="flex-grow-1" style={{ fontWeight: "700", fontSize: "20px" }}>
                                {data.config.label}
                            </p>
                            {filterConfig &&
                                <div className="me-2">
                                    <TableFilters filterConfig={filterConfig} tableId={tableId} />
                                </div>}
                            <div>
                                <ReloadButton tableId={tableId} />
                            </div>
                        </div>
                        <Table
                            showCheckbox={showCheckbox}
                            defaultFilters={defaultFilters}
                            enableQuickSeach={true}
                            tableId={tableId}
                            apiReference={apiReference} />
                    </>}
            </div>
        </Card>
    )
}

export default AllUsersTableForCommunication