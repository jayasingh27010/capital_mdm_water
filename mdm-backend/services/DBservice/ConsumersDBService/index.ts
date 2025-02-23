import dotenv from "dotenv"
import MockConsumers from "../MockDBData/consumers"
import MockMeterRecharges from "../MockDBData/meterRecharges"
import { deepCopy, makeCall } from "../../../utilities"
import { DBResponse, DBStatResponse,DBConsResponse } from "../types";
import { FilterInfo } from "../../../utilities/types";
import { DBRawResponse } from "../../../mockUtilities/types";
import { getPaginatedResponse } from "../../../mockUtilities";
import { ConsumerDBDTO } from "./types";

dotenv.config();
const RUN_MODE = process.env.RUN_MODE || "dev"

export default {
    receivedConsumers: (payload:any): Promise<DBStatResponse> =>{
        if(RUN_MODE !="dev"){
            console.log("payload before sending ", payload)
            return makeCall("POST", "/consumer/bulk_create_consumer", { consumers: payload })
        }
        
        return new Promise((resolve) => {
          resolve({
              message:"Consumers Received",
              totalErrRecs:"2"
              
          })
        })
      },
    createConsumer: (payload: any): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/create_consumer", {...payload, isVVIP: payload?.isVVIP ? "Yes": "No"})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer successfully added"
            })
        })
    },
    editConsumer: (payload: any): Promise<DBStatResponse> => {
        console.log(payload)
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/edit_consumer", {consumerId: payload.id,...payload, isVVIP: payload?.isVVIP ? "Yes": "No"})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer edited added"
            })
        })
    },
    enableConsumer: (payload: any): Promise<DBStatResponse> => {
        console.log(payload)
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/enable_consumer", {consumerId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer enabled"
            })
        })
    },
    disableConsumer: (payload: any): Promise<DBStatResponse> => {
        console.log(payload)
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/disable_consumer", {consumerId: payload.id})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            resolve({
                message: "Consumer disabled"
            })
        })
    },

    resetPassword: (payload: any): Promise<DBStatResponse> => {
            if (RUN_MODE != "dev") {
                return makeCall("POST", "/user/reset_password_crn", {consumerId:payload})
            }
    
            //mock call
            return new Promise((resolve) => {
                //logic inside can be implemented within a stored procedure
                resolve({
                    message: "User successfully edited"
                })
            })
    
    },
    getConsumers: (filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_all_consumers", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            resolve(getPaginatedResponse(rawResponse, filters))
        })
    },
    getAllConsumers: (filters: any): Promise<DBResponse> => {
        return makeCall("POST", "/consumer/get_all_consumers", {
            getAll: true,
            ...filters
        })
    },
    getConsumerById: (consumerId: string): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_by_id", {consumerId, perPage: 1, currPage: 1})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            const meter = rawResponse.rows.find(meter => meter.consumerId === consumerId)
            if (meter) {
                resolve({ rows: [meter], totalRecords: 1 })
            } else {
                resolve({ rows: [], totalRecords: 0 })
            }
            
        })
    },
    getConsumerRechargesByConsumerId: (consumerId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_recharges_by_id", {consumerId, ...filters})
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockMeterRecharges)
            const meterRecharges = rawResponse.rows.filter(row => row.consumerId === consumerId)
            resolve(getPaginatedResponse({
                rows: meterRecharges
            }, filters))
        })
    },
    getConsumerMeterStats: (consumerId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_meter_stats_by_consumer_id", { consumerId })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            const consumer: ConsumerDBDTO = rawResponse.rows.find(row => row.consumerId === consumerId)
            if (consumer) {
                resolve({
                    "eBReading": "6526.38kWh",
                    "dGReading": "302.46kWh",
                    "unit": "LGF-01",
                    "meter": consumer.meterSerialNo,
                    "cutStatus": "Warning",
                    "dG": "OFF",
                    "currentLoad": "0.0052kWh"
                })
            } else {
                resolve({
                    "eBReading": "6526.38kWh",
                    "dGReading": "302.46kWh",
                    "unit": "LGF-01",
                    "meter": "",
                    "cutStatus": "Warning",
                    "dG": "OFF",
                    "currentLoad": "0.0052kWh"
                })
            }
        })
    },
    getConsumerSanctionedLoadStats: (consumerId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_sanctioned_load_stats_by_consumer_id", { consumerId })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            const consumer: ConsumerDBDTO = rawResponse.rows.find(row => row.consumerId === consumerId)
            if (consumer) {
                resolve({
                    "eBSanctionedLoad": "9.0KW",
                    "dGSanctionedLoad": "7.0KW"
                })
            } else {
                resolve({
                    "eBSanctionedLoad": "9.0KW",
                    "dGSanctionedLoad": "8.0KW"
                })
            }
        })
    },
    getConsumerCurrentConsumptionStats: (consumerId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_current_consumption_stats_by_consumer_id", { consumerId })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            const consumer: ConsumerDBDTO = rawResponse.rows.find(row => row.consumerId === consumerId)
            if (consumer) {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                })
            } else {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                })
            }
        })
    },
    getConsumerCurrentMonthBalanceStats: (consumerId: string): Promise<DBStatResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_current_month_balance_stats_by_consumer_id", { consumerId })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            const consumer: ConsumerDBDTO = rawResponse.rows.find(row => row.consumerId === consumerId)
            if (consumer) {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                })
            } else {
                resolve({
                    "eBConsumption": "94.02kWh",
                    "dGConsumption": "0.09kWh"
                })
            }
        })
    },
    getConsumersByProjectId: (projectId: string, filters: FilterInfo): Promise<DBResponse> => {
        if (filters) {
            filters = {
                ...filters,
                additionalFilters: [
                    ...(filters.additionalFilters ?? []),
                    {
                        trackId: "",
                        filterType: "project",
                        filterValue: projectId
                    }
                ]
            }
        }
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_all_consumers", filters)
        }

        //mock call
        return new Promise((resolve) => {
            //logic inside can be implemented within a stored procedure
            const rawResponse: DBRawResponse = deepCopy(MockConsumers)
            const projectMeters: ConsumerDBDTO[] = rawResponse.rows.filter(row => row.projectId === projectId)
            resolve(getPaginatedResponse({
                rows: projectMeters
            }, filters))
        })
    },

    getConsumerMeterConsumptionGraph: (consumerId: string, year: string, requestType: string): Promise<DBConsResponse> => {
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_consumption_graph_by_consumer_id", { consumerId,year,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },
    getConsumerMeterConsumptionGraphweekly: (consumerId: string, month: string, requestType: string): Promise<DBConsResponse> => {            
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_consumption_graph_by_consumer_id", { consumerId,month,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },

    getConsumerMeterConsumptionGraphDaily: (consumerId: string, startDate: string, endDate: string, requestType: string): Promise<DBConsResponse> => {            
        if (RUN_MODE != "dev") {
            return makeCall("POST", "/consumer/get_consumer_consumption_graph_by_consumer_id", { consumerId,startDate,endDate,requestType })
            // return new Promise((_, reject) => {
            //     reject(new Error("Not Implemented"))
            // })
        }

        return new Promise((resolve) => {
         

          });

        
    },



    
}