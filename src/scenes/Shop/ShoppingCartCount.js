import React from 'react'
import { connect } from 'react-redux'
import {toggleStrikeover} from 'redux/actions/actionsShop'


// Get the state from the Map the props that you want to pass to the State
const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        length: state.shoppingCart.list.filter(li => li.deleted === false).length
    }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        onMyClick: (index) => alert('Click on Counter' + index)
    }        
}

// The original _ShoppingCart
let ShoppingCartCount = ({length, onMyClick}) => (
    <div onClick={onMyClick}>
    {length > 0 ? length: 'empty'}
    </div>
)

// Connect the store to ShoppingCart so that 
ShoppingCartCount =  connect( 
    mapStateToProps,
    mapDispatchToProps
) (ShoppingCartCount);    

export default ShoppingCartCount

