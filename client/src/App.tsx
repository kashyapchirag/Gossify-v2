import { RouterProvider,createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import Join from "./pages/Join"
import Rooms from "./pages/Rooms"
import Chat from "./pages/Chat"
import ErrorPage from "./pages/ErrorPage"


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          index:true,
          element:<Join/>
        },
        {
          path:'rooms',
          element:<Rooms/>
        },
        {
          path:'chat/:room',
          element:<Chat/>
        },
      ]
    }
  ])


  return <RouterProvider router={router}/>
}

export default App
