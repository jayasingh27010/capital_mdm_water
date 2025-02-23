import { Spinner as ChakraSpinner } from "@chakra-ui/react"

type SpinnerProps = {
    size?: string,
    thickness?: string
}

const Spinner: React.FC<SpinnerProps> = ({
    size = "xl",
    thickness = "4px"
}) => {
    return (
        <ChakraSpinner
            thickness={thickness}
            speed='2s'
            emptyColor='gray.200'
            color='blue.500'
            size={size}
        />
    )
}

export default Spinner