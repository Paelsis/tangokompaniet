import React from "react"
import {store} from 'index.js'
import {setUser, LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import { getAuth, signOut} from 'firebase/auth';
import {Navigate} from "react-router-dom"
import tkColors from "Settings/tkColors"
const TEXTS =  {
  LOGGED_OUT:{
    SV:'Du är utloggad',
    EN:'You are logged out',
    ES:'You are logged out',
  }
}


const firebaseEnabled = process.env.REACT_APP_FIREBASE_API_KEY !== undefined

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
      '&hover':{
        color:'red'
      },
    },
  }
  
  
  

export default () => {
    if (firebaseEnabled) {
      const auth = getAuth()
      signOut(auth)
    }  
    store.dispatch(setUser(USERNAME, undefined))       
    store.dispatch(setUser(PASSWORD, undefined))       
    store.dispatch(setUser(LOGGED_IN_FLAG, false))     
    localStorage.removeItem(USERNAME)
    localStorage.removeItem(PASSWORD)

    const language = store.getState().language
    return(
        <div style={styles.container}>
             {TEXTS.LOGGED_OUT[language]}
        </div>
    )
}