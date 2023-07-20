import React from 'react';
import PropTypes from 'prop-types';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PaypalExpressCheckoutSimple extends React.Component {
    render() {
        const client = {
            sandbox:    'AVBuBaPuoL2MKtlBx_5JQ-nta3vq2x_OWzi6cFk4yJwOrKpgA308cqsfE5oa0GfK3WKgvA94WSYAKF0j', // YOUR-SANDBOX-APP-ID
            production: 'YOUR-PRODUCTION-APP-ID',
        }	
        return (
            <PaypalExpressBtn client={client} currency={'USD'} total={1.00} />
        );
    }
}    

const PAYPAL_UNSET="PAYPAL_UNSET"
const PAYPAL_SUCCESS="PAYPAL_SUCCESS"
const PAYPAL_CANCEL="PAYPAL_CANCEL"
const PAYPAL_ERROR="PAYPAL_ERROR"
 
export default class PaypalExpressCheckout extends React.Component {
    static propTypes = {
        currency: PropTypes.string,
        total: PropTypes.number,
    };

    constructor() {
        super();
        this.state = { status: PAYPAL_UNSET }
    }
    render() {		
        let status = this.state.status;
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
                    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
            this.setState({status:PAYPAL_SUCCESS})        
        }		
        
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
            this.setState({status:PAYPAL_CANCEL})        
        }	
        
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
            this.setState({status:PAYPAL_ERROR})        
        }			
            
        let env = process.env.NODE_ENV==='production'?'production':'sandbox'; // you can set here to 'production' for production
        let currency = 'SEK'; // or you can set this value from your props or state  
        let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        
        const client = {
            sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		
        
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  
        return (
            status===PAYPAL_UNSET?<PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
            :status===PAYPAL_SUCCESS?<h4>Thank you for your payment of {total} SEK. Welcome back !</h4>
            :status===PAYPAL_CANCEL?<h4>Your Paypal payment was cancelled.</h4>
            :status===PAYPAL_ERROR?<h4>Your Paypal payment failed. Please contact Tangokompaniet</h4>
            :<h1>Unknown status</h1>
        );
    }
}