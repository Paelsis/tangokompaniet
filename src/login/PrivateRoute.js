import React, {useContext} from "react"
import {Route, Navigate} from "react-router-dom"
import {AuthContext} from "./FirebaseAuth"

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {user} = useContext(AuthContext)
    return ( 
        <Route
            render={routeProps => 
               !!user ?<RouteComponent {...routeProps} />
               :<Navigate to={'/firebaseSignin'} />
            }
        />
    )
}

export default PrivateRoute
