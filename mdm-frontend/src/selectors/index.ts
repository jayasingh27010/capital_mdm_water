import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts"
import { AppContextType, TableState } from "src/types"

export const useSelector = () => {
    const { context } = useContext<any>(AppContext)
    const selector = useCallback((selectorCallback: (context: AppContextType) => any) => {
        return selectorCallback(context)
    }, [context])

    return selector
}

export const createSelector = () => {

}

export const isActionModalOpen = (actionModalId: string) => {
    // return context.openActionModals[actionModalId]
    return (context: AppContextType): boolean => {
        return context?.openActionModals?.[actionModalId] ?? false
    }
}

export const getTableState = (tableId: string) => {
    return (context: AppContextType): TableState | undefined => {
        return context?.tables?.[tableId]
    }
}

export const getTableSelections = (tableId: string) => {
    return (context: AppContextType): string[] => {
        return context?.tables?.[tableId]?.selections ?? []
    }
}

export const getActionModalData = (actionModalId: string) => {
    return (context: AppContextType): any => {
        return context?.actionModalData?.[actionModalId] ?? {}
    }
}


