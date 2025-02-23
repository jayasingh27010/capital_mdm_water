export type AdditionalFilter = {
    trackId: string
    filterType: string
    filterValue: string
}

export type FilterInfo = {
    getAll?: boolean
    currPage?: number
    perPage?: number
    additionalFilters?: AdditionalFilter[]
}
