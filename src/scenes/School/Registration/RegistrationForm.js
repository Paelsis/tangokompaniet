import React from 'react'
import { connect } from 'react-redux'
import { Field, reset, reduxForm, formValueSelector } from 'redux-form'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import tkColors from 'Settings/tkColors'
import {red200, red100, orange900} from 'material-ui/styles/colors'
// import {actionLoadForm} from 'redux/actions/actionsShop'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import {BOOKING_STATUS, CLOSED, AVA_STATUS, DANCE_SITE, PRODUCT_TYPE} from 'Settings/Const'
import Button from 'Components/Button'
import Weekdays from 'Settings/Weekdays';
import TextShow from 'Components/Text/TextShow'
import QrCode from 'Components/QrCode'

const LINK_TO_COURSE='/scheduleCourse'
const LINK_TO_SHOPPING_CART='/shoppingcart'
const LINK_TO_HOME='/home'

const TEXTS = {
  LEADER:{['SV']:'Förare',
          ['ES']:'Conductor',
          ['EN']:'Leader'
  },    
  FOLLOWER:{['SV']:'Följare',
          ['ES']:'Sequidor',
          ['EN']:'Follower',
  },
  BOTH:{['SV']:'Båda',
          ['ES']:'Ambos',
          ['EN']:'Both',
  },
  SITE_QUERY:{['SV']:'Gå kursen online på Zoom, eller i danslokal',
          ['ES']:'Bailar en el salón y Zoom online ',
          ['EN']:'Take the course on site or on Zoom online',
  },
  ONLINE:{['SV']:'Via Zoom möte på dator',
          ['ES']:'Online with Zoom',
          ['EN']:'Online with Zoom'
  },    
  ONLINE_SUBTEXT:{['SV']:'OBS: Denna option skall bara väljas om du tänket ta kursen online via Zoom',
          ['ES']:'Note: This option must only be selected if you want to take the course online via Zoom',
          ['EN']:'Note: This option must only be selected if you want to take the course online via Zoom'
  },    
  SITE:{['SV']:'På plats i danslokal',
          ['ES']:'En el salón',
          ['EN']:'In the dance hall',
  },
  FIRST_NAME:{SV:'Förnamn',
          ES:'Permer nombre',
          EN:'Name',
  },
  LAST_NAME:{SV:'Efternamn',
          ES:'Apellido',
          EN:'Sirname'
  },   
  EMAIL:{SV:'e-postadress',
          ES:'e-mail',
          EN:'e-mail'
  },  
  PHONE:{SV:'Mobil',
          ES:'Móvil',
          EN:'Mobile'
  },  
  I_HAVE_PARTNER:{SV:'Jag har en danspartner',
          ES:'Tengo un compañero de baile',
          EN:'I have a dance partner'
  },  
  PAY_FOR_PARTNER:{SV:'Jag önskar betala även för min danspartner',
          ES:'También me gustaría pagar por mi compañero de baile',
          EN:'I would also like to pay for my dance partner'
  },  
  FIRST_NAME_PARTNER:{SV:'Förnamn danspartner',
          ES:'Companeros permer nombre',
          EN:'First name partnerr',
  },
  LAST_NAME_PARTNER:{SV:'Efternamn danspartner',
          ES:'Companeros apellido',
          EN:'Last name partner'
  },   
  EMAIL_PARTNER:{SV:'e-postadress danspartner',
          ES:'Companeros e-mail',
          EN:'e-mail partner'
  },
  PHONE_PARTNER:{SV:'Mobil danspartner',
          ES:'Comaneos Móvil',
          EN:'Partner Mobile'
  },  
  PHONE_PARTNER_OPTIONAL:{SV:'Mobil danspartner (frivillig)',
          ES:'Comaneos Móvil (opcional)',
          EN:'Partner Mobile (optional)'
  },  
  REGISTER:{SV:'Registrera',
          ES:'Registro',
          EN:'Register'},   
  SURPLUS_LEADER:{SV:'Sätt mig på väntelista',
          ES:'Ponme en lista de esperao',
          EN:'Put me on waitlis'},   
  SURPLUS_LEADER_WARNING: {SV:'Överskott på följare',
          ES:'Registro',
          EN:'Follower surplus'},
  SURPLUS_LEADER_TEXT: {SV:'Överskott på förare',
          ES:'En esta ocasión, este curso es solo un lugar para sequidores.',
          EN:'Follower surplus'},
   SURPLUS_FOLLOWER:{SV:'Sätt mig på väntelista',
          ES:'Ponme en lista de espera',
          EN:'Put me on waitlist'},   
   SURPLUS_FOLLOWER_WARNING: {SV:'Överskott på följare',
          ES:'Registro',
          EN:'Follower surplus'},
   SURPLUS_FOLLOWER_TEXT: {SV:'Överskott på följare',
           ES:'En este momento, este curso es sólo el lugar para los conductores.',
           EN:'Currently, this course has only space available for followers.'},
   COURSE_FULL: {SV:'Kursen är fullbokad',
          ES:'Ponme en lista de esperao',
          EN:'Course if full, check with TK if there are cancellations'},
    COURSE_FULL_LEADER: {SV:'Kursen är full för förare',
          ES:'Course is fully booked for leaders',
          EN:'Course is fully booked for leaders'},      
    COURSE_FULL_FOLLOWER: {SV:'Kursen är full för följare',
          ES:'Course is fully booked for followers',
          EN:'Course is fully booked for followers'},
    COURSE_FULL_WARNING: {SV:'Denna kurs är fullbokad',
          ES:'Este curso está completo',
          EN:'The course is fully booked'},
    COURSE_FULL_TEXT: {SV:'För tillfället har denna kurs fullbokad (Ring TK).',
          ES:'En este momento, este curso es completo.',
          EN:'Currently, this course is fully booked (Call TK on mobile).'},
    ONLINE_FULL_TEXT: {SV:'Kursen är fullbokad online men där finns platser kvar i danslokal.',
          ES:'The ONLINE course is fully booked but there are space available on site.'},
          EN:'The ONLINE course is fully booked but there are space available on site.',
    ONSITE_FULL_TEXT: {SV:'Kursen är fullbokad i lokal men där finns platser kvar i ONLINE via ZOOM.',
          ES:'The ONLINE course is fully booked but there are space available on site.'},
          EN:'The course is fully booked on site but there is available space ONLINE via ZOOM.',
    FOOD_INCLUDED:{SV:'Jag önskar matpaketet',
          ES:'Quiero el paquete de comida',   
          EN:'I want the food package'},
    FILL_IN_PARTNERS_NAME:{SV:'Fyll i uppgifter om din danspartner (för social dans endast förnamn)',
          ES:'Complete los datos sobre su pareja de baile (para el baile social solo se requiere el nombre)',
          EN:'Fill in data about your dance partner (for social dance only first name is required)'},
    NOTES:{SV:'Meddelande till Tangokompaniet',
          ES:'Mensaje a Tangkompaniet',   
          EN:'Message to Tangokompaniet'},
    NEWSLETTER:{SV:'Jag vill ha nyhetsbrev',
          ES:'Quiero bolentines',   
          EN:'I want newsletter'},
    BUTTON_GO_BACK:{SV:'Gå tillbaka',
          ES:'Espalda',
          EN:'Go Back'},
    BUTTON_SHOPPING_CART:{SV:'Lägg i varukorg',
          ES:'Ve al carrito',
          EN:'Put in shopping cart',
    },
    BUTTON_REGISTER_NOW:{SV:'Skicka in anmälan',
          ES:'Enviar registro',
          EN:'Send regstration',
    },
    BUTTON_CLEAR_FORM:{SV:'Rensa formuläret',
          ES:'Formo clara',
          EN:'Clear form',
    },
    REQUIRED:{SV:'Obligatoriskt fält',
          ES:'Necesario',
          EN:'Required',
    },
    DANCE_ROLE:{SV:'Dansroll',
      ES:'Rol de baile',
      EN:'Dance role',
    },
    SELECT_DANCE_ROLE:{SV:'Välj dansroll',
      ES:'Seleccionar rol de baile',
      EN:'Select dance role',
    },
    DANCE_SITE:{SV:'Plats där du går kursen',
      ES:'Rol de baile',
      EN:'Location where you take the course',
    },
    SELECT_DANCE_SITE:{SV:'Välj plats där du vill ta kursen',
      ES:'Elige el lugar para realizar el curso rol de baile',
      EN:'Select a location of where to take the course',
    },
    WRONG_CHARSET:{SV:'Innehåller ej tillåtna tecken',
          ES:'Contiene person ajes ilícitos',
          EN:'Contains invalid chars',
    },
    CANNOT_CONTAIN_NUMBER:{SV:'Får inte innehålla siffror',
          ES:'No debe contener numeros',
          EN:'Cannot contains numbers',
    },
    INVALID_EMAIL:{SV:'Ogilitig email',
          ES:'Inválido email',
          EN:'Invalid email',
    },
    MANDATORY:{SV:'Denna val måste vara gjort',
          ES:'This choice is mandatory',
          EN:'Este campo es obligatorio',
    },
    IDENTICAL_EMAIL:{SV:'Din partners e-postadress måste skilja sig från din',
          ES:'El correo electrónico para socios debe ser diferente al correo electrónico',
          EN:'Partners email must be diffenrent from to your email',
    },
    INVALID_MOBILE:{SV:'Ogiltigt mobilnummer',
          ES:'Inválido movil',
          EN:'Invalid mobile',
    },      
    MUST_HAVE_PARTNER:{SV:'Denna danstillställning kräver att du registrerar dig med en danspartner.',
      ES:'This dance event require that you register together with a partner',
      EN:'This dance event require that you register together with a partner',
    },
    PARTNER_MUST_REGISTER_SEPARATELY:{SV:'Din partner måste också göra en egen anmälan.',
      ES:'Your dance partner must aslo register in an own registration',
      ES:'Your dance partner must aslo register in an own registration',
    },

    NO_SPACE_FOR_LEADER:{SV:'För tillfället ingen plats kvar för förare. Försök senare och se om fler följare anmält sig.',
      ES:'Currently no space left for leaders. Check later to see if any more followers have booked',
      EN:'Currently no space left for leaders. Check later to see if any more followers have booked',
    },
    NO_SPACE_FOR_FOLLOWER:{SV:'För tillfället ingen plats kvar för följare. Försök senare och se om fler förare anmält in sig.',
          ES:'Currently no space left for followers. Check later to see if any more leaders have booked',
          EN:'Currently no space left for followers. Check later to see if any more leaders have booked',
    },
    NO_SPACE_FOR_PARTNER_LEADER:{SV:'För tillfället ingen plats kvar för förare så du kan inte anmäla någon partner.',
        ES:'Currently no space left for leaders so you cannot register any partner',
        EN:'Currently no space left for leaders so you cannot register any partner',
    },
    NO_SPACE_FOR_PARTNER_FOLLOWER:{SV:'För tillfället ingen plats kvar för följare så du kan inte anmäla någon partner.',
        ES:'Currently no space left for followers so you cannot register any partner',
        EN:'Currently no space left for followers so you cannot register any partner',
    },
    TO_MANY_LEADERS:{SV:'För tillfället har denna tillställning förar-överskott, så bokningen är just nu bara öppen för par eller följare.',
        ES:'Currently there is an imbalance with a surprise of leaders, so registration is right now only open for couples or followers',
        EN:'Currently there is an imbalance with a surprise of leaders, so registration is right now only open for couples or followers',
    },
    TO_MANY_FOLLOWERS:{SV:'För tillfället har denna tillställning följar-överskott, så bokningen är just nu bara öppen för par eller förare.',
        ES:'Currently there is an imbalance with a surprise of followers, so registration is right now only open for couples or leaders',
        EN:'Currently there is an imbalance with a surprise of followers, so registration is right now only open for couples or leaders',
    },
}
const required = (value, allValues, props) => value ? undefined: TEXTS.REQUIRED[props.language]

