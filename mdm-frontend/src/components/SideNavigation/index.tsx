import { Divider } from "@chakra-ui/react"
import Image from "src/components/Image"
import {  MenuItem } from "src/types"
import { default as MenuItemComp }  from "src/components/MenuItem"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts"
import { useLocation, useNavigate } from "react-router-dom"
import { chainRoutes } from "src/utility"
import Routes from "src/Routes"

const SideNavigation: React.FC = () => {
    const navigate = useNavigate()
    const [selectedNav, setSelectedNav] = useState('')
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const { context } = useContext<any>(AppContext)
    const { pathname } = useLocation()

    useEffect(() => {
        menuItems.forEach((mI: MenuItem) => {
            const combinedPath = chainRoutes(Routes.admin, mI.path ?? "")
            if (pathname.match(combinedPath)) {
                setSelectedNav(mI.id)
            }
        })
    }, [pathname, menuItems])
    // const menuItems: MenuItem[] = [
    //     {
    //         id: 'dashboard',
    //         label: 'Dashboard',
    //         icon: 'home'
    //     },
    //     {
    //         id: 'users',
    //         label: 'Users',
    //         icon: 'person'
    //     },
    //     {
    //         id: 'meters',
    //         label: 'Meters',
    //         icon:'speedometer'
    //     },
    //     {
    //         id:'gateway',
    //         label:'Gateway',
    //         icon:'Link'
    //     },
    //     {
    //         id:'projects',
    //         label:'Projects',
    //         icon:'Document'
    //     },
    //     {
    //         id:'consumers',
    //         label:'Consumers',
    //         icon:'People'
    //     },
    //     {
    //         id:'device',
    //         label:'Device Configuration',
    //         icon:'Desktop'
    //     },
    //     {
    //         id:'settings',
    //         label:'Settings',
    //         icon:'BuildSharp'
    //     }
    // ]

    const handleMenuItemClick = (id: string) => {
        setSelectedNav(id)
        const pathEnd = menuItems.find((mI: MenuItem) => mI.id === id)?.path ?? ""
        navigate(chainRoutes(Routes.admin, pathEnd))
    }

    useEffect(() => {
        setMenuItems(context.menuItems)
    }, [context])

    return (
        <div className="side-navigation pt-3 position-sticky top-0">
            <div className="logo-holder my-1 d-flex justify-content-center flex-direction-row">
                <div
                    style={{width:  '60px'}}>
                    <Image src="/assets/capital-logo.png"/>
                </div>
            </div>
            <Divider/>
            {menuItems
                .filter(item => item?.hide !== true)
                .map((item: MenuItem) => (
                <MenuItemComp
                    className="px-2 mb-3"
                    key={item.id}
                    {...item}
                    isActive={selectedNav === item.id}
                    onClick={handleMenuItemClick}/>
            ))}
        </div>
    )
}

export default SideNavigation