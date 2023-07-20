
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

// Selector for you form with a given name
const selector = formValueSelector('MailingAddressForm') // <-- same as form name

const mapStateToProps = state => {

  // can select values individually
  const { firstName, lastName } = selector(state, 'firstName', 'lastName')
  const address = selector(state, 'address')
  const { zip, city } = selector(state, 'zip', 'city')
  const country = selector(state, 'country')
  const email = selector(state, 'email')
  const message = selector(state, 'message')

  // or together as a group
  return {
    fullName: `${firstName || ''} ${lastName || ''}`,
    address: address,
    zipCity: `${zip || ''} ${city || ''}`,
    country:country,
    email:email,
    message:message,
  }
}

let MailingAddressShow = ({ fullName, address, zipCity, country, email, message }) => {
  return (
    <div>
      {fullName}<br /> 
      {address}<br />
      {zipCity}<br />
      {country}<br />
      {email}<br />
      {message}<br />
    </div>  
  )
}

MailingAddressShow = connect(mapStateToProps)(MailingAddressShow)

export default MailingAddressShow