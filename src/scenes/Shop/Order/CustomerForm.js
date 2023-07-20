import React from 'react'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector} from 'redux-form'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import {PAYMENT_METHOD, SWISH_PREFIX} from 'Settings/Const'
import Checkbox from 'material-ui/Checkbox'
import tkColors from 'Settings/tkColors'
// import {actionLoadForm} from 'redux/actions/actionsShop'
import Button from 'Components/Button';
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const styles = {
  root:{
    display:'block',
    maxWidth:800,
    width:'100%',
    minHeight:'100vh',
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor:'tkColors.background',
    // width:'100vw',
    // height:'100vh',
    padding:10,
  },
  errorStyle: {
    color: 'orange',
  },
  underlineStyle: {
    borderColor: tkColors.color,
  },
  floatingLabelStyle: {
    color: tkColors.color,
  },
  floatingLabelFocusStyle: {
    color: tkColors.color,
  },
  raisedButton : {
    padding:10,
    backgroundColor: tkColors.Button.backgroundColor,
    color: tkColors.Button.color,
  },
};


const TEXTS = {
  PAYMENT:{
    SWISH: {SV:'Betalning med SWISH',
              ES:'Pagar mediant transferencia SWISH',
              EN:'Payment with SWISH',
    },    
    BG: {SV:'Betalning med bankgiro',
               ES:'Pagar mediant transferencia bankgiro',
               EN:'Payment with bankgiro',
    },
    BAMBORA: {SV:'Credit Card',
        ES:'Tajeta de crédito',
        EN:'Credit Card'
    },
    OTHER:{SV:'Annat betalningssätt',
        ES:'Otro metodo de pago',
        EN:'Other payment method'
    },
  },          
  PAYMENT_FAILURE:{
    SWISH: {SV:'Betalning med SWISH',
      ES:'Payment with SWISH',
      EN:'Payment with SWISH',
    },    
  },          
  SHIPPING_INFO:{SV:'Leveransadres måste endast fyllas i om du har saker som skall skickas med post',
    ES:'La dirección de entrega solo se debe completar si tiene artículos para enviar por correo',
    EN:'Fill in shipping address only if you have ordered this that shall be delivered with post'
  },
  EMAIL:{
    SV:'e-mail för orderbekräftelse:',
    ES:'e-mail para la confirmación del pedido',
    EN:'e-mail for order confirmation',
  },
  PHONE:{
    SV:'Ditt personliga mobilnummer',
    ES:'Tu numero de móvil personal',
    EN:'Your personal mobile number',
  },  
  SHIP_ME:{SV:'Leveransadress (Endast för skor som skall skickas)',
           ES:'Dirección de entrega',
           EN:'Shipping address (Only required if shoes shall be sent)',
  },         
  DELIVER_ONLY:{
      SV:'Leveransadress (Endast för skor som skall skickas)',
      ES:'Dirección de entrega',
      EN:'Shipping address (Only required if shoes shall be sent)'
    },
  FIRST_NAME:{
      SV:'Förnamn',
      ES:'Primer nomber',
      EN:'First name'
  },
  LAST_NAME:{
      SV:'Efternamn',
      ES:'Apellido',
      EN:'Last name (mandatory)',
  },
  ADDRESS:{
      SV:'Adress',
      ES:'Dirección de la calle',
      EN:'Address',
  },
  CITY:{
      SV:'Stad',
      ES:'Ciudad',
      EN:'City',
  },
  COUNTRY:{
      SV:'Land',
      ES:'Pais',
      EN:'Country',
  },
  ZIP:{
      SV:'Postnummer',
      ES:'Codigo postal',
      EN:'Zip code'
  },
  PAY_BG:{
    SV:'Betala via bank BG 5532-8223',
    ES:'Pagar por banco',
    EN:'Pay via bank',
  },
  PAY_SWISH:{
    SV:'Betala med SWISH',
    ES:'Pagar por SWISH',
    EN:'Pay with SWISH',
  },
  PAY_OTHER:{
    SV:'Betala på annat sätt',
    ES:'Pagar differente',
    EN:'Pay with other method',
  },
  PAY_SWISH_FAILURE:{
    SV:'Mobil nummer felaktigt',
    ES:'Número de móvil incorrecto',
    EN:'Mobile number wrong',
  },
  PAY_BAMBORA:{
    SV:'Betala',
    ES:'Pagar',
    EN:'Pay',
  },
  EMPTY:{
    SV:'Kundvagnen tom',
    ES:'El carro de compas vacio',
    EN:'Shoppingcart empty',
  },
  MESSAGE:{
    SV:'Meddelande till Tangokompaniet',
    ES:'Mensaje para Tangokompaniet',
    EN:'Message to Tangokompaniet',
  },   
  CLEAR:{
    SV:'Rensa formulär',
    ES:'Forma Clara',
    EN:'Clear form',
  },   
  CAMPAIGN_CODE:{
    SV:'KAMPANJKOD',
    ES:'Código campaña',
    EN:'Campaign code',
  },   
  INVALID_SWISH:{
    SV:'Använd ditt eget mobilnummer kopplat till din bank',
    ES:'Debe ingresar su número de móvil personal vinculado a su propia cuenta',
    EN:'Your shall enter your own mobile number connected to your personal bank account',
  },  
  INVALID_PHONE:{
    SV:'Ogiltigt mobilnummer',
    ES:'Número de móvil no válido',
    EN:'Invalid mobile number',
  },  
  INVALID_EMAIL:{
    SV:'Ogilig email',
    ES:'Correo electrónico malo',
    EN:'Invalid email',
  },  
}


