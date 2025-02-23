import { useContext } from "react"
import { INIT_TABLE } from "src/actions/AppContextActions"
import { SVGIcon } from "src/assets/SvgIcons/IconMap"
import Button from "src/components/Button"
import { AppContext } from "src/contexts"

type ReloadButtonProps = {
    tableId: string
}

const ReloadButton: React.FC<ReloadButtonProps> = ({
    tableId
}) => {
    const { dispatch } = useContext<any>(AppContext)

    const reload = () => {
        dispatch({
            type: INIT_TABLE,
            payload: tableId
        })
    }
    return (
        <Button size="sm" onClick={reload}>
            <SVGIcon className="p-1" iconName="Refresh"/>
        </Button>
    )
}

export default ReloadButton