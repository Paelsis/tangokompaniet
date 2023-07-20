import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { setVisibilityFilter } from 'redux/actions/actionsVisibilityFilter'
import {tkColors} from 'Settings/tkColors'


const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  } 
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}
  

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink