import React, {Component} from 'react';
import {connect } from 'react-redux'
import { withBreakpoints } from 'react-breakpoints'
import {CALENDAR} from 'Settings/config'
import { CALENDAR_TYPE } from 'Settings/Const';
import {eventStyle, CULTURE} from './calendarUtil'
import Button from 'Components/Button';
import tkColors from 'Settings/tkColors'
import {getEvents} from './getEvents'
import {PRODUCT_TYPE, AVA_STATUS} from 'Settings/Const'
import fetchList from 'functions/fetchList';
import config from 'Settings/config';
import SmallCalendarView from './SmallCalendarView'
import DialogSlide from './DialogSlide'


//import moment from 'moment';
import moment from 'moment-with-locales-es6'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'
import { getFormValues } from 'redux-form';

const URL_REGISTRATION_COUNT=config[process.env.NODE_ENV].apiBaseUrl + '/getRegistrationCount?maxName=maxRegistrantsInside';
const colorDark='#81185B';
const colorLight='#8a973b';

const styles = {
  root:{
    position:'relative',
    color:tkColors.black,
    fontSize:'small', 
    margin:'auto', 
    width:'100%'
  },
  bar:{
    position:'relative',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
    width:'100%',
  },
  calendar: {
    color:tkColors.Purple.Light, 
    height:500,
    opacity:1.0,
  } 
}

const TEXTS = {
  CLOSE:{
      SV:'Stäng',
      ES:'Cerrer',
      EN:'Close',
  },
  LOCATION:{
    SV:'Plats',
    ES:'Locacion',
    EN:'Location',
  },
  REG:{
    SV:'Anmälan',
    ES:'Registrar',
    EN:'Register',
  },
  WAITLIST:{
    SV:'Sätt mig/oss på väntelista',
    ES:'Poner en lista de espera',
    EN:'Put me/us on waitlist',
  },
  CLASSES:{
    SV:'Lektioner',
    ES:'Clases',
    EN:'Classes',
  },
  DANCE:{
    SV:'Dansa',
    ES:'Bailar',
    EN:'Dance',
  },
  MALMO:{
    SV:'Allt i Malmö',
    ES:'All in Malmö',
    EN:'All in Malmö',
  },
  DESC:{
      SV:'Info',
      ES:'Info',
      EN:'Info',
  },
  MAX:{
      SV:'Max antal',
      ES:'Max allowed',
      EN:'Max allowed',
  },
  REMAINING:{
    SV:'Återstående antal lediga platser',
    ES:'Available count',
    EN:'Available count',
  }, 
  NO_REGISTRATIONS:{
    SV:'Ingen anmäld ännu',
    ES:'No dancer has so far registered',
    EN:'No dancer has so far registered',
  },
  AVA_STATUS:{
    AV:{
      SV:'Platser kvar för både förare och följare.',
      EN:'Space available for both leaders and followers',
      ES:'Space available for both leaders and followers',
    }, 
    CC:{
      SV:'Dansen är fullbokad. Kontakta Tangkompaniet för eventuella återbud.',
      EN:'No space available. Contact Tangokompaniet and check for cancellations',
      ES:'No space available. Contact Tangokompaniet and check for cancellations',
    }, 
    CL:{
      SV:'Fullbokat för förare, bara platser kvar till följare',
      EN:'Fully booked for leaders, only space availabile for followers',
      ES:'Fully booked for leaders, only space availabile for followers',
    }, 
    OL:{
      SV:'Tillfälligt överskott på förare (+3), vänta och se om fler följare bokar sig',
      EN:'Temporary overflow of leaders (3), wait and see if more followers books',
      ES:'Temporary overflow of leaders (3), wait and see if more followers books',
    }, 
    CF:{
      SV:'Fullbokat för följare, bara platser kvar till förare',
      EN:'Fully booked for followers, only space availabile for leaders',
      ES:'Fully booked for followers, only space availabile for leaders',
    },
    OF:{
      SV:'Tillfälligt överskott på följare (+3), vänta och se om fler förare bokar sig',
      EN:'Temporary overflow of followers (3), wait and see if more förare bookar sig',
      ES:'Temporary overflow of followers (3), wait and see if more förare bookar sig',
    },
  },     
}


