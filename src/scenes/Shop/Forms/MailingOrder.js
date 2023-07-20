
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'


let MailingOrder = ({ fullName, address, zipCity, country, email, message, list }) => {
  return (
    <div style={{border:'1px solid', width:400, paddingBottom:56}}>
      {fullName}<br /> 
      {address}<br />
      {zipCity}<br />
      {country}<br />
      {email}<br />
      {message}<br />
      {list.map(li =><h4>{li.name}</h4>)}
    </div>  
  )
}

// Selector for you form with a given name
const selector = formValueSelector('MailingAddressForm') // <-- same as form name

MailingOrder = connect(
  state => {

    // can select values individually
    const { firstName, lastName} = selector(state, 'firstName', 'lastName')
    const address = selector(state, 'address')
    const { zip, city } = selector(state, 'zip', 'city')
    const country = selector(state, 'country')
    const email = selector(state, 'email')
    const message = selector(state, 'message')
    const list = state.shoppingCart.list

    // or together as a group
    return {
      fullName: `${firstName || ''} ${lastName || ''}`,
      address,
      zipCity: `${zip || ''} ${city || ''}`,
      country,
      email,
      message,
      list,
    }
  }
)(MailingOrder)

export default MailingOrder