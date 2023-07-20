import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ShoppingCartList from './ShoppingCartList'
import calculateDiscount from './calculateDiscount'
import summationPrice from './summationPrice'
import {tkColors} from 'Settings/tkColors'
import Button from 'Components/Button'
import {LANGUAGE_SV, LANGUAGE_EN, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import config from 'Settings/config';

const styles = {

  root:{
    height: '100vh',
    padding:0,
    margin:0,
    backgroundColor:tkColors.background,
  },
  cart:{
    position:'relative',  
    border: 1,
    borderColor:tkColors.Purple.Light,
    padding:10,
    maxWidth:800,
    marginLeft:'auto',
    marginRight:'auto',
    borderRadius:16,
    borderColor:tkColors.border,
    backgroundColor:tkColors.background,
  },
  empty:{
    padding:10,
    maxWidth:800,
    marginLeft:'auto',
    marginRight:'auto',
    borderRadius:16,
    backgroundColor:tkColors.background,
    color:tkColors.Purple.Light,
    textAlign:'center',
  },
  discount:{
    color:tkColors.Purple.Light,
  }

}

const TEXTS = {
    LABEL:{SV:'Utför beställning',
           ES:'Orden',
           EN:'Order',
    },
    GO_BACK:{SV:'Tillbaka/Handla mera',
           ES:'Volver',
           EN:'Go back/Shop more',
    },
    discount:{SV:"Rabatt",
           ES:"Descuento",
           EN:"Discount",
    },
    total:{SV:"Totalbelopp",
           ES:"Cantidad total",
           EN:"Total amount",
    },
    empty:{SV:"Kundvagnen tom",
           ES:"El carro de compas vacio",
           EN:"Shoppingcart is empty",
    },
}




// The original _ShoppingCart
const ShoppingCart = (props) => {
    const {shoppingCartList, totalDiscount, currency, language, history} = props
    calculateDiscount(shoppingCartList);
    const navigate = useNavigate()
    return (
        <div style={styles.root}>
            {shoppingCartList.length > 0?
                <div style={styles.cart}>
                    <ShoppingCartList {...this.props} />
                    {TEXTS.total[language]} = {summationPrice(shoppingCartList) - totalDiscount}
                            &nbsp;
                            {currency}
                    <p />
                    {totalDiscount?
                        <h4 style={styles.discount} >
                            {TEXTS.discount[language]} = {totalDiscount?totalDiscount:'no discount'}
                            &nbsp;
                            {currency}
                        </h4>
                    :
                       null
                    }
                    <Link to='/order'> 
                        <Button variant="outlined">
                            {TEXTS.LABEL[language]}
                        </Button>
                    </Link>
                    <Button onClick={()=>navigate(-1)}>
                        {TEXTS.GO_BACK[language]} 
                    </Button>    
                </div>
            :
                <div style={styles.empty}>
                    {TEXTS.empty[language]}
                </div>
            }   
        </div>
    )    
}

const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        language:state.language,
        currency:state.currency,
        totalDiscount:state.discount.totalDiscount,
        shoppingCartList:state.shoppingCart.list,
        numberOfItems:state.shoppingCart.list.filter(it=>it.showInCart).length,
    }   
}

export default connect(mapStateToProps) (ShoppingCart);    


