import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

const _Button = (props) => {
    const {globalStyle, style} = props
    const buttonStyle = {color:globalStyle.color, borderColor:globalStyle.color, ...style}
    const restProps = {...props}
    delete restProps.globalStyle
    return(
        <Button style={buttonStyle} {...restProps}>
            {props.children}
        </Button> 
    )
}

const mapStateToProps = state => {
    return {
      language: state.language,
      globalStyle: state.style
    }
  }
  
  export default connect(mapStateToProps)(_Button)
