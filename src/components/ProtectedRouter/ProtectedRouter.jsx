import { Navigate } from "react-router-dom"

export default function ProtectedRouter({children}) {
    if(!localStorage.getItem("token"))
        return <Navigate to={"/"}/>
        
  return (
    <>
      {children}
    </>
  )
}
