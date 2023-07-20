import React, {useState, useEffect} from 'react';
import TextShow from 'Components/Text/TextShow'
import { connect } from 'react-redux'
import postData from 'functions/postData'
import fetchList from 'functions/fetchList'
import FormTemplate from 'Components/formTemplate'
import {LANGUAGE_EN} from 'redux/actions/actionsLanguage'
import config from 'Settings/config';
import {EVENT_TYPE} from 'Settings/Const'
import tkColors from 'Settings/tkColors';
import QrCode from 'Components/QrCode'


const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const CREATE_REG_URL = apiBaseUrl + '/createRegistrationMarathon'
const SCHEDULE_EVENT_MARATHON_URL = apiBaseUrl + "/scheduleEvent"
const FORM_FIELDS_URL = apiBaseUrl + "/formFields"
const VIEW_MARATHON_COUNT = apiBaseUrl + "/marathonCount"

//const imageUrlFunc = replyImage => apiBaseUrl + '/' + replyImage
const imageUrlFunc = replyImage => replyImage.toLowerCase().indexOf('http')!==-1?replyImage
    :apiBaseUrl + '/' + replyImage.replace(/^\/|\/$/g, '')

const STEPS = {
    INITIAL:'INITIAL',
    FAILED:'FAILED', 
    SUCCESS:'SUCCESS'
}
const TEXTS = {
    CANCEL: {
        SV:'Du kan cancellera denna dansanmälan i länken som du fått i ditt svarsmail', 
        EN:'You can cancel this registration with the link you have recieved in your reply mail',
        ES:'Puede cancelar este registro con el enlace que ha recibido en su correo de respuest',
    },
}

const styles = {
    registration:(color) => ({
        //paddingLeft:'5%',
        display:'inline-block',
        width:'70%',
        marginLeft:'5%',
        color:color?color:'red',
        padding:20,
        boxShadow:'0 13px 27px -5px ' + color,
    }),
    legal: color =>({
        fontSize:'small', 
        color,
    }),
    success:(color)=>({
        clear:'both', 
        width:'100%', 
        textAlign:'center', 
        color:color?color:'red', 
    }),
    failed:{
        color:'red',
        clear:'both', 
        width:'100%', 
        textAlign:'center', 
        fontSize:24
    },
    unknown:{
        clear:'both', 
        width:'100%', 
        textAlign:'center', 
        color:'orange', 
        fontSize:28
    }

}

const STATUS={
    MISSING:'MISSING',
    NOT_OPEN_YET:'NOT_OPEN_YET',
    CLOSED:'CLOSED',
    FINISHED:'FINISHED',
}

const SCHEDULE_UNDEFINED={
    status:STATUS.MISSING,
    eventType:EVENT_TYPE.MARATHON, 
    dateRange:undefined,
    emailResponsible:undefined, 
    year:undefined, 
    imageUrl:undefined
}

