import Text from "src/components/Text";
import Routes from "src/Routes";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import AccountRecovery from "src/components/AccountRecovery";
import RecoveryButton from "src/components/RecoveryButton";
const AccountRecoveryPage = () => {
    const navigate = useNavigate()


    // const handleEmailRecovery = () => {
    //     navigate(Routes.EmailRecovery)
    // }
    const handleUsernameRecovery = () => {
        navigate(Routes.UsernameRecovery)
    }


    return (
        <AccountRecovery>
            <Text
                className="mt-2"
                textAlign="center"
                color="black"
                fontSize="md"
                fontWeight="300">
                Account Recovery Options
            </Text>
            <Flex direction="column" justifyContent='space-around' alignItems='center'>
                {/* <RecoveryButton label='Remember your Account Linked Email?' iconName="Mail" onClick={handleEmailRecovery} /> */}
                <RecoveryButton label='Remember you Account username?' iconName="person" onClick={handleUsernameRecovery} />
            </Flex>
        </AccountRecovery>
    )

}
export default AccountRecoveryPage;