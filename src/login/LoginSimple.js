import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import fetchList from 'functions/fetchList';
import tkColors from 'Settings/tkColors'
import config from 'Settings/config';
import {setUser, LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'

const url=process.env.REACT_APP_API_BASE_URL + '/admin/tkcolumns?tableName=tbl_event_def';
const TEXTS={
    ONLY:{
        SV:'OBS ! ENBART FÖR ADMINISTRATÖRER AV DENNA SAJT',
        EN:'NOTE! ONLY FOR ADMINISTRATORS OF THIS SITE',
    },
    LOGIN:{
        SV:'Logga på med username och password',
        EN:'Signin with username and password',
    },
    LOGOUT:{
        SV:'Du är inloggad. Om du önskar logga ut tryck på knappen nedan.',
        EN:'You are logged in. If you want to logout, press button below',
    },
    ERROR:{
        SV:'Detta fält är obligatoriskt',
        EN:'This field is required',
    },
}

const setSlimUser = () => {
    if (process.env.REACT_APP_SLIM_USERID!==undefined) {
      setUser(USERNAME, process.env.REACT_APP_SLIM_USERID)
      setUser(PASSWORD, process.env.REACT_APP_SLIM_PASSWORD)
      setUser(LOGGED_IN_FLAG, true)      
    }  
}


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
  

const Login =  (props) => {
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState('transparent')
    const { loggedInFlag, username, password, language, setUser}=props

    useEffect(()=>{
    }, [])

    const handleSignin = (e) => {
        setButtonBackgroundColor('pink')
        try {
            fetchList(username, password, url, (records) => {
                if (records.length > 0) {
                    setButtonBackgroundColor('transparent')
                    localStorage.setItem(USERNAME, username)
                    localStorage.setItem(PASSWORD, password)
                    setUser(USERNAME, username)
                    setUser(PASSWORD, password)
                    setUser(LOGGED_IN_FLAG, true)
                }    
            })    
        } catch(event) {
            let errMessage = 'ERROR:' + e 
            // console.log('ERROR: Failed to login as user +', username);
            // console.log(errMessage);
            alert(errMessage)
        } 
       e.preventDefault()
    }       

    const handleSignout = (e) => {
        setUser(USERNAME, undefined);
        setUser(PASSWORD, undefined);
        setUser(LOGGED_IN_FLAG, undefined);
        localStorage.removeItem(USERNAME)
        localStorage.removeItem(PASSWORD)
        e.preventDefault()
    }       
    
    const handleChange = e => {
        // console.log('[' + e.target.name + '] = ' + e.target.value)
        setUser(e.target.name, e.target.value);
    }

    return (
        <div>
            {!loggedInFlag? 
            <div style={styles.container}>
            <form  onSubmit={handleSignin}>
                <p/>  
                <label>
                <h1>{TEXTS.LOGIN[language]}</h1>
                <h2>{TEXTS.ONLY[language]}</h2>
                </label>
                <input style={styles.input} name='username' type='text' placeholder='Username' onChange={handleChange} />
                <p/>
                <input style={styles.input} name='password' type='password' placeholder='Password' onChange={handleChange} />
                <p/>
                <button className="button" type="submit" style={{backgroundColor:buttonBackgroundColor}}>
                        Signin     
                </button>    
            </form>
            </div>
            :
            null}    
        </div>
    );
}

// Get the state from the Map the props that you want to pass to the State
const mapStateToProps = (state) => {
    return {
        username: state.user[USERNAME],
        password: state.user[PASSWORD],
        loggedInFlag: state.user[LOGGED_IN_FLAG],
        language: state.language,
    }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (key, value) => {dispatch(setUser(key, value))},
    }        
}

export default connect(mapStateToProps,  mapDispatchToProps) (Login);    

