import React from 'react';
import Weekdays from 'Settings/Weekdays';
import RegistrationButton from '../School/Registration/RegistrationButton'
import ExpandTextDialog from 'Components/ExpandTextDialog';
import {LANGUAGE_SV, LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'

const ZOOM_URL = 'https://zoom.us/join'

let styles = {
    tr: {
        padding: 2,
        verticalAlign:'middle',
    },
    td: {
        padding: 2,
        verticalAlign:'middle',
        minWidth:5,
    },
    tdAnchor:{
        verticalAlign:'middle',
        textDecoration: 'underline', 
        cursor:'pointer',
        padding:2,
    },
    tdDiamond: {
        verticalAlign:'middle',
        textDecoration:'none',
        cursor:'pointer',
        color:'yellow',
    }, 
    started:{
        color:'yellow',
    },
    button: {
        fontSize:'small'
    }
};

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
    const style = {...styles.td, color:ended?'red':course.started?'orange':undefined}
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

export const renderRegLine = (course, color, language) => {
    const range = course.startTime + ' - ' + course.endTime 
    const weekend = course.courseType === 'HK'
    const adjColor = course.started?color:color    
    const style={
      tr:{...styles.tr, color:adjColor},
      anchor:{...styles.tdAnchor, color:adjColor},
      button:{...styles.td, color:adjColor, borderColor:adjColor},
    }  

    return(
    <tr style={style.tr}>
        {weekend?null:
            <>
                <td>{weekend?' ':Weekdays[language][course.dayOfWeek-1]}</td>
                <td>{weekend?' ':range}</td>
            </>
        }
        <td>
            <a style={style.anchor} href={course.urlLocation} >{course.city?course.city:'   '}</a>
            &nbsp;
            {course.online==="1"?<a href={ZOOM_URL} style={styles.tdDiamond}>&#9830;</a>:null}
        </td>
        <DateTd  course={course} language={language} />
        <td>
            <ExpandTextDialog
                    shortText={course.teachersShort}
                    title={course['name' + language] + ' (' + course.city + ' ' + Weekdays[language][course.dayOfWeek-1] + ' ' + course.startTime + ')'}
                    style={style.tr}
            >
                {renderExpandedAddress(course)}
            </ExpandTextDialog>     
        </td>  
        <td><RegistrationButton style={style.button} reg={course} /></td>          
    </tr>
    )
}


