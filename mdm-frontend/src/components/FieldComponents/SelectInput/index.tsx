import { Menu, MenuButton, MenuItem, MenuList, Select, forwardRef } from "@chakra-ui/react"
import { useEffect, useState } from "react";
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
    onChange
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(defaultOption)
    const [finalSelectOptions, setFinalSelectOptions] = useState<SelectOption[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [displayValue, setDisplayValue] = useState<string>("")


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
        setSelectedOption(finalSelectOptions?.find(option => option.value === value)?.value)
    }, [value, finalSelectOptions])

    useEffect(() => {
        setDisplayValue(finalSelectOptions?.find(option => option.value === selectedOption)?.description ?? "")
    }, [selectedOption])

    const handleChange = (e: any) => {
        const value = e.target.value
        setSelectedOption(value)
        onChange?.(value)
    }

    const handleTextInputChange = (value: any) => {
        const finalValue = value.split("\\").join("")
        setDisplayValue(finalValue)
        setSelectedOption(defaultOption)
        onChange?.("")
        setIsOpen(true)
    }

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
                onChange={handleTextInputChange}
                value={displayValue}
            />
            <Menu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}>
                <MenuButton
                    style={{
                        height: '1px',
                        width: '100%'
                    }}
                    as={ForwardRefPlaceholder}>
                </MenuButton>
                <MenuList>
                {finalSelectOptions
                .filter((option) => option.description.match(new RegExp(displayValue, "i")) || option.value === '-')
                .slice(0, 5)
                .map((currOption) => {
                    return (
                        <MenuItem
                            onClick={() => {
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