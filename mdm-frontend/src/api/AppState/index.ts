import { convertObjectToList } from "src/utility"
import { getNavigation } from "../Navigation"
import { getUser } from "../User"

export const initAppState = async () => {
    return new Promise(async (resolve) => {
        try {
        const { data } = await getNavigation()
        const userInfo: any = await getUser({})
        const menuItems = convertObjectToList(data?.config?.menuItems)
        resolve({
            userInfo: userInfo?.data,
            menuItems
        })
        } catch (e) {
    
        }
    })
    
}