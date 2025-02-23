import { useNavigate } from "react-router-dom";
import { BreadcrumbProps } from "src/components/ComponentTypes";

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    displayName,
    clickPath,
    isClickable = false
}) => {
    const navigate = useNavigate()
    return (
        <span className={`d-inline-block breadcrumb mb-0 ${isClickable ? 'hover-active-link' : ''}`}
            onClick={() => { isClickable && navigate(clickPath ?? "/") }}>
            {displayName}
        </span>
    )
}

export default Breadcrumb