
import React, {Component} from 'react'
import PropTypes from 'prop-types'; 
import {PAYMENT_METHOD} from 'Settings/Const'

const TEXTS = {PAYMENT_ERROR:{SV:'Fel vid processing av ordern. Kontakta Tangokompaniet.',
                              ES:'Something went wrong when processing the order. Plase contact TK',
                              EN:'Something went wrong when processing the order. Plase contact TK'},
                UNCONTROLLED_ERROR:{SV:'Ett tekniskt problem har uppsått. Kontakta Tangokompaniet via mail eller telefon.',
                              ES:'A technical error has occurred. Please contact TK',
                              EN:'A technical error has occurred. Please contact TK'},
                PAYMENT_BANK:{SV:'Tangokompaniet har sänt dig ett mail med orderbekräftelse och betalningsinstruktioner för bankgiro.'  
                               + ' Tack för att du handlar hos Tangkompaniet',
                              ES:'Tangokompaniet has sent you a mail with order confirmation and payment instructions for bank.' 
                              + ' Thank you for shopping at Tangkompaniet',
                              EN:'Tangokompaniet has sent you a mail with order confirmation and payment instructions for bank.' 
                              + ' Thank you for shopping at Tangkompaniet'},
                PAYMENT_SWISH:{SV:'Tangokompaniet har sänt dig ett mail med orderbekräftelse och betalningsinstruktioner för SWISH.'  
                                + ' Tack för att du handlar hos Tangkompaniet',
                               ES:'Tangokompaniet has sent you a mail with order confirmation and payment instructions for SWISH.' 
                                + ' Thank you for shopping at Tangkompaniet',
                               EN:'Tangokompaniet has sent you a mail with order confirmation and payment instructions for SWISH.' 
                                + ' Thank you for shopping at Tangkompaniet'},
                GO_TO_HOME:   {SV:'Gå till Tangokompaniets startsida.',
                               ES:'Go to start page',
                               EN:'Go to start page'},
            }                  

class Pay extends Component {
    static propTypes = {
      paymentMethod:PropTypes.string,
      order:PropTypes.object,
      username: PropTypes.string,
      password: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = { step:STEP.ORDER, message:null};
        this.handlePaymentCheckoutReply = this.handlePaymentCheckoutReply.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.renderPaymentBank = this.renderPaymentBank.bind(this);
        this.renderPaymentSwish = this.renderPaymentSwish.bind(this);
        this.goHome = this.goHome.bind(this);
      };
    handlePaymentCheckoutReply = (result) => {
        if (result === null) {
            this.setState({step:STEP.CARD_PAYMENT_ERROR, message:'No result recieved when requesting url from BAMBORA'})
        } else if (result.url === null){
            this.setState({step:STEP.CARD_PAYMENT_ERROR, message:result.message?result.message:'requestUrl not recieved from BAMBORA'})
        } else {  
            const redirectUrl = result?result.url?result.url:null:null;
            console.log('--- before window.location.replace, url =', redirectUrl); 
            window.location.replace(redirectUrl)
        }  
    }
    handlePayment = (order) => {
        console.log('--- handleOrderReply ---, paymentMethod=', this.state.paymentMethod); 
        switch (this.state.paymentMethod) {
        case PAYMENT_METHOD.SWISH:
            this.props.resetCart();
            this.setState({step:STEP.PAYMENT_SWISH, order})
            break;
        case PAYMENT_METHOD.PG:
            this.props.resetCart();
            this.setState({step:STEP.PAYMENT_PG, order})
            break;
        default:
            this.setState({step:STEP.PAYMENT_ERROR, order})
            break;
        }
    }

    renderPaymentBank() {
        return (
            <div>
                <h4>{TEXTS.PAYMENT_BANK[this.props.language]}</h4>
                <Button onClick = {()=> this.goHome()}>
                {TEXTS.GO_TO_HOME[this.props.language]}
                </Button>
            </div>
        )      
    }

    renderPaymentSwish() {
        return (
            <div>
                <h4>{TEXTS.PAYMENT_SWISH[this.props.language]}</h4>
                <Button onClick = {()=> this.goHome()}>
                {TEXTS.GO_TO_HOME[this.props.language]}
                </Button>
            </div>
       )      
    }   

    render() {
        this.props.paymentMethod===PAYMENT_METHOD.CARD?
            this.renderBamboraPayment()
        :this.props.paymentMethod===PAYMENT_BANK?
            this.renderPaymentBank()
        :this.props.paymentMethod===STEP.PAYMENT_SWISH?
            this.renderPaymentSwish()
        :this.state.step===STEP.GO_HOME?
             <Navigate to={'/home'} />
    :this.state.step===STEP.CARD_PAYMENT_ERROR?
        <div>
        <h2>{TEXTS.PAYMENT_ERROR[this.props.language]}</h2>
        </div>
    :this.state.step===STEP.PAYMENT_ERROR?
        <div>
        <h2>{TEXTS.PAYMENT_ERROR[this.props.language]}</h2>
        </div>
    :
        <h2>{TEXTS.UNCONTROLLED_ERROR[this.props.language]}</h2>
  }

}
    

