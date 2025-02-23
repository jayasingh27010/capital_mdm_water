import axios from "axios";
import AuthService from "../services/AuthService";
import DBservice from "../services/DBservice";
import { FilterInfo } from "./types";
import dotenv from "dotenv"
dotenv.config()

const { parse, stringify } = JSON;
const tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME || "2M"
export const deepCopy = (value: any): any => {
  return parse(stringify(value));
};

export const parseAuthTokenFromReq = (req: any, isConsumerRoute: boolean = false): any => {
  // console.log("req", req.headers)
  if (!req?.headers || !req?.headers?.authorization) {
    throw new Error("Token Not Found");
  }
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")?.[1] ?? "";
  const decoded: any = AuthService.verify(token);
  if (decoded === false) {
    throw new Error("Token Expired");
  }
  if (tokenExpirationTime?.length <= 1) {
    throw new Error("Invalid Token Expiration Configuration")
  }
  if (!tokenExpirationTime.includes("M")) {
    throw new Error("Invalid Token Expiration Time Unit")
  }
  if (!decoded?.accountTypeValue) {
    throw new Error("Access Denied")
  }
  if (!isConsumerRoute && decoded?.accountTypeValue === "consumer") {
    throw new Error("Access Denied")
  }

  const expirationTimeInMins = parseInt(tokenExpirationTime)
  const expirationTimeInMilliSecs = expirationTimeInMins * 60 * 1000
  const timeDifference = Date.now() - parseInt(decoded.tokenCreationTime)
  if (timeDifference > expirationTimeInMilliSecs) {
    throw new Error("Token Expired")
  }
  return decoded;
};

export const extractFiltersFromRequest = (req: any): FilterInfo => {
  if (!req.hasOwnProperty("body")) {
    return {
      currPage: 1,
      perPage: 5,
    };
  }
  let filters = req?.body;
  if (req.body.hasOwnProperty("filters")) {
    filters = req.body.filters;
  }
  const finalFilters: FilterInfo = {
    currPage: parseInt(filters?.currPage) ?? 1,
    perPage: parseInt(filters?.perPage) ?? 5,
    getAll : filters?.getAll === true ? true : false 
  };
  if (filters?.additionalFilters) {
    finalFilters.additionalFilters = filters.additionalFilters;
  }
  return finalFilters;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createLog = async (
  tokenObj: any,
  module: string,
  action: string,
  payload: any,
  description: string
) => {
  try {
    await DBservice.AuditLogs.log({
      userId: tokenObj.userId,
      userName: tokenObj.firstName,
      moduleNameValue: module,
      actionNameValue: action,
      description:description,
      ...payload
    });
    console.log({
      userId: tokenObj.userId,
      module,
      action,
      payloadJSONStr: JSON.stringify(payload),
    });
  } catch (e) {
    console.log("error logging", e);
  }
};

const getApiInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:9099",
    // baseURL: "http://192.168.29.214:9097",
    timeout: 20000
  });
  return instance;
};

export const makeCall = async (
  method: string,
  path: string,
  sendObj: any
): Promise<any> => {
    console.log("wjhbcwcbikcvhjqbivqkc",sendObj);
  return new Promise((resolve, reject) => {
    switch (method) {
      case "GET":
        getApiInstance()
          .get(path, sendObj)
          .then(({ data }: any) => {
            resolve(data?.body);
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
        break;
      case "POST":
        getApiInstance()
          .post(path, sendObj,{headers: {
            'Content-Type': 'application/json',  // Set the content type to application/json
            'Accept': 'application/json'
        },})
          .then((obj: any) => {
            if (obj.data) {
              const { data } = obj
              console.log(`Request Path: ${path}`);
              console.log(`Response: ${JSON.stringify(data.body)}`);
  
              // Check if `status` exists, and if so, delete it
              if (data?.body?.status) {
                // delete data.body.status;
              }
  
              // Resolve the promise with the body of the response
              resolve(data?.body);

            } else {
              reject(new Error("No Data Found"))
            }
            console.log("")
          })
          .catch((e) => {
            console.error(`Error on request to ${path}:`, e);

            // Log detailed error information
            if (e.response) {
              console.error(
                `Response Data: ${JSON.stringify(e.response.data)}`
              );
              console.error(`Status: ${e.response.status}`);
              console.error(`Headers: ${JSON.stringify(e.response.headers)}`);
            } else if (e.request) {
              console.error(`No response received: ${e.name}`);
              reject(e)
            } else {
              console.error(`Error: ${e?.message}`);
            }
            if (e?.response?.data?.body) {
              reject(e?.response?.data?.body); // Reject the promise with the error
            }
          });
        break;
      case "PUT":
        getApiInstance()
          .put(path, sendObj)
          .then(({ data }: any) => {
            resolve(data);
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
        break;
    }
  });
};
