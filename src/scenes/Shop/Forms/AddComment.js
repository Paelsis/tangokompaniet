import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'

const renderTextField = props => (
  <TextField hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
)

const AddComment = ({ addComment }) => {
  let input

  return (
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          addComment(input.value)
          input.value = ''
        }}
      >
        <input ref={node => {input = node}} />
        <button className="button" type="submit">
          Add Comment
        </button>
      </form>
  )
}

export default AddComment
