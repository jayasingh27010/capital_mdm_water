import { Input } from "@chakra-ui/react"
import { InputProps } from "../types"
import { useEffect, useRef, useState } from "react"

const TextInput: React.FC<InputProps> = ({
    type,
    value,
    disabled = false,
    isInvalid = false,
    onChange,
    onEnterPress,
    onClick,
    isOpen = false
}) => {
    const ref: any = useRef(null)
    const [val, setVal] = useState<any>(value)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setVal(newValue)
        onChange && onChange(newValue)
    }

    useEffect(() => {
        setVal(value)
    }, [value])


    return <Input
        ref={ref}
        onBlurCapture={() => {
            isOpen && ref.current.focus()
        }}
        isInvalid={isInvalid}
        type={type}
        onChange={handleChange}
        onKeyUp={e => {
            if (e.code === "Enter") {
                onEnterPress?.()
            }
        }}
        onClick={e => onClick?.(e)}
        value={val}
        disabled={disabled}/>
}

export default TextInput