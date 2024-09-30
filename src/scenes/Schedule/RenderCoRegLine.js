import React from 'react';
import Weekdays from 'Settings/Weekdays';
import RegistrationButton from '../School/Registration/RegistrationButton'
import ExpandTextDialog from 'Components/ExpandTextDialog';
import Tooltip from '@material-ui/core/Tooltip';
import {LANGUAGE_SV, LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'

const ZOOM_URL = 'https://zoom.us/join'

const renderExpandedAddress = course => (
    course?
        <table>
            <tr >
                <td>{course.teachers}</td>
            </tr>       
            <tr>
                <td>{course.siteName}</td>
            </tr>    
            <tr>
                <td>{course.address}</td>
            </tr>    
            <tr>
                <td>{course.city}</td>
            </tr>    
        </table>  
    :
        <h4>Course not defined</h4>    
)    

const DateTd = ({course, language}) => {
    const started = course.started?language==='SV'?'har startat':'has started':undefined
    const ended = course.ended?language==='SV'?'avslutad':'ended':undefined
    const style = {color:ended?'red':course.started?'orange':undefined}
    const dt = course.dayOfWeek?course.startDate:'' 
    return(
        <td style={style}>
            {
                ended?<small>{dt}<br/>{ended}</small>
                :started?<small>{dt}<br/>{started}</small>
                :dt
            }
        </td>
    )    
}

// RenderCoRegLine
export default ({course, color, language}) => {
    const range = course.startTime + '-' + course.endTime 
    const weekend = course.courseType === 'HK'
    const adjColor = course.started?color:color    
    const styles={
      tr:{color:adjColor},
      anchor:{
        verticalAlign:'middle',
        textDecoration: 'underline', 
        cursor:'pointer',
        padding:2,
        color:adjColor},
      button:{
        color:adjColor, 
        borderColor:adjColor
      },
      tdDiamond: {
        verticalAlign:'middle',
        textDecoration:'none',
        cursor:'pointer',
        color:'yellow',
      }, 
    }  

    return(
        <tr style={styles.tr}>
            {weekend?null:
                <>
                    <td>{weekend?' ':Weekdays[language][course.dayOfWeek-1]}</td>
                    <td>{weekend?' ':range}</td>
                </>
            }
            <Tooltip title={course.siteName + ', ' + course.address + ', ' + course.city}>
                <td>
                    <a style={styles.anchor} href={course.urlLocation} >{course.city?course.city:'   '}</a>
                    &nbsp;
                    {course.online==="1"?<a href={ZOOM_URL} style={styles.tdDiamond}>&#9830;</a>:null}
                </td>
            </Tooltip>
            <DateTd  course={course} language={language} />
            <Tooltip title={course.teachers}>
                <td>
                    <ExpandTextDialog
                            shortText={course.teachersShort}
                            title={course['name' + language] + ' (' + course.city + ' ' + Weekdays[language][course.dayOfWeek-1] + ' ' + course.startTime + ')'}
                            style={styles.tr}
                    >
                        {renderExpandedAddress(course)}
                    </ExpandTextDialog>     
                </td>  
            </Tooltip>
            <td><RegistrationButton style={styles.button} reg={course} /></td>          
        </tr>

    )
}


