import { useContext } from "react"
import Colors from "src/Colors"
import { getIcon } from "src/assets/SvgIcons/IconMap"
import Text from "src/components/Text"
import { AppContext } from "src/contexts"

const AppBarAccountInfo: React.FC = () => {
    const { context } = useContext<any>(AppContext)
    return (
        <div className="app-bar-acc-info d-flex py-1 ps-2 pe-3 m-3 flex-row gap-2">
            <div
                className="d-flex">
                {getIcon('personCircle', {fill: "#FFF", width: '40px'})}
            </div>
            <div className="d-flex flex-column">
                <Text
                    fontSize="small"
                    className="mb-0"
                    textAlign="center"
                    color={Colors.primaryNegative}>{context?.userInfo?.accountTypeDescription}</Text>
                <Text
                    fontSize="small"
                    fontWeight="bold"
                    className="mb-0"
                    color={Colors.primaryNegative}>{context?.userInfo?.firstName} {context?.userInfo?.lastName}</Text>
            </div>
        </div>
    )
}

export default AppBarAccountInfo