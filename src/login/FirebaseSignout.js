import React, {useContext} from "react"
import { connect } from 'react-redux'
import { getAuth, signOut} from 'firebase/auth';
import {Navigate} from "react-router-dom"
import {setUser, LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import {AuthContext} from "login/FirebaseAuth"
import Button from '@material-ui/core/Button';
import tkColors from 'Settings/tkColors'



const FirebaseSignout = (props) => {
    const handleClick = () => {
        const auth = getAuth()
        props.setUser(LOGGED_IN_FLAG, false)
        props.setUser(USERNAME, undefined)
        props.setUser(PASSWORD, undefined)
        localStorage.setItem(USERNAME, undefined)
        localStorage.setItem(PASSWORD, undefined)
        signOut(auth)
    }    
    const {user} = useContext(AuthContext)
    return(
        user===null?
            <Navigate to="/firebaseSignin" />
        :
            <div style={{display:'flex', width:'100vw', textAlign:'center', verticalAlign:'center'}}>
                <h1>Firebase Signout</h1>
                <Button type="submit" variant="outlined"  size='small' style={{borderWidth:1, fontWeight:600,  borderRadius:4}} color={tkColors.Purple.Light} onClick={()=>handleClick()}>
                        Signout     
                </Button>    
            </div>    
    )
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (key, value) => {dispatch(setUser(key, value))},
    }        
}

export default connect(null, mapDispatchToProps)(FirebaseSignout)