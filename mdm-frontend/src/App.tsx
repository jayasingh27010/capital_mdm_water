import { AppContext } from 'src/contexts'
import { ChakraProvider } from '@chakra-ui/react'
import {
  RouterProvider
} from "react-router-dom";
import { useLoadApp } from './hooks';
import "./App.css"

const App: React.FC = () => {
  const  { context, dispatch, router } = useLoadApp()

  return (
    <ChakraProvider>
      <AppContext.Provider value={{context, dispatch}}>
        <RouterProvider router={router}/>
      </AppContext.Provider>
    </ChakraProvider>
  )
}

export default App
