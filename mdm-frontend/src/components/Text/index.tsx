import { Text as ChakraText } from "@chakra-ui/react"
import { TextProps } from "../ComponentTypes"


const Text: React.FC<TextProps> = props => {
    const  { children } = props
    return <ChakraText {...props}>{children}</ChakraText>
}

export default Text