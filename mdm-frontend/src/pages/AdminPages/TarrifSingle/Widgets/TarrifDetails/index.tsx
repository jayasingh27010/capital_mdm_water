import { Divider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import Card from "src/components/Card"
import FieldList from "src/components/FieldList"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { Field } from "src/types"
import { convertObjectToList } from "src/utility"
import { SVGIcon } from "src/assets/SvgIcons/IconMap"
import { viewTarrifDetails } from "src/api/Pages/Tarrifs"
import CreateTarrifAction from "src/actionComponents/CreateTarrifGroupAction"
import ActionMenu from "src/components/ActionMenu/ActionMenu"


const TarrifDetails: React.FC = () => {
    const [id, setId] = useState<any>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiData, setApiData] = useState<any>({})
    const [config, setConfig] = useState<any>({})
    const [fields, setFields] = useState<Field[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [actions, setActions] = useState<any>([])
    const [editTarrifAction, setEditTarrifAction] = useState<any>(undefined)
    const [duplicateTarrifAction, setDuplicateTarrifAction] = useState<any>(undefined)
    const data: any = useLoaderData()

    useEffect(() => {
        if (data?.config?.id) {
            setId(data?.config?.id)
        }
    }, [data])


    useEffect(() => {
        if (id) {
            setIsLoading(true)
            viewTarrifDetails(id)
                .then(({ data }: any) => {
                    setIsLoading(false)
                    setApiData(data?.data)
                    const actions = convertObjectToList(data?.config?.actions)
                    setActions(actions)
                    setEditTarrifAction(actions.find(action => action.id === "viewTarrif"))
                    setDuplicateTarrifAction(actions.find(action => action.id === "duplicateTarrif"))
                    setFields(convertObjectToList(data.config.fields))
                    setConfig(data?.config)
                    setIsSuccess(true)
                })
        }
    }, [id])

    return (
        <Card>
            <div className="widget details-widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {!isLoading && isSuccess &&
                <>
                <div className="d-flex flex-row justify-content-center">
                    <span className="p-1 pe-2">
                        <SVGIcon iconName="Info"/>
                    </span>
                    <p className="flex-grow-1 mb-0" style={{fontWeight: "700", fontSize: "20px"}}>
                        {config.label}
                    </p>
                    <ActionMenu actions={actions} label={"Tarrif Actions"} />
                </div>
                <Divider/>
                <FieldList data={apiData} fields={fields}/>
                </>}
                {editTarrifAction &&
                <CreateTarrifAction
                    editId={id}
                    viewOnly={true}
                    action={editTarrifAction}
                    editMode={true}/>}
                {duplicateTarrifAction &&
                <CreateTarrifAction
                    action={duplicateTarrifAction}
                    editMode={true}/>}
            </div>
        </Card>
    )
}

export default TarrifDetails