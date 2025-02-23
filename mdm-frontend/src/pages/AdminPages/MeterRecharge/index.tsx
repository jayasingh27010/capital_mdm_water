import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useLoadAppBar } from "src/hooks"
import { convertObjectToList } from "src/utility"
import { getWidget } from "./Widgets"

const meterRecharge: React.FC = () => {
    useLoadAppBar()
    const [widgets, setWidgets] = useState<any[]>([])
    const data: any = useLoaderData()
    
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
                        const Component = getWidget(widget.id);
                        if (!Component) {
                            return <div key={widget.id}>Component "{widget.id}" not found</div>;
                        }
                        return (
                            <div key={widget.id} className={`col-${widget.columnSize} py-2`}>
                                <Component />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default meterRecharge;