const validname = (value, allValues, props) =>  !/[^A-Z^\u00c0-\u017e\- ]/ig.test(value) ? !/\d/.test(value) ? undefined
:TEXTS.CANNOT_CONTAIN_NUMBER[props.language]
:TEXTS.WRONG_CHARSET[props.language]

const email = (value, allValues, props) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined
  :TEXTS.INVALID_EMAIL[props.language]

/*  
const identicalEmail = (value, allValues, props) =>
  (allValues.email !== value) ? undefined
  :TEXTS.IDENTICAL_EMAIL[props.language]
*/ 

const phone = (value, allValues, props) => value?
/^[0-9' '%+-]{9,14}$/i.test(value)?undefined
:TEXTS.INVALID_MOBILE[props.language]
:undefined

const mandatory = (value, allValues, props) => value?undefined:TEXTS.MANDATORY[props.language]

// Field validation
/*
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
*/


const styles = {
  root:{
    position:'relative',
    display:'inline-block',
    padding:10,
  },
  form:{
    color:'black',
  },
  warning: {
    color: orange900,
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
  radioButton : value => ({
    color: value?tkColors.Purple.Light:tkColors.color,
    fontWeight:value?'bold':200,
  }),
  legal:{
    fontSize:'small', 
    color:tkColors.Purple.Light
  },
  error:  {
    fontSize:'large', 
    fontWeight:'bold',
    color:'red'
  }
};

const initialForm = {
}

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
  if (!props.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'Invalid e-mail format'
  }
  return errors
}





