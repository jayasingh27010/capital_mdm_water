import { Reducer, useContext, useEffect, useReducer, useState } from "react"
import { Navigate, createBrowserRouter, useLoaderData, useNavigate } from "react-router-dom"
import { getComponent } from "src/ComponentMap"
import Routes from "src/Routes"
import { config } from "src/config"
const { runMode } = config
import { getPage } from "src/api/Pages"
import { AppContext } from "src/contexts"
import { Action, AppContextType, MenuItem } from "src/types"
import { chainRoutes, clearToken, getToken } from "src/utility"
import AdminLayoutPage from 'src/pages/AdminLayoutPage';
import AuthenticationPage from "src/pages/AuthenticationPage"
import LoadingScreen from "src/pages/LoadingScreen"
import { appContextReducer } from "src/reducers/AppContextReducers"
import { FORCE_NAVIGATE_BEGIN, FORCE_NAVIGATION_SUCCESS, LOGIN_LOAD_ALL_FAIL, LOGIN_LOAD_ALL_SUCCESS, MENU_ITEMS_RENDER_SUCCESS, SET_BREADCRUMBS } from "src/actions/AppContextActions"
import { initAppState } from "src/api/AppState"
import AccountRecoveryPage from "src/pages/AccountRecoveryPage"
import EmailRecoveryPage from "src/pages/EmailRecoveryPage"
import UsernameRecoveryPage from "src/pages/UsernameRecoveryPage"
import ChangePasswordPage from "src/pages/ChangePasswordPage"
import { viewUserDetails } from "src/api/Pages/Users"
import { viewMeterDetails } from "src/api/Pages/Meters"
import { viewConsumerDetails } from "src/api/Pages/Consumers"
import { viewProjectDetails } from "src/api/Pages/Projects"
import { viewTarrifDetails } from "src/api/Pages/Tarrifs"



export const useLoadAppBar = () => {
  console.log("app bar comp loaded")
  const data: any = useLoaderData()
  const { dispatch, context } = useContext<any>(AppContext)

  const isSame = (p1: string[], p2: string[]): boolean => {
    if (p1.length !== p2.length) {
      return false
    }
    let index = 0
    for (const elem of p1) {
      if (elem !== p2[index]) {
        return false
      }
      index++
    }
    return true
  }

  useEffect(() => {
    console.log("about to set breadcrumb", context, data)
    // setBreacrumbs(data?.config?.label, data?.config?.iconName)

    if (data?.config?.label) {
      const foundLabels: string[] = data.config.label.map((label: any) => label.clickPath)
      const oldLabels: string[] = (context?.breadcrumbs ?? []).map((label: any) => label.clickPath)
      if (!isSame(foundLabels, oldLabels)) {
        setBreacrumbs(data?.config?.label, data?.config?.iconName)
      }
    }
  }, [data, context])

  const setBreacrumbs = async (labels: any[], iconName: any) => {
    const userLabel = labels.find(item => item.clickPath.includes("users") && item.clickPath.split("/").length === 4)
    const meterLabel = labels.find(item => item.clickPath.includes("meters") && item.clickPath.split("/").length === 4)
    const consumerLabel = labels.find(item => item.clickPath.includes("consumers") && item.clickPath.split("/").length === 4)
    const projectLabel = labels.find(item => item.clickPath.includes("projects") && item.clickPath.split("/").length === 4)
    const tariffLabel = labels.find(item => item.clickPath.includes("tarrifs") && item.clickPath.split("/").length === 4)
    if (consumerLabel) {
      if (!labels[1].id) {
        labels[1].id = labels[1].displayName
      }
      const { data }: any = await viewConsumerDetails(labels[1].id)
      labels[1].displayName = data.data.consumerName
    }
    if (userLabel) {
      if (!labels[1].id) {
        labels[1].id = labels[1].displayName
      }
      const { data }: any = await viewUserDetails(labels[1].id)
      labels[1].displayName = data.data.name
    }
    if (meterLabel) {
      if (!labels[1].id) {
        labels[1].id = labels[1].displayName
      }
      const { data }: any = await viewMeterDetails(labels[1].id)
      labels[1].displayName = data?.data?.meterSerialNo
    }

    if (projectLabel) {
      if (!labels[1].id) {
        labels[1].id = labels[1].displayName
      }
      const { data }: any = await viewProjectDetails(labels[1].id)
      labels[1].displayName = data.data.projectName
    }
    if (tariffLabel) {
      if (!labels[1].id) {
        labels[1].id = labels[1].displayName
      }
      const { data }: any = await viewTarrifDetails(labels[1].id)
      labels[1].displayName = data.data.name
    }
    dispatch({
      type: SET_BREADCRUMBS,
      payload: {
        breadcrumbs: labels,
        appbarIcon: iconName ?? 'home'
      }
    })
  }

}


