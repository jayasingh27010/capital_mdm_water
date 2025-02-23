import { Outlet } from "react-router-dom"
import "./style.css"
import SideNavigation from "src/components/SideNavigation"
import AppBar from "src/components/AppBar"
import { useForceExit } from "src/hooks"

const AdminLayoutPage: React.FC = () => {
    useForceExit()

    return (
        <div className="admin-layout">
            <SideNavigation/>
            <div className="admin-layout-content px-3">
                <AppBar/>
                <div className="admin-layout-outlet-holder">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminLayoutPage