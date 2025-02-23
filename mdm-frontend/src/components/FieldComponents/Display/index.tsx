import { useNavigate } from "react-router-dom";
import { DisplayProps } from "../types";

const classNameDict: any = {
    plain: 'plain',
    link: 'link'
}

const Display: React.FC<DisplayProps> = ({
    type,
    link,
    value,
    maxLength = 10
}) => {
    const navigate = useNavigate()
    const className = `field-value py-1 ${classNameDict?.[type ?? "plain"] ?? 'plain'}`
    const handleLinkClick = () => {
        navigate(link ?? "")
    }

    if (type === 'link') {
        return (
            <div className={className} onClick={handleLinkClick}>
                {String(value).length > maxLength ? `${String(value).slice(0, maxLength)}...` : value}
            </div>
        )
    }
    return (
        <div className={className}>
            {String(value).length > maxLength ? `${String(value).slice(0, maxLength)}...` : value}
        </div>
    )
}

export default Display