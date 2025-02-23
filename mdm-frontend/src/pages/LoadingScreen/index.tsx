import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Routes from "src/Routes"
import { CLEAR_USER_CONTEXT, INIT_APP_LOADING, LOGIN_LOAD_ALL_SUCCESS} from "src/actions/AppContextActions"
import { initAppState } from "src/api/AppState"
import Spinner from "src/components/Spinner"
import { AppContext } from "src/contexts"
import { chainRoutes, clearToken, getToken } from "src/utility"


const LoadingScreen = () => {
  const { context, dispatch } = useContext<any>(AppContext)
  const navigate = useNavigate()

  const loadAll = () => {
    initAppState()
      .then((resp: any) => {
        const { userInfo, menuItems } = resp
        dispatch({
            type: LOGIN_LOAD_ALL_SUCCESS,
            payload: {
                menuItems,
                userInfo
            }
        })
        if (userInfo?.accountTypeValue === "consumer") {
          navigate(chainRoutes(Routes.admin, Routes.consumers, `/${userInfo.userId}`))
        } else {
          navigate(chainRoutes(Routes.admin, Routes.dashboard))
        }
      })
  }

  // useEffect(() => {
  //   console.log("context: ", context)
  // }, [context])
  
  useEffect(() => {
    if (!context.isLoading && !context.isLoaded) {
      dispatch({ type: INIT_APP_LOADING })
      return
    }

    if (context.isLoading && !context.isLoaded) {
      if (!getToken()) {
        dispatch({ type: CLEAR_USER_CONTEXT })
        clearToken()
      } else {
        loadAll()
      }
    }
  }, [context?.isLoading, context?.isLoaded, getToken()])
  if (context?.isLoading)
  return (
      <div
      style={{
        width: '100vw',
        height: '100vh'
      }}
      className='d-flex flex-column justify-content-center align-items-center'>
      <Spinner/>
    </div>
  )
  return <></>
}

export default LoadingScreen