import { Switch } from "@chakra-ui/react"
import { SwitchInputProps } from "src/components/ComponentTypes"

const SwitchInput: React.FC<SwitchInputProps> = (props) => {
    return (
        <div className="d-flex align-items-center pb-0">
            <Switch {...props}/>
        </div>
    )
}

export default SwitchInput