import React, { useState} from "react"
import Button from 'Components/Button'
import {ROLE} from 'Settings/Const'

const INITIAL_VALUES_DEV =  {firstName:'Per', lastName:'Eskilson', email:'paelsis@hotmail.com', phone:'040233363', havePartner:false}
const INITIAL_VALUES_PROD =  {}

const TEXTS = {
  ERROR_NAME:{EN:'Name must only contain valid chars and blanks and - (no numbers)'  }
}

const language = 'EN';
const namePattern ="^([^0-9&()#?=]*)$"



export default (props) => {
    const initialValues = process.env.NODE_ENV==='development'?INITIAL_VALUES_DEV:INITIAL_VALUES_PROD
    const [values, setValues] = useState(initialValues);
    const handleInputChange = e => {
        //console.log('name:', e.target.name, ' value:', e.target.value, 'e.target.type:', e.target.type)
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleInputChecked = e => {
        // console.log('name:', e.target.name, ' checked:', e.target.checked, ' e.target.type:', e.target.type)
        setValues({...values, [e.target.name]: e.target.checked})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSubmit(values)
        setValues(initialValues)
    }
    const clearFields = e => {
        console.log('name:', e.target.name, ' value:', e.target.value, ' checked:', e.target.checked)

        e.preventDefault()
        setValues(initialValues)
    }
    const handleClick = () =>setValues({...values, role:ROLE.LEADER});
    return(
        <form onSubmit={handleSubmit} style={{textAlign:'center', margin:'auto'}}>
            <label>Dance role:&nbsp;
                Leader:
                <input 
                    name='role' 
                    type='radio' 
                    default 
                    checked={values.role === ROLE.LEADER} required 
                    value={ROLE.LEADER}
                    onChange={handleInputChange}
                />
                &nbsp;
                Follower:
                <input 
                    name='role' 
                    type='radio' 
                    checked={values.role === ROLE.FOLLOWER} 
                    required 
                    value={ROLE.FOLLOWER}
                    onChange={handleInputChange}
                />
            </label>
            <p/>
            <label>
            <input
                name="firstName"
                type="text"
                pattern={namePattern}
                placeholder={'First name'}
                value={values.firstName?values.firstName:''}
                required
                onChange={handleInputChange}
            />
            </label>
            &nbsp;
            <label>
            <input
                name="lastName"
                type="text"
                pattern={namePattern} 
                title={TEXTS.ERROR_NAME[language]}
                placeholder={'Last name'}
                value={values.lastName?values.lastName:''}
                required
                onChange={handleInputChange}
            />
            </label>
            &nbsp;
            <p/>
            <label>
            <input
                name="email"
                value={values.email?values.email:''}
                type="email"
                placeholder={'email'}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"
                onChange={handleInputChange}
                required
            />
            </label>
            &nbsp;
            <label>
                <input
                    name="phone"
                    value={values.phone?values.phone:''}
                    type="text"
                    placeholder={'Phone'}
                    pattern="^[0-9' '%+-]{9,14}$"
                    onChange={handleInputChange}
                    required
                />
            </label>
            <p/>
            &nbsp;
            <label>I have a partner
               <input 
                name='havePartner' 
                type='checkbox' 
                checked={values.havePartner?true:false}
                onChange={handleInputChecked} />
            </label>
            {values.havePartner?
                <div>
                <p/>
                <label>
                    <input
                        type="text"
                        name="firstNamePartner"
                        value={values.firstNamePartner?values.firstNamePartner:''}
                        placeholder={"Partners first name"}
                        pattern={namePattern}
                        required
                        onChange={handleInputChange}
                    />
                </label>
                <nbsp/>
                <label>
                    <input
                        type="text"
                        name="lastNamePartner"
                        value={values.lastNamePartner?values.lastNamePartner:''}
                        placeholder={"Partners last name"}
                        pattern={namePattern} 
                        title={TEXTS.ERROR_NAME[language]}
                        required
                        onChange={handleInputChange}
                    />
                </label>
                <p/>
                <label>
                    <input
                        type="email"
                        name="emailPartner"
                        value={values.emailPartner?values.emailPartner:''}
                        placeholder={"Partners email"}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"
                        required
                        onChange={handleInputChange}
                    />
                </label>
                </div>
            :null}
            <p/>
            <Button type="submit" variant="outlined" >Submit</Button>
            <Button variant="outlined" onClick={(e)=>clearFields(e)}>Clear</Button>
        </form>      
    )
}

