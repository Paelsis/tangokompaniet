import React, {Component} from 'react'
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {tkColors} from 'Settings/tkColors'
import CustomerForm from './CustomerForm'
import {PAYMENT_METHOD, PAYMENT_NUMBER} from 'Settings/Const'
import TextShow from 'Components/Text/TextShow'
import Button from 'Components/Button'
import postData from 'functions/postData'
import postPaymentRequest from 'functions/postPaymentRequest'
import config from 'Settings/config';
import { resetItemList } from 'redux/actions/actionsShop'
import { isMobileDevice } from 'Settings/Utils'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const CREATE_ORDER_URL = apiBaseUrl + '/createOrder';
const PAYMENT_REQUEST_BAMBORA_URL = apiBaseUrl + "/paymentRequestBambora"
const PAYMENT_REQUEST_SWISH_URL = apiBaseUrl + "/paymentRequestSwish"
const STEP = {
  ORDER:'ORDER',
  PAYMENT:{
    SWISH:'PAYMENT_SWISH',
    BG:'PAYMENT_BG',
    BAMBORA:'PAYMENT_BAMBORA',
    OTHER:'PAYMENT_OTHER',
  },
  OPEN:{
    SWISH:'OPEN_SWISH',
  },        
  PAYMENT_ERROR:{
            BG:'PAYMENT_ERRRO_BG',
            BAMBORA:'PAYMENT_ERROR_BAMBORA',
            SWISH:'PAYMENT_ERROR_SWISH',
            OTHER:'PAYMENT_ERROR_OTHER',
            UNKNOWN:'PAYMENT_ERROR_UNKNOWN',
            UNCONTROLLED:'PAYMENT_ERROR_UNCONTROLLED',
          },
  GO_HOME:'GO_HOME'
}

