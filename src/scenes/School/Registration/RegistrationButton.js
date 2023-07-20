import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { addRegistration } from 'redux/actions/actionsShop'
import { Link } from 'react-router-dom'
import {AVA_STATUS} from 'Settings/Const'
import tkColors from 'Settings/tkColors'
import Button from "Components/Button"


/* ADVANCED CHANGE OF TEXT ON REGISTRATION BUTTON
const label=reg.avaStatus === AVA_STATUS.COMPLETELY_CLOSED?TEXTS.COMPLETELY_CLOSED[language]
:reg.avaStatusOnline === AVA_STATUS.COMPLETELY_CLOSED?TEXTS.REGISTER_ONSITE[language]
:reg.avaStatusOnsite === AVA_STATUS.COMPLETELY_CLOSED?TEXTS.REGISTER_ONLINE[language]
:TEXTS.REGISTER[language]
*/

const TEXTS = {
    COMPLETELY_CLOSED:{SV:'Fullbokad',
        ES:'Completo',
        EN:'Fully booked'
    },    
    CLOSED_BY_REQUEST:{SV:'Ring eller maila TK',
        ES:'Call or mail TK',
        EN:'Call or mail TK'
    },    
    CLOSED_ONLINE:{
        SV:'Bara platser kvar i lokal. ONLINE platserna via ZOOM är fullt.',
        ES:'Only space avaiable on site. ONLINE bookings are fully booked.',
        EN:'Only space avaiable on site. ONLINE bookings are fully booked.',
    }, 
    CLOSED_ONSITE:{
        SV:'Bara platser kvar ONLINE via ZOOM. Fullbokat i lokalen.',
        ES:'Only space avaiable on ONLINE. Fully booked on site.',
        EN:'Only space avaiable on ONLINE. Fully booked on site.',
    }, 
    COURSE_REMOVED:{
        SV:'Kursen borttagen',
        ES:'Curso cancellado',
        EN:'Course cancelled',
    }, 
    COURSE_FINISHED:{
        SV:'Avslutad',
        ES:'Finito',
        EN:'Finished',
    }, 
    UNKNOWN_DATE:{
        SV:'Anmälan knappen har okänt datum',
        ES:'Fesca desconocida',
        EN:'Unknown date',
    },  
    ONGOING:{
        SV:'Har startat',
        ES:'Ongoing',
        EN:'Registration',
    },
    REGISTER:{
        SV:'Anmälan',
        ES:'Inscriptión',
        EN:'Registration',
    },
}       

const singleReg = (reg, manualDisabled, language, addReg, style) => {
    const completelyClosed = reg.avaStatus === AVA_STATUS.COMPLETELY_CLOSED
    const closedByRequest = reg.avaStatus === AVA_STATUS.CLOSED_BY_REQUEST
    const finished = reg.daysUntilStart <= -140?true:undefined

    const label=reg.avaStatus === AVA_STATUS.COMPLETELY_CLOSED?TEXTS.COMPLETELY_CLOSED[language]
        :reg.started?TEXTS.ONGOING[language]:TEXTS.REGISTER[language]

    const disabled = completelyClosed || finished || manualDisabled
    const borderColor = style?style.color?style.color:tkColors.background:tkColors.background
    const adjStyle = {borderWidth:'1px', color:tkColors.background, borderColor, ...style}

    return(
        !reg?<h4>WARNING: No reg object passed to component RegistrationButton</h4>
        :!reg.startDate?<h3>{TEXTS.UNKNOWN_DATE[language]}</h3>
        :manualDisabled?<h3>{TEXTS.COURSE_REMOVED[language]}</h3>
        :finished?<h3>{TEXTS.COURSE_FINISHED[language]}</h3>
        :closedByRequest?<h3>{TEXTS.CLOSED_BY_REQUEST[language]}</h3>
        :completelyClosed?<h3>{TEXTS.COMPLETELY_CLOSED[language]}</h3>
        :
            <Link to={'/registration/' +  reg.productType + '/' + reg.productId} style={{ textDecoration: 'none' }}>
                <Button 
                    size="small"
                    variant="outlined" 
                    style={adjStyle}
                    key={reg.id}
                    disabled={disabled}
                    onClick={()=>addReg(reg)}
                >
                    {label}
                </Button>
            </Link>    
    )
}

const RegistrationButton = props => {

    const {reg, disabled, language, addReg, style} = props
    return (
        singleReg(reg, disabled, language, addReg, style)
    )
}        

const mapDispatchToProps = (dispatch) => {
    return {
        addReg: (reg) => dispatch(addRegistration(reg)),
    }        
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
    }
}    


export default  connect(mapStateToProps, mapDispatchToProps)(RegistrationButton);    
