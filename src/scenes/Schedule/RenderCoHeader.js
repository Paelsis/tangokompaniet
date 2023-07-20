import React from 'react';
import { withBreakpoints } from 'react-breakpoints'
import {CourseLength} from 'Settings/Weekdays'
import Button from 'Components/Button';
import tkColors from 'Settings/tkColors'

const TEXTS = {
    length:{
        SV:'Längd',
        EN:'Length',
        ES:'Duración',
    },
    price:{
        SV:'Pris',
        EN:'Price',
        ES:'Precio',
    },
    infoButton:{
        SV:'Info',
        EN:'Desc',
        ES:'Info',
    }
}

const styles = {
    root:{
        fontSize:14,
        textAlign:'center',
    },
    divCourse:{
        border:'0.01px solid',
        marginBottom:30,
    },
    table: {
        paddingTop:10,
    },
    tbody: {
     //   border:2, 
     //   cellpadding:20,
    },
    tdTitle: {
        padding:5, 
    },
    th: {
        paddingLeft: 7,
        paddingRight: 7,
        height:12,
        fontSize:12,
        fontWeight: 'lighter',
    },
    td: {
        verticalAlign:'top',
        padding: 7,
        minWidth:28,
    },
    trTitle: {
        height:20,
        textAlign:'center',
        fontSize:20,
        padding: 7,
    },
    trTitleSubtext: {
        height:20,
        textAlign:'center',
        fontSize:16,
        verticalAlign:'top',
        padding: 7,
    },
    tr: {
        height:20,
        verticalAlign:'top',
        padding: 5,
    },
    button:{
        color:tkColors.background,
        border:"1px solid " + tkColors.background,
        borderColor:tkColors.background
    }
};

const descButton = (course, language, handleClick) =>
    <td colSpan={1} style={{textAlign:'center'}}>
        {handleClick!==undefined?
            <Button size='small' variant='outlined' style={styles.button} onClick={()=>handleClick(course.textId)}>{TEXTS.infoButton[language]}</Button>
            :null
        }    
    </td>   

const _renderHeaderSmall = (course, handleClick, language) => 
<tbody>
    <tr style={styles.trTitle}>
        <td colSpan={5} style={styles.tdTitle}>
            {course['name' + language]} 
        </td>
        {descButton(course, language, handleClick) }
    </tr>    
    <tr style={styles.trTitleSubtext}>
        <td colSpan={3} style={styles.tdTitle}>
            {TEXTS.price[language]}&nbsp;{course.price}&nbsp;{'SEK'} 
        </td>
        <td colSpan={3} style={styles.tdTitle}>
            {TEXTS.length[language]}:{course['courseLength' + language]?course['courseLength' + language]:null}
        </td>
    </tr>    
</tbody>

const _renderHeaderLarge = (course, handleClick, language) => 
<tbody>
    <tr style={styles.trTitle}>
        <td colSpan={5} style={styles.tdTitle}>
            {course['name' + language]} 
        </td>
        {descButton(course, language, handleClick) }
    </tr>    
    <tr style={styles.trTitleSubtext}>
        <td colSpan={3} style={styles.tdTitleSubtext}>
            {TEXTS.price[language]}&nbsp;{course.price?course.price:''}&nbsp;{'SEK'} 
        </td>
        <td colSpan={3} style={styles.tdTitleSubtext}>
            {TEXTS.length[language]}:{course['courseLength' + language]?course['courseLength' + language]:null}
        </td>
    </tr>    
</tbody>


const RenderCoHeader = props => {
    const {breakpoints, currentBreakpoint, course, language, handleClick} = props;
    return(breakpoints[currentBreakpoint] < breakpoints.tablet?_renderHeaderSmall(course, handleClick, language):_renderHeaderLarge(course, handleClick, language));
}

export default withBreakpoints(RenderCoHeader)
