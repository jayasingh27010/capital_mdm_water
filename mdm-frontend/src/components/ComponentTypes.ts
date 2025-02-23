import {
    ButtonProps as ChakraButtonProps,
    ImageProps as ChakraImageProps,
    TextProps as ChakraTextProps,
    SpinnerProps as ChakaraSpinnerProps,
    SwitchProps
} from "@chakra-ui/react"
import { Field } from "src/types"
import { MenuItem } from "src/types"

export interface MenuItemProps extends MenuItem {
    className?: string
    isActive: boolean
    onClick: (id: string) => void
}

export interface ComponentProps {
    children?: React.ReactNode;
}

export interface CardProps extends ComponentProps {
    style?: any
}

export interface ImageProps extends ChakraImageProps {}
export interface TextProps extends ChakraTextProps {}
export interface FieldSingleProps extends Field {
    ref?: any
    link?: string;
    tableId?: string;
    tableFilters?: any;
    isInvalid: boolean,
    errorMessage?: string;
    value: any,
    onEnterPress?: () => void
    onChange?: (value: any) => void,
    onClick?: (e?: any) => void,
    isAutocomplete?: boolean;
    allowMultiple?: boolean;
    
}

export interface ButtonProps extends ChakraButtonProps {
    isDisabled?: boolean
}
export interface SwitchInputProps extends SwitchProps {}
export interface SpinnerProps extends ChakaraSpinnerProps {}
export interface BreadcrumbProps {
    displayName: string;
    isClickable: boolean;
    clickPath?: string
}
