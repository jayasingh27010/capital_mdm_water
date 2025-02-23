import {
    ADD_ADDITIONAL_FILTER,
    ADD_SELECTION,
    ADD_SELECTIONS,
    CLEAR_ALL_FILTERS,
    CLEAR_ALL_SELECTIONS,
    CLEAR_USER_CONTEXT,
    CLOSE_ACTION_MODAL,
    FORCE_NAVIGATE_BEGIN,
    FORCE_NAVIGATION_SUCCESS,
    INIT_APP_LOADING,
    INIT_TABLE,
    INIT_TABLE_WITH_FILTERS,
    LOAD_END_TABLE,
    LOGIN_LOAD_ALL_FAIL,
    LOGIN_LOAD_ALL_SUCCESS,
    LOGOUT,
    MENU_ITEMS_RENDER_SUCCESS,
    MODIFY_ADDITIONAL_FILTER,
    OPEN_ACTION_MODAL,
    POPULATE_ADDITIONAL_FILTERS,
    REMOVE_ADDITIONAL_FILTER,
    REMOVE_SELECTION,
    REMOVE_SELECTIONS,
    SET_ACTION_MODAL_DATA,
    SET_BREADCRUMBS,
    SET_MENU_ITEMS,
    SET_USER_INFO,
    START_LOADING_TABLE,
    UPDATE_FILTERS_AND_LOAD_TABLE,
    UPDATE_FILTERS_AND_NAVIGATE,
    CONNECTION_ERROR,
} from "src/actions/AppContextActions"
import { createReducer, on } from "src/reducers"
import { isEmpty } from "src/utility"
import { v4 as uuid } from 'uuid';

const TABLE_INIT_DATA = {
    isLoaded: false,
    isLoading: false,
    filters: {}
}

