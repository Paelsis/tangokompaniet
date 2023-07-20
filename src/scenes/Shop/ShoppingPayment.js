import React, {Component} from 'react';
import BamboraCheckout from './Bambora/BamboraCheckout'

const ShoppingPayment = ({id, total, currency, handleReply}) => {
    <div>
                <BamboraCheckout total={total} currency={currency} handleReply={this.handleReply} id={id} handleReply={handleReply} />
    </div>
}

export default ShoppingPayment
