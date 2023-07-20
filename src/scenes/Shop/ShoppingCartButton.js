import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ShoppingCartIcon from  'material-ui/svg-icons/action/shopping-cart';
import {tkColors} from 'Settings/tkColors'

const _WithBadge = ({styles, nbrDebitable}) => {
  return (
    <IconButton 
          tooltip="Click to review your shoppingcart"
          tooltipPosition="bottom-right"
          style={styles.button}
          iconStyle={styles.icon}
          containerElement={<Link to="/shoppingcart" />} 
    > 
        <Badge
          badgeStyle={styles.badge}
          badgeContent={nbrDebitable}
          //primary={true}
        >
          <ShoppingCartIcon color={styles.icon.color} />
        </Badge>
    </IconButton>
  )      
}

let ShoppingCartButton = (props) => {
    const iconColor=props.iconColor?props.iconColor:tkColors.Purple.Light;
    const textColor=props.textColor?props.textColor:tkColors.Purple.Light;
    const styles = {
      button: {
        padding:12,
        zindex:10,
      },
      icon: {
          padding:0,
          width: 36,
          height: 36,
          color:iconColor, // Color on the icon
      },
      badge: {
        top:-4,
        right:1,
        zIndex:12,
        width:14,
        height:14,
        zindex:11,
        color:textColor,  // Color of the text in the badge
        backgroundColor:iconColor, // Set the icon color of the badge
      },
    };
    return (
        props.listSize > 0?<_WithBadge styles={styles} nbrDebitable={props.nbrDebitable} />:null
    )
}

const mapStateToProps = (state) => {
  return {
      list: state.shoppingCart.list.filter(it=>it.showInCart),
      listSize: state.shoppingCart.list.filter(it=>it.showInCart).length,
      nbrDebitable:state.shoppingCart.list
        .filter(it=>it.showInCart && !it.deleted && (it.price?it.price > 0:false)).length,
   }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      //onMyClick: (index) => { dispatch(toggleStrikeover(index))}
     onMyClick: (nbrDebitable) => { alert('product Id' + nbrDebitable) }
  }        
}

ShoppingCartButton =  connect( 
    mapStateToProps,mapDispatchToProps
) (ShoppingCartButton);    

export default ShoppingCartButton
