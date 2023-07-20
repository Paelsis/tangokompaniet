import React, {useEffect, useState} from "react"
import { getAuth, onAuthStateChanged} from 'firebase/auth';
export const AuthContext = React.createContext()

const firebaseEnabled = process.env.REACT_APP_FIREBASE_API_KEY !== undefined


// https://www.youtube.com/watch?v=unr4s3jd9qA
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        if (firebaseEnabled) {
            const auth = getAuth()
            onAuthStateChanged(auth, setUser)
        }
    }, [])

    return ( 
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider