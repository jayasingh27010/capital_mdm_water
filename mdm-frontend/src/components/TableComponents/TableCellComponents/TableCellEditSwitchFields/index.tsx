import FieldList from "src/components/FieldList";

type TableCellEditSwitchFieldsProps = {
    fields: any;
    fieldData: any;
    onChange?: (fieldData: any) => void
}

const TableCellEditSwitchFields: React.FC<TableCellEditSwitchFieldsProps> = ({
    fields,
    fieldData,
    onChange
}) => {
    // const [isEditing, setIsEditing] = useState<boolean>(false)
    
    const handleChange = (fieldId: string, value: any) => {
        onChange?.({
            ...fieldData,
            [fieldId]: value
        })
        // setIsEditing(true)
    }

    return (
        <div className="widget details-widget widget-user-actions">
            <FieldList
                fields={fields}
                data={fieldData}
                onChange={handleChange}
                />
        </div>
    )
}

export default TableCellEditSwitchFields