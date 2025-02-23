import { useEffect } from "react"
import { useLocation } from "react-router-dom"

type ScrollHereProps = {
    tableId: string
}
const ScrollHere: React.FC<ScrollHereProps> = ({
    tableId
}) => {
    const { hash } = useLocation()
    useEffect(() => {
        if (hash === `#${tableId}`) {
            document.getElementById(tableId)?.scrollIntoView()
        }
    }, [hash])

    return (
        <div id={tableId}></div>
    )
}

export default ScrollHere