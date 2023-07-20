import React from 'react'
import Item from './Item'
import config, {SHOP_IMAGE_DIR} from 'Settings/config';
import tkColors from 'Settings/tkColors'

const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + SHOP_IMAGE_DIR

const styles = {
    root:{
        display:'flex',
        flexDirection:'vertical',
        margin:2,
    },
    debitable: {
        color:tkColors.Purple.Light,
        borderColor:tkColors.Purple.Light,
        textDecoration:'line-through'
    }, 
    nonDebitable: {
        opacity: 0.8,
        color:tkColors.Text.Dark,
        borderColor:tkColors.Text.Dark,
        color:tkColors.Text.Dark,
    }, 
    deleted: {
        opacity: 0.5,
        color:tkColors.Text.Dark,
        borderColor:tkColors.Text.Dark,
        textDecoration:'line-through'
    } 
}

const ShoppingCartItem = (props) => {
    return (
        <button className="button" type="submit" 
            color={tkColors.PurpleLight} 
            onClick={props.onClick}
        >
            <Item {...props}
              style={props.deleted?styles.deleted
                    :props.debitable?styles.debitable
                    :props.nonDebitable} 
            />
        </button>
    )
}

       // <img src={require('images/teachers/anna.jpg')} width={80} alt={'Missing pic' + {productId}}

export default ShoppingCartItem;

