import { Box } from "@chakra-ui/react";
import './style.css'
import { getIcon } from "src/assets/SvgIcons/IconMap";
export interface RecoveryButtonProps {
    label: string,
    iconName: string,
    onClick: () => void
}
const RecoveryButton: React.FC<RecoveryButtonProps> = ({
    label,
    iconName,
    onClick
}) => {

    return (
        <Box mt={4} p={1} border='2px solid #00ADEF' borderRadius='10px' boxSizing="border-box">
            <button className='recovery-account-btn d-flex align-items-center fw-bold text-white'
                onClick={onClick}>
                <div>
                    {getIcon(`${iconName}`, { fill: 'white', width: '30px' })}
                </div>
                <div style={{ paddingLeft: '10px' }}>
                    {label}
                </div>
            </button>
        </Box>
    )
}
export default RecoveryButton;