
import { Field } from "./type";
import FieldSingle from "../FieldSingle";



export interface FieldListProps {
    fields: Field[];
    data: any;
    validations?: (fieldId: string) => { isValid: boolean; errorMessage?: string };
    onChange?(fieldId: string, value: any): void;
    onEnterPress?(fieldId: string): void
    ref?: any
    onClick?(e?: any): void
}

const FieldList: React.FC<FieldListProps> = ({
    fields,
    data,
    // validations = () => false,
    // for Guide message
    validations = () => ({ isValid: true }),
    onChange,
    onEnterPress,
    onClick,
    ref
}) => {
    const handleOnChange = (fieldId: string, value: any) => {
        onChange && onChange(fieldId, value)
    }


    const getValue = (dataObj: any) => {
        if (dataObj.hasOwnProperty("value")) {
            return dataObj.value
        }
        return dataObj
    }

    const getLink = (dataObj: any) => {
        return dataObj.hasOwnProperty("link") ? dataObj.link : ""
    }

    const getTableId = (dataObj: any) => {
        return dataObj.hasOwnProperty("tableId") ? dataObj.tableId : ""
    }

    const getTableFilters = (dataObj: any) => {
        return dataObj.hasOwnProperty("tableFilters") ? dataObj.tableFilters : ""
    }

    return (
        <div className="container">
            <div className="row ">
                {fields && fields.map((field: Field) => {
                   const validationResult = validations(field.id);
                   const { isValid = false, errorMessage = '' } = validationResult.isValid === false
                     ? validationResult
                     : { isValid: true };
                    return(
                    <FieldSingle
                        ref={ref}
                        key={field.id}
                        {...field}
                        tableId={getTableId(data?.[field.id] ?? {})}
                        tableFilters={getTableFilters(data?.[field.id] ?? {})}
                        link={getLink(data?.[field.id] ?? {})}
                        isInvalid={!isValid}
                        value={getValue(data?.[field.id] ?? "")}
                        onEnterPress={() => onEnterPress?.(field.id)}
                        onClick={(e) => onClick?.(e)}
                        onChange={(value: any) => handleOnChange(field.id, value)}
                        errorMessage={errorMessage} 
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default FieldList