import Dashboard from "src/pages/AdminPages/Dashboard"
import Users from "src/pages/AdminPages/Users"
import Meters from "./pages/AdminPages/Meters"
import Gateways from "./pages/AdminPages/Gateways"
import Projects from "./pages/AdminPages/Projects"
import Consumers from "./pages/AdminPages/Consumers"
import DeviceConfig from "./pages/AdminPages/DeviceConfig"
import Settings from "./pages/AdminPages/Settings"
import UserSingle from "./pages/AdminPages/UserSingle"
import MeterSingle from "./pages/AdminPages/MeterSingle"
import ProjectSingle from "./pages/AdminPages/ProjectSingle"
import ConsumerSingle from "./pages/AdminPages/ConsumerSingle"
import Tarrifs from "./pages/AdminPages/Tarrifs"
import TarrifSingle from "./pages/AdminPages/TarrifSingle"
import meterRecharge from "./pages/AdminPages/MeterRecharge"
import Logs from "./pages/AdminPages/Logs"

const ComponentMap: Record<string, React.FC> = {
    'dashboard': Dashboard,
    'users': Users,
    'meters': Meters,
    'gateways': Gateways,
    'projects': Projects,
    'consumers': Consumers,
    'tarrifs': Tarrifs,
    'deviceConfig': DeviceConfig,
    'settings': Settings,
    'userSingle': UserSingle,
    'meterSingle': MeterSingle,
    'projectSingle': ProjectSingle,
    'consumerSingle': ConsumerSingle,
    'tarrifSingle': TarrifSingle,
    'meterRecharge': meterRecharge,
    'logs': Logs
}


export const getComponent = (componentName: string): React.ReactElement => {
    const Component = ComponentMap[componentName]
    return <Component/>
}
