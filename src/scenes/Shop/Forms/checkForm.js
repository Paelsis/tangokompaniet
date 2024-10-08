import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit1(values) {
  return sleep(1000).then(() => {
    
    // simulate server latency
    if (!['per', 'anders'].includes(values.firstName)) {
      throw new SubmissionError({
        firstName   : 'User does not exist',
        _error: 'Login failed!'
    })
    } else if (values.lastName !== 'eskilson') {
      throw new SubmissionError({
        lastName: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      alert(`You submitted this fantastic:\n\n${JSON.stringify(values, null, 2)}`)
      // console.log(values)  
    }
  })
}

function checkForm(values) {
  return sleep(10).then(() => {
    
    // simulate server latency
    if (!values.firstName) {
      throw new SubmissionError({
        firstName   : 'Vänligen full i förnamn',
        _error: 'Förnamn saknas',
    })
    } else if (!values.lastName) {
      throw new SubmissionError({
        lastName: 'Vänligen fyll i efternamn',
        _error: 'Efternamn saknas',
      })
    } else if (!values.address) {
      throw new SubmissionError({
        address: 'Vänligen fyll i address',
        _error: 'Address saknas!'
      })
    } else if (!values.city) {
      throw new SubmissionError({
        city: 'Vänligen fyll i stad',
        _error: 'Stad saknas!'
      })
    } else if (!values.country) {
      throw new SubmissionError({
        country: 'Vänligen fyll i land',
        _error: 'Land saknas!'
      })
    } else if (!values.email) {
      throw new SubmissionError({
        email: 'Vänligen fyll i email',
        _error: 'email saknas!'
      })
    } else {
      // Here the postOrder functionality shall be added
      alert(`Form is OK:\n\n${JSON.stringify(values, null, 2)}`)
      // console.log(values)  
    }
  })
}

export default checkForm