class _Calendars extends Component {
  constructor() {
    super();
    this.state = {
      calendarType:CALENDAR_TYPE.SOCIAL,
      name:CALENDAR.SOCIAL,
      fontSize:'large',
      events:[],
      open:false,
      event:{},
    };
    this.handleEvent = this.handleEvent.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  alltIMalmo = (language) =>
    <Button 
      size="small"
      variant={this.state.calendarType===CALENDAR_TYPE.SOCIAL?"contained":"outlined"} 
      onClick={() => {this.setState({events:[]}); this.loadEventsMultiple([CALENDAR_TYPE.SOCIAL, CALENDAR_TYPE.SOCIAL, CALENDAR_TYPE.SOCIAL, CALENDAR_TYPE.SOCIAL, CALENDAR_TYPE.SOCIAL, CALENDAR_TYPE.SOCIAL])}}>
        {TEXTS.MALMO[language]} 
    </Button>


  findParameter(s, val) {
    const idx = s.indexOf(val)  
    console.log('findParamter', val, 'idx',  idx)
    if (idx != -1) {
      const value = s.slice(idx).match(/(\d+)/)[0]
      console.log('newString', s.slice(idx), 'value', value)
      return value
    } else {
      return undefined
    }  
  }  

  avaStatus(event, regCount) {
    const maxRegistrants = event.maxInd?event.maxInd:event.maxPar?event.maxPar*2:regCount?regCount.maxRegistrants:999
    if (regCount===undefined) {
      return AVA_STATUS.AV 
    }
    
    const maxPerRole = Math.trunc((+maxRegistrants + +regCount.maxImbalance)/2)
    const maxLeader = Math.min(maxRegistrants - regCount.follower, maxPerRole)
    const maxFollower = Math.min(maxRegistrants - regCount.leader, maxPerRole)

    if (regCount.booked >= maxRegistrants) {
      return AVA_STATUS.CC
    } else if (regCount.leader >= maxLeader) {
      return AVA_STATUS.CL
    } else if (regCount.follower >= maxFollower) {
      return AVA_STATUS.CF
    } else if (regCount.leader - regCount.booked >= regCount.maxImbalance) {
      return AVA_STATUS.OL
    } else if (regCount.follower - regCount.leader >= regCount.maxImbalance) {
      return AVA_STATUS.OF
    } else {            
      return AVA_STATUS.AV
    }    
  }

  mapEvent(event, regCountList) {
    const language = this.props.language
    const mstart = moment(event.start)
    const mend = moment(event.end)
    const productId = mstart.format('YYMMDDHHmm') + '__SOCIAL'
    const maxRegistrants = event.maxRegistrants
    const regCount = regCountList?regCountList.find(it => it.productId === productId):undefined
    const avaPar = event.maxPar?regCount?regCount.booked?(maxRegistrants - regCount.booked)/2:event.maxPar:event.maxPar:undefined
    const avaInd = event.maxInd?regCount?regCount.booked?(maxRegistrants - regCount.booked):event.maxInd:event.maxInd:undefined
    const maxImbalance = event.maxImbalance?event.maxImbalance:regCount?regCount.maxImbalance:3
    const maxPerGender = Math.trunc(Number(+maxRegistrants + +maxImbalance)/2)
    const maxLeader = regCount?Math.min(maxPerGender, maxRegistrants - regCount.follower):maxPerGender
    const maxFollower = regCount?Math.min(maxPerGender, maxRegistrants - regCount.leader):maxPerGender
    const avaLeader = regCount?Math.trunc(maxLeader - regCount.leader):maxPerGender
    const avaFollower = regCount?Math.trunc(maxFollower - regCount.follower):maxPerGender
    const avaStatus = avaInd?avaInd > 0?AVA_STATUS.AV:AVA_STATUS.CC
        :avaPar?avaPar > 0?AVA_STATUS.AV:AVA_STATUS.CC
        :AVA_STATUS.AV

    const avaStatusText = TEXTS.AVA_STATUS[avaStatus][language]
            
    const eventInfo = {
      productType:PRODUCT_TYPE.SOCIAL, 
      newsletter:true,    
      mustHavePartner:false,
      noEmailPartner:true,
      noPhonePartner:true,
      productId,
      title:event.title,
      nameSV:event.title,
      nameEN:event.title?event.title.slice(0,79):event.description,
      nameES:event.title?event.title.slice(0,79):event.description,
      label:event.title.slice(0,79),   
      genderBalance:40,
      regCount, 
      avaPar,
      avaInd,
      avaStatus, 
      avaLeader,
      avaFollower,
      avaStatus, 
      avaStatusText,
      language
    }

    const dddd = mstart.format('dddd')
    const weekday = dddd.toUpperCase().charAt(0) + dddd.slice(1,3)
    return ({...event, ...eventInfo, 
        city:' ',
        mstart,
        mend,
        dayOfWeek:mstart.format('E'),
        weekday:weekday,
        startDate:mstart.format('D/M'),
        startTime:mstart.format('HH:mm'),
        endTime:mend.format('HH:mm'),
        style:eventStyle(event, false, this.state.calendarType),
    })    
  }    

  loadEvents(calendarType) {
      const cal = CALENDAR[calendarType]
      moment.locale(CULTURE(this.props.language))
      const timeMin = moment().startOf('day')
      const timeMax = moment().endOf('month').add(3,'months').add(7, 'days')
      try {
          fetchList('', '', URL_REGISTRATION_COUNT, regCountList => {
              getEvents(
                cal.calendarId,
                cal.apiKey,
                (events) => {this.setState({events:events.map(it =>this.mapEvent(it, regCountList)), calendarType})},
                timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
                timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
                this.props.language
              )
            }
          )
      } catch(e) {                                
          this.setState({events:[]})
          let errMessage = 'ERROR:' + e.message 
          console.log(errMessage);
      }    
  }    

  loadEventsMultiple(calendarTypes) {
    calendarTypes.forEach(calendarType => this.loadEvents(calendarType))
  }

  // invoked immediately after a component is mounted
  componentDidMount () {
      this.loadEvents(CALENDAR_TYPE.SOCIAL)
  }

  getTime(e) {
    return(e.start.getHours() + ':' + e.start.GetMinutes() + ' - ' + e.end.getHours() + ':' + e.end.getMinutes());
  }

  handleEvent(event) {
    this.setState({open:moment()<moment(event.end)?true:false, event})
  }

  handleClose() {
    this.setState({open:false})
  }

  handleRegister = () =>   {
    this.props.addReg(this.state.event)
  }

  render() {
    const {language, breakpoints, currentBreakpoint} = this.props
    moment.locale(CULTURE(language), {week:{dow : 1}});
    const localizer=momentLocalizer(moment)
    const events = this.state.events.sort((a,b)=>moment(a.start) - moment(b.start)).map(it=>({...it, start:moment(it.start).toDate(), end:moment(it.end).toDate()}))

    return (
        <div style={styles.root}>
          <div style={styles.bar}>
            <Button
              size={this.state.calendarType===CALENDAR_TYPE.SOCIAL?'medium':'small'} 
              variant="outlined"
              onClick={() => {this.setState({events:[], calendarType:CALENDAR_TYPE.SOCIAL}); this.loadEvents(CALENDAR_TYPE.SOCIAL)}}>
                {TEXTS.DANCE[language]} 
             </Button>
            &nbsp;&nbsp; 
            <Button 
              size={this.state.calendarType===CALENDAR_TYPE.CLASSES?'medium':'small'} 
              variant="outlined"
              onClick={() => {this.setState({events:[], calendarType:CALENDAR_TYPE.CLASSES}); this.loadEvents(CALENDAR_TYPE.CLASSES)}}>
                {TEXTS.CLASSES[language]} 
            </Button>
          </div>
          {breakpoints[currentBreakpoint] <= breakpoints.mobile?
              <SmallCalendarView 
                  events={this.state.events} 
                  calendarType={this.state.calendarType} 
                  handleEvent={this.handleEvent} 
              />
            :
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date}
                onSelectEvent={this.handleEvent}
                eventPropGetter={(ev, start, end, isSelected) => (
                  {style:eventStyle(ev, isSelected, this.state.calendarType)})} 
                style={styles.calendar}
              />
           }
           <DialogSlide 
              open={this.state.open} 
              setOpen={open=>this.setState({open})} 
              event = {this.state.event}
           />
           <p/>
        </div>
    );
  }
}



const _Calendar = (props) => <_Calendars {...props} />
const mapStateToProps = (state) => {
  return {
      language: state.language,
  }
}    

export default connect(mapStateToProps)(withBreakpoints(_Calendar))
