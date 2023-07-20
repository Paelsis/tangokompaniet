import React from 'react';
import Weekdays from 'Settings/Weekdays';
import RegistrationButton from '../School/Registration/RegistrationButton'
import ExpandTextDialog from 'Components/ExpandTextDialog';

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
    },
    tdDiamond: {
        verticalAlign:'middle',
        textDecoration:'none',
        cursor:'pointer',
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

export const renderRegLine = (course, color, language) => {
    const range = course.startTime + ' - ' + course.endTime 
    const weekend = course.courseType === 'HK'
    const styleTr = {...styles.tr, color:course.started?'lightGreen':color}
    const styleAnchor = {...styles.tdAnchor, color:course.started?'lightGreen':color}
    return(
    <tr style={styleTr}>
        {weekend?null:
            <>
                <td>{weekend?' ':Weekdays[language][course.dayOfWeek-1]}</td>
                <td>{weekend?' ':range}</td>
            </>
        }
        <td>
            <a style={styleAnchor} href={course.urlLocation} >{course.city?course.city:'   '}</a>
            &nbsp;
            {course.online==="1"?<a href={ZOOM_URL} style={styles.tdDiamond}>&#9830;</a>:null}
        </td>
        <td>{course.dayOfWeek?course.startDate:''}</td>
        <td>
            <ExpandTextDialog
                    shortText={course.teachersShort}
                    title={course['name' + language] + ' (' + course.city + ' ' + Weekdays[language][course.dayOfWeek-1] + ' ' + course.startTime + ')'}
                    style={styleTr}
            >
                {renderExpandedAddress(course)}
            </ExpandTextDialog>     
        </td>  
        <td><RegistrationButton style={styleTr} reg={course} /></td>          
    </tr>
    )
}