const startValues = {
  paymentMethod:PAYMENT_METHOD.SWISH,
  email:'', 
  phone:'', 
  shipMePackage: false,
  firstName: '', 
  lastName: '', 
  address: '',  
  zip:'', 
  city:'', 
  country:''
}

// Field validation
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const emailCheck = value => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  TEXTS.INVALID_EMAIL['SV']: undefined
const phoneCheck = value => 
  value && value.substring(0,3) === SWISH_PREFIX ?TEXTS.INVALID_SWISH['SV']
    :getShowPhone(value) === undefined ?TEXTS.INVALID_PHONE['SV']
    :undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined


const validate = props => {
  const errors = {}
  if (!props.firstName) {
    errors.firstName = 'Required'
  } else if (props.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  if (!props.lastName) {
    errors.lastName = 'Required'
  } else if (props.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less'
  }
  if (!props.address) {
    errors.address = 'Required'
  } else if (props.address.length > 15) {
    errors.address = 'Must be 15 characters or less'
  }
  if (!props.city) {
    errors.city = 'Required'
  } else if (props.city.length > 30) {
    errors.city = 'Must be 30 characters or less'
  }
  if (!props.country) {
    errors.country = 'Required'
  } else if (props.country.length > 20) {
    errors.country = 'Must be 20 characters or less'
  }
  if (!props.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'Invalid e-mail format'
  }
  return errors
}

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={placeholder?placeholder:''} type={type}/>
      {touched && error && <span style={{color:'red', fontSize:16}}>&nbsp;{error}</span>}
    </div>
  </div>

const renderTextArea = ({ input, label, placeholder, maxLength, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <textarea {...input} placeholder={placeholder?placeholder:''} name={label} type={type} cols={50} rows={6} maxLength={maxLength}/>
      {touched && error &&<span style={{color:'red'}}>&nbsp;{error}</span>}
    </div>
  </div>


const renderCheckbox = ({ input, label }) => {
  return (
      <Checkbox
        {...input}
        label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}
      />
    )
};

const renderPaymentMethodButtons = (props) => {
  const { input, language, environment } = props
  return (
    <RadioButtonGroup 
      name={input.name} 
      defaultSelected={PAYMENT_METHOD.SWISH}
      style={{display:'flex', flexDirection:'column',  maxWidth:'80%'}}
      onChange={input.onChange}
    > 
      <RadioButton
        value={PAYMENT_METHOD.SWISH}
        label={TEXTS.PAYMENT[PAYMENT_METHOD.SWISH][language]}
        style={styles.radioButton}
      />
      <RadioButton
        value={PAYMENT_METHOD.BG}
        label={TEXTS.PAYMENT[PAYMENT_METHOD.BG][language]}
        style={styles.radioButton}
      />
      <RadioButton
        value={PAYMENT_METHOD.OTHER}
        label={TEXTS.PAYMENT[PAYMENT_METHOD.OTHER][language]}
        style={styles.radioButton}
      />
      <RadioButton
        value={PAYMENT_METHOD.BAMBORA}
        label={TEXTS.PAYMENT[PAYMENT_METHOD.BAMBORA][language]}
        style={styles.radioButton}
        disabled={environment==='production'?true:false}
      />
    </RadioButtonGroup>
  )
}

const getPayerAlias = (phone) =>
{
  if (phone === undefined) 
    return(undefined)
  else   
    switch (phone.length) {
      case 10:
        if (phone[0]==='0' && phone[1] !=='0')
          return('46' + phone.substr(1))
        else 
          return(undefined)   
      case 12:
        if (phone[0]==='+')
          return(phone.substr(1))
        else 
          return(undefined)  
      case 13:
        if (phone[0]==='0' && phone[0]==='0') 
          return(phone.substr(2))
        else  
          return(undefined)  
      default:
        return(undefined)    
    }
}

const getShowPhone = (phone) =>
{
   const payerAlias=getPayerAlias(phone) 
   if (payerAlias?payerAlias.substring(0,3)!==SWISH_PREFIX?true:false:false) {
      return(payerAlias?'+' + payerAlias:payerAlias)
   } else {
      return(undefined);
   }  
}


const getPayLabel = (language, numberOfItems, paymentMethod, phone) =>
{
    let label='No label'
    if (numberOfItems > 0) {
      paymentMethod===PAYMENT_METHOD.SWISH?
        label=phone?TEXTS.PAY_SWISH[language] + ' ' + phone:TEXTS.PAY_SWISH_FAILURE[language]
      :paymentMethod===PAYMENT_METHOD.BG?
        label=TEXTS.PAY_BG[language]
      :paymentMethod===PAYMENT_METHOD.OTHER?
        label=TEXTS.PAY_OTHER[language]
      :paymentMethod===PAYMENT_METHOD.BAMBORA?
        label=TEXTS.PAY_BAMBORA[language]
      :
        label=TEXTS.PAY_BG[language]
    } else {
      label=TEXTS.EMPTY[language];
    }  
    console.log('getPayLabel: paymentMethod:', paymentMethod)
    return(label)
}

const getClearLabel = (language) =>
{
    const label=TEXTS.CLEAR[language];
    return(label)
}


const getHeading = (language) => (
  language===LANGUAGE_SV?'Betalningsuppgifter'
  :language===LANGUAGE_ES?'Informatción de pago'
  :'Payment information'
)

const _CustomerForm = ({error, handleSubmit, pristine, reset, submitting, submitSucceeded, numberOfItems,  paymentMethod, language, shipMePackage, phone, onSubmit}) => {
  const clearLabel = getClearLabel(language)
  const showPhone = getShowPhone(phone)
  const payerAlias = getPayerAlias(phone)
  const payLabel = getPayLabel(language, numberOfItems, paymentMethod, showPhone)
  const swishPrefix = payerAlias?payerAlias.substring(0,3) === SWISH_PREFIX:undefined
  return (
      <div style={styles.root}>
          <div>
            <h4>{getHeading(language)}</h4>
            <form>
              <Field name="paymentMethod" 
                  language={language}
                  component={renderPaymentMethodButtons} 
                  environment={process.env.NODE_ENV}
              />
              <p />
              <Field name="email" 
                  label={TEXTS.EMAIL[language]}
                  type='email' 
                  component={renderField}                   
                  validate={emailCheck}
                 />  
              {paymentMethod === PAYMENT_METHOD.SWISH?   
                <Field name="phone" 
                      label={TEXTS.PHONE[language]}
                      type='text' 
                      component={renderField} 
                      validate={phoneCheck}
                    />  
              :
                  null
              }    

              <Field name="shipMePackage" 
                label={TEXTS.SHIP_ME[language]}
                type='checkbox' 
                component={renderCheckbox} />
              <p />
              {shipMePackage?
                <div>
                  <i>
                    {TEXTS.SHIPPING_INFO[language]}
                  </i>  
                  <p />
                  <Field name="firstName" 
                    placeholder={TEXTS.FIRST_NAME[language]}
                    type='text'
                    component={renderField} 
                  />
                  <Field name="lastName" 
                    placeholder={TEXTS.LAST_NAME[language]}
                    type='text' 
                    component={renderField} 
                  />
                  <Field name="address" 
                    placeholder={TEXTS.ADDRESS[language]}
                    type='text' 
                    component={renderField} 
                  />
                  <Field name="city" 
                    placeholder={TEXTS.CITY[language]}
                    type='text' 
                    component={renderField} 
                  />
                  <Field name="country" 
                    placeholder={TEXTS.COUNTRY[language]}
                    type='text' 
                    component={renderField} 
                  />
                  <Field name="zip" 
                    placeholder={TEXTS.ZIP[language]}
                    type='text' 
                    component={renderField} 
                  />
                  <p /><p />
                </div>
              :null}
              <Field name="message" 
                component={renderTextArea} 
                placeholder={TEXTS.MESSAGE[language]}
                multiLine={true} 
                maxLength={300}
              />
              <Field name="campaignCode" 
                    placeholder={TEXTS.CAMPAIGN_CODE[language]}
                    type='text' 
                    component={renderField} 
              />
              {error &&<strong>{error}</strong>}
              <p />
              <div data-tip={'Hello' /*TEXTS.INVALID_SWISH[language]*/}>
                <Button 
                    variant="outlined"
                    data-tip={TEXTS.INVALID_SWISH[language]}
                    disabled={submitting || submitSucceeded || numberOfItems===0 ||
                      (paymentMethod === PAYMENT_METHOD.SWISH && (!showPhone))} 
                    onClick={handleSubmit((values) => onSubmit({...values, payerAlias}))}
                >
                  {payLabel}
                </Button>  
                &nbsp;&nbsp;  
                <Button 
                    variant="outlined"
                    disabled={pristine || submitting} 
                    onClick={reset} 
                >
                  {clearLabel}
                </Button>  
            </div>
            {swishPrefix?<ReactTooltip />:null}
          </form>
        </div>
      </div>
  )
}

const CustomerForm = reduxForm({
  form: 'CustomerForm', // a unique identifier for this form
  // initialValues:startValues,
})(_CustomerForm);

// Decorate with connect to read form values
const selector = formValueSelector('CustomerForm') // <-- same as form name

const mapStateToProps = state => {
  // can select values individually
  const shoppingCartList = state.shoppingCart.list;
  const obj = shoppingCartList.find(it => it.email!==undefined)
  const selectedEmail = obj?obj.email:undefined
  const initialValues={...startValues, email:selectedEmail}
  const shipMePackage = selector(state, 'shipMePackage')
  const paymentMethod = selector(state, 'paymentMethod')
  const phone = selector(state, 'phone')
  const language = state.language;
  const numberOfItems = state.shoppingCart.list.length;
  return ({
    language,
    shoppingCartList,
    numberOfItems,
    paymentMethod,
    shipMePackage,
    phone,
    destroyOnUnmount:true,   // if this set to true the form is reset after you leave page 
    initialValues,
    enableReinitialize:true,
    })
}

// Map the dispatch to onMyClick
export default connect(mapStateToProps)(CustomerForm);




