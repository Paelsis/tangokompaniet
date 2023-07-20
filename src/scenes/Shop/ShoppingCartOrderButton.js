import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Badge from 'material-ui/Badge';
import {tkColors} from 'Settings/tkColors'
import {LANGUAGE_SV, LANGUAGE_EN, LANGUAGE_ES} from 'redux/actions/actionsLanguage'


const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
    padding:0,
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
    width: 20,
    height: 20,
    padding: 2,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },

  button: {
    border:0,
    padding:0,
    margin: 0,
    backgroundColor:tkColors.Button.backgroundColor,
  },
  badge: {
    top: 10, 
    right: 10, 
    backgroundColor:tkColors.Button.backgroundColor,
    zIndex:999,
  }
};

const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        language: state.language,
        length: state.shoppingCart.list.filter(li => li.deleted === false).length
     }   
}

const _WithBadge = ({language, length}) => (
  <Badge
          badgeStyle={styles.badge}
          badgeContent={length}
          secondary={true}
  >
        <Button 
          label={language===LANGUAGE_SV?'Beställ':language===LANGUAGE_ES?'Orden':'Order'}
          primary={true} 
          overlayStyle={styles.button} 
          containerElement={<Link to="/order" />}
        /> 
   </Badge>   
)

let ShoppingCart = ({language, length}) => {
  return (
      <div>  
      {length?
        <_WithBadge length={length}/>
        :
        null
      }
      </div>
   )
}

ShoppingCart =  connect( 
    mapStateToProps, null
) (ShoppingCart);    

export default ShoppingCart
