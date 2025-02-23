import { useLoadAppBar } from "src/hooks"

const Settings:React.FC = () => {
    useLoadAppBar()
    return(
      <p>Settings Page Component</p>
    )
}
export default Settings;