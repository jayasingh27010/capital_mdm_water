import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Button from "src/components/Button";
import TextInput from "src/components/FieldComponents/TextInput";

type TableCellEditTextProps = {
    value: string;
    onChange?: (value: string) => void
}

const style = {
    cursor: "pointer"
}

const TableCellEditText: React.FC<TableCellEditTextProps> = ({
    value,
    onChange
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingValue, setEditingValue] = useState<string>(value)

    useEffect(() => {
        setEditingValue(value)
    }, [value])

    const handleTextInputChange = (value: string) => {
        setEditingValue(value)
    }

    const propagateValue = useCallback(() => {
        onChange?.(editingValue)
        setIsEditing(false)
    }, [editingValue])

    if (isEditing) {
        return (
            <div className="d-flex flex-row align-items-center justify-content-center">
                <TextInput
                    value={editingValue}
                    onChange={handleTextInputChange}
                />
                <Button
                    className="mx-1"
                    size="sm"
                    onClick={propagateValue}>
                    <Icon as={CheckIcon}/>
                </Button>
                <Button
                    size="sm"
                    onClick={() => setIsEditing(false)}>
                    <Icon as={CloseIcon}/>
                </Button>
            </div>
        )
    }
    return (
        <span
            style={style}
            onClick={() => setIsEditing(true)}>
            {value}
        </span>
    )
}

export default TableCellEditText