import { redirect } from "react-router-dom"
import { localStorage } from "."

export const validatedAuth = async () => {
  if (!localStorage.getItem('token')) {
    return redirect("/auth/login")
  }

  return null
}