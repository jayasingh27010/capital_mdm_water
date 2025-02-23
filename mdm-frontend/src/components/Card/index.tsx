import { CardBody, Card as ChakraCard } from "@chakra-ui/react"
import { CardProps } from "../ComponentTypes"

const Card: React.FC<CardProps> = ({
    style,
    children
}) => {
    return (
        <ChakraCard style={style ?? {}}>
            <CardBody>
                {children}
            </CardBody>
        </ChakraCard>
    )
}

export default Card