export const appContextReducer = createReducer(
    on(INIT_APP_LOADING, (state) => {
        return {
            ...state,
            isLoading: true,
            isLoaded: false
        }
    }),
    on(SET_BREADCRUMBS, (state, payload) => {
        const { breadcrumbs, appbarIcon } = payload
        return {
            ...state,
            breadCrumbLoaded: true,
            breadcrumbs,
            appbarIcon
        }
    }),
    on(SET_MENU_ITEMS, (state, payload) => {
        return {
            ...state,
            menuItems: payload
        }
    }),
    on(MENU_ITEMS_RENDER_SUCCESS, (state) => {
        return {
            ...state,
            isMenuRendered: true
        }
    }),
    on(SET_USER_INFO, (state, payload) => {
        return {
            ...state,
            userInfo: payload
        }
    }),
    on(LOGIN_LOAD_ALL_SUCCESS, (state, payload) => {
        const  { menuItems, userInfo } = payload
        return {
            ...state,
            isLoggedIn: true,
            isLoaded: true,
            breadCrumbLoaded: false,
            menuItems,
            userInfo
        }
    }),
    on(LOGIN_LOAD_ALL_FAIL, (state) => {
        return {
            ...state,
            isLoaded: true,
            isLoggedIn: false
        }
    }),
    on(LOGOUT, (state) => {
        return {
            ...state,
            isLoggedIn: false
        }
    }),
    on(FORCE_NAVIGATION_SUCCESS, (state) => {
        return {
            ...state,
            forceNavigate: false
        }
    }),
    on(FORCE_NAVIGATE_BEGIN,  (state, payload) => {
        return {
            ...state,
            forceNavigationPath: payload,
            forceNavigate: true
        }
    }),
    on(OPEN_ACTION_MODAL, (state, payload) => {
        return {
            ...state,
            openActionModals: {
                ...state.openActionModals,
                [payload]: true
            }
        }
    }),
    on(CLOSE_ACTION_MODAL, (state, payload) => {
        return {
            ...state,
            openActionModals: {
                ...state.openActionModals,
                [payload]: false
            }
        }
    }),
    on(CLEAR_USER_CONTEXT, (state) => {
        return {
            ...state,
            isLoading: false,
            isLoaded: false,
            isLoggedIn: false,
            isMenuRendered: false,
            forceNavigate: true,
            forceNavigationPath: "/login",
            menuItems: [],
            breadcrumbs: [],
            breadCrumbLoaded: false,
            appbarIcon: '',
            userInfo: {},
            openActionModals: {},
            actionModalData: {},
            tables: {}
        }
    }),
    on(SET_ACTION_MODAL_DATA, (state, payload) => {
        const { actionModalId, data } = payload
        return {
            ...state,
            actionModalData: {
                ...state.actionModalData,
                [actionModalId]: JSON.parse(JSON.stringify(data))
            }
        }
    }),
    on(INIT_TABLE, (state, payload) => {
        return {
            ...state,
            tables: {
                ...state.tables,
                [payload]: {
                    ...(state.tables?.[payload] ?? TABLE_INIT_DATA),
                    isLoaded: false,
                    isLoading: false
                }
            }
        }
    }),
    on(INIT_TABLE_WITH_FILTERS, (state, payload) => {
        const { tableId, filters } = payload
        const oldFilters = state?.tables?.[tableId]?.filters ?? {}
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters: isEmpty(oldFilters) ? filters: oldFilters
                }
            }
        }
    }),
    on(UPDATE_FILTERS_AND_LOAD_TABLE, (state, payload) => {
        const { tableId, filters } = payload
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters
                }
            }
        }
    }),
    on(POPULATE_ADDITIONAL_FILTERS, (state, payload) => {
        const { tableId, filters, link } = payload
        const oldFilters = state.tables?.[tableId]?.filters ?? {}
        const additionalFilters = filters.additionalFilters
        return {
            ...state,
            forceNavigate: true,
            forceNavigationPath: link,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters: {
                        currPage: 1,
                        ...oldFilters,
                        ...filters,
                        additionalFilters:
                            additionalFilters.map((aF: any) => ({...aF, trackId: uuid()}))
                    }
                }
            }
        }
    }),
    on(ADD_ADDITIONAL_FILTER, (state, payload) => {
        const { tableId, filterType, filterValue } = payload
        console.log("multipROJECT STATE",state)
        console.log("additional filter payload",payload)
        const oldFilters = state.tables[tableId].filters ?? {}
        console.log("oldFilters",oldFilters);
        const oldAdditionalFilters = oldFilters?.additionalFilters ?? []
        const existingFilter = oldAdditionalFilters.find((filter: any) => filter.filterType === filterType)
        if (existingFilter && filterType !== "multiProject") {
            const trackId = existingFilter.trackId
            return {
                ...state,
                tables: {
                    ...state.tables,
                    [tableId]: {
                        ...TABLE_INIT_DATA,
                        filters: {
                            ...oldFilters,
                            currPage: 1,
                            additionalFilters: oldAdditionalFilters
                            .map((filter: any) => filter.trackId === trackId ? 
                            ({
                                ...filter,
                                filterType,
                                filterValue
                            }): filter)
                        }
                    }
                }}
        } else {
            const newAdditionalFilter = {
                trackId: uuid(),
                filterType,
                filterValue
            }
            return {
                ...state,
                tables: {
                    ...state.tables,
                    [tableId]: {
                        ...TABLE_INIT_DATA,
                        filters: {
                            ...oldFilters,
                            currPage: 1,
                            additionalFilters: [
                                ...oldAdditionalFilters,
                                newAdditionalFilter
                            ]
                        }
                    }
                }
            }
        }
    }),
    on(MODIFY_ADDITIONAL_FILTER, (state, payload) => {
        const { tableId, trackId, filterType, filterValue } = payload
        const oldFilters = state.tables[tableId].filters ?? {}
        const oldAdditionalFilters = oldFilters?.additionalFilters ?? []
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters: {
                        ...oldFilters,
                        currPage: 1,
                        additionalFilters: oldAdditionalFilters
                        .map((filter: any) => filter.trackId === trackId ? 
                        ({
                            ...filter,
                            filterType,
                            filterValue
                        }): filter)
                    }
                }
            }
        }
    }),
    on(REMOVE_ADDITIONAL_FILTER, (state, payload) => {
        const { tableId, trackId } = payload
        const oldFilters = state.tables[tableId].filters ?? {}
        const oldAdditionalFilters = oldFilters?.additionalFilters ?? []
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters: {
                        ...oldFilters,
                        currPage: 1,
                        additionalFilters: oldAdditionalFilters.filter((filter: any) => filter.trackId !== trackId)
                    }
                }
            }
        }
    }),
    on(CLEAR_ALL_FILTERS, (state, payload) => {
        const { tableId } = payload
        const oldFilters = state.tables[tableId].filters ?? {}
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters: {
                        ...oldFilters,
                        currPage: 1,
                        additionalFilters: []
                    }
                }
            }
        }
    }),
    on(UPDATE_FILTERS_AND_NAVIGATE, (state, payload) => {
        const { tableId, filters, link } = payload
        const oldFilters = state?.tables?.[tableId]?.filters ?? {}
        return {
            ...state,
            forceNavigate: true,
            forceNavigationPath: link,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...TABLE_INIT_DATA,
                    filters: {
                        ...oldFilters,
                        ...filters
                    }
                }
            }
        }
    }),
    on(START_LOADING_TABLE, (state, payload) => {
        return {
            ...state,
            tables: {
                ...state.tables,
                [payload]: {
                    ...state.tables[payload],
                    isLoaded: false,
                    isLoading: true
                }
            }
        }
    }),
    on(LOAD_END_TABLE, (state, payload) => {
        const { totalRecords, tableId } = payload
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    isLoaded: true,
                    isLoading: false,
                    totalRecords
                }
            }
        }
    }),
    on(ADD_SELECTION, (state, payload) => {
        console.log(payload)
        const tableId = payload?.tableId
        const selectionId: string = payload?.selectionId ?? ""
        const oldSelections: string[] = state.tables[tableId]?.selections ?? []
        const newSelections = !oldSelections.includes(selectionId) ? [...oldSelections, selectionId] : oldSelections
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    selections: newSelections
                }
            }
        }
    }),
    on(ADD_SELECTIONS, (state, payload) => {
        const tableId = payload?.tableId
        const selectionIds = payload?.selectionIds
        const oldSelections: string[] = state.tables[tableId]?.selections ?? []
        const oldSelectionsMap: Record<string, boolean> = oldSelections.reduce((acc: any, id: string) => {
            return {
                ...acc,
                [id]: true
            }
        }, {})
        const newSelections = [...oldSelections]
        for (const selectionId of selectionIds) {
            if (!oldSelectionsMap.hasOwnProperty(selectionId)) {
                newSelections.push(selectionId)
            }
        }
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    selections: newSelections
                }
            }
        }
    }),
    on(REMOVE_SELECTION, (state, payload) => {
        const tableId = payload.tableId
        const selectionId = payload?.selectionId
        const oldSelections: string[] = state.tables[tableId]?.selections ?? []
        const newSelections = oldSelections.filter(id => id !== selectionId)
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    selections: newSelections
                }
            }
        }
    }),
    on(REMOVE_SELECTIONS, (state, payload) => {
        const tableId = payload?.tableId
        const selectionIds = payload?.selectionIds
        const oldSelections: string[] = state.tables[tableId]?.selections ?? []
        let newSelections = [...oldSelections]
        for (const selectionId of selectionIds) {
            newSelections = newSelections.filter(id => id !== selectionId)
        }
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    selections: newSelections
                }
            }
        }
    }),
    on(CLEAR_ALL_SELECTIONS, (state, payload) => {
        const tableId = payload?.tableId
        return {
            ...state,
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    selections: []
                }
            }
        }
    }),
    on(CONNECTION_ERROR, (state,) => {
            return {
                ...state,
                connection_error: true
            }
    })
)