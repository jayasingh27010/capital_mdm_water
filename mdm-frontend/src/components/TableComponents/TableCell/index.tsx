import { Td } from "@chakra-ui/react"
import TableCellLink from "../TableCellComponents/TableCellLink"
import TableCellEditText from "../TableCellComponents/TableCellEditText"
import TableCellEditSwitchFields from "../TableCellComponents/TableCellEditSwitchFields"
import { convertObjectToList } from "src/utility"

type TableCellProps = {
    index: number,
    showCheckbox?: boolean,
    isChecked?: boolean,
    setIsChecked?:(checked: boolean, id: string) => void,
    fetchKey?: string,
    fixed?: boolean,
    row: any,
    renderType: string,
    width?: string,
    render?: (row: any) => Element
    onChange?: (value: any) => void
}

const EMPTY_VAL = '-'

type TableCellInnerProps = {
    fetchKey?: string,
    row: any,
    renderType: string,
    render?: (row: any) => Element
    onChange?: (value: any) => void,
    width?: string
}

const fn = () => <>K</>

const TableCellInner: React.FC<TableCellInnerProps> = ({
    fetchKey,
    row,
    renderType,
    render = fn,
    onChange,
}) => {
    let value = EMPTY_VAL
    switch (renderType) {
        case "text":
            if (fetchKey && row?.[fetchKey])
                value = row?.[fetchKey]
            return value
        case "editableText":
            if (fetchKey && row?.[fetchKey])
                return (
                <TableCellEditText
                    value={row?.[fetchKey]}
                    onChange={onChange}/>)
            return value
        case "editableSwitchFields":
            if (fetchKey && row?.[fetchKey]){
                return (
                <TableCellEditSwitchFields
                    fields={convertObjectToList(row?.[fetchKey]?.config?.fields)}
                    fieldData={row?.[fetchKey]?.data}
                    onChange={onChange}/>)}
            return value
        case "link":
            if (fetchKey && row?.[fetchKey]) {
                return <TableCellLink {...row?.[fetchKey]}/>
            }
            return EMPTY_VAL
        case "customComponent":
            if (row) {
                return <>{render(row)}</>
            }
            return EMPTY_VAL
        default:
            return "No Render Method Available"
    }
}

const TableCell: React.FC<TableCellProps> = ({
    fixed = false,
    showCheckbox = false,
    index,
    isChecked,
    setIsChecked,
    width = "200px",
    ...tableCellInnerProps
}) => {
    return (
        <Td>
            <div style={{
                    width,
                    textWrap: "wrap"
                }}>
                {showCheckbox && index === 0 &&
                <input
                    type="checkbox"
                    style={{
                        border: "1px solid #c2c2c2",
                        width: "20px",
                        height: "20px",
                        padding: "0",
                        marginRight: "10px"
                    }}
                    onChange={() => setIsChecked?.(!(isChecked ?? false), tableCellInnerProps?.row?.id)}
                    checked={isChecked ?? false}
                    />}
                <TableCellInner {...tableCellInnerProps}/>
            </div>
        </Td>
    )
}

export default TableCell