const defaultState: AppContextType = {
  isLoading: false,
  isLoaded: false,
  isLoggedIn: false,
  isMenuRendered: false,
  forceNavigate: false,
  forceNavigationPath: "",
  menuItems: [],
  breadcrumbs: [],
  appbarIcon: '',
  userInfo: {},
  breadCrumbLoaded: false,
  openActionModals: {},
  actionModalData: {},
  tables: {},
  connection_error:false,
  
}


const defaultRoutes = [
  // {
  //   path: "*",
  //   element: <div></div>
  // },
  {
    path: "*",
    element: <LoadingScreen />
  },
  {
    path: Routes.home,
    element: <Navigate to="/login" />
  },
  {
    path: Routes.login,
    element: <AuthenticationPage />,
  },
  {
    path: Routes.AccountRecovery,
    element: <AccountRecoveryPage />
  },
  {
    path: Routes.EmailRecovery,
    element: <EmailRecoveryPage />
  },
  {
    path: Routes.UsernameRecovery,
    element: <UsernameRecoveryPage />
  },
  {
    path: Routes.ChangePassword,
    element: <ChangePasswordPage />,
  }
]

const dataCache: Record<string, any> = {};

// const wrappedGetPage = (path: string) => {
//   return new Promise((resolve, reject) => {
//     getPage({
//       pagePath: path
//     })
//     .then(({ data }: any) => {
//       resolve(data)
//     })
//     .catch(() => {
//       reject({})
//     })
//   })
// }

const wrappedGetPage = (path: string) => {
  return new Promise((resolve, reject) => {
    // Check cache first before calling the API
    if (dataCache[path]) {
      resolve(dataCache[path]);
    } else {
      getPage({
        pagePath: path,
      })
        .then(({ data }: any) => {
          dataCache[path] = data; // Store response in cache
          resolve(data);
        })
        .catch(() => {
          reject({});
        });
    }
  });
};

