import React from "react"

const componentMap: Record<string, React.FC> = {

}

export const getComponent = (componentName: string): React.FC => {
    return componentMap[componentName]
}