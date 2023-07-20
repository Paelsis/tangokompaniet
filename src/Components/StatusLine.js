import React from 'react';
import { connect } from 'react-redux'
import tkColors from 'Settings/tkColors'
import {STATUS_OK, STATUS_ERROR, STATUS_WARNING, STATUS_MESSAGE} from 'functions/statusMessage'

const style= (status) =>({
    margin:0,
    padding:0,
    position:'fixed',
    left:0,
    bottom:'0%', 
    width:'100vw',
    backgroundColor:status===STATUS_OK?'green'
        :status===STATUS_WARNING?'yellow'
        :status===STATUS_ERROR?'red'
        :status===STATUS_MESSAGE?tkColors.Purple.Light
        :'orange',
    color:status===STATUS_OK?tkColors.Text.Light
        :status===STATUS_WARNING?tkColors.Text.Dark
        :status===STATUS_ERROR?tkColors.Text.Light
        :status===STATUS_MESSAGE?tkColors.Text.Light
        :'white',
    textAlign:'center',
})

const statusLineNull = () => (
    <div style={style('')}>
        No status message at all
    </div>
)

const StatusLine = ({status, message}) =>
(
    status?
        <div style={style(status)}>                       
            {message?message:'No message sent to status line'}       
        </div>
    :
        null
)

const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        status: state.statusMessage.status,
        message: state.statusMessage.message,
    }
}    

export default connect(mapStateToProps)(StatusLine)
