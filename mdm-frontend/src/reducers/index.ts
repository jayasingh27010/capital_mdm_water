import { Action, AppContextType } from "src/types"

export const createReducer = (...actionReducers: any[]) => {
    const builtObj = reducerObjBuilder(actionReducers)
    return ((state: AppContextType, action: Action) => {
        return builtObj?.[action.type](state, action.payload)
    })
}

const reducerObjBuilder = (actionsReducers: any[]) => {
   return actionsReducers.reduce((acc: any, actionReducer: any) => ({
    ...acc,
    [actionReducer.type]: actionReducer.callback
   }), ({}))
}

export const on = (actionType: string, callback: (state: AppContextType, payload: any) => AppContextType) => {
    return  ({
        type: actionType,
        callback
    })
}