const renderSelectField = (props) => 
  <SelectField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
    onChange={(event, index, value) => {alert('This is the place')}}>
  </SelectField>


const renderField = ({ input, label, type, style, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} style={{...style, backgroundColor:error?red100:'transparent'}} required />
      {touched && error &&<span style={styles.error}>{'   ' + error}</span>}
    </div>
  </div>

const renderCheckbox = ({ input, label, meta: {touched,error} }) =>
  <div>
  <Checkbox
    label={label}
    checked={input.value}
    onCheck={input.onChange}
    labelStyle={{fontWeight:input.checked?'bold':200, color:input.value?tkColors.Purple.Light:tkColors.color}}
    />
    {touched && error &&<span style={styles.error}>{'   ' + error}</span>}
  </div>

const renderTextArea = ({ input, label, placeholder, maxLength, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <textarea {...input} placeholder={placeholder?placeholder:''} name={label} type={type} rows={6} maxLength={maxLength}/>
      {touched && error &&<span style={styles.error}>{error}</span>}
    </div>
  </div>


const renderGenderRadioButtons = ({input, language, meta: { touched, error }}) => {
  console.log('input',input) 
  const style = value => ({color:input.value == value?tkColors.Purple.Light:tkColors.color, fontWeight:input.value == value?'bold':200})
  return(
  <div>  
  {(input.value === undefined)?<span>{TEXTS.SELECT_DANCE_ROLE[language]}</span>:TEXTS.DANCE_ROLE[language]}

  <RadioButtonGroup 
    name={input.name} 
    defaultSelected={undefined}
    onChange={input.onChange}
  > 
      <RadioButton
        value={1} 
        label={TEXTS['LEADER'][language]}
        labelStyle={style(1)}
      />
      <RadioButton
        value={0}
        label={TEXTS['FOLLOWER'][language]}
        labelStyle={style(0)}
      />
      <RadioButton
        value={2}
        label={TEXTS['BOTH'][language]}
        labelStyle={style(2)}
      />
  </RadioButtonGroup>
  {touched && error &&<span style={styles.error}>{error}</span>}
  </div>
  )
}

const renderDanceSiteRadioButtons = ({input, language, meta: { touched, error }}) => {
  console.log('input',input) 
  const style = value => ({color:input.value === value?tkColors.Purple.Light:tkColors.color, fontWeight:input.value === value?'bold':200})
  return(
  <div>  
 {(input.value === undefined)?<span>{TEXTS.SELECT_DANCE_SITE[language]}</span>:TEXTS.DANCE_SITE[language]}
  
  <RadioButtonGroup 
    name={input.name} 
    label={TEXTS.SITE[language]}
    defaultSelected={undefined}
    onChange={input.onChange}
  > 
      <RadioButton
        label={TEXTS[DANCE_SITE.ONLINE][language]}
        value={DANCE_SITE.ONLINE} 
        labelStyle={style(DANCE_SITE.ONLINE)}
      />
      <RadioButton
        value={DANCE_SITE.SITE}
        label={TEXTS[DANCE_SITE.SITE][language]}
        labelStyle={style(DANCE_SITE.SITE)}
      />
  </RadioButtonGroup>
  {touched && error &&<span style={styles.error}>{error}</span>}
  {input.value === DANCE_SITE.ONLINE?<div style={{fontSize:'x-small'}}>{TEXTS.ONLINE_SUBTEXT[language]}</div>:null}  
  </div>
  )
}


const viewProps = (avaStatus, language) => {
    switch (avaStatus) {
      case AVA_STATUS.AV:
        return (
          { label: language===LANGUAGE_SV?'Registrera'
              :language===LANGUAGE_ES?'Registro'
              :'Register',
            warningMessage: null,
            warningText: null,
            style: {backgoundColor:'green', color:tkColors.Text.Dark, opacity:0.8}
          })
      case AVA_STATUS.OL:
        return (
          { label: TEXTS.SURPLUS_LEADER[language],
            warningMessage: TEXTS.SURPLUS_LEADER_WARNING[language],
            warningText: TEXTS.SURPLUS_LEADER_TEXT[language],
            style: {backgoundColor:'pink', color:tkColors.Text.Dark, opacity:0.8}
        })
      case AVA_STATUS.OF:
        return (
          { label: TEXTS.SURPLUS_FOLLOWER[language],
            warningMessage: TEXTS.SURPLUS_FOLLOWER_WARNING[language],
            warningText: TEXTS.SURPLUS_FOLLOWER_TEXT[language],
            style: {backgoundColor:'blue', color:tkColors.Text.Dark, opacity:0.8}
        })
        case AVA_STATUS.CL:
          return (
            { label: TEXTS.COURSE_FULL_LEADER[language],
              warningMessage: TEXTS.COURSE_FULL_LEADER[language],
              warningText: TEXTS.COURSE_FULL_LEADER[language],
              style: {backgoundColor:'pink', color:tkColors.Text.Dark, opacity:0.8}
          })
        case AVA_STATUS.CF:
          return (
            { label: TEXTS.COURSE_FULL_FOLLOWER[language],
              warningMessage: TEXTS.COURSE_FULL_FOLLOWER[language],
              warningText: TEXTS.COURSE_FULL_FOLLOWER[language],
              style: {backgoundColor:'blue', color:tkColors.Text.Dark, opacity:0.8}
          })
        case AVA_STATUS.CC:
        return (
          { label: TEXTS.COURSE_FULL[language],
            warningMessage: TEXTS.COURSE_FULL_WARNING[language],
            warningText: TEXTS.COURSE_FULL_TEXT[language],
            style: {backgoundColor:'red', color:'white', opacity:1.0}

        })
      default:
        return (
          { label: language===LANGUAGE_SV?'Registrera'
              :language===LANGUAGE_ES?'Registro'
              :'Register',
            warningMessage: null,
            warningText: null,
            style: {backgoundColor:'green', color:tkColors.Text.Dark, opacity:0.8}
          })
    }    
       
} 

const payForPartner = (language) =>
  <Field name="payForPartner" 
    label={TEXTS.PAY_FOR_PARTNER[language]}
    type='checkbox' 
    component={renderCheckbox} 
    />


    

      

let RegistrationForm = (props) => {
  const {error, handleSubmit, pristine, submitting, language, havePartner, leader, danceSite, reg, handlePutInCart, handleRegisterNow, handleGoBack, globalStyle} = props
  const color = globalStyle.color
  const viewProperties = viewProps (reg.avaStatus, language)
  const style = {...styles.root, ...viewProperties.style}
  const warningMessage=viewProperties.warningMessage
  const warningText=viewProperties.warningText
  const productType = reg.productType
  const linkTo = productType==='course'?LINK_TO_COURSE
    :productType==='social'?LINK_TO_HOME
    :LINK_TO_HOME;
  const payViaApp = reg?reg.payViaApp?true:false:false
  const startDate = reg?reg.startDate?reg.startDate:reg.productId.substr(0,6):''
  const startTime = reg?reg.startTime?reg.startTime:reg.productId.substr(6,4):''
  const dayname = reg.dayname?reg.dayname:reg.dayOfWeek?Weekdays[language][reg.dayOfWeek-1]:''
  const title = reg?reg['name' + language]?reg['name' + language]:reg.title:''
  const day = dayname +  ' ' + startDate + ' ' + startTime
  const city = reg?reg['city']?reg['city']:'':''
  const header = day + ' ' + city + ' ' + title  
  const performSiteQuery = reg?(reg.online==1 && reg.siteId !== 'ON')?true:false:false

  const avaStatus = reg.avaStatus?reg.avaStatus?reg.avaStatus:'AV':'AV'
  const avaStatusOnline = reg?reg.avaStatusOnline?reg.avaStatusOnline:'AV':'AV'
  const danceSiteDefault =reg?
        (danceSite === DANCE_SITE.SITE || danceSite === DANCE_SITE.ONLINE)?danceSite
        :reg.online==1?DANCE_SITE.ONLINE
        :reg.siteId === 'ON'?DANCE_SITE.ONLINE
        :avaStatusOnline === AVA_STATUS.COMPLETELY_CLOSED && avaStatus !== AVA_STATUS.COMPLETELY_CLOSED?DANCE_SITE.SITE
        :avaStatusOnline !== AVA_STATUS.COMPLETELY_CLOSED && avaStatus === AVA_STATUS.COMPLETELY_CLOSED?DANCE_SITE.ONLINE
        :DANCE_SITE.SITE
      :DANCE_SITE.SITE
  const noSpaceForPartner = 
       (leader == 1 && (avaStatus === AVA_STATUS.CF))?TEXTS.NO_SPACE_FOR_PARTNER_FOLLOWER[language] 
       :(leader == 0 && (avaStatus === AVA_STATUS.CL))?TEXTS.NO_SPACE_FOR_PARTNER_LEADER[language] 
       :null
  const noSpaceForRegistrant = 
        (leader == 1 && (avaStatus === AVA_STATUS.CL))?TEXTS.COURSE_FULL_LEADER[language]
        :(leader == 0 && (avaStatus === AVA_STATUS.CF))?TEXTS.COURSE_FULL_FOLLOWER[language]  
        :null 
  const onlySpaceWithPartner = (leader == 0 && (avaStatus === AVA_STATUS.OF))?TEXTS.TO_MANY_FOLLOWERS[language]
    :(leader == 1 && (avaStatus === AVA_STATUS.OL))?TEXTS.TO_MANY_LEADERS[language]
    :null

  const mustHavePartner = reg?reg.mustHavePartner?true:reg.courseType === 'AV'?true:false:false
  const mustHavePhonePartner = reg?reg.mustHavePhonePartner?true:false:false
  const cartObject = values => ({...values, leader:values.leader==1?1:0, newsletter:values.newsletter?1:0, linkTo:LINK_TO_SHOPPING_CART})
  const registerObject = values => ({...values, leader:values.leader==1?1:0, danceSite:danceSiteDefault, newsletter:values.newsletter?1:0, linkTo})
  const closedText = avaStatus === AVA_STATUS.CL?TEXTS.COURSE_FULL_LEADER[language]
    :avaStatus === AVA_STATUS.CF?TEXTS.COURSE_FULL_FOLLOWER[language]
    :avaStatus === AVA_STATUS.CC?TEXTS.COURSE_FULL[language]
    :undefined
  const development = process.env.NODE_ENV==='development'?true:undefined
  const daynameAZ = dayname?dayname.substr(0,2).replace(/å/g, 'a').replace(/ö/g, 'o').toUpperCase():''
  const message = daynameAZ?daynameAZ + reg.productId.substr(6).replace('_', '-'):reg.productId.substr(6).replace('_', '-')
  //alert(message)
  return (
      <div style={style}>
        <h2 style={{color: globalStyle.color}}>{header}</h2>
        {development?<h4>avaStatus = {avaStatus}</h4>:null}
        {avaStatus === AVA_STATUS.CC?
            <h2 style={{color}}>{TEXTS.COURSE_FULL[language]}</h2>
        :noSpaceForRegistrant?
            <h2 style={{color}}>{noSpaceForRegistrant}</h2>
        :reg?
          <div style={styles.form}>
              {warningText?<h2 style={style}>{warningText}</h2>:null}
              {warningMessage?<h4 style={style}>{warningMessage}</h4>:null}
              {closedText?<h3 style={{color: tkColors.Purple.Light}}>{closedText}</h3>:null}
              <form>
                <Field name="leader" 
                  value={leader}
                  language={language}
                  type='radio'
                  component={renderGenderRadioButtons} 
                  validate={[required, mandatory]}
                />
                <p />
                {performSiteQuery?
                  <p>  
                   {avaStatusOnline === AVA_STATUS.COMPLETELY_CLOSED?<h2>{TEXTS.ONLINE_FULL_TEXT[language]}</h2>
                   :avaStatus === AVA_STATUS.COMPLETELY_CLOSED?<h2>{TEXTS.ONSITE_FULL_TEXT[language]}</h2>
                   :   
                  <Field name="danceSite" 
                    value={danceSite}
                    language={language}
                    type='radio'
                    component={renderDanceSiteRadioButtons} 
                    validate={[required, mandatory]}
                  />
                  }
                  </p>
                :
                  null
                }
                <p />
                <p />
                <Field name="firstName" 
                  label={TEXTS.FIRST_NAME[language]}
                  type='text'
                  component={renderField} 
                  validate={[required, validname]}
                  style={{'textTransform':'capitalize'}}
                />
                <Field name="lastName" 
                  label={TEXTS.LAST_NAME[language]}
                  type='text' 
                  component={renderField} 
                  validate={[required, validname]}
                  style={{'textTransform':'capitalize'}}
                  />
                <Field name="email" 
                  label={TEXTS.EMAIL[language]}
                  type='email' 
                  component={renderField} 
                  validate={[required, email]}
                  />  
                <Field name="phone" 
                  label={TEXTS.PHONE[language]}
                  type='text' 
                  component={renderField} 
                  validate={[required, phone]}
                />  
                <p />
                <Field name="newsletter" 
                  label={TEXTS.NEWSLETTER[language]}
                  type='checkbox' 
                  component={renderCheckbox} />

                <p />
                {mustHavePartner?
                  <h2>{TEXTS.MUST_HAVE_PARTNER[language]}</h2>
                :noSpaceForPartner?
                  <h2 style={{color}}>{noSpaceForPartner}</h2>
                :onlySpaceWithPartner?
                  <h2 style={{color}}>{onlySpaceWithPartner}:</h2>
                :
                   <Field name="havePartner" 
                    label={TEXTS.I_HAVE_PARTNER[language]}
                    type='checkbox' 
                    component={renderCheckbox} />
                }    
                <p />
                <p />  
                {mustHavePartner || onlySpaceWithPartner || havePartner?
                  <div>
                    <i>
                      {TEXTS.FILL_IN_PARTNERS_NAME[language]}
                      {reg.noEmailPartner===true?<h2>{TEXTS.PARTNER_MUST_REGISTER_SEPARATELY[language]}</h2>:null}
                    </i>  
                    <p />
                    <Field name="firstNamePartner" 
                      label={TEXTS.FIRST_NAME_PARTNER[language]}
                      type='text'
                      component={renderField} 
                      validate={[required, validname]}
                      style={{'textTransform':'capitalize'}}
                      />
                    {reg.noLastNamePartner===true?null
                    :<Field name="lastNamePartner" 
                      label={TEXTS.LAST_NAME_PARTNER[language]}
                      type='text' 
                      component={renderField} 
                      validate={[required, validname]}
                      style={{'textTransform':'capitalize'}}
                      />
                    }  
                    {reg.noEmailPartner===true?null
                    :
                    <Field name="emailPartner" 
                      label={TEXTS.EMAIL_PARTNER[language]}
                      type='email' 
                      component={renderField} 
                      validate={[required, email]}
                    />
                    }
                    {reg.noPhonePartner===true?null:
                      <Field name="phonePartner" 
                        label={TEXTS.PHONE_PARTNER[language]}
                        type='text' 
                        component={renderField} 
                        validate={mustHavePhonePartner?[required, phone]:phone} 
                      />  
                    }  
                  </div>  
                :
                  null
                }    
                <p />
                <p />  
                <Field name="notes" 
                  component={renderTextArea} 
                  placeholder={TEXTS.NOTES[language]}
                  multiLine={true} 
                  maxLength={160}
                />
                <p />
                {productType === PRODUCT_TYPE.COURSE?<TextShow style={styles.legal} url={'/getTexts'} groupId={'REGISTRATION'} textId={'LEGAL'} language={language}></TextShow>:null}
                <p />
                {error &&<strong>{error}</strong>}
                <p />
                <div>
                    {avaStatus !== AVA_STATUS.CC?payViaApp?
                      <Button 
                        variant="outlined" 
                        onClick={handleSubmit(values => handlePutInCart(cartObject(values)))}
                        disabled={pristine || error}
                      >
                          {TEXTS.BUTTON_SHOPPING_CART[language]}
                      </Button>
                    : 
                      <Button 
                        variant="outlined" 
                        disabled={pristine || error}
                        onClick={handleSubmit(values => handleRegisterNow(registerObject(values)))}
                      >
                        {TEXTS.BUTTON_REGISTER_NOW[language]}
                      </Button>
                    :null}
                    &nbsp;&nbsp;
                    <Button 
                      variant="outlined"                   
                      disabled={submitting} 
                      onClick={()=>handleGoBack(linkTo)}
                    >
                      {TEXTS.BUTTON_GO_BACK[language]}
                    </Button>
                    <QrCode price={reg.price} message={message} />
                </div>
              </form>
          </div>
      :<h4>Page could not be displayed (Registration is missing)</h4>}
    </div>
  )
}

RegistrationForm = reduxForm({
  form: 'RegistrationForm', // a unique identifier for this form
  destroyOnUnmount:true,
  initialValues: { newsletter: 1 },
})(RegistrationForm);



// Decorate with connect to read form values
const selector = formValueSelector('RegistrationForm') // <-- same as form name

const mapStateToProps = state => {
  // can select values individually
  
  const leader = selector(state, 'leader');
  const danceSite = selector(state, 'danceSite');
  const havePartner = selector(state, 'havePartner');
  const newsletter = selector(state, 'newsletter');
  return {
    language: state.language,
    shoppingCartList: state.shoppingCart.list,
    leader, 
    danceSite,
    havePartner,
    newsletter, 
    globalStyle:state.style
  }
}

RegistrationForm = connect(mapStateToProps)(RegistrationForm);

export default RegistrationForm

 


