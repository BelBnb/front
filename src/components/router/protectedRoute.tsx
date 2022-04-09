import { User } from "@/redux/reducers/userReducer"
import React from "react"
import { Navigate } from "react-router-dom"

export interface ProtectedRouteParams {
    user: User
}

export const ProtectedRoute:React.FC<ProtectedRouteParams> = ({user, children}) => {
    
    return <React.Fragment>
           {user.authorized ? children: <Navigate to="/sign-in" replace></Navigate>}
        </React.Fragment>
}