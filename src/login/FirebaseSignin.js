import React, {useCallback, useContext, useEffect, useState} from "react"
import { connect } from 'react-redux'
import {Navigate, useNavigate} from "react-router-dom"
import firebaseApp from 'services/firebaseApp'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {AuthContext} from "./FirebaseAuth"

import {setUser, LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import Button from 'Components/Button'
import tkColors from "Settings/tkColors"

const styles = {
  container:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center',
    color:tkColors.Purple.Light,
    fontSize:24,
    fontWeight:200,
  },
  input:{
    color:tkColors.Purple.Light,
    backgroundColor:'transparent',
    fontSize:24,
    fontWeight:200,
    outline: 0,
    border:'none',
    borderBottom: '2px solid ' + tkColors.Purple.Light,
    '&:hover':{
      backgroundColor:'red'
    },
  },
  reset:{
    fontSize:10, 
  },
}

const FirebaseSignin = (props) => {
  const navigate = useNavigate()
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('transparent')
  const loginToAdmin = () => {
    if (process.env.REACT_APP_SLIM_USERID?true:false) {
      props.setUser(LOGGED_IN_FLAG, true)      
      props.setUser(USERNAME, process.env.REACT_APP_SLIM_USERID)
      props.setUser(PASSWORD, process.env.REACT_APP_SLIM_PASSWORD)
      localStorage.setItem(USERNAME, process.env.REACT_APP_SLIM_USERID)
      localStorage.setItem(PASSWORD, process.env.REACT_APP_SLIM_PASSWORD)
    }  
  }  
  const handleSignin = useCallback(async e => {
    e.preventDefault()
    setButtonBackgroundColor('pink')
    const {email, password} = e.target.elements
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email.value, password.value)
      loginToAdmin()
      // Automaic login to Admin via .env parameters
      setButtonBackgroundColor('transparent')
      navigate('/admin')
    } catch (error) {
      alert(error)
    }
  }, [])  
  const {user} = useContext(AuthContext)
  useEffect(()=>loginToAdmin(), [user])
  const redirectToReset = () => navigate('/firebaseResetPassword')
  return(
    user!==null?
        <Navigate to={"/admin"} />
    :
        <div style={styles.container}>
            <form  onSubmit={handleSignin}>
                 <p/>  
                <label>
                Login with email and password (only for administratiors of this site)<p/>
                </label>
                <input style={styles.input} name='email' type='email' placeholder='Email' />
                <p/>
                <input style={styles.input} name='password' type='password' placeholder='Password' />
                <p/>
                <Button variant="outlined" type="submit">
                        Signin     
                </Button>    
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Button variant="outlined" onClick={redirectToReset}>
                  Reset Password
                </Button>          
            </form>
        </div>
  )
}  
  
// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      setUser: (key, value) => {dispatch(setUser(key, value))},
  }        
}

export default connect(null, mapDispatchToProps)(FirebaseSignin)