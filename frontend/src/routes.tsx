import { createBrowserRouter } from "react-router-dom"
import { Login } from "./pages/authenticate/login"
import { ErrorPage } from "./pages/errorPage"
import { BaseAuthenticate } from "./pages/authenticate"
import { Register } from "./pages/authenticate/register"

export const routes = createBrowserRouter([
  {
    path: '/auth/',
    element: <BaseAuthenticate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      }
    ]
  }
])