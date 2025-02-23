import { useNavigate } from "react-router-dom";
import Colors from "src/Colors";

type TableCellLinkProps = {
    label?: string;
    link?: string;
}

const style = {
    color: Colors.primary,
    textDecoration: "underline",
    cursor: "pointer"
}

const TableCellLink: React.FC<TableCellLinkProps> = ({
    label = "-",
    link
}) => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate(link ?? "")
    }
    return (
        <span
            style={style}
            onClick={handleNavigation}>
            {label}
        </span>
    )
}

export default TableCellLink