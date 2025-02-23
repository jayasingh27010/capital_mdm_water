import React from 'react'
import Text from "src/components/Text";
import './style.css'
import Routes from "src/Routes";
import { useNavigate } from "react-router-dom";
import { getIcon } from "src/assets/SvgIcons/IconMap";
import AccountRecovery from "src/components/AccountRecovery";
import { Field } from "src/types";
import FieldList from "src/components/FieldList";
import { HStack, PinInput, PinInputField } from '@chakra-ui/react'
import Button from "src/components/Button";
import Colors from "src/Colors";
import { useState } from "react";
interface RecoveryOptionsProps {
    label: string,
    title: string,
    btnText: string
}

const AccountRecoveryOptions: React.FC<RecoveryOptionsProps> = ({
    label,
    title,
    btnText
}) => {
    const navigate = useNavigate()

    const handleBackToRecoveryPage = () => {
        navigate(Routes.AccountRecovery)
    }

    const fields: Field[] = [
        {
            id: "username",
            label: `${label}`,
            columnSize: 12,
            inputType: "textInput",
            required: true,
        }
    ]
    const [data, setData] = useState<any>({})
    const [isCollapsed, SetIsCollapsed] = useState<boolean>(true)
    const handleCollapse = () => {
        SetIsCollapsed(false)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
    const handleChange = (fieldId: string, value: any) => {
        setData({
            ...data,
            [fieldId]: value
        })
    }

    return (
        <AccountRecovery>
            <button className='back-to-recovery d-flex  align-items-center'
                onClick={handleBackToRecoveryPage}
            >
                {getIcon('BackArrow', { fill: Colors.primary, width: '20px' })}
                <div style={{ paddingLeft: '5px' }}>
                    Back to Recovery options
                </div>
            </button>
            <Text
                style={{
                    textAlign: "center",
                    color: "black",

                }}
                fontSize="sm"
                fontWeight="600">{title}</Text>

            <FieldList

                fields={fields}
                data={data}
                onChange={handleChange} />

            {(isCollapsed) ? (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Button

                                onClick={handleCollapse}
                                className="w-100 my-2"
                                bgColor={Colors.primary}
                                color={Colors.primaryNegative}
                                fontSize='12px'>
                                {btnText}
                            </Button>
                        </div>
                    </div>
                </div>
            )
                : (

                    <div className="container">
                        <Text
                            style={{
                                textAlign: "center",
                                color: "black",

                            }}
                            fontSize="12px"
                        >OTP Sent On Email {data?.username}  </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                color: '#00ADEF',
                                marginTop: '30px',
                                marginBottom: '4px'

                            }}
                            fontSize="10px"

                            fontWeight="800">Resend otp in 1min 50sec</Text>

                        <HStack my={3}>
                            <PinInput size='sm' placeholder='' >
                                <PinInputField borderRadius='12px' />
                                <PinInputField borderRadius='12px' />
                                <PinInputField borderRadius='12px' />
                                <PinInputField borderRadius='12px' />
                                <PinInputField borderRadius='12px' />
                                <PinInputField borderRadius='12px' />
                            </PinInput>
                        </HStack>
                        <div className="row">
                            <div className="col-12">
                                <Button
                                    type='submit'
                                    onClick={handleSubmit}
                                    className="w-100 my-2"
                                    bgColor={Colors.primary}
                                    color={Colors.primaryNegative}
                                    fontSize='12px'>
                                    submit otp
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </AccountRecovery>
    )

}
export default AccountRecoveryOptions;