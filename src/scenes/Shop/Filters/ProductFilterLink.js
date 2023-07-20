import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { addFilterKey } from 'redux/actions/actionsFilterKeys'
import ProductFilterNew from 'scenes/Shop/ProductFilterNew'

const mapStateToProps = (state, ownProps) => {
  return {
    filterKeys: state.filterKeys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addFilterKey: (e) => { dispatch(addFilterKey(e.target.name, e.target.value)) }
  }
}

const Link = ({ list, label, name, filterKeys, addFilterKey }) => {
  console.log('productFilter:', filterKeys);
  return (
    <ProductFilterNew label={label} name={name} list={list} filterKeys={filterKeys} addFilterKey={e => addFilterKey(e)} />  
  )
}

Link.propTypes = {
    list: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.name.isRequired,
}

const ProductFilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default ProductFilterLink