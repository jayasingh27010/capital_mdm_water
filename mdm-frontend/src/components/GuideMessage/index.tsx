import { Alert, AlertIcon } from "@chakra-ui/react"
import Spinner from "../Spinner"

export type GuideMessageProps = {
    messageType?: "info" | "warning" | "success" | "error" | "loading" | undefined,
    guideMessage?: string | string[],
    isLoading?: boolean
}

const GuideMessage: React.FC<GuideMessageProps> = ({
    messageType = "warning",
    guideMessage,
    isLoading = false,
}) => {
    if (guideMessage)
        return (
            <Alert status={messageType ?? "info"}>
                {isLoading ?
                <div className="px-2">
                    <Spinner
                        thickness="1px"
                        size="sm"/>
                </div> :<AlertIcon />}
                {guideMessage}
            </Alert>
        )
    return (<></>)
}

export default GuideMessage