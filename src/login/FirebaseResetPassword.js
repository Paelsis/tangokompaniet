import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import Button from '@material-ui/core/Button'
import tkColors from 'Settings/tkColors'

const styles = {
  container:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center',
    color:tkColors.Purple.Light,
    fontSize:20,
    fontWeight:100,
  },
  input:{
    color:tkColors.Purple.Light,
    backgroundColor:'transparent',
    fontSize:20,
    fontWeight:100,
    outline: 0,
    border:'none',
    borderBottom: '2px solid ' + tkColors.Purple.Light,
    '&:hover':{
      background:'red'
    },
    "&:last-child": {
      borderRight: "solid 1px #cccccc"
    }
  },
  submit:{
    color:tkColors.Purple.Light,
    borderWidth:1, 
    fontSize:14, 
    fontWeight:100,  
    borderRadius:4,
    borderColor:tkColors.Purple.Light
  }
}


const FirebaseResetPassword = () =>  {
  const [email, setEmail] = useState(undefined)
  const [mailSent, setMailSent] = useState(false)
  const handleChange = e => setEmail(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    const auth = getAuth()
    sendPasswordResetEmail(auth, email).then(() => {
        setMailSent(true)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error)
    })
  }
  //const navigate = useNavigate()
  return(
    <div style={styles.container}>
      {mailSent?
        <h1>Check your mail for a link to reset your password</h1>
      :
        <>
          <h1>Send me an email with a link to reset my password</h1>
          <form onSubmit={handleSubmit}>
              <label>
                <input name='email' type='email' placeholder='Email' style={styles.input} onChange={handleChange}/>
              </label>
              <p/>
              <button className="button" type="submit">
                  Submit    
              </button>    
          </form>
        </>
        }
    </div>
  )
}  

export default FirebaseResetPassword