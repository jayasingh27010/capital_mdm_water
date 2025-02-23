import React, { useEffect, useState } from "react"
import Card from "src/components/Card";
import Image from "src/components/Image";
import Text from "src/components/Text";
const SizingStyles: Record<string, string> = {
    logoMaxWidth: '100px',
    formMaxWidth: '380px'
}
import './style.css'
import Routes from "src/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { SVGIcon } from "src/assets/SvgIcons/IconMap";
import Colors from "src/Colors";
interface accountRecoveryProps {
    children: React.ReactNode
}


const BackToRecoveryBtn: React.FC = () => {
    const navigate = useNavigate()
    const handleBackToRecoveryPage = () => {
        navigate(Routes.AccountRecovery)
    }

    return (
        <button
            className='d-flex align-items-center ps-1'
            style={{
                color: Colors.primary,
                fontWeight: '600'
            }}
            onClick={handleBackToRecoveryPage}
        >
            <SVGIcon
                className="me-1"
                iconName="BackArrow"
                fill={Colors.primary}
                width="20px"/>
                Back to Recovery options
        </button>
    )
}

const AccountRecovery: React.FC<accountRecoveryProps> = ({ children }) => {
    const navigate = useNavigate()
    const handleSignIn = () => {
        navigate(Routes.login)
    }
    const { pathname } = useLocation()
    const [isBackBtnVisible, setIsBackBtnVisible] = useState<boolean>(false)

    useEffect(() => {
        setIsBackBtnVisible(pathname !== Routes.AccountRecovery)
    }, [pathname])

    return (
        <div className="login-page-wrapper2">
            <Card>
                <div className="p-3">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <div style={{ maxWidth: SizingStyles.logoMaxWidth }}>
                            <Image src="/assets/capital-logo.png" />
                        </div>
                    </div>
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#06aeef",
                            textShadow: "0px 0px 1px #000000"
                        }}
                        fontSize="sm"
                        fontStyle="italic"
                        fontWeight="600">A Step Ahead</Text>
                    {isBackBtnVisible && <BackToRecoveryBtn/>}
                    {children}
                    <Text
                        style={{
                            textAlign: "center",
                            color: '#A0AEC0',
                            marginTop: '30px',
                            marginBottom: '4px'

                        }}
                        fontSize="12px"
                        fontWeight="600">Already remember your credentials?</Text>
                    <div style={{
                        textAlign: 'center',
                        color: '#00ADEF',
                        fontSize: '12px',

                    }}>
                        <button onClick={handleSignIn} style={{ fontWeight: '600' }}>Sign In</button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default AccountRecovery;