export const useLoadApp = () => {
  const [context, dispatch] = useReducer<Reducer<AppContextType, Action>>(appContextReducer, defaultState)
  const [routerPaths, setRouterPaths] = useState<any[]>(defaultRoutes)
  const [userInfo, setUserInfo] = useState<any>(null);
  // const navigate = useNavigate()

  const router = createBrowserRouter(routerPaths);

  

  const loadMenu = (menuItems: MenuItem[]) => {
    console.log("loadMenu was called", menuItems)
    // const childrenPaths = menuItems.length > 0 ? menuItems.map((mI: MenuItem) => ({
    //   ...mI,
    //   path: chainRoutes(Routes.admin, mI.path ?? ""),
    //   element: getComponent(mI.pageComponent),
    //   loader: async (params: any) => {
    //     try {
    //       let path = chainRoutes(Routes.admin, mI.path ?? "")
    //       if (params?.params?.id) {
    //         path = path.replace(":id", params.params.id)
    //       }
    //       if (runMode === 'dev') {
    //         return getPage({
    //           pagePath: path
    //         })
    //       }
    //       const resp: any = await wrappedGetPage(path)
    //       console.log("page resp", resp)
    //       // !breadCrumbLoaded && setBreacrumbs(resp?.config?.label, resp?.config?.iconName)
    //       return Promise.resolve(resp)
    //     } catch (e) {
    //       console.log("in catch")
    //       clearToken()
    //       return Promise.resolve({})
    //     }
    //   }
    // })) : []

  // const loadMenu = (menuItems: MenuItem[]) => {
  //   // console.log("loadMenu was called", menuItems);

    const childrenPaths = menuItems.length > 0 ? menuItems.map((mI: MenuItem) => ({
      ...mI,
      path: chainRoutes(Routes.admin, mI.path ?? ""),
      element: getComponent(mI.pageComponent),
      loader: async (params: any) => {
        try {
          let path = chainRoutes(Routes.admin, mI.path ?? "");
          if (params?.params?.id) {
            path = path.replace(":id", params.params.id);
          }
          if (runMode === 'dev') {
            return getPage({
              pagePath: path
            })
          }

          // Check if the data is already cached
          if (dataCache[path]) {
            return Promise.resolve(dataCache[path]);
          }

          // If not cached, make the API call
          const resp: any = await wrappedGetPage(path);
          // console.log("page resp", resp);
          return Promise.resolve(resp);
        } catch (e) {
          // console.log("in catch");
          clearToken();
          return Promise.resolve({});
        }
      },
    })) : [];
    dispatch({
      type: MENU_ITEMS_RENDER_SUCCESS
    })
    const adminRoute: any = {
      path: Routes.admin,
      element: <AdminLayoutPage />,
      children: childrenPaths
    }
    const finalRouterPaths = menuItems?.length === 0 ? defaultRoutes : defaultRoutes.concat([adminRoute])
    setRouterPaths(finalRouterPaths)
  }

  console.log(context,"context","context")


  useEffect(() => {
    if (!context.isLoaded) {
      if (!getToken()) {
        dispatch({
          type: LOGIN_LOAD_ALL_FAIL
        })
        return
      }
      initAppState()
        .then((resp: any) => {
          const { userInfo, menuItems } = resp
          setUserInfo(userInfo?.accountTypeValue)
          dispatch({
            type: LOGIN_LOAD_ALL_SUCCESS,
            payload: {
              userInfo,
              menuItems
            }
          })
          if (userInfo.accountTypeValue === "consumer") {
            dispatch({
              type: FORCE_NAVIGATE_BEGIN,
              payload: chainRoutes(Routes.admin, Routes.consumers, `/${userInfo.userId}`)
            })
          } else {
            dispatch({
              type: FORCE_NAVIGATE_BEGIN,
              payload: chainRoutes(Routes.admin, Routes.dashboard)
            })
          }
        })
        .catch(() => {
          dispatch({
            type: LOGIN_LOAD_ALL_FAIL
          })
          clearToken()
        })
    }
  //   if (context.isLoaded && !context.isMenuRendered && context.isLoggedIn && !context?.breadCrumbLoaded) {
  //     loadMenu(context?.menuItems)
  //   }
  // }, [context, loadMenu])
  if (context.isLoaded && !context.isMenuRendered && context.isLoggedIn && !context?.breadCrumbLoaded) {
    loadMenu(context?.menuItems);
  }
}, [context]);

useEffect(() => {
  if (userInfo) {
    Object.keys(dataCache).forEach((key) => {
      delete dataCache[key]; 
    });
  }
}, [userInfo]); 

  return {
    router,
    context,
    dispatch
  }
}

export const useForceExit = () => {
  const navigate = useNavigate()
  const { context, dispatch } = useContext<any>(AppContext)
  useEffect(() => {
    if (context.forceNavigate) {
      navigate(context.forceNavigationPath)
      dispatch({
        type: FORCE_NAVIGATION_SUCCESS
      })
    }
  }, [context])
}