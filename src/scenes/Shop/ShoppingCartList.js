import React from 'react'
import { connect } from 'react-redux'
import ShoppingCartItem from './ShoppingCartItem'
import ShoppingCartReset from './ShoppingCartReset'

import {toggleItem} from 'redux/actions/actionsShop'
import {summationPrice, discount} from 'scenes/Shop/summationPrice'
import config from 'Settings/config';
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const TEXTS = {CONTAINS:{SV:'Kundvagnen innehåller',
                         ES:'Shoppingcart contains',
                         EN:'Shoppingcart contains'},   
               ITEM:    {SV:'vara',
                         ES:'item',
                         EN:'item'},                              
               ITEMS:   {SV:'varor',
                         ES:'items',
                         EN:'items'},                              
               EMPTY:   {SV:'Kundvagnen är tom',
                         ES:'Shoppingcart is empty',
                         EN:'Shoppingcart is empty'},                              
               REMOVE:   {SV:'Du kan ta bort/återställa varor från kundvagnen genom att klicka på varan i ovan',
                         ES:'You can remove/reset any item above by clicking at the item above',
                         EN:'You can remove/reset any item above by clicking at the item above'},                              
}


const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const styles = {
    root:{
    },
    list: {
    },
    shoppingCartReset:{
        flex:1, 
        flexDirection:'column',
    }
  };
  

const redirectResponse = (response) =>
{
    // Use redicrct link to paypal
    console.log('response:', response);
    alert('Later here will be redirect to paypal with TOKEN')
}

// The original _ShoppingCart
var ShoppingCartList = ({list, numberOfItems, privileges, language, currency, handleClick}) => {
    const numberOfActiveItems = list.filter(it => !it.deleted).length;
    const cartContains=numberOfActiveItems > 1?TEXTS.CONTAINS[language] + ' ' + numberOfActiveItems + ' ' + TEXTS.ITEMS[language]  
        :numberOfActiveItems === 1?TEXTS.CONTAINS[language] + ' ' + numberOfActiveItems + ' ' + TEXTS.ITEM[language]  
        :TEXTS.EMPTY[language];
    const removeText=TEXTS.REMOVE[language];
    return(
        <div key={'A'} style={styles.root}>
            <h3>{cartContains}</h3>
            <div key={'B'}>
                {list.map((li, index) =>
                    <div key={index}>
                        <ShoppingCartItem 
                            {...li} 
                            key={li.index} 
                            privileges={privileges} 
                            language={language} 
                            currency={currency} 
                            onClick={() => handleClick(li.index)} />
                    </div>    
                )}    
            </div>
            <p style={{fontSize:12}}>{removeText}</p>
            <div style={styles.shoppingCartReset}>
                {list.length > 0 ?<ShoppingCartReset />:null}
            </div>    
        </div>
    )
}    

// Get the state from the Map the props that you want to pass to the State
const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        list: state.shoppingCart.list.filter(it=>it.showInCart),
        numberOfItems: state.shoppingCart.list.filter(it=>it.showInCart).length,
        privileges: state.user.privileges,
        language: state.language,
        currency: state.currency, 
    }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (index) => {
            console.log('handleClick:dispatchToggleItem(index), index:', index)
            dispatch(toggleItem(index))
        }
    }        
}

// Connect the store to _ShoppingCart so that 
export default connect( 
    mapStateToProps,
    mapDispatchToProps
) (ShoppingCartList);    


