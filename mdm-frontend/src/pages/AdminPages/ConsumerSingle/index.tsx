import { useContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useLoadAppBar } from "src/hooks"
import { convertObjectToList } from "src/utility"
import { getWidget } from "./Widgets"
import { AppContext } from "src/contexts"
import { SET_BREADCRUMBS } from "src/actions/AppContextActions"
import { viewUserDetails } from "src/api/Pages/Users"

const ConsumerSingle: React.FC = () => {
    const data: any = useLoaderData()
    const {  dispatch } = useContext<any>(AppContext)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    useLoadAppBar()
    const setBreacrumbs = async (labels: any[], iconName: any) => {
        const userLabel = labels.find(item => item.clickPath.includes("users") && item.clickPath.split("/").length === 4)
        if (userLabel) {
          const { data }: any =  await viewUserDetails(userLabel.displayName)
          labels[1].displayName = data.data.name
        }
        dispatch({
          type: SET_BREADCRUMBS,
          payload: {
            breadcrumbs: labels,
            appbarIcon: iconName ?? 'home'
          }
        })
      }
    useEffect(() => {
        if (!isLoaded) {
            setBreacrumbs(data?.config?.label, data?.config?.iconName)
            setIsLoaded(true)
        }
    }, [data, isLoaded])

    const [widgets, setWidgets] = useState<any[]>([])
    
    useEffect(() => {
        if (data?.config?.sections) {
            setWidgets(convertObjectToList(data?.config?.sections))
        }
    }, [data])

    return (
        <div className="py-2">
            <div className="container">
                <div className="row">
                    {widgets.map((widget) => {
                        const Component = getWidget(widget.id)
                        return (
                            <div  key={widget.id} className={`col-${widget.columnSize} py-2`}>
                                <Component/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ConsumerSingle