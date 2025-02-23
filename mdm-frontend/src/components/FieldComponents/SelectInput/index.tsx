import { Menu, MenuButton, MenuItem, MenuList, Select, forwardRef } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "src/types";
import TextInput from "../TextInput";

const ForwardRefPlaceholder = forwardRef((props, ref) => {
    return (<div ref={ref} {...props}></div>)
})

interface SelectInputProps {
    value?: any;
    defaultOption?: any;
    selectOptions: SelectOption[]
    isInvalid?: boolean;
    isAutocomplete?: boolean;
    disabled?: boolean;
    allowMultiple?: boolean;
    onChange?: (value: any) => void;
}

const DEFAULT_OPTION = 'NONE'

const SelectInput: React.FC<SelectInputProps> = ({
    value,
    defaultOption = 'NONE',
    selectOptions,
    isInvalid = false,
    disabled = false,
    isAutocomplete = false,
    allowMultiple = false,
    onChange
}) => {
    const [selections, setSelections] = useState<string[]>([])
    const [selectedOption, setSelectedOption] = useState<any>(defaultOption)
    const [finalSelectOptions, setFinalSelectOptions] = useState<SelectOption[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [displayValue, setDisplayValue] = useState<string>("")
    useEffect(() => {
        console.log("value", selections)
        setSelections(Array.isArray(value) ? value: [defaultOption])
    }, [allowMultiple, value])

    useEffect(() => {
        const defaultOptionInOptions = selectOptions.find(option => option.value === selectedOption)?.value
        if (defaultOptionInOptions || selectOptions.length !== 0) {
            setFinalSelectOptions(selectOptions)
        } else {
            setFinalSelectOptions([{
                value: DEFAULT_OPTION,
                description: ''
            }, ...selectOptions])
        }

        if (defaultOptionInOptions) {
            setSelectedOption(defaultOptionInOptions)
        } else if (selectOptions.length > 0) {
            setSelectedOption(selectOptions[0]?.value)
        } else {
            setSelectedOption(DEFAULT_OPTION)
        }
    }, [selectOptions])

    useEffect(() => {
        if (allowMultiple) return;
        setSelectedOption(finalSelectOptions?.find(option => option.value === value)?.value)
    }, [value, finalSelectOptions, allowMultiple])

    useEffect(() => {
        if (allowMultiple) return;
        setDisplayValue(finalSelectOptions?.find(option => option.value === selectedOption)?.description ?? "")
    }, [selectedOption, allowMultiple])

    const handleChange = (e: any) => {
        if (allowMultiple) {
            e.preventDefault();
            return false;
        }
        const value = e.target.value
        // setSelectedOption(value)
        onChange?.(value)
    }

    useEffect(() => {
        if (!allowMultiple) {
            setSelectedOption(value)
        }
    }, [value, allowMultiple])
    
    const handleTextInputChange = useCallback((value: any) => {
        const finalValue = value.split("\\").join("")
        setDisplayValue(finalValue)
        setIsOpen(true)
        if (allowMultiple) {
            return
        }
        setSelectedOption(defaultOption)
        onChange?.("")
    }, [allowMultiple])

    useEffect(() => {
        const finalSelections = selections.filter(value => !['', '-', defaultOption].includes(value))
        if (finalSelections.length > 0 && allowMultiple) {
            setDisplayValue(finalSelections.map(value => finalSelectOptions.find(option => option.value === value)?.description).join(", ") + ", ")
        }
    }, [selections, allowMultiple])

    const search =  useCallback((query: string, option: any) => {
        if (!allowMultiple) {
            return option.description.match(new RegExp(query, "i")) || option.value === '-'
        } else {
            const finalQueryTerm = query.split(", ").pop() ?? ""
            return option.description.match(new RegExp(finalQueryTerm, "i")) || option.value === '-'
        }
    }, [allowMultiple])

    if (!isAutocomplete)
    return (
        <Select
            size="md"
            
            isInvalid={isInvalid}
            disabled={disabled}
            value={selectedOption}
            onChange={handleChange}>
            {finalSelectOptions.map((currOption) => {
                return (
                    <option
                        key={currOption.value}
                        value={currOption.value}>
                        {currOption.description}
                    </option>
                )
            })}
        </Select>
    )

    return (
        <>
            <TextInput
                /// <reference path="" />
                isOpen={isOpen}
                type="text"
                isInvalid={isInvalid}
                disabled={disabled}
                onEnterPress={() => setIsOpen(false)}
                onChange={handleTextInputChange}
                value={displayValue}
            />
            <Menu
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(allowMultiple)
                }}>
                <MenuButton
                    style={{
                        height: '1px',
                        width: '100%'
                    }}
                    as={ForwardRefPlaceholder}>
                </MenuButton>
                <MenuList>
                {finalSelectOptions
                .filter(option => selections.includes(option.value))
                .map((currOption) => {
                    return (
                        <MenuItem
                            style={{
                                backgroundColor: "#c2c2c2"
                            }}
                            onClick={() => {
                                if (selections.includes(currOption.value)) {
                                    onChange?.(selections.filter((sel) => sel !== currOption.value))
                                }
                            }}
                            key={currOption.value}>
                            {currOption.description}
                        </MenuItem>
                    )
                })}
                {finalSelectOptions
                .filter((option) => search(displayValue, option))
                .filter(option => !selections.includes(option.value))
                .slice(0, 5)
                .map((currOption) => {
                    return (
                        <MenuItem
                            onClick={() => {
                                if (allowMultiple) {
                                    onChange?.([...selections, currOption.value])
                                    return;
                                }
                                setSelectedOption(currOption.value)
                                onChange?.(currOption.value)
                            }}
                            key={currOption.value}>
                            {currOption.description}
                        </MenuItem>
                    )
                })}
                </MenuList>
            </Menu>
        </>
    )
}

export default SelectInput