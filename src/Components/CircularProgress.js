import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'


function _CircularProgress({globalStyle}) {
  return (
    <>
      <CircularProgress color={globalStyle.color} />
    </>
    );
}

const mapStateToProps = state => {
  return {
    globalStyle:state.style
  }
}

export default connect(mapStateToProps)(_CircularProgress)



