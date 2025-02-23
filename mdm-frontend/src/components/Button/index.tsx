import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonProps } from "src/components/ComponentTypes";


const Button: React.FC<ButtonProps> = (props) => {
    const isDisabled = props?.disabled ?? false;
    const opacityStyle = { opacity: isDisabled ? "0.3" : "1" };

    const style = props.hasOwnProperty("style")
        ? {
            ...props.style,
            ...opacityStyle,
        }
        : opacityStyle;

    return (
        <ChakraButton
            {...{
                ...props,
                style,
                isDisabled: isDisabled, 
            }}
        />
    );
};

export default Button;
