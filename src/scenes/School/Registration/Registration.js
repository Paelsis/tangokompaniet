import React from 'react';
import { connect } from 'react-redux'
import {Navigate, useNavigate,  } from 'react-router-dom';
import tkColors from 'Settings/tkColors';
import { LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage' 
import { updateRegistration } from 'redux/actions/actionsShop'
import RegistrationForm from './RegistrationForm'
import Weekdays from 'Settings/Weekdays';
import {AVA_STATUS, BOOKING_STATUS, PRODUCT_TYPE} from 'Settings/Const'
import config from 'Settings/config';
import postData from 'functions/postData'
import fetchList from 'functions/fetchList'
import withRouter from 'functions/withRouter'
import Button from 'Components/Button'
import {setGlobalStyle} from 'redux/actions/actionsStyle'
import TextShow from 'Components/Text/TextShow'
import QrCode from 'Components/QrCode'
import moment from 'moment-with-locales-es6'
import { checkPropTypes } from 'prop-types';

const CULTURE = (language) => language===LANGUAGE_SV?'sv':language===LANGUAGE_ES?'es':'en'

const TEXTS={
    GO_BACK:{
        SV:'Gå tillbaka',
        EN:'Go back',
        ES:'Regresar',
    },
    REGISTRATION_READY: (reg) => {
        if (reg.firstNamePartner?reg.firstNamePartner.length > 0:false) {
            return({
                SV:'Du är nu anmäld till '
                    + (reg.nameSV?reg.nameSV:reg.title) + ' i ' + reg.city  + ' som startar ' + reg.startDate + ' klockan ' + reg.startTime
                    + '. Din partner måste göra en egen anmälan.',
                EN:'You are now registered on '  
                    + (reg.nameEN?reg.nameEN:reg.title) + ' in ' + reg.city + ' starting ' + reg.startDate + ' at ' + reg.startTime
                    + '. Your partner must do a separate registration.',
                ES:'Ahora está registrado en '  
                    + (reg.nameEN?reg.nameEN:reg.title) + ' in ' + reg.city + ' starting ' + reg.startDate + ' at ' + reg.startTime
                    + '. Su pareha debe hacer un registro por separadodo.'
            })
        } else {   
            return({
                SV:'Du är nu anmäld till ' + (reg.nameSV?reg.nameSV:reg.title) + ' i ' + reg.city + ' som startar ' + reg.startDate + ' klockan ' + reg.startTime,
                EN:'You are now registered on '  + (reg.nameEN?reg.nameEN:reg.title) + ' in ' + reg.city + ' starting ' + reg.startDate + ' at ' + reg.startTime,
                ES:'Ahora estás registrado para el '  + (reg.nameES?reg.nameES:reg.title) + ' en ' + reg.city + ' eso comienza ' + reg.startDate + ' a las ' + reg.startTime,
            })
        }    
    },
    CANCEL: {
        SV:'Du kan cancellera denna dansanmälan i länken som du fått i ditt svarsmail', 
        EN:'You can cancel this registration with the link you have recieved in your reply mail',
        ES:'Puede cancelar este registro con el enlace que ha recibido en su correo de respuest',
    },
    LEGAL: {
        SV:`Vänligen kontrollera din mailbox (och spam-mailbox) så att du fått din registrering bekräftad. 
        Om så ej skett vänligen kontakta tangokompaniet på mail eller telefon.`,
        EN:`Por favor revise su buzón para confirmar su registro.
        De lo contrario, comuníquese con la compañía de tango por correo o teléfono.`,
        ES:`Please check your mailbox (and span mailbox) to confirm that you registration is confirmed.
        If you got no mail check your spam mailboxn la compañía de tango por correo o teléfono.`
    },
    ORDER_ID: (orderId) => ({
        SV:`Din registrering har ordernummer:` + orderId, 
        EN:`Your registration has order number:` + orderId,
        ES:`Su número de pedido es:` + orderId,
    }), 
    ANGE_ORDER_ID: {
        SV:`Ange ordernumret i meddelande fältet när du betalar via Internet (SWISH nummer: 123 173 30 05)`, 
        EN:`Enter the order number in the message field when paying via the Internet (SWISH number: 123 173 30 05)`,
        ES:`Ingrese número en el campo del mensaje cuando pague a través de Internet (SWISH numero: 123 173 30 05)`,
    }, 
    NO_SUCH_COURSE: productId => ({
        SV:'Kurs med productId ' + productId + ' existerar inte i nuvarande schema', 
        EN:'This productId '  + productId + ' is not found for any course in the schedule',
        ES:'This productId ' + productId + ' is not found for any course in the schedule',
    })
}

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const CREATE_REG_URL = apiBaseUrl + '/createRegistration';
const POST_FORM_URL = apiBaseUrl + '/postForm';
 
const styles = {
    root: {
        flex:1,
        padding:5,
        maxWidth:1000,
        marginRight:'auto',
        marginLeft:'auto',
    },
    warning: {
        backgroundColor:'yellow',
        color:'red'
    },
    textContainer:{
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        color:tkColors.Text.Dark
    },
    text : {
        flex:1,
        padding: 5,
        textAlign:'left',
        fontSize:'small',
        minWidth:300,
    }
}


class Registration extends React.Component {   
    
    constructor() {
        super();
        this.state = {linkTo:false, serverReady:false, textOK:undefined, orderId:0, course:undefined, slept:false, mailBody:'No mail body'};
        this.handlePutInCart = this.handlePutInCart.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.emulateReg = this.emulateReg.bind(this)
        this.emulateRegSocial = this.emulateRegSocial.bind(this)
        this.fetchCourseForProductId = this.fetchCourseForProductId.bind(this)
    }

    timeout(ms) { //pass a time in milliseconds to this function
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    fetchCourseForProductId() {
        const productId = this.props.params.productId;
        const fullPath = apiBaseUrl + "/scheduleCourse?productId=" + productId
        fetchList('', '', fullPath, (list)=> {
            const course = list.find(it =>it.productId === productId)
            console.log('Registration->fetchCourseForProductId->course', course)
            this.setState({course})
        })
    }

    componentDidMount () {
        console.log('componentDidMount')
        moment.locale(CULTURE(this.props.language?this.props.language:LANGUAGE_SV))
        this.fetchCourseForProductId()

    }  

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== this.props.language) {
            moment.locale(CULTURE(nextProps.language?nextProps.language:LANGUAGE_SV))
            console.log('Registration->componentWillReceiveProps->language', nextProps.language)
        }
    }   

    bookingStatus(leader, reg) {
        switch(reg.avaStatus) {
            case AVA_STATUS.CC: return BOOKING_STATUS.CONFIRMED
            case AVA_STATUS.CL: return BOOKING_STATUS.CONFIRMED
            case AVA_STATUS.OL: return BOOKING_STATUS.CONFIRMED
            case AVA_STATUS.CF: return BOOKING_STATUS.CONFIRMED
            case AVA_STATUS.OF: return BOOKING_STATUS.CONFIRMED
            case AVA_STATUS.AV: return BOOKING_STATUS.CONFIRMED
            default: return BOOKING_STATUS.CONFIRMED
        }
    }

    debitable(status) {
        return status === BOOKING_STATUS.CONFIRMED
    }

    createRegistration(values, reg) {
        const status=this.bookingStatus(values.leader, reg); 
        const productList = [reg]
        // const debitable=this.debitable(status);
        const registration = {...reg, ...values, status, language:this.props.language, index:0, debitable:false, showInCart:false, deleted:false, productList}
        console.log('Registration:', registration);
        return(registration);
    }    

    handlePutInCart = (values, reg) => {
        let regUpd = this.createRegistration(values, reg);
        console.log('Updated registration object:', regUpd);
        this.setState({linkTo:values.linkTo});
        this.props.updateRegistration(regUpd);
    }

    handleReply(data) {
        this.props.setRegistrationButtonColor('green')
        data?data.status?data.status==='OK'?this.setState({serverReady:true, orderId: data.orderId, mailBody:data.mailBody})  
        :data.status==='ERROR'?alert('ERROR: Registration failed with status: ' + data.status + '. Please contact Tangokompaniet ...')
        :alert('ERROR: Registration status is ' + data.status + '. Please contact tangokompaniet on mail')
        :alert('ERROR: No return status (data.status) from server')
        :alert('ERROR: No data returned from server')
    }

    handleRegisterNow = (values, reg) => {

        const data = this.createRegistration(values, reg);
          // After posting order handle the checkout
        this.props.setRegistrationButtonColor('yellow')
        this.setState({textOK:TEXTS.REGISTRATION_READY(data)[this.props.language]})
        postData(CREATE_REG_URL, this.props.username, this.props.password, data, this.handleReply);
    }

    renderTitle = (reg) => {
        return(
        reg?
            <h3>
                {reg.name}&nbsp;
                {reg.city}&nbsp;
                {Weekdays[this.props.language][reg.dayOfWeek-1]}&nbsp;
                {reg.startTime}&nbsp; 
                {this.props.language===LANGUAGE_SV?'Startar:':this.props.language===LANGUAGE_ES?'De inicio':'Starts:'}{reg.startDate}
            </h3>
        :
            <h3 style={styles.warning}>
                Warning: No  choosen !
            </h3>
        
        )
    }    

    emulateRegSocial() {
        const productId = this.props.params.productId
        const productType = this.props.productType?this.props.params.productType:PRODUCT_TYPE.SOCIAL
        const avaStatus = this.props.params.avaStatus?this.props.params.avaStatus:AVA_STATUS.OPEN
        const language = this.props.language
        moment.locale(CULTURE(this.props.language?this.props.language:LANGUAGE_SV))

        const mom = moment(productId.substring(0, 10), 'YYMMDDHHmm')
        const siteId = productId.substr(10,2)
        return({
            productId,
            productType,
            siteId,
            avaStatus,
            title:language===LANGUAGE_SV?'Socal dans (milonga eller praktika)':language===LANGUAGE_ES?'Baile social (milonga o práctica)':'Social dance (milonga or practica)',
            startDate: mom.format('DDMMMYY'),
            startTime: mom.format('LT'),
            dayname: mom.format('dddd'),
            dayOfWeek: mom.isoWeekday(),
            city: (siteId === 'VG'||siteId === 'SV'||siteId === 'MH')?'Lund':'Malmö',
            noLastNamePartner: true,
            noEmailPartner: true,
            noPhonePartner: true,
            status:BOOKING_STATUS.CONFIRMED, 
            avaStatus:AVA_STATUS.OPEN,
        })    
    }    

    emulateReg = () => {
        const productType = this.props.params.productType
        switch (productType) {
            case 'course':
                return this.state.course
            default:        
                return this.emulateRegSocial()
            }
    }

    render() {  
        const language = this.props.language?this.props.language:LANGUAGE_SV
        const productType = this.props.params.productType?this.props.params.productType:PRODUCT_TYPE.COURSE
        const productId = this.props.params.productId
        const reg=this.props.shoppingCartList.length > 0?this.props.shoppingCartList.find(it => it.productType===productType && it.productId === productId):this.emulateReg()

        const daynameAZ = reg?reg.dayname?reg.dayname.substr(0,2).replace(/å/g, 'a').replace(/ö/g, 'o').toUpperCase():'':''

        const message = reg?daynameAZ + reg.productId.substr(6).replace('_', '-') + '-' +  this.state.orderId:''
        return (
                <div style={styles.root}>
                    {reg?
                        this.state.serverReady===true?
                            <div style = {{color:tkColors.Purple.Light, textAlign:'center', verticalAlign:'middle'}}>
                                <h3>
                                    {this.state.textOK}
                                </h3>
                            <div style={styles.textContainer}>
                                <div style={styles.text}>{TEXTS.ORDER_ID(this.state.orderId)[language]}</div>
                                <div style={styles.text}>{TEXTS.ANGE_ORDER_ID[language]}</div>
                                <div style={{...styles.text, fontWeight:'bold', fontSize:20, color:'darkOrange'}}>{TEXTS.CANCEL[language]}</div>
                                <TextShow style={styles.text} url={'/getTexts'} groupId={'REGISTRATION'} textId={'IF_NO_MAIL'} language={language} />
                                {productType === PRODUCT_TYPE.COURSE?<TextShow style={styles.text} url={'/getTexts'} groupId={'REGISTRATION'} textId={'LEGAL'} language={language} />:null}    
                            </div>
                            {this.state.orderId?<QrCode price={undefined} message={message} />:null}
                            <Button 
                                variant="outlined"
                                onClick={()=>{this.props.navigate(-1)}}
                            >
                                {TEXTS.GO_BACK[language]}
                            </Button>      
                            {process.env.NODE_ENV==='development'?
                                <div>
                                    <h1>Mail body</h1>
                                    <div dangerouslySetInnerHTML={{__html: JSON.stringify(this.state.mailBody)}} />
                                </div>    
                            :null}    
                          </div>

                        :this.state.linkTo?
                            <div>
                                <Navigate to={this.state.linkTo} />
                            </div>
                        :    
                            <div>
                                <RegistrationForm 
                                    reg={reg} 
                                    handleRegisterNow={(values)=>this.handleRegisterNow(values, reg)} 
                                    handlePutInCart={(values)=>this.handlePutInCart(values, reg)} 
                                    handleGoBack={(linkTo)=>this.props.navigate(linkTo)} 
                                />
                            </div>
                        :
                            this.state.slept?<h3 style = {{color:tkColors.Purple.Light, textAlign:'center', verticalAlign:'middle'}}>{TEXTS.NO_SUCH_COURSE(productId)[language]}</h3>:''
                    }
                    </div>  
        )
     };    
};
const mapStateToProps = state => {
    return {
      language: state.language,
      shoppingCartList: state.shoppingCart.list,
      username:state.user.username,
      password:state.user.password,
      style:state.style,
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        updateRegistration: reg => dispatch(updateRegistration(reg)),
        setRegistrationButtonColor: color =>  { dispatch(setGlobalStyle({registrationButtonColor:color})) },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Registration))    



