import React from 'react'
import { connect } from 'react-redux'
import tkInventory from 'Data/tkInventory'
import InventoryItem from './InventoryItem'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {addCount, 
        subtractCount, 
        addReservedCount, 
        subtractReservedCount, 
        addComment} 
        from 'redux/actions/actionsInventory'

const styles={
    root:{
        display: 'flex',
        flexWrap:'wrap',
    }
}        


// Get the state from the Map the props that you want to pass to the State
const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by Inventory reducer 
        list: state.inventory.list,
        privileges: state.user.privileges,
    }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        //add: (productId, size) => { dispatch(addCount(productId, size))},
        addCount: (productId, size) => { 
            //alert('Adding ' + productId + ' ' +  size) 
            dispatch(addCount(productId, size))},
        subtractCount: (productId, size) => { 
            //alert('Subtactiong ' + productId + ' ' +  size);
            dispatch(subtractCount(productId, size))},
        addReservedCount: (productId, size) => { 
            //alert('Reserve Adding ' + productId + ' ' +  size) 
            dispatch(addReservedCount(productId, size))},
        subtractReservedCount: (productId, size) => { 
            //alert('Reserve Subtactiong ' + productId + ' ' +  size);
            dispatch(subtractReservedCount(productId, size))},
        addComment: (productId, size, comment) => {  
            alert('ChangeCommentReserve Subtactiong ' + productId + ' ' +  size + ' ' + comment)
            dispatch(addComment(productId, size, comment))},   
    }         
}

// The original _Inventory
var InventoryList = ({list, privileges, addCount, subtractCount, addReservedCount, subtractReservedCount, addComment}) => {
    return( <div style={styles.root}>
                {list.map(li =>
                    <InventoryItem 
                        key={li.index} 
                        privileges={privileges} 
                        {...li} 
                        addCount={() => addCount(li.productId, li.size)} 
                        subtractCount={() => subtractCount(li.productId, li.size)} 
                        addReservation={() => addReservedCount(li.productId, li.size)} 
                        subtractReservation={() => subtractReservedCount(li.productId, li.size)}
                        addComment={(comment) => addComment(li.productId, li.size, comment)}     
                    />
                )}
            </div>)
}

// Connect the store to _Inventory so that 
InventoryList =  connect( 
    mapStateToProps,
    mapDispatchToProps
) (InventoryList);    

export default InventoryList

