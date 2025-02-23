export interface InputProps {
    type?: string;
    value?: any;
    onChange?: (value: any) => void;
    numDigits?: number;
    disabled?: boolean;
    isInvalid?: boolean
    onEnterPress?: () => void
    onClick?: (e: any) => void
    onFocus?: () => void
    ref?: any
    isOpen?: boolean
}

export interface DisplayProps {
    type?: string;
    link?: string;
    tableId?: string;
    tableFilters?: any;
    value: any,
    maxLength?: number
}