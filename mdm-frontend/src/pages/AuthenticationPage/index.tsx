import {  useContext, useEffect, useState } from "react"
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
import { chainRoutes, getToken, replaceRelativeAdminPath, setToken } from "src/utility"
import { tryLogin } from "src/api/Login"
import { AppContext } from "src/contexts"
import { FORCE_NAVIGATE_BEGIN, INIT_APP_LOADING, LOGIN_LOAD_ALL_FAIL, LOGIN_LOAD_ALL_SUCCESS } from "src/actions/AppContextActions"
import { useToast } from "@chakra-ui/react"
import { initAppState } from "src/api/AppState"
import { useForceExit } from "src/hooks"

const SizingStyles: Record<string, string> = {
    logoMaxWidth: '100px',
    formMaxWidth: '350px'
}


const AuthenticationPage = () => {
    const navigate = useNavigate()
    useForceExit()
    const { dispatch, context } = useContext<any>(AppContext)
    const toast = useToast()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false)

    useEffect(() => {
        if (context?.isLoaded && context?.isLoggedIn && getToken()) {
            if (context?.usersInfo?.accountTypeValue === "consumer") {
                navigate(chainRoutes(Routes.admin, Routes.consumers, `${context?.usersInfo?.userId}`))
            } else {
                navigate(chainRoutes(Routes.admin, Routes.dashboard))
            }
            dispatch({
                type: INIT_APP_LOADING
            })
        }
    }, [context, getToken()])

    const handleForgotPasswordClick = () => {
        navigate(Routes.AccountRecovery)
    }

    const handleLoginBtnClick = (e: any) => {
        e.preventDefault()
        setIsSubmitDisabled(true)
        if (isSubmitDisabled) {
            return
        }
        tryLogin({
            username: data?.username,
            password: data?.password
        })
            .then((loginResp:  any) => {
                setToken(loginResp.data.token)
                initAppState()
                    .then((resp: any) => {
                        const { userInfo, menuItems } = resp
                        dispatch({
                            type: LOGIN_LOAD_ALL_SUCCESS,
                            payload: {
                                userInfo,
                                menuItems
                            }
                        })
                        console.log("consumer routing 1")
                        if (userInfo.accountTypeValue === "consumer") {
                            location.href = replaceRelativeAdminPath(location.href, `/consumers/${userInfo.userId}`)
                        } else {
                            dispatch({
                                type: FORCE_NAVIGATE_BEGIN,
                                payload: chainRoutes(Routes.admin, Routes.dashboard)
                            })
                        }
                    })
                    .catch(() => {
                        dispatch({
                            type: LOGIN_LOAD_ALL_FAIL
                        })
                    })
            })
            .catch((e) => {
                if(e?.response?.data?.message === "INTERNAL_SERVER_ERROR"){
                    toast({
                    title: 'Internal Server Error',
                    description: 'ECONNREFEUSED',
                    status: 'warning',
                    duration: 3000
                })

                }else {
                toast({
                    title: 'Invalid Credentials',
                    description: 'Invalid (Username / Email) / Password',
                    status: 'warning',
                    duration: 3000
                })
                }
            })
            .finally(() => {
                setIsSubmitDisabled(false)
            })
    }
	const VERSION = "1.0.0 10-12-2024";
    const fields: Field[] = [
        {
            id: "username",
            label: "Username",
            columnSize: 12,
            inputType: "textInput"
        },
        {
            id: "password",
            label: "Password",
            columnSize: 12,
            inputType: "passwordInput"
        },
        {
            id: "rememberMe",
            label: "Remember Me?",
            columnSize: 12,
            inputType: "switchInput",
            isSingleLineInput: true
        }
    ]

    const [data, setData] = useState<any>({})

    const handleChange = (fieldId: string, value: any) => {
        setData({
            ...data,
            [fieldId]: value
        })
    }


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
                    <div style={{maxWidth: SizingStyles.formMaxWidth}}>
                        <form onSubmit={handleLoginBtnClick}>
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
                                                Login
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex flex-direction-row justify-content-center">
                            <Button
                                onClick={handleForgotPasswordClick}
                                color={Colors.greyText}
                                bgColor={Colors.primaryNegative}>
                                Forgot Password?
                            </Button>
                        </div>
                        <div style={{  textAlign: 'right', fontSize: '10px', color: Colors.greyText }}>
                        <Text>Version: {VERSION}</Text>
                    	</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AuthenticationPage
