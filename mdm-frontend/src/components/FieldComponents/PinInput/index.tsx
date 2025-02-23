import { PinInput as ChakraPinInput, PinInputField } from "@chakra-ui/react"
import { InputProps } from "../types"
import { useState } from "react"

const PinInput: React.FC<InputProps> = ({
    value,
    onChange,
    numDigits = 6
}) => {
    const [val, setVal] = useState<any>(value)
    const handleChange = (value: string) => {
        setVal(value)
        onChange && onChange(value)
    }

    const pinInputStyles: any = {
        borderRadius: '12px',
        margin: '0px 5px'
    }

    // useEffect(() => {
    //     ref?.current?.focus()
    // }, [])

    return (
        <div
            className="pin-input-container d-flex flex-row justify-content-center mb-3">
            <ChakraPinInput size='sm' value={val} onChange={handleChange}>
                {Array(numDigits)
                    .fill(1)
                    .map((_, i) => i)
                    .map((i) => {
                        if (i === 0)
                        return (<PinInputField
                            autoFocus
                            key={i}
                            style={pinInputStyles} />)
                        return (<PinInputField
                            key={i}
                            style={pinInputStyles} />)
                    })
                }
            </ChakraPinInput>
        </div>
    )
}

export default PinInput