const TEXTS = {
    PAYMENT:{
      BG:{SV:'Tangkompaniet har nu skickat dig en orderbekräftelse med följande inbetalningsuppgifter.'
            + ' PGgiro nummer: ' 
            + PAYMENT_NUMBER.BG + '.' 
            + ' Vid inbetalning fyll i order nummer och namn i fältet meddelande.' 
            + ' Tack för att du handlar hos Tangkompaniet',
          ES:'Tangkompaniet le envió un correo electrónico con los detalles de pago que contienen la siguiente información.'
          + ' Giro bancario:' 
          + PAYMENT_NUMBER.BG + '.'
          + ' Al pagar, ingrese el número de orden y el nombre en el campo del mensaje.'
          + ' Gracias por comprar en Tangkompaniet',
          EN:'Tangkompaniet has now sent an order confirmation to you via email.'
          + ' PGgiro number:' 
          + PAYMENT_NUMBER.BG + '.' 
          + ' Ensure to fill in both order number and name in the message field of the the payment'
          + ' Thank you for shopping at Tangkompaniet',
      },
      SWISH:{SV:'Tangkompaniet har nu skickat dig en orderbekräftelse med följande inbetalningsuppgifter.'
          + ' SWISH nummer: '
          + PAYMENT_NUMBER.SWISH + '.'  
          + ' Vid inbetalning fyll i både order nummer och ditt fulla namn i meddelandefältet.' 
          + ' Tack för att du handlar hos Tangkompaniet',
            ES:'Tangocompany le ha enviado una confirmación de pedido con los siguientes detalles de pago.'
            + ' SWISH número:'
            + PAYMENT_NUMBER.SWISH + '.'  
            + 'Al pagar, ingrese tanto el número de pedido como su nombre completo en el campo del mensaje.'
            + 'Gracias por comprar en Tangkompaniet ',
            EN:'Tangokompaniet has sent you a mail with order confirmation with payment instructions for SWISH.' 
            + 'SWISH number:' 
            + PAYMENT_NUMBER.SWISH + '.'
            + ' Ensure to fill in both order number and name in the message field of the the payment.'
            + ' Thank you for shopping at Tangkompaniet '
      },
      OTHER:{SV:'Tangkompaniet har nu skickat dig en orderbekräftelse med följande inbetalningsuppgifter.'
          + ' PGgiro nummer: ' 
          + PAYMENT_NUMBER.BG + '.' 
          + ' Vid inbetalning fyll i order nummer och namn i fältet meddelande.' 
          + ' Om du har rabattkod eller är hjälpare på TK, prata med Daniel så att du får rätt belopp innan du betalar in.' 
          + ' Tack för att du handlar hos Tangkompaniet',
        ES:'Tangkompaniet le envió un correo electrónico con los detalles de pago que contienen la siguiente información.'
          + ' Giro bancario:' 
          + PAYMENT_NUMBER.BG + '.'
          + ' Al pagar, ingrese el número de orden y el nombre en el campo del mensaje.'
          + ' Gracias por comprar en Tangkompaniet',
        EN:'Tangkompaniet has now sent an order confirmation to you via email.'
          + ' PGgiro number:' 
          + PAYMENT_NUMBER.BG + '.' 
          + ' Ensure to fill in both order number and name in the message field of the the payment'
          + ' If you have a rabate code or is a helper talk to Daniel before you pay since the amount may be changed.' 
          + ' Thank you for shopping at Tangkompaniet',
      },     
    },
    PAYMENT_ERROR:{
      BG: {
          SV:'Fel uppstod med kortbetalning med BANKGIRO. Kontakta Tangokompaniet.',
          ES:'Error en el pago con tarjeta a través de BANKGIRO. Póngase en contacto con la Tangokompaniet.',
          EN:'Something went wrong when processing the order with BANKGIRO. Plase contact TK'
      },
      SWISH: {
          SV:'SWISH vidarekoppling fungerar inte som den skall. Betala räkningen manuellt till SWISH nummer ' + PAYMENT_NUMBER.SWISH,
          ES:'El reenvío SWISH no funciona correctamente. Pague la factura manualmente con el número SWISH '+ PAYMENT_NUMBER.SWISH,
          EN:'Automatic SWISH forwarding is not working properly. Please pay bill manually till SWISH number ' + PAYMENT_NUMBER.SWISH
      },
      BAMBORA: {
          SV:'Fel uppstod med kortbetalning hos BAMBORA. Kontakta Tangokompaniet.',
          ES:'Error en el pago con tarjeta a través de BAMBORA. Póngase en contacto con la Tangokompaniet.',
          EN:'Something went wrong when processing the order. Plase contact TK'
      },
      UNKOWN: {
        SV:'Fel vid processing av ordern. Kontakta Tangokompaniet.',
        ES:'Error al procesar el pedido. Póngase en contacto con la Tangokompaniet.',
        EN:'Something went wrong when processing the order. Plase contact TK'
      },
      UNCONTROLLED:{
        SV:'Ett tekniskt problem har uppsått. Kontakta Tangokompaniet via mail eller telefon.',
        ES:'Se ha logrado un problema técnico. Póngase en contacto con su empresa por correo electrónico o por teléfono.',
        EN:'A technical error has occurred. Please contact TK'
      },
    },
    OPEN:{
      SWISH:{SV:'Vänligen öppna din SWISH app och utför betalning.'
                  + ' Tack för att du handlar hos Tangkompaniet ',
            ES:'Abra su aplicación SWISH y pague.'
            + 'Gracias por comprar en Tangkompaniet ',
            EN:'Please open your SWISH application and execute payment.' 
            + ' Thank you for shopping at Tangkompaniet '
      }      
    },
    TOTAL_TO_PAY:   {SV:'Belopp att betala',
                    ES:'Total a pagar',
                    EN:'Total to pay'
    },
    ORDER_ID:      {SV:'Order nummer',
                    ES:'Número de pedido',
                    EN:'Order number'
    },
    GO_TO_HOME:    {SV:'Gå till förstasidan',
                    ES:'Ir a la portada',
                    EN:'Go to first page'
    },
    EMPTY:          {SV:'Kundvagnen är tom',
                    ES:'El carro de compas vacio',
                    EN:'Shoppingcart is empty'
    },
    WAITING_ON_ORDER:{SV:'Väntar på ordern från servern',
                    ES:'Waiting for order to return from server',
                    EN:'Waiting for order to return from server'
    },
    TALK_TO:{SV:'Om du är berättigad till rabatt så bekräfta beloppet med kursansvarig (eller Daniel) innan du betalar.',
      ES:'Si es elegible para un descuento, confirme el monto con el coordinador del curso (o Daniel) antes de pagar',
      EN:'If you have a discount to withdraw please confirm the amout with course responsible'
    }
}                  

const styles = {
  root:{
    display:'inline-block',
    width:'100%',
    minHeight:'100vh',
    margin:4,
    padding:5,
    position:'relative',
    border: 1, 
    borderColor: tkColors.Purple.Light,
    borderRadius:16,
    backgroundColor:tkColors.backgroundColor,
  },
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
  badge: {
    top: 20, 
    right: 10, 
    backgroundColor: tkColors.color,
    zIndex:999,
  },
  payment: {
    display:'block',
    textAlign:'center',
    width:'80%',
    maxWidth:800, 
    marginLeft:'auto',
    marginRight:'auto',
    fontSize:15,
  },
  empty:{
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center'
  }
};

class Order extends Component {
  static propTypes = {
    shoppingCartList:PropTypes.array,
    username: PropTypes.string,
    password: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { status:0, customer:null, order:null, products:[], step:STEP.ORDER, paymentMethod:PAYMENT_METHOD.SWISH, message:null};
    this.handleRequestReplyBambora = this.handleRequestReplyBambora.bind(this);
    this.handleRequestReplySwish = this.handleRequestReplySwish.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.renderPaymentBG = this.renderPaymentBG.bind(this);
    this.renderPaymentSwish = this.renderPaymentSwish.bind(this);
    this.goHome = this.goHome.bind(this);
  };

  componentDidMount () {
    this.setState({step:STEP.ORDER, customer:null});  
  } 

  componentWillReceiveProps (nextProps)  {
    if (nextProps.shoppingCartList.length === 0) {
      this.setState({customer:null})
    }  
  }

  handleRequestReplyBambora = (result) => {
    if (result === undefined) {
      this.setState({step:STEP.PAYMENT_ERROR.BAMBORA, message:'No reply when forwarding to BAMBORA checkout'})
    } else if (result.url === null){
      this.setState({step:STEP.PAYMENT_ERROR.BAMBORA, message:result.message?result.message:'message not not recieved from BAMBORA'})
    } else {  
      const redirectUrl = result?result.url?result.url:null:null;
      console.log('--- before window.location.replace, url =', redirectUrl); 
      window.location.replace(redirectUrl)
    }  
  }

  handleRequestReplySwish = (id) => {
    if (id === undefined) {
      this.setState({step:STEP.PAYMENT_ERROR.SWISH, message:'SWISH request failed'})
    } else {  
      if (isMobileDevice()) {
        const callbackUrl = config[process.env.NODE_ENV].baseBaseUrl
        const redirectUrl = "swish://paymentrequest?token=" + id + "&callbackurl=" + callbackUrl
        window.location.replace(redirectUrl)
      } else if (process.env.NODE_ENV==='production') {
        this.props.resetCart();
      }
    }  
  }

  // Handle payment for created order that is passed in reply
  handlePayment = (reply) => {
    if (reply?reply.code?reply.code===200?reply.order?true:false:false:false:false)
    {
      console.log('--- handlePayment ---, reply=', reply); 
      const order=reply.order
      const {username, password, language, resetCart} = this.props
      const inputData = {order, language}
      switch (this.state.paymentMethod) {
        case PAYMENT_METHOD.BAMBORA:
            postPaymentRequest(PAYMENT_REQUEST_BAMBORA_URL, inputData, this.handleRequestReplyBambora);
            break;
        case PAYMENT_METHOD.SWISH:
            this.setState({step:STEP.OPEN.SWISH, order})
            postPaymentRequest(PAYMENT_REQUEST_SWISH_URL, inputData, this.handleRequestReplySwish);
            break;
        case PAYMENT_METHOD.BG:
            if (process.env.NODE_ENV==='production') {
              resetCart()
            }  
            this.setState({step:STEP.PAYMENT.BG, order})
            break;
        default:
            if (process.env.NODE_ENV==='production') {
              resetCart()
            }
            this.setState({step:STEP.PAYMENT.OTHER, order})
            break;
      }
    } else {
      console.log('--- handlePayment ---, reply=', reply); 
      this.setState({step:STEP.PAYMENT_ERROR.UNKNOWN, message:'No data in the Order reply message'})
    }  
  }

  // Create the order from customer data and shoppingCart
  createOrder = (customer) => {
    console.log('createOrder: customer:', customer)
    this.setState({paymentMethod:customer.paymentMethod})
    const payload={
      customer,
      shoppingCartList:this.props.shoppingCartList,
      currency:this.props.currency,
      language:this.props.language,
    }
    // After posting order handle the checkout
    postData(CREATE_ORDER_URL, this.props.username, this.props.password, payload, this.handlePayment);
  }

  goHome = () =>  {
    this.setState({step:STEP.GO_HOME})
  }  

  handleClick = e => {
    e.preventDefault();
    window.location.replace("swish://paymentrequest?token=c28a4061470f4af48973bd2a4642b4fa&callbackurl=merchant%253A%252F%252F");
  }

  renderPaymentBG = (order) => {
    console.log('renderPaymentBg, order', order)
    const orderId = order?order.id?order.id:undefined:undefined
    const amount = order?order.amount?order.amount:undefined:undefined
    const currency = order?order.currency?order.currency:undefined:undefined
    return (
      orderId?
        <div  style={styles.payment}>
          <TextShow url={'/getTexts'} groupId={'Order'} textId={'BGgiroReply'} language={this.props.language}>
          {TEXTS.PAYMENT.BG[this.props.language]}&nbsp;&#9825;
          </TextShow>
          <br /><br /><b>{TEXTS.ORDER_ID[this.props.language] + ': ' + orderId}</b> 
          <br /><br /><b>{TEXTS.TOTAL_TO_PAY[this.props.language] + ': ' + amount + ' ' + currency}</b>    
          <br /><br /> 
          <Button variant="outlined" onClick={this.goHome}>
              {TEXTS.GO_TO_HOME[this.props.language]}
          </Button>
        </div>    
      :
        <div style={styles.payment}>
        {TEXTS.WAITING_ON_ORDER[this.props.language]}
        </div>
    )      
  }

  renderPaymentOther = order => {
    const {language} = this.props 
    console.log('renderPaymentBg, order', order)
    const orderId = order?order.id?order.id:undefined:undefined
    const amount = order?order.amount?order.amount:undefined:undefined
    const currency = order?order.currency?order.currency:undefined:undefined
    return (
      orderId?
        <div  style={styles.payment}>
          <TextShow url={'/getTexts'} groupId={'Order'} textId={'BGgiroReply'} language={language}>
          {TEXTS.PAYMENT.OTHER[this.props.language]}&nbsp;&#9825;
          </TextShow>
          <div><b>{TEXTS.ORDER_ID[language] + ': ' + orderId}</b></div> 
          <p />
          <div><b>{TEXTS.TALK_TO[language]}</b></div>    
          <br /><br /><b>{TEXTS.TOTAL_TO_PAY[language] + ': ' + amount + ' ' + currency + ' '}</b>    
          <br /><br /> 
          <Button variant="outlined" onClick={this.goHome}>
              {TEXTS.GO_TO_HOME[this.props.language]}
          </Button>
        </div>    
      :
        <div style={styles.payment}>
        {TEXTS.WAITING_ON_ORDER[this.props.language]}
        </div>
    )      
  }

  renderOpenSwish = (order) => {
    console.log('renderOpenSwish, order', order)
    const orderId = order?order.id?order.id:undefined:undefined
    const amount = order?order.amount?order.amount:undefined:undefined
    const currency = order?order.currency?order.currency:undefined:undefined
    return (
      orderId?
        <div style={styles.payment}>
          <TextShow url={'/getTexts'} groupId={'Order'} textId={'SwishOpen'} language={this.props.language}>
            {TEXTS.OPEN.SWISH[this.props.language]}&nbsp;&#9825;
          </TextShow>  
            <br /><br /><b>{TEXTS.ORDER_ID[this.props.language] + ': ' + orderId}</b>
            <br /><br /><b>{TEXTS.TOTAL_TO_PAY[this.props.language] + ': ' +  amount + ' ' + currency}</b>    
          <br /><br />  
          <Button variant="outlined" vonClick = {this.goHome}>
              {TEXTS.GO_TO_HOME[this.props.language]}
          </Button>
        </div>
      :
        <div style={styles.payment}>
          {TEXTS.WAITING_ON_ORDER[this.props.language]}
        </div>

    )      
  }

