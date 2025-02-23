import dotenv from "dotenv"
import MockTarrifGroups from "../MockDBData/tarrifGroups"
import MockTarrifs from "../MockDBData/tarrrifs"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { TarrifGroupDBDTO } from "./types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"


export default {
    attachOrDetachTarrif: async (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group_tariff/create_attach_orDetach_tariff",payload)
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Attach Or Detach Tarrif Successful"
            })
        })
    },

    changeTariff: async (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group_tariff/change_tariff",payload)
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Attach Or Detach Tarrif Successful"
            })
        })
    },Tarrif: async (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group_tariff/create_attach_orDetach_tariff",payload)
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Attach Or Detach Tarrif Successful"
            })
        })
    },
    createTarrif: async (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            console.log("create Tarrif Payload",payload);
            return makeCall("POST", "/tariff/create_tariff", payload)

            return new Promise((_, reject) => {
                reject(new Error("Not Implemented"))
            })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Create Tarrif Successful"
            })
        })
    },
    createTarrifGroup: async (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {

            return makeCall("POST", "/tariff_group/create_tariff_group", payload)
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Create Tarrif Successful"
            })
        })
    },
    getTarrifGroups: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_tariff_group",{});
            // return new Promise((resolve) => {get_unlink_tariff_group
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },

    getLinkTarrifGroups: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_link_tariff_group",{});
            // return new Promise((resolve) => {get_unlink_tariff_group
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },

    getLinkTarrifGroupsByProjectId: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_link_tariff_group",{projectId});
            // return new Promise((resolve) => {get_unlink_tariff_group
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },
    getUnlinkTarrifGroups: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_unlink_tariff_group",{});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },
    getUnlinkTarrifGroupsByProjectId: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_unlink_tariff_group",{projectId});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },

    getTarrifGroupsWithTariffRelation: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_tariff_group_with_tariff_relation",{});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return makeCall("POST", "/tariff_group/get_tariff_group", {})
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },
    getTarrifGroupsByProjectId: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_tariff_group_by_project_id",{projectId});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     // console.log("this", tarrifGroups, projectId)
            //     tarrifGroups.rows = tarrifGroups.rows.filter((tG: TarrifGroupDBDTO) => tG.projectId === projectId)
            //     resolve({
            //         totalRecords: tarrifGroups.rows.length,
            //         rows: tarrifGroups.rows
            //     })
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            // console.log("this", tarrifGroups, projectId)
            tarrifGroups.rows = tarrifGroups.rows.filter((tG: TarrifGroupDBDTO) => tG.projectId === projectId)
            resolve({
                totalRecords: tarrifGroups.rows.length,
                rows: tarrifGroups.rows
            })
        })
    },
    getTarrifGroupsWFilters: async (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff_group/get_tariff_group_with_filters", filters);
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve(getPaginatedResponse({
                rows: tarrifGroups.rows
            }, filters))
        })
    },
    getTarrifGroupsByProjectIdWFilters: async (projectId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            filters = {
                ...(filters ?? {}),
                additionalFilters: [
                    ...(filters?.additionalFilters ?? []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    }
                ]
            }
            return makeCall("POST","/tariff_group/get_tariff_group_with_filters",{projectId, ...filters});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifGroups = deepCopy(MockTarrifGroups)
            //     resolve(getPaginatedResponse({
            //         rows: tarrifGroups.rows.filter((row: any) => row.projectId === projectId)
            //     }, filters))
            // })
            
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifGroups = deepCopy(MockTarrifGroups)
            resolve(getPaginatedResponse({
                rows: tarrifGroups.rows.filter((row: any) => row.projectId === projectId)
            }, filters))
        })
    },
    getAvailableTarrifs: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/tariff/get_available_tariff",{})
                //logic inside can be implemented within a stored procedure
                // const tarrifs = deepCopy(MockTarrifs)
                // resolve({
                //     rows: tarrifs.rows,
                //     totalRecords: tarrifs.rows.length
                // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            })
        })
    },
    getAvailableLinkTarrifs: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/tariff/get_available_link_tariff",{})
                //logic inside can be implemented within a stored procedure
                // const tarrifs = deepCopy(MockTarrifs)
                // resolve({
                //     rows: tarrifs.rows,
                //     totalRecords: tarrifs.rows.length
                // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            })
        })
    },
    getAvailableLinkTarrifsByProjectId: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/tariff/get_available_link_tariff",{projectId})
                //logic inside can be implemented within a stored procedure
                // const tarrifs = deepCopy(MockTarrifs)
                // resolve({
                //     rows: tarrifs.rows,
                //     totalRecords: tarrifs.rows.length
                // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            })
        })
    },
    getAvailableUnLinkTarrifs: async (): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/tariff/get_available_unlink_tariff",{})
                //logic inside can be implemented within a stored procedure
                // const tarrifs = deepCopy(MockTarrifs)
                // resolve({
                //     rows: tarrifs.rows,
                //     totalRecords: tarrifs.rows.length
                // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            })
        })
    },
    getAvailableUnLinkTarrifsByProjectId: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/tariff/get_available_unlink_tariff",{projectId})
                //logic inside can be implemented within a stored procedure
                // const tarrifs = deepCopy(MockTarrifs)
                // resolve({
                //     rows: tarrifs.rows,
                //     totalRecords: tarrifs.rows.length
                // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve({
                rows: tarrifs.rows,
                totalRecords: tarrifs.rows.length
            })
        })
    },
    // getAvailableUnLinkTarrifs
    getAvailableTarrifsByProjectId: async (projectId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff/get_available_tariff_by_project_id",{projectId});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifs = deepCopy(MockTarrifs)
            //     const projectFilterTarrifs = tarrifs.rows.filter((row: any) => row.projectId === projectId)
            //     resolve({
            //         rows: projectFilterTarrifs,
            //         totalRecords: projectFilterTarrifs.length
            //     })
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            const projectFilterTarrifs = tarrifs.rows.filter((row: any) => row.projectId === projectId)
            resolve({
                rows: projectFilterTarrifs,
                totalRecords: projectFilterTarrifs.length
            })
        })
    },
    getTarrifs: async (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/tariff/get_tariff_by_filters", filters)
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve(getPaginatedResponse({
                rows: tarrifs.rows
            }, filters))
        })
    },
    getAllAttachTariff: async (filters: FilterInfo): Promise<DBResponse> => {
        //if (RUN_MODE != "dev") {
            // filters.perPage = 1000
            // filters.currPage = 0
            return makeCall("POST", "/tariff_group_tariff/get_all_attach_tariffs", filters)
        //}
        // return new Promise((resolve) => {
        //     //logic inside can be implemented within a stored procedure
        //     const tarrifs = deepCopy(MockTarrifs)
        //     resolve(getPaginatedResponse({
        //         rows: tarrifs.rows
        //     }, filters))
        // })
    },
    getTarrifsByProjectId: async (projectId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            filters = {
                ...(filters ?? {}),
                additionalFilters: [
                    ...(filters?.additionalFilters ?? []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: `${projectId}`
                    }
                ]
            }
            return makeCall("POST", "/tariff/get_tariff_by_filters",{projectId, ...filters});
            // return new Promise((resolve) => {
            //     //logic inside can be implemented within a stored procedure
            //     const tarrifs = deepCopy(MockTarrifs)
            //     resolve(getPaginatedResponse({
            //         rows: tarrifs.rows.filter((row: any) => row.projectId === projectId)
            //     }, filters))
            // })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            resolve(getPaginatedResponse({
                rows: tarrifs.rows.filter((row: any) => row.projectId === projectId)
            }, filters))
        })
    },
    getTarrifById: async (tarrifId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST","/tariff/get_tariff_id",{
                tarrifId
            })
        }
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const tarrifs = deepCopy(MockTarrifs)
            const foundTarrif = tarrifs.rows.filter((row: any) => row.id === tarrifId)
            resolve({
                rows: foundTarrif,
                totalRecords: foundTarrif.length
            })
        })
    },

}