import { ImageProps } from "../ComponentTypes"
import { Image as ChakraImage } from "@chakra-ui/react"

const Image: React.FC<ImageProps> = props => {
    return <ChakraImage {...props}/>
}

export default Image