import React, {Component} from 'react';
import {connect } from 'react-redux'
import {getEvents} from './getEvents'
import {tkColors} from 'Settings/tkColors'
import pink from '@material-ui/core/colors/pink'
//import moment from 'moment';
import moment from 'moment-with-locales-es6'
import {CALENDAR} from 'Settings/config'
import {LANGUAGE_SV, LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'
import Marquee from 'react-smooth-marquee';

const highlight = pink[100];

const TEXTS = {
    button:{
        SV:'Info',
        ES:'Info',
        EN:'Info',
    },
    GO_BACK:{
        SV:'Stäng',
        ES:'Cerrer',
        EN:'Close',
    },
    DANCE:{
        SV:'Dansa',
        ES:'Bailar',
        EN:'Dance',
    },
    CLASSES:{
        SV:'Lektioner',
        ES:'Clases',
        EN:'Classes',
    },
    UPCOMING_TODAY:{
        SV:'I dag',
        ES:'Hoy',
        EN:'Today',
    },
    NOTHING_TODAY:{
        SV:'Ingen milonga eller praktika idag',
        ES:'No hay milonga o praktika hoy',
        EN:'No milonga or praktika today',
    },
    NEXT_EVENT:{
        SV:'Nästa danstillfälle',
        ES:'Next event',
        EN:'Next event',
    },
    THIS_WEEKS_EVENTS:{
        SV:'Kommande veckas dans',
        ES:'Sesiones de baile en una semana ...',
        EN:'Dance within one week ...',
    },
    PREREG_INFO:{
        SV:'Föranmälan göres genom att klicka på eventet i kalendern',
        ES:'La preinscripción se realiza en el calendario',
        EN:'Pre-registration is made in the calendar',
    },
    CLOSE:{
        SV:'Stäng',
        ES:'Cersa',
        EN:'Close',
    }
}



let styles = {
    root:active=>({
        position:'relative',
        overflowX: 'auto',
        opacity:active?1:0,
        transition: '1500ms all ease',
    }),
    ongoing: {
        padding:1, margin:1,
        color:tkColors.Purple.Dark, 
    },
    upcoming: {
        padding:0, margin:0,
        opacity:0.7,
    },
    button: {
        border: "1px solid grey", 
        padding:2, 
        opacity:0.7, 
        size:'small', 
        color:'grey'
    }

};

const _useSingleDay = (currentBreakpoint, breakpoints) => (
    breakpoints[currentBreakpoint] <= breakpoints.mobile?false
   :breakpoints[currentBreakpoint] <= breakpoints.mobileLandscape?true
   :breakpoints[currentBreakpoint] <= breakpoints.tablet?false
   :breakpoints[currentBreakpoint] <= breakpoints.tabletLandscape?true
   :breakpoints[currentBreakpoint] <= breakpoints.desktop?false
   :breakpoints[currentBreakpoint] <= breakpoints.desktopLarge?false
   :breakpoints[currentBreakpoint] <= breakpoints.desktopWide?false
   :false
)


/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontSize:'small',
            events:[],
            active:false,
            clicked:false,
            preRegister:false,
        };
        this.renderEvents = this.renderEvents.bind(this);
    }

    loadEvents(cal, ndays, language) {
        // Milongas or practicas during within current day
        const dateTimeStart = moment().startOf('day')
        const dateTimeEnd = moment().endOf('day').add(ndays, 'days')


        try {
            getEvents(
                cal.calendarId,
                cal.apiKey,
                (events) => {this.setState({events, active:true, clicked:ndays>0?true:false, preRegister:events.find(it => it.useRegistrationButton)?true:undefined})},
                dateTimeStart.format('YYYY-MM-DD') + 'T00:00:00Z', 
                dateTimeEnd.format('YYYY-MM-DD') + 'T23:59:00Z',
                language,
            );
        } catch(e) {                                
            this.setState({events:[], active:true})
            let errMessage = 'ERROR:' + e.message 
            console.log(errMessage);
        }    
    }    



    // invoked immediately after a component is mounted
    componentDidMount () {
        if (this.props.fontSize) {
            this.setState({fontSize:this.props.fontSize})
        }   
        this.loadEvents(CALENDAR.SOCIAL, 30, this.props.language)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.language !== nextProps.language)  {
            this.loadEvents(CALENDAR.SOCIAL, 30, nextProps.language)
        } 
    }

    renderUpcomingWeek() {
        return(
            this.props.noButton !== undefined?
                null
            :this.state.clicked === true?            
                <>                   
                    <p/>
                    {this.state.preRegister?
                        <p style={{padding:5, margin:5, fontSize:this.state.fontSize}}>
                            {TEXTS.PREREG_INFO[this.props.language]}
                        </p>
                    :
                        <p/>
                    }
                    <button 
                        className="button" 
                        style={styles.button}
                        onClick={()=>this.loadEvents(CALENDAR.SOCIAL, 0, this.props.languate)}>
                            {TEXTS.CLOSE[this.props.language]}
                    </button>
                </>
            :        
                <button 
                    className="button" 
                    style={styles.button}
                    onClick={()=>this.loadEvents(CALENDAR.SOCIAL, 6, this.props.language)}>
                        {TEXTS.THIS_WEEKS_EVENTS[this.props.language]}
                </button>
        )
    }

    renderSingleEvent (event) {
        return(
            <div style={{margin:7}}>
                {
                    moment() < event.mstart ? // Has not started yet
                        <div>
                            <p style={{...styles.upcoming, fontSize:this.state.fontSize}}>{event.calendar + ' - ' + event.calendarEndTime + ' ' + event.location}</p>
                            <p style={{...styles.upcoming, fontSize:this.state.fontSize}}>{event.title}</p>
                        </div>    
                    :moment() <= moment(event.mend) ? // Has started, but not ended yet
                        <Marquee>
                            <p style={styles.ongoing}>{event.timeRangeWithDay + ' ' + event.location}</p>
                            <p style={styles.ongoing}>{event.title}</p>
                        </Marquee>
                    :null  // Has ended    
                }
            </div>
        )
    }

    renderEvents () {
        return(
            <div>
                {this.state.events.length >0?
                    this.state.events.map((event, index) =>
                        <div key={index} style={{margin:7}}>
                            {this.renderSingleEvent(event)}
                        </div>
                    )
                :        
                    <p>
                        {TEXTS.NOTHING_TODAY[this.props.language]}
                    </p>        
                }

                {this.renderUpcomingWeek()}

            </div>
        )
    }    

    renderNextEvent () {
        const nextEvent = this.state.events.length >0?this.state.events.find(it => moment() < it.mend):undefined
        return(
            <div>
                {nextEvent?
                    <p>
                        <h1 style={{opacity:0.7}}>{TEXTS.NEXT_EVENT[this.props.language]}</h1>
                        {this.renderSingleEvent(nextEvent)}
                    </p>
                :        
                    null
                }
            </div>
        )
    }    

    render() {
        const style = {...styles.root(this.state.active), ...this.props.style?this.props.style:{}, transform:undefined}
        return (
            <div style={style} >  
                {this.renderNextEvent()}
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        language: state.language,
    }
}    

export default connect(mapStateToProps)(Calendar)