const ScheduleMarathon = ({language, globalStyle}) => {
    const [step, setStep] = useState(STEPS.INITIAL)
    const [data, setData] = useState(STEPS.INITIAL)
    const [schedule, setSchedule] = useState(SCHEDULE_UNDEFINED)
    const [formFields, setFormFields] = useState([])
    const [marathonCount, setMarathonCount] = useState([])
    const eventType=EVENT_TYPE.MARATHON
    const handleReply = data => {setStep(data.status==='OK'?STEPS.SUCCESS:STEPS.FAILED); setData(data)}

    const closed = formFields

    useEffect(()=>{
        fetchList('', '', SCHEDULE_EVENT_MARATHON_URL + "?eventType=" + eventType, 
            result =>
            {
                const sched = Array.isArray(result)?result[0]:result
                if (sched) {
                    setSchedule({
                            ...result, 
                            imageUrl:sched.replyImage?imageUrlFunc(sched.replyImage):'No image',
                    }) 
                } else {
                        setSchedule({status:STATUS.MISSING})      
                }
            }
        )    

        fetchList('', '', FORM_FIELDS_URL + '?formName=' + eventType, 
            result =>
            {
                const schedule = Array.isArray(result)?result[0]:result
                if (schedule) {
                    // alert(JSON.stringify(result))
                    setFormFields(result) 
                }
            }
        )
        fetchList('', '', VIEW_MARATHON_COUNT, 
        result =>
        {
            const schedule = Array.isArray(result)?result[0]:result
            if (schedule) {
                // alert(JSON.stringify(result))
                setFormFields(result) 
            }
        }
    )

    }, [])

    const handleRegistration= (reg) => {
        console.log('REGISTRATION:', reg)
        postData(CREATE_REG_URL, '', '', reg, handleReply);
    }

    const handleSubmit = (e, reg) => {
        e.preventDefault(); 
        const expandedReg = {
            ...reg, 
            eventType:schedule.eventType, 
            dateRange:schedule.dateRange, 
            emailResponsible:schedule.emailResponsible?schedule.emailResponsible:'marathon@tangokompaniet.com', 
            year:schedule.year, 
            amount:schedule.amount,
            imageUrl:schedule.imageUrl,
        }
        handleRegistration(expandedReg)
    }
    return (
        <div style={{color:globalStyle.color}}> 
            {schedule.status===STATUS.MISSING?
                    <h4>There is no schedule defined for any MARATHON</h4>
            :schedule.status===STATUS.NOT_OPEN_YET?
                    <h4>Registration opens {schedule.openRegDate} at {schedule.openRegTime} </h4>
            :schedule.status===STATUS.CLOSED?
                    <h4>Registration closed</h4>
            :schedule.status===STATUS.FINISHED?
                    <h4>This marathon has finished and was active during period {schedule.dateRange}</h4>
            :step===STEPS.INITIAL?
                <div style={styles.registration(globalStyle.color?globalStyle.color:'red')}>

                    <h4>Registration marathon {schedule.dateRange}</h4>
                        {schedule.avaStatusText[language]?<h2>{schedule.avaStatusText[language]}&nbsp;({schedule.avaStatus})</h2>:<h3>Open</h3>}
                        <FormTemplate schedule={schedule} fields={formFields} handleSubmit={handleSubmit}/>
                    <p/>
                </div>
            :step===STEPS.SUCCESS?
                <>
                    <div style={styles.success(globalStyle.color)}>
                        {schedule.replyImage?<img src={schedule.imageUrl} alt={'Image: ' + schedule.imageUrl + ' is missing'} width="75%"/>:null}
                        <h2 >Your registration to Malmö Tangomarathon {schedule.dateRange} was successful</h2>
                        <div style={{...styles.text, fontWeight:'bold', fontSize:20, color:'darkOrange'}}>{TEXTS.CANCEL[language]}</div>
                        <h3 >Please check your mailbox (or spam mailbox) for confirmation of your registration.</h3>
                        <TextShow style={styles.legal(globalStyle.color)} url={'/getTexts'} groupId={eventType} textId={'LEGAL'} language={language}></TextShow>
                        <QrCode price={schedule.amount} message={eventType  + '-' +  schedule.dateRange.substring(0, 7) + '-' + data.orderId} color={globalStyle.color} />
                    </div>
                    {data.mailStatus === 'ERROR'?
                            <div style={{color:'red', border:'5px solid red'}}>
                                {data.mailSubject?<h4>Mail subject: {data.mailSubject}</h4>:null}
                                {data.mailBody?<><h4>Mail body:</h4><div style={{color:'red'}} dangerouslySetInnerHTML={{__html: data.mailBody}} /></>:null}
                            </div>    
                    :null}    
                </>
            :step===STEPS.FAILED?
                <div style={styles.failed}>
                    <h2 >WARNING: Your registration failed. Please contact Tangokompaniet.</h2> 
                </div>
            :    
                <div style={styles.unknown}>
                    <h2 >WARNING: No valid render step</h2>
                </div>
                
            }    
        </div>    
    )
}

const mapStateToProps = (state) => {
    return {
        language: LANGUAGE_EN, //state.language,
        globalStyle: state.style,
    }
}    

export default connect( 
    mapStateToProps
) (ScheduleMarathon)    
