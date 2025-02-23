import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { CLEAR_ALL_SELECTIONS, INIT_TABLE } from "src/actions/AppContextActions"
import { viewAllMetersTableForDeviceConfig } from "src/api/Pages/DevConfig"
import Colors from "src/Colors"
import Table from "src/components/Table"
import { AppContext } from "src/contexts"
import AllMetersTable from "src/pages/AdminPages/Meters/Widgets/AllMetersTable"
import { getTableSelections, useSelector } from "src/selectors"

interface MeterSelectionProps {
    meters: any[],
    setMeters: (meters: any) => void
}

const viewAndSelectMetersTableId = "allMetersTable2"
const metersSelectionTableId = "metersSelectionTable"

const MeterSelection: React.FC<MeterSelectionProps> = ({
    meters,
    setMeters
}) => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const selector = useSelector()
    const tableSelections = selector(getTableSelections(viewAndSelectMetersTableId))
    const [originalMeters, setOriginalMeters] = useState<any>([])
    const { dispatch } = useContext<any>(AppContext)


    
    useEffect(() => {
        if (!loaded) {
            viewAllMetersTableForDeviceConfig({
                currPage: 1,
                perPage: 1000
            })
            .then(({ data }: any) => {
                setLoaded(true)
                setOriginalMeters(data.data.rows)
                // data.data.rows
            })
        }
    }, [loaded])

    const meterSelectionApiReference = useCallback((_: any): Promise<any> => {
        let rows: any[] = JSON.parse(JSON.stringify(meters))

        return new Promise((resolve) => {
            resolve({
                columns: {
                    order: [
                        "meterSerialNo",
                        "action"
                    ],
                    meterSerialNo: {
                        label: "Meter Serial No",
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
                                        handleRemoveMeter(row.id)
                                    }}
                                    icon={
                                        <DeleteIcon/>
                                    } />
                            )
                        }
                    }
                },
                rowData: rows,
                totalRecords: rows.length
            })
        })
    }, [meters])
    

    const handleRemoveMeter = useCallback((id: string) => {
        setMeters(meters.filter(meter => meter.id !== id))
        dispatch({
            type: INIT_TABLE,
            payload: "metersSelectionTable"
        })
    }, [meters])

    const addToSelection = useCallback(() => {
        const addableMeters: any[] = []
        const toBeAddedMeters = tableSelections.map((id: string) => ({
            id,
            meterId: id,
            meterSerialNo: originalMeters?.find((m: any) => m.id === id)?.meterSerialNo?.label,
            moduleNo: originalMeters?.find((m: any) => m.id === id)?.moduleNo,
        }))
        toBeAddedMeters.forEach((meter: any) => {
            if (!meters.find(meter1 => meter.id === meter1.id)) {
                addableMeters.push(meter)
            }
        });
        setMeters(meters.concat(addableMeters))
        dispatch({
            type: CLEAR_ALL_SELECTIONS,
            payload: {
                tableId: viewAndSelectMetersTableId
            }
        })
        dispatch({
            type: INIT_TABLE,
            payload: "metersSelectionTable"
        })
    }, [tableSelections, originalMeters, meters])

    useEffect(() => {
        console.log("meters", meters)
    }, [meters])

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
            <AllMetersTable tableId={viewAndSelectMetersTableId} showCheckbox={true}/>
            {meters.length === 0 &&
                <div className="py-4">
                    <h3 className="pt-2">No Meters Selected...</h3>
                    <p>Click On "Add To Selection" Button To Select Selected Meters</p>
                </div>
            }
            {meters.length !== 0 &&
                <div className="py-2">
                    <h3 className="pt-2">Selected Meters ({meters.length}) </h3>
                    <Table
                        tableId={metersSelectionTableId}
                        defaultFilters={{
                            perPage: 5,
                            currPage: 1
                        }}
                        noFooter={true}
                        apiReference={meterSelectionApiReference} />
                </div>}
        </div>
    )
}

export default MeterSelection
