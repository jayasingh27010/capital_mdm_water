import { IconMap } from "src/assets/SvgIcons/IconMap"
import { MenuItemProps } from "src/components/ComponentTypes"
import Text from "src/components/Text"

//px-2 mb-3
const MenuItem: React.FC<MenuItemProps> = ({
    id,
    label,
    icon,
    isActive,
    className,
    onClick
}) => {
    const Component = IconMap[icon]
    const finalClassName = `menu-item ${className ?? ''}${isActive ? ' active': ''}`

    return (
        <div className={finalClassName} onClick={() => onClick(id)}>
            <div
                className="menu-item-logo-container">
                <Component
                    className="icon-holder"/>
            </div>
            <div className="menu-item-label ps-3">
                <Text
                    className="mb-0"
                    fontSize="sm">{label}</Text>
            </div>
        </div>
    )
}

export default MenuItem