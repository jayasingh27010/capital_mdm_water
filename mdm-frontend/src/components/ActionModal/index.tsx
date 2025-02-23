import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useContext } from "react"
import { CLOSE_ACTION_MODAL } from "src/actions/AppContextActions"
import { AppContext } from "src/contexts"
import { isActionModalOpen, useSelector } from "src/selectors"

type ActionModalProps = {
    size?: string,
    actionModalId: string,
    label: string,
    children?: React.ReactNode,
    isOkDisabled?: boolean,
    okBtnText?: string,
    onOk?: () => void
    minHeight?:string
}

const ActionModal: React.FC<ActionModalProps> = ({
    size = 'xl',
    actionModalId,
    label,
    children,
    isOkDisabled = true,
    okBtnText = "Save",
    onOk,
    minHeight
}) => {
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const isOpen = selector(isActionModalOpen(actionModalId))

    console.log(isOpen,"isOpen")
    const onClose = () => {
        dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: actionModalId
        })
    }

    const handleOkBtnClicked = () => [
        !isOkDisabled && onOk?.()
    ]

    return (
        <Modal
            motionPreset='scale'
            isOpen={isOpen} onClose={onClose} size={size}>
            <ModalOverlay/>
            <ModalContent minH={minHeight}>
                <ModalHeader>{label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button variant='ghost' mr={3} onClick={onClose}>
                    Close
                </Button>
                {!!onOk && <Button
                    style={{
                        opacity: (isOkDisabled) ? "0.3": "1"
                    }}
                    disabled={isOkDisabled}
                    onClick={handleOkBtnClicked}
                    colorScheme="blue">{okBtnText}</Button>}
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ActionModal