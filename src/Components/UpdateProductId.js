import React, {useState} from 'react'
import { connect } from 'react-redux'
import postPayload from 'functions/postPayload'
import config from 'Settings/config'
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'


const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/updateProductId';

const UpdateProductId = (props) => {
    const {username, password, fromProductId, handleResult} = props
    const [toProductId, setProductId] = useState(fromProductId);
    const [buttonColor, setButtonColor] = useState('grey');
    const payload = {fromProductId, toProductId}
    const onSubmit = e =>{
            e.preventDefault(); 
            setButtonColor('green');
            postPayload(url, username, password, payload, (data)=>handleResult(data))
    }
    console.log(url, username, password, fromProductId, toProductId)
    return(
        <form onSubmit={onSubmit}>
            <label>
                Enter new productId for all course menbers:
                <input 
                    style={{width:200}}
                    type='string'
                    name={'productId'} 
                    value={toProductId}
                    onChange={e=>setProductId(e.target.value)}
                />
            </label>
            <input style={{color:'white', backgroundColor:buttonColor}} type='submit' />
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
    }
}    

export default connect(mapStateToProps)(UpdateProductId);    



