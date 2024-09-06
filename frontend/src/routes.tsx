import BaseAuthenticate from "./pages/authenticate"
import { createBrowserRouter } from "react-router-dom"
import { ErrorPage } from "./pages/errorPage"
import Home from "./pages/home"
import Login from "./pages/authenticate/login"
import Register from "./pages/authenticate/register"

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
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  }
])