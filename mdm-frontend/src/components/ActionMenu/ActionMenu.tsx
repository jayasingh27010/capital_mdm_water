import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useContext } from "react"
import Colors from "src/Colors"
import { OPEN_ACTION_MODAL } from "src/actions/AppContextActions"
import { AppContext } from "src/contexts"
import Button from "../Button"

type ActionMenuProps = {
    label: string
    actions: any[]
}

const buttonStyle = {
    border: `1px solid ${Colors.primary}`,
    backgroundColor: Colors.primaryNegative,
    color: Colors.primary
}

const ActionMenu: React.FC<ActionMenuProps> = ({
    label,
    actions
}) => {
    const { dispatch } = useContext<any>(AppContext)

    const openActionModal = (actionId: string) => {
        dispatch({
            type: OPEN_ACTION_MODAL,
            payload: actionId
        })
    }

    if (actions.length > 1 || actions.length === 0)
        return (
            <Menu>
                <MenuButton
                    className="p-2 rounded"
                    style={buttonStyle}>
                    {label}
                </MenuButton>
                <MenuList zIndex="100000">
                    {actions.map((action: any) => {
                        return (
                        <MenuItem
                            onClick={() => openActionModal(action.id)}
                            key={action.id}>
                            {action.label}
                        </MenuItem>)
                    })}
                </MenuList>
            </Menu>
        )
    return (
        <Button
            onClick={() => openActionModal(actions[0].id)}
            style={buttonStyle}>
            {actions[0].label}
        </Button>
    )
} 

export default ActionMenu