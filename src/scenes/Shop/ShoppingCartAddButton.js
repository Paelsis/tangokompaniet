import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import AddShoppingCartIcon from  'material-ui/svg-icons/action/add-shopping-cart';
import PaymentIcon from  'material-ui/svg-icons/action/payment';
import { addItem } from 'redux/actions/actionsShop'
import ShoppingCartButton from './tkColors.Text.Light'
import {tkColors} from 'Settings/tkColors'

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
  button: {
    border:0,
    padding:0,
  },
  badge: {
    top: 50, 
    right: 50, 
    backgroundColor: tkColors.color,
    zIndex:999,
  }
};


const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        length: state.shoppingCart.list.filter(li => li.deleted === false).length
    }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (product, value) => dispatch(addItem(product, value))
    }        
}

let _WithoutBadge = ({ onClick, product, value}) => {
  let iconStyle = {
      width: 40,
      height: 40,
      opacity: value.length===0?0.25:100,
      color: value.length===0?'orange':tkColors.color,
  }
  return (
     <span>
      <IconButton style={styles.button} 
          tooltip="Lägg i kundvagn"
          tooltipPosition="bottom-left"
          iconStyle={iconStyle}
          style={styles.medium}
          disabled={value.length===0?true:false}
          onClick={()=>onClick(product, value)}
          >
         <AddShoppingCartIcon color={tkColors.icon} />
      </IconButton>
      </span>
  )
}

let _WithBadge = ({ length, onClick, product, value}) => {
  let badgeStyle={
      top: 35, 
      right: 35, 
      zIndex:999,
      opacity:value.length===0?0.25:100,
      backgroundColor:tkColors.color,
  }
  let iconStyle = {
      width: 48,
      height: 48,
      opacity:value.length===0?0.25:100,
      color:tkColors.icon,
  }
  console.log('_WithBadge value:', value)
  return (
      <Badge  badgeStyle={badgeStyle}
              badgeContent={length}
              secondary={true}>
        <IconButton 
            tooltip="Lägg i kundvagn"
            tooltipPosition="bottom-left"
            iconStyle={iconStyle}
            style={styles.medium}
            disabled={value.length===0?true:false}
            onClick={()=>onClick(product, value)}
            >
            <AddShoppingCartIcon color={tkColors.icon} />
        </IconButton>
      </Badge>
  )
}

let ShoppingCartAddButton = ({length, ...props}) => {


    return(
    <span>  
      {length?
        <_WithBadge length={length} {...props} />
        :
        <_WithoutBadge {...props} />
      }
    </span>
    )
}

ShoppingCartAddButton = connect(mapStateToProps, mapDispatchToProps)(ShoppingCartAddButton)

export default ShoppingCartAddButton

