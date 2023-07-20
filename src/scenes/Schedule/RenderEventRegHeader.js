import React from 'react';
import { connect } from 'react-redux'
import Weekdays from 'Settings/Weekdays';
import { light } from '@material-ui/core/styles/createPalette';

const TEXTS = {
    price:{SV:'Pris', EN:'Price', ES:'Precio'},
    description:{SV:'Beskrivning', EN:'Description', ES:'Información'},
    NAME:{SV:'Workshop', EN: 'Workshop', ES:'Taller'},
    TIME:{SV:'Startid', EN: 'Start time', ES:'Hora de inicio'},
    CITY:{SV:'Stad', EN: 'City', ES:'Ciudad'},
    ONLINE:{SV:'ONL', EN: 'ONL', ES:'ONL'},
    RESPONSIBLE:{SV:'Lärare', EN: 'Teacher', ES:'Profesor'},
    REGISTER:{SV:'Välj', EN: 'Select', ES:'Marca'},
}

const styles = {
    tr: {
        verticalAlign:'center',
        fontSize: 'small',
        fontWeight:'100',
    },
    thin: {
        verticalAlign:'center',
        fontSize: 'small',
        fontWeight:'300',
    },
    normal: {
        verticalAlign:'center',
        fontSize: 'small',
        fontWeight:'400',
    },
    thick: {
        verticalAlign:'center',
        fontSize: 'small',
    },
};



const _renderHeader = (nm, startDate, dayOfWeek, color, language) => {
    return(
    <thead>
        <tr>
            <th colSpan={5} style={{...styles.thick, color}}>
                {startDate?startDate:''}  
            </th>
        </tr>    
        <tr style={styles.tr}>
            <th style={styles.thin}>{TEXTS.REGISTER[language]}</th>
            <th style={styles.thin}>{TEXTS.NAME[language]}</th>
            <th style={styles.thin}>{TEXTS.TIME[language]}</th>
            <th style={styles.thin}>{TEXTS.CITY[language]}</th>
            <th style={styles.thin}>{TEXTS.ONLINE[language]}</th>
            <th style={styles.thin}>{TEXTS.RESPONSIBLE[language]}</th>
        </tr>
    </thead>    
    )    
}     

const RenderEventHeader = ({language, name, startDate, dayOfWeek,  style}) => {
    return(_renderHeader(name, startDate, dayOfWeek, style.color, language));
}

const mapStateToProps = (state) => {
    return {
        style: state.style,
    }
}    

export default connect(mapStateToProps)(RenderEventHeader);    
