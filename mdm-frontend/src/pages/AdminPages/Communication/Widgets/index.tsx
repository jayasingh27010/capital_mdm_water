import AllCommunicationsTable from "./AllCommunicationsTable"
import CommunicationActions from "./CommunicationActions"




const widgetMap: Record<string, any> = {

    "allCommunicationsTable": AllCommunicationsTable,
    "communicationActions": CommunicationActions,

}

export const getWidget = (componentName: string) => {
    return widgetMap[componentName]
}