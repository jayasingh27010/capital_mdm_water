import { useEffect, useState } from "react"
import "./style.css"
import Card from "src/components/Card"
import Image from "src/components/Image"
import Text from "src/components/Text"
import { Field } from "src/types"
import FieldList from "src/components/FieldList"
import Button from "src/components/Button"
import Colors from "src/Colors"
import { useNavigate } from "react-router-dom"
import Routes from "src/Routes"
import { useApi } from "src/api"
import { getRecoveredAccount, resetPassword } from "src/api/ChangePassword"
import { SVGIcon } from "src/assets/SvgIcons/IconMap"
import { Box, useToast } from "@chakra-ui/react"
import GuideMessage from "src/components/GuideMessage"

const SizingStyles: Record<string, string> = {
    logoMaxWidth: '100px',
    formMaxWidth: '350px'
}

const getChangePasswordToken = () => localStorage.getItem('change-password-session-token') ?? ""

const ChangePasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false)
    const [guideMessage, setGuideMessage] = useState<string | undefined>(undefined)
    const [isInvalid, setIsInvalid] = useState(true)
    const toast = useToast()

    const { data: recAccData } = useApi(
        getRecoveredAccount,
        {
            changePasswordToken: getChangePasswordToken()
        }
    )

    const handleGoBackToSignIn = () => {
        navigate(Routes.login)
    }

    const resetPasswordPromise = () => {
        return new Promise((resolve, reject) => {
            setIsSubmitDisabled(true)
            setIsLoading(true)
            resetPassword({
                username: getChangePasswordToken(),
                password: data?.password
            })
                .then(() => {
                    navigate(Routes.login)
                    resolve(true)
                })
                .catch(() => {
                    reject(true)
                    //some error
                })
                .finally(() => setIsLoading(false))
        })
    }

    const handleResetBtnClick = (e: any) => {
        e.preventDefault()
        if (isSubmitDisabled || isLoading || isInvalid) {
            return
        }
        toast.promise(
            resetPasswordPromise(),
            {
                success: { title: 'Login!', description: 'Password Changed Successfully', duration: 3000 },
                loading: { title: 'Changing Password...', description: 'Please wait, while we change your password' },
                error: { title: 'Ooops!', description: 'Some error occured', duration: 3000}
            }
        )
    }

    const fields: Field[] = [
        {
            id: "password",
            label: "New Password",
            columnSize: 12,
            inputType: "passwordInput",
            required: true
        },
        {
            id: "passwordAgain",
            label: "New Password (Again)",
            columnSize: 12,
            inputType: "passwordInput",
            required: true
        }
    ]

    const [data, setData] = useState<any>({})

    const handleChange = (fieldId: string, value: any) => {
        setData({
            ...data,
            [fieldId]: value
        })
    }

    useEffect(() => {
        setIsInvalid((data?.password?.length ?? 0) < 8 || data?.password !== data?.passwordAgain)
    }, [data])

    useEffect(() => {
        if (!data.password) {
            return
        }
        if (data.password.length < 8) {
            setGuideMessage("Password must be atleast 8 characters long")
            return
        } else if (data.password !== data?.passwordAgain) {
            setGuideMessage("Passwords don't match")
            return
        }
        setGuideMessage(undefined)
    }, [data])

    return (
        <div className="login-page-wrapper">
            <Card>
                <div className="p-3">
                    <div className="d-flex flex-direction-row align-items-center justify-content-center">
                        <div style={{maxWidth: SizingStyles.logoMaxWidth}}>
                            <Image src="/assets/capital-logo.png"/>
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
                    {recAccData &&
                    <Box
                        className="my-4 p-1"
                        style={{maxWidth: SizingStyles.formMaxWidth}}
                        border='2px solid #00ADEF'
                        borderRadius='10px'>
                        <div className='recovery-account-display d-flex align-items-center flex-row'>
                            <div>
                                <SVGIcon
                                    iconName="personCircle"
                                    fill="white"
                                    width="40px"/>
                            </div>
                            <div className="flex-grow-1">
                                <Text
                                    className="mb-0"
                                    width="100%"
                                    color="white"
                                    textAlign="center"
                                    fontSize="18px">Discovered Account</Text>
                                <Text
                                    className="mb-0"
                                    width="100%"
                                    color="white"
                                    textAlign="center"
                                    fontSize="12px">{recAccData?.email}</Text>
                            </div>
                        </div>
                    </Box>}
                    <div style={{maxWidth: SizingStyles.formMaxWidth}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <GuideMessage guideMessage={guideMessage}/>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleResetBtnClick}>
                            <FieldList
                                fields={fields}
                                data={data}
                                onChange={handleChange}/>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitDisabled}
                                            className="w-100 my-2"
                                            bgColor={Colors.primary}
                                            color={Colors.primaryNegative}>
                                                Reset Password
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex flex-direction-row justify-content-center">
                            <Button
                                onClick={handleGoBackToSignIn}
                                color={Colors.greyText}
                                bgColor={Colors.primaryNegative}>
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ChangePasswordPage