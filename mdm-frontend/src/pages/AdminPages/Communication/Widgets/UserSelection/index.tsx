import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { CLEAR_ALL_SELECTIONS, INIT_TABLE } from "src/actions/AppContextActions"
import { viewAllUsersTableForCommunication } from "src/api/Pages/Communication"
//import { viewAllMetersTableForDeviceConfig } from "src/api/Pages/DevConfig"
import Colors from "src/Colors"
import Table from "src/components/Table"
import { AppContext } from "src/contexts"
//import AllMetersTable from "src/pages/AdminPages/Meters/Widgets/AllMetersTable"
//import AllUsersTable from "src/pages/AdminPages/Users/Widgets/AllUsersTable"
import { getTableSelections, useSelector } from "src/selectors"
import AllUsersTableForCommunication from "../AllUsersTableForCommunication"

interface UserSelectionProps {
    users: any[],
    setUsers: (meters: any) => void,
    action?: string
}

const viewAndSelectUsersTableId = "allUsersTable2"
const usersSelectionTableId = "usersSelectionTable"

const UserSelection: React.FC<UserSelectionProps> = ({
    users,
    setUsers,
    action
}) => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const selector = useSelector()
    const tableSelections = selector(getTableSelections(viewAndSelectUsersTableId))
    
    const [originalUsers, setOriginalUsers] = useState<any>([])
    const { dispatch } = useContext<any>(AppContext)
    


    useEffect(() => {
        if (!loaded) {
            viewAllUsersTableForCommunication({
                currPage: 1,
                perPage: 1000
            })
                .then(({ data }: any) => {
                    
                    setLoaded(true)

                    setOriginalUsers(data.data.rows?.map((row: any) => ({ ...row, id: row.userId })))
                    // data.data.rows
                })
        }
    }, [loaded])

    const userSelectionApiReference = useCallback((_: any): Promise<any> => {
        let rows: any[] = JSON.parse(JSON.stringify(users))

        return new Promise((resolve) => {
            resolve({
                columns: {
                    order: [
                        "userName",
                        "action"
                    ],
                    userName: {
                        label: "User Name",
                        renderType: "text"
                    },
                    action: {
                        label: "Action",
                        renderType: "customComponent",
                        render: (row: any) => {

                            return (
                                <IconButton
                                    aria-label="edit-btn"
                                    onClick={() => {
                                        handleRemoveUser(row.id)
                                    }}
                                    icon={
                                        <DeleteIcon />
                                    } />
                            )
                        }
                    }
                },
                rowData: rows,
                totalRecords: rows.length
            })
        })
    }, [users])


    const handleRemoveUser = useCallback((id: string) => {
        setUsers(users.filter(user => user.id !== id))
        dispatch({
            type: INIT_TABLE,
            payload: "usersSelectionTable"
        })
    }, [users])

    const addToSelection = useCallback(() => {
        const addableUsers: any[] = []
        const toBeAddedUsers = tableSelections.map((id: string) => ({
            id,
            userName: originalUsers?.find((u: any) => u.id === id)?.userName,
            email: originalUsers?.find((u: any) => u.id === id)?.email,
        }))
        console.log("toBeAddedUsers", toBeAddedUsers)
        toBeAddedUsers.forEach((user: any) => {
            if (!users.find(user1 => user.id === user1.id)) {
                addableUsers.push(user)
            }
        });
        console.log("toBeAddedUsers2", users.concat(addableUsers))

        setUsers(users.concat(addableUsers))
        dispatch({
            type: CLEAR_ALL_SELECTIONS,
            payload: {
                tableId: viewAndSelectUsersTableId
            }
        })
        dispatch({
            type: INIT_TABLE,
            payload: "usersSelectionTable"
        })
    }, [tableSelections, originalUsers, users])

    useEffect(() => {
        console.log("users", users)
    }, [users])
    useEffect(() => {
        console.log("action", action)
        setUsers([])
        dispatch({
            type: INIT_TABLE,
            payload: "usersSelectionTable"
        })
    }, [action])
    return (
        <div>
            <button
                className='d-flex align-items-center ps-1 my-2'
                style={{
                    color: Colors.primary,
                    fontWeight: '600'
                }}
                onClick={addToSelection}
            >
                Add To Selection
            </button>
            <AllUsersTableForCommunication tableId={viewAndSelectUsersTableId} showCheckbox={true} />
            {users.length === 0 &&
                <div className="py-4">
                    <h3 className="pt-2">No Users Selected...</h3>
                    <p>Click On "Add To Selection" Button To Select Selected Users</p>
                </div>
            }
            {users.length !== 0 &&
                <div className="py-2">
                    <h3 className="pt-2">Selected Users ({users.length}) </h3>
                    <Table
                        tableId={usersSelectionTableId}
                        defaultFilters={{
                            perPage: 5,
                            currPage: 1
                        }}
                        noFooter={true}
                        apiReference={userSelectionApiReference} />
                </div>}
        </div>
    )
}

export default UserSelection
