import React, {Component} from 'react';
import {connect } from 'react-redux'
import Dialog  from 'material-ui/Dialog';
import {getEvents} from './getEvents'
import {tkColors} from 'Settings/tkColors'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
//import moment from 'moment';
import moment from 'moment-with-locales-es6'
import {CALENDAR} from 'Settings/config'



import {LANGUAGE_SV, LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'

const CULTURE = (language) => language===LANGUAGE_SV?'sv':language===LANGUAGE_ES?'es':'en'
const highlight = pink[100];

const TEXTS = {
    ONGOING_TODAY:{
        SV:'Pågår just nu',
        ES:'Pasando ahora',
        EN:'Going on right now',
    },
    ENDED_TODAY:{
        SV:'Slutade klockan',
        ES:'Terminó',
        EN:'Ended at',
    },
}

let styles = {
    root:length =>({
        position:'relative',
        overflowX: 'auto',
        color:tkColors.Purple.Dark,
        opacity:length > 0?1:0,
        transition: '1000ms all ease',
    }),
    table:{
        borderCollapse: 'collapse',
    }, 
    thead:{
        border:'1px solid purple',
    },
    tbody:{
        border:'1px solid purple',
        borderCollapse: 'collapse',
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
            name:undefined,
        };
        this.onClick = this.onClick.bind(this);
        this.renderEvents = this.renderEvents.bind(this);
    }

    loadEvents(cal) {
        moment.locale(CULTURE(this.props.language))
        const timeMin = moment().startOf('day')
        const timeMax = moment().endOf('day').add(7, 'days')
        try {
            getEvents(
                cal.calendarId,
                cal.apiKey,
                (events) => {this.setState({events, name:cal.name})},
                timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
                timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
                this.props.language,
            );
        } catch(e) {                                
            this.setState({events:[]})
            let errMessage = 'ERROR:' + e.message 
            console.log(errMessage);
        }    
    }    

    // invoked immediately after a component is mounted
    componentDidMount () {
        this.loadEvents(CALENDAR.SOCIAL)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.language !== nextProps.language)  {
            moment.locale(CULTURE(nextProps.language));
        } 
    }

    onClick() {
        this.setState({fontSize: this.state.fontSize==='small'?'large':'small'})
    }

    renderEvents () {

        return(
            this.state.events.length > 0?
                <tab style={styles.table}>
                    <thead style={styles.thead}> 
                        <th>Dag</th>
                        <th>Tid</th>
                        <th>Titel</th>
                        <th>Plats</th>
                    </thead>
                    <tbody style={styles.tbody}>
                        {this.state.events.map(event =>
                            <tr style={{padding:'1px'}}>
                                <td>{moment(event.start).format('dddd').toUpperCase().charAt(0) + moment(event.start).format('dddd').slice(1,3) + ' ' +  moment(event.start).format('D/M')} </td>
                                <td style={{borderRight:'1px solid purple', padding:'2px'}}>
                                    {
                                        moment() < moment(event.start)?moment(event.start).format('HH:mm') + '-' + moment(event.end).format('HH:mm')
                                        :moment() >= moment(event.end)?TEXTS.ENDED_TODAY[this.props.language]  + ' ' + moment(event.end).format('HH:mm')
                                        :TEXTS.ONGOING_TODAY[this.props.language]  + ' ' + moment(event.start).format('HH:mm') + '-' + moment(event.end).format('HH:mm')
                                    }   
                                </td>
                                <td style={{borderRight:'1px solid purple'}}>{event.title}</td>
                                <td>{event.location}</td>
                            </tr>        
                        )}    
                    </tbody>    
                </tab>
            :null

        )    
    }    

    render() {
        const style = {...styles.root(this.state.events.length), ...this.props.style?this.props.style:{}, transform:undefined}
        return (
            <div style={style} >  
                {this.renderEvents()}
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
