import React from 'react';
import { withBreakpoints } from 'react-breakpoints'
import {CourseLength} from 'Settings/Weekdays'
import Button from 'Components/Button';
import tkColors from 'Settings/tkColors'

const TEXT_COLOR = tkColors.background

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
    tr: {
        height:20,
        textAlign:'center',
        fontSize:18,
        padding: 7,
    },
    trSubtext: {
        height:20,
        textAlign:'center',
        fontSize:18,
        padding: 7,
    },
    th: {
        padding:5, 
        fontWeight:400,
        color:TEXT_COLOR,
    },
    thSubtext: {
        height:20,
        textAlign:'center',
        fontSize:16,
        verticalAlign:'top',
        padding: 7,
        color:TEXT_COLOR,
    },
    tiny:{
        color:'yellow',
        fontSize:10,
    },
    button:{
        color:tkColors.background,
        border:"1px solid " + tkColors.background,
        borderColor:tkColors.background
    }
};

const infoButton = (course, language, handleClick) =>
    <td colSpan={1} style={{textAlign:'center'}}>
        {handleClick!==undefined?
            <Button size='small' variant='outlined' style={styles.button} onClick={()=>handleClick(course.textId)}>{TEXTS.infoButton[language]}</Button>
            :null
        }    
    </td>   

const _renderHeaderSmall = (course, handleClick, language) => 
<thead>
    <tr style={styles.tr}>
        <th colSpan={5} style={styles.th}>
            {course['name' + language]}&nbsp;
            <small style={styles.tiny}>{['GK', 'FK', 'HK', 'TE'].includes(course.courseType)?'':'Unknown course type ' + course.courseType}</small>
        </th>
        {infoButton(course, language, handleClick) }
    </tr>    
    <tr style={styles.trSubtext}>
        <th colSpan={2} style={styles.th}>
            {TEXTS.price[language]}&nbsp;{course.price}&nbsp;{'SEK'} 
        </th>
        <th colSpan={3} style={styles.th}>
            {TEXTS.length[language]}:{course['courseLength' + language]?course['courseLength' + language]:null}
        </th>
        <th/>
    </tr>    
</thead>

const _renderHeaderLarge = (course, handleClick, language) => 
<thead>
    <tr style={styles.tr}>
        <th colSpan={5} style={styles.th}>
            {course['name' + language]} &nbsp;
            <small style={styles.tiny}>{['GK', 'FK', 'HK', 'TE'].includes(course.courseType)?'':'Unknown course type ' + course.courseType}</small>
        </th>
        {infoButton(course, language, handleClick) }
    </tr>    
    <tr style={styles.trSubtext}>
        <th colSpan={2} style={styles.th}>
            {TEXTS.price[language]}&nbsp;{course.price?course.price:''}&nbsp;{'SEK'} 
        </th>
        <th colSpan={3} style={styles.th}>
            {TEXTS.length[language]}:{course['courseLength' + language]?course['courseLength' + language]:null}
        </th>
    </tr>    
</thead>


const RenderCoHeader = props => {
    const {breakpoints, currentBreakpoint, course, language, handleClick} = props;
    return(breakpoints[currentBreakpoint] < breakpoints.tablet?_renderHeaderSmall(course, handleClick, language):_renderHeaderLarge(course, handleClick, language));
}

export default withBreakpoints(RenderCoHeader)
