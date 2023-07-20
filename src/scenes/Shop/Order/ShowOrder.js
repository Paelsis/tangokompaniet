
import React from 'react'
import { connect } from 'react-redux'
import config from 'Settings/config';
import {amountMinusDiscount} from 'scenes/Shop/summationPrice'
import {tkColors} from 'Settings/tkColors'
// import postOrder from 'scenes/Shop/Products/postOrder'
import Item from '../Item';
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

let url=config[process.env.NODE_ENV].apiBaseUrl + '/postOrder';

let styles = {
  root:{
    flex:1, 
    display: 'inline-block', 
    // border:'1px solid'
  },  
  address:{
    flex:1,
    display: 'inline-block',
    margin: 15,
    padding: 10,
    textAlign: 'left',
    //border:'1px dashed',
    zdepth:10, 
  },
  products:{
    flex:1, 
    display: 'inline-block',
    margin: 15,
    padding: 10,
    textAlign: 'left',
    //border:'1px dotted',
    zdepth:10, 
  },
  enabled: {
    background: 'linear-gradient(45deg, #BE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    borderRadius: 16,
    border: 0,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  disabled: {
    background: 'red',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

}


const _Item = (props) => {
    return (
      <Item {...props} />
    ) 
}

const TEXTS = {
  ['PAY']:{['SV']:'Totalt belopp att betala',
          ['ES']:'Total a pagar',
          ['EN']:'Total amount to pay'
  },    
  ['DISCOUNT']:{['SV']:'Erhållen rabatt',
          ['ES']:'Descurento recibido',
          ['EN']:'Recieved discount',
  },    
}

let ShowOrder = ({customer, order, list, language}) => {
  const filterList = list.filter(it=>!it.deleted);
  return (
    <div>
      <h2>Order:{order.id}</h2>
      {customer?
        <div style={styles.root}>  
            {customer.firstName}&nbsp;{customer.lastName}<p />
            {customer.email}
            {customer.address?
              <div>
                {customer.address}<p />
                {customer.zip}&nbsp;{customer.city}<p />
                {customer.country}<p />
              </div>
            :
              null}    
        </div>  
      : null}
      <div>        
        {filterList.map(it =><_Item {...it} language={language} currency={order.currency} />)}
        <h3>{TEXTS['PAY'][language]}: {order.amount} {order.currency}</h3>
        {order.discount > 0?<h4>{TEXTS['DISCOUNT'][language]}: {order.discount} {order.currency}</h4>:null}
      </div>
    </div>
  )
}

let mapStateToProps = state => {
  return {
    list: state.shoppingCart.list.filter(it=>!it.deleted),
    language:state.language, 
  }
}

ShowOrder = connect(mapStateToProps)(ShowOrder)

export default ShowOrder