import React from 'react';
import { connect } from 'react-redux'
import { withBreakpoints } from 'react-breakpoints'
import Weekdays from 'Settings/Weekdays';
import RegistrationButton from '../School/Registration/RegistrationButton'
import ExpandTextDialog from 'Components/ExpandTextDialog';
import tkColors from 'Settings/tkColors';

const ZOOM_URL = 'https://zoom.us/join'

let styles = {
    tr: {
        padding: 2,
        fontSize: 14,
        verticalAlign:'middle',
        borderBottom:'1px solid',
        borderColor:tkColors.border,
    },
    tdName: {
        verticalAlign:'middle',
        padding: 2,
        width:300,
        textAlign:'left',
    },
    td: {
        verticalAlign:'middle',
        padding: 2,
        textAlign:'centerleft',
    },
    tdPointer: {
        verticalAlign:'middle',
        minWidth:65,
        cursor:'pointer',

    },
    tdAnchor:{
        verticalAlign:'middle',
        textDecoration: 'underline', 
        cursor:'pointer',
    },
    tdDiamond: {
        verticalAlign:'middle',
        textDecoration:'none', 
        cursor:'pointer',
        color:'orange',
    }
};

const renderExpandedAddress = event => (
    event?
        <table>
            <tr>
                <td>{event.teachers?event.teachers:event.responsible?event.responsible:'Namngiven person saknas'}</td>
            </tr>       
            <tr>
                <td>{event.siteName}</td>
            </tr>    
            <tr>
                <td>{event.address}</td>
            </tr>    
            <tr>
                <td>{event.city}</td>
            </tr>    
        </table>  
    :
        <h4>event not defined</h4>    
)    

const _renderEventLarge = ({event, multiplePartners, checked, disabled, language, toggleProduct, handleWorkshopPartner}) => 
    <tr style={styles.tr}>
        <td><input type="checkbox" name={event.workshopId?event.workshopId:event.name} disabled={disabled} onClick={toggleProduct} /></td>    
        <td style={styles.tdName}>{event.name}{multiplePartners && checked?
                <>
                    <br/><input type="text" name={'firstNamePartner'} placeholder={'Partners first name'} required onChange={handleWorkshopPartner} />
                    &nbsp;<input type="text" name={'lastNamePartner'} placeholder={'Partners last name'} required onChange={handleWorkshopPartner} />
                    <br/><input type="email" name={'emailPartner'} placeholder={'Partners email'} required onChange={handleWorkshopPartner} />
                </>
            :null}</td>
        <td style={styles.td}>{event.startTime}</td>
        <td style={styles.tdAnchor}>
            <a href={event.urlLocation}>{event.city}</a>
        </td>
        <td style={styles.tdDiamond}>
            {event.online?event.online==1?<a href={ZOOM_URL}>&#9830;</a>:null:null} 
        </td>
        {/*<td style={styles.td}>{event.courseLength}</td>*/}
        <td style={styles.tdPointer}>
        <ExpandTextDialog
                shortText={disabled?'Workshop full':event.teachersShort?event.teachersShort:event.responsible?event.responsible:'N/A'}
                title={event.name + ' (' + event.city + ' ' + Weekdays[language][event.dayOfWeek-1] + ' ' + event.startTime + ')'}
                style={styles.tdPointer}
        >
            {renderExpandedAddress(event)}
        </ExpandTextDialog>     
        </td>            
    </tr>


const _renderEventSmall = ({event, multiplePartners, checked, disabled, language, toggleProduct, handleWorkshopPartner}) => 
    <tr style={styles.tr}>
        <td><input type="checkbox" name={event.workshopId?event.workshopId:event.name} disabled={disabled} onClick={toggleProduct} /></td>    
        <td style={styles.tdName}>{event.name}{multiplePartners && checked?
                <>
                    <br/><input type="text" name={'firstNamePartner'} placeholder={'Partners first name'} required onChange={handleWorkshopPartner} />
                   &nbsp;<input type="text" name={'lastNamePartner'} placeholder={'Partners last name'} required onChange={handleWorkshopPartner} />
                    <br/><input type="email" name={'emailPartner'} placeholder={'Partners email'} required onChange={handleWorkshopPartner} />
                </>
            :null}</td>
        <td style={styles.td}>{event.startTime}</td>
        <td style={styles.tdPointer}>
            <a href={event.urlLocation}>{event.city.substring(0,5)}</a>
        </td>
        <td style={styles.tdDiamond}>
            {event.online?event.online==1?<a href={ZOOM_URL}>&#9830;</a>:null:null}
        </td>
        <td style={styles.tdPointer}>
        <ExpandTextDialog
                shortText={disabled?'Workshop full':event.teachersShort?event.teachersShort:event.responsible?event.responsible:'N/A'}
                title={event.name + ' (' + event.city + ' ' + Weekdays[language][event.dayOfWeek-1] + ' ' + event.startTime + ')'}
                labelStyle={styles.tdPointer}
        >
            {renderExpandedAddress(event)}
        </ExpandTextDialog>     
        </td>            
    </tr>


const RenderEventRegLine = (props) => {
    const {breakpoints, currentBreakpoint} = props
    return(breakpoints[currentBreakpoint] < breakpoints.tablet?_renderEventSmall(props)
                                                               :_renderEventLarge(props))
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        style:state.style
    }
}    

export default  connect(mapStateToProps)(withBreakpoints(RenderEventRegLine));    