  renderPaymentSwish = (order) => {
    console.log('renderPaymentSwish, order', order)
    const orderId = order?order.id?order.id:undefined:undefined
    const amount = order?order.amount?order.amount:undefined:undefined
    const currency = order?order.currency?order.currency:undefined:undefined
    return (
      orderId?
        <div style={styles.payment}>
          <TextShow url={'/getTexts'} groupId={'Order'} textId={'SwishReply'} language={this.props.language}>
            {TEXTS.PAYMENT.SWISH[this.props.language]}&nbsp;&#9825;
          </TextShow>  
            <br /><br /><b>{TEXTS.ORDER_ID[this.props.language] + ': ' + orderId}</b>
            <br /><br /><b>{TEXTS.TOTAL_TO_PAY[this.props.language] + ': ' +  amount + ' ' + currency}</b>    
          <br /><br />  
          <Button variant="outlined" onClick = {this.goHome}>
              {TEXTS.GO_TO_HOME[this.props.language]}
          </Button>
        </div>
      :  
        <div style={styles.payment}>
          {TEXTS.WAITING_ON_ORDER[this.props.language]}
        </div>
      )      
  }


  getLabel = (language) => {
    let label='Pay';
    if (this.state.order !== null) {
      const amount=this.state.order['amount']?this.state.order['amount']:0;
      const currency=this.state.order['currency']?this.state.order['currency']:'SEK';
      label = language===LANGUAGE_SV?'Betala ' + amount + ' ' + currency + ' till Tangokompaniet'
      :language===LANGUAGE_ES?'Pago ' + amount + ' ' + currency + ' con Tangokompaniet'
      :'Pay ' + amount + ' ' + currency + ' to Tangokompaniet';
    } else {
      label = language===LANGUAGE_SV?'Betalningen kan ej utföras via internet':
      language===LANGUAGE_ES?'Pago imposible a través de internet'
      :'Payment cannot be executed via internet'}
    return(label)
  }  

  render = () => {
    const {language} = this.props
    const order=this.state.order
    console.log('render - order:', order)
    return(
        <div style={styles.root} >
          {this.state.step===STEP.ORDER?
            <CustomerForm 
              numberOfItems={this.props.numberOfItems} 
              onSubmit={this.createOrder} 
            />
          :this.state.step===STEP.PAYMENT.SWISH?
            this.renderPaymentSwish(order)
          :this.state.step===STEP.PAYMENT.BG?
            this.renderPaymentBG(order)
          :this.state.step===STEP.OPEN.SWISH?
            this.renderOpenSwish(order)
            :this.state.step===STEP.PAYMENT.OTHER?
            this.renderPaymentOther(order)
          :this.state.step===STEP.GO_HOME?
            <Navigate to={'/home'} />
          :this.state.step===STEP.PAYMENT_ERROR.BAMBORA?
            <div>
              <h2>{TEXTS.PAYMENT_ERROR.BAMBORA[language]}</h2>
              <h4>{this.state.message}</h4>
            </div>
          :this.state.step===STEP.PAYMENT_ERROR.SWISH?
            <div>
              <h2>{TEXTS.PAYMENT_ERROR.SWISH[language]}</h2>
              <h4>{this.state.message}</h4>
            </div>
          :this.state.step===STEP.PAYMENT_ERROR.BG?
          <div>
            <h2>{TEXTS.PAYMENT_ERROR.BG[language]}</h2>
            <h4>{this.state.message}</h4>
          </div>
          :
            <div>
              <h2>{TEXTS.PAYMENT_ERROR.UNCONTROLLED[language]}</h2>
              <h4>{this.state.message}</h4>
            </div>
          }
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
      // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
      username:state.user.username,
      password:state.user.password,
      language:state.language,
      currency:state.currency,
      shoppingCartList:state.shoppingCart.list,
      numberOfItems: state.shoppingCart.list.length,
      numberOfActiveItems: state.shoppingCart.list.filter(li => !li.deleted).length,
  }   
}

const mapDispatchToProps = (dispatch) => {
  return {
      resetCart: () => { dispatch(resetItemList()) }
  }        
}
export default connect( 
    mapStateToProps,
    mapDispatchToProps
) (Order);    


