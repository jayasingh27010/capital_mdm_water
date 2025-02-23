import Colors from "src/Colors"
import Text from "src/components/Text"
import { Divider, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import AppBarAccountInfo from "src/components/AppBarAccountInfo"
import { useCallback, useContext, useState } from "react"
import { AppContext } from "src/contexts"
import "./styles.css"
import Breadcrumb from "src/components/Breadcrumb"
import { useNavigate } from "react-router-dom"
import MenuItem from "../MenuItem"
import { CLEAR_USER_CONTEXT } from "src/actions/AppContextActions"
import { clearToken } from "src/utility"
import { SVGIcon } from "src/assets/SvgIcons/IconMap"

const AppBar: React.FC = () => {
    const { context, dispatch } = useContext<any>(AppContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleLogout = () => {
        clearToken()
        // dispatch({ type: LOGOUT })
        // navigate(Routes.login)
        dispatch({
            type: CLEAR_USER_CONTEXT
        })
    }
    const handleUserProfileRedirect = useCallback(() => {
        navigate(context?.userInfo?.profileLink)
    }, [context])
    return (
        <div className="app-bar" style={{backgroundColor: Colors.primary}}>
            <div className="d-flex align-items-center justify-content-center w-100">
                <Text
                    className="mb-0 px-5"
                    fontSize="xx-large"
                    fontWeight={700}
                    textShadow="inset 0px 0px 8px rgba(0,0,0,0.21);"
                    color={Colors.primaryNegative}>MDM</Text>
                <Divider
                    borderColor={Colors.primaryNegative}
                    orientation="vertical"
                    width={1}/>
                <Text
                    className="mb-0 px-5 flex-grow-1 d-flex"
                    fontSize="x-large"
                    fontWeight={700}
                    textShadow="inset 0px 0px 8px rgba(0,0,0,0.21);"
                    color={Colors.primaryNegative}>
                    {context?.appbarIcon &&
                    <span className="d-inline-block">
                        <span
                            className="d-flex mx-2"
                            style={{height: '32px', width: '32px', verticalAlign: 'middle'}}>
                            <SVGIcon style={{
                                height: 'auto',
                                width: '100%'
                            }}
                                fill="#FFF"
                                stroke="#FFF"
                                iconName={context.appbarIcon}/>
                        </span>
                    </span>
                    }
                    {context?.breadcrumbs &&
                    context.breadcrumbs.map((br: any, i: number) => {
                        return (
                            <span key={br.clickPath}>
                                {i !== 0 &&
                                <span style={{fontSize: "14px", fontWeight: "bold"}} className="p-2">/</span>}
                                         {/* <span style={{ fontWeight: "bold" }} className="p-2">/</span>} */}
                                <Breadcrumb {...br}/>
                            </span>
                        )
                    })}
                </Text>

                {
                    context?.userInfo?.accountTypeValue !== "superAdmin" && (
                        <Text
                            className="mb-0 px-2"
                            fontSize="large"
                            fontWeight={700}
                            textShadow="inset 0px 0px 8px rgba(0,0,0,0.21);"
                            color={Colors.primaryNegative}
                        >
                             {context.userInfo?.projectName}
                            {/* {"Project - " + context.userInfo?.projectName} */}
                        </Text>
                    )
                }

                <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
                   <MenuButton onClick={() => setIsOpen(true)}>
                        <AppBarAccountInfo/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            className="px-3"
                            label="View Profile"
                            icon="person"
                            onClick={() => {
                                handleUserProfileRedirect()
                                setIsOpen(false)
                            }}
                            id="viewProfile"
                            isActive={false}/>
                        <MenuItem
                            className="px-3"
                            label="Logout"
                            icon="SignOut"
                            onClick={() => handleLogout()}
                            id="login"
                            isActive={false}/>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

export default AppBar