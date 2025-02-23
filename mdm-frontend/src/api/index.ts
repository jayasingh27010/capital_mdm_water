import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { getToken, replaceRelativeAdminPath } from "src/utility"


export const axiosInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response.data.refreshedToken) {
            localStorage.setItem("token", response.data.refreshedToken)
        }
        return response;
      }, function (error) {
        console.log("error data", error.response.data.status)
        if(error?.response?.data?.message === "Database ECONNREFUSED" || error?.response?.data?.message === ""){
            const userConfirmed = confirm("No response from server. You will be logged out.");

            if (userConfirmed) {
                localStorage.clear(); 
                location.href = replaceRelativeAdminPath(location.href, "/login");
            } else {
                console.log("User canceled logout.");
            }
            return
        }
        if (error?.response?.data?.message === "Token Expired") {
            localStorage.clear()
            location.href = replaceRelativeAdminPath(location.href, "/login")
        } else {
            return Promise.reject(error);
        }
        // console.log("error in response interceptor", error)
      });

    return instance
}



export const noAuthAxiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

export const useApi = (
    apiPromise: (params?: any) => Promise<any>,
    params?: any,
    doNotLoadIfUndefined?: boolean
) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [data, setData] = useState<any>(undefined)
    const [error, setError] = useState<any>(undefined)

    const load = useCallback(() => {
        setIsLoading(true)
        apiPromise(params ?? {})
        .then(({ data }: any) => {
            setData(data)
        })
        .catch((err: any) => {
            setError(err)
            if(err?.response?.status?.code === 400){
                window.location.reload();
            }
            if(err?.response?.data?.message === "Database ECONNREFUSED"){
                  const userConfirmed = confirm("No response from server. You will be logged out.");
            if (userConfirmed) {
                localStorage.clear(); 
                location.href = replaceRelativeAdminPath(location.href, "/login");
            } else {
                console.log("User canceled logout.");
            }
            }
        })
        .finally(() => {
            setIsLoading(false)
            setLoaded(true)
        })
    }, [params])

    useEffect(() => {
        if (params === undefined && doNotLoadIfUndefined) {
            return
        }
        if (!loaded && !isLoading) {
            load()
        }
    }, [isLoading, loaded, load])

    const refresh = useCallback(() => {
        load()
    }, [load])

    return {
        isLoading,
        loaded,
        data,
        error,
        refresh
    }
}