import React from 'react';
import { connect } from 'react-redux'
import { withBreakpoints } from 'react-breakpoints'
import Weekdays from 'Settings/Weekdays';

const TEXTS = {
    price:{
        SV:'Pris',
        ES:'Precio',
        EN:'Price',
    },
    description:{
        SV:'Beskrivning',
        ES:'Información',
        EN:'Description',
    }
}

const styles = {
    tr: {
        verticalAlign:'top',
        padding: 5,
        fontSize: 18,
        textAlign:'center',
    },
    td: {
        verticalAlign:'top',
        padding: 7,
    },
};

const _renderHeaderSmall = (event, language, color) => 
<thead>
    <tr style={styles.tr}>
        <td colSpan={3} style={{...styles.td, color}}>
            {Weekdays[language][event.dayOfWeek-1].substring(0,3)}&nbsp;{event.startDate?event.startDate:''}  
        </td>
        <td colSpan={2} style={{...styles.td, color}}>{TEXTS.price[language] + ' ' + event.price + ' SEK'}</td>
    </tr>    
</thead>

const _renderHeaderLarge = (event, language, color) => 
<thead>
    <tr style={styles.tr}>
        <td colSpan={3} style={{...styles.td, color}}>
            {Weekdays[language][event.dayOfWeek-1]} &nbsp; {event.startDate?event.startDate:''}
        </td>
        <td colSpan={2} style={{...styles.td, color}}>{TEXTS.price[language] + ' ' + event.price + ' SEK'}</td>
    </tr>    
</thead>


const RenderHeader = ({breakpoints, currentBreakpoint, event, language, style} ) => {
    const color = style.color
    return(breakpoints[currentBreakpoint] < breakpoints.tablet?_renderHeaderSmall(event, language, color)
            :_renderHeaderLarge(event, language, color)
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        style: state.style,
    }
}    

export default connect(mapStateToProps)(withBreakpoints(RenderHeader));    
