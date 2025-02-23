import HomeSvg from './home.svg?react'
import PersonSvg from './person.svg?react'
import SpeedoMeterSvg from './speedometer.svg?react'
import LinkSvg from './Link.svg?react'
import DocumentSvg from './Document.svg?react'
import PeopleSvg from './People.svg?react'
import DesktopSvg from './Desktop.svg?react'
import BuildSharpSvg from './BuildSharp.svg?react'
import PersonCircleSvg from './PersonCircle.svg?react'
import MailSvg from './mail.svg?react'
import BackArrow from './backArrow.svg?react'
import Refresh from './Refresh.svg?react'
import Info from './Info.svg?react'
import Financials from './Financials.svg?react'
import SignOut from './SignOut.svg?react'
import { SVGProps } from 'react'

export const IconMap: Record<string, any> = {
    home: HomeSvg,
    person: PersonSvg,
    speedometer: SpeedoMeterSvg,
    Link: LinkSvg,
    Document: DocumentSvg,
    People: PeopleSvg,
    Desktop: DesktopSvg,
    BuildSharp: BuildSharpSvg,
    personCircle: PersonCircleSvg,
    Mail: MailSvg,
    BackArrow: BackArrow,
    Refresh: Refresh,
    Info,
    Financials,
    SignOut
}

export const getIcon = (iconName: string, props: SVGProps<any>) => {
    const SvgComp = IconMap[iconName]
    return <SvgComp {...props}/>
}

export const SVGIcon: React.FC<any> = ({
    iconName,
    ...props
}) => {
    return getIcon(iconName, props)
}