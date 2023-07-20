import React, {useCallback} from "react"
import {useNavigate} from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
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
  },
  myButtonClass:{  
    '&:hover':{
      backgroundColor:'red'
    },
  },
}



const FirebaseSignUp = () =>  {
  const navigate = useNavigate()
  const handleSignup = useCallback(async e => {
    e.preventDefault()
    const {email, password} = e.target.elements
    try {
      const auth = getAuth()   
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }, null)  


  return(
    process.env.NODE.ENV==='production'?
      <h1>Production environment is prohibited to add new users</h1>
    : 
      <div style={styles.container}>
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
              <label>
              Email    
              <input name='email' type='email' placeholder='Email' />
              </label>
              <label>
              Password    
              <input name='password' type='password' placeholder='Password' />
              </label>

              <Button variant="outlined"  type="submit" className={styles.myButtonClass}>
                  Submit     
              </Button>    
          </form>
      </div>
  )
}  

export default FirebaseSignUp