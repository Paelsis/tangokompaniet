import React, {useState} from 'react';
import { withBreakpoints } from 'react-breakpoints'
import { connect } from 'react-redux'
import tkColors from 'Settings/tkColors';
import { setScheduleList } from 'redux/actions/actionsSchedule'
import withListFromStore from 'Components/Table/withListFromStore';
import groupBy from 'functions/groupBy';
import CircularProgressTerminate from 'Components/CircularProgressTerminate'
import RenderSchema from './RenderSchema'
import RenderDesc from './RenderDesc'
import TextShow from 'Components/Text/TextShow'


const TEXTS = {
    NO_SCHEMA: {
        SV:'Kursschema är ännu ej inlagda på denna sida',
        EN:'Course schedule is not yet posted on this page',
        ES:'El horario del curso aún no está publicado en esta página',
    }
}


const styles = {
    root:{
        width:'100vw',
    },
    desc:{
        marginLeft:'auto', marginRight:'auto'
    },
    schema:{
        margin:'auto', marginRight:'auto',
    },
    text:{
        width:'80vw',
        fontSize:16,
        fontWeight:400,
        textAlign:'left',
        maxWidth:800,
        margin:'auto'
    }
};

/*
const RenderCourses = ({courses, language}) => {
    const list = courses.filter(it=>it.active !== '0').sort((a,b)=> a.dayOfWeek - b.dayOfWeek)
    return (
    <table className="table-schema" key={courses[0].courseId} style={styles.course(courses[0].courseType)}>
        <RenderCoHeader course = {courses[0]} language={language} handleClick={()=>this.handleDesc(courses[0].textId)}/>    
        <RenderCoRegHeader style={styles.regHeader} language = {language} weekend={courses[0].courseType === 'HK'?true:undefined}/>
        <tbody>
        {list.map(course => renderRegLine(course, 'white', language))}  
        </tbody>
    </table>   
    ) 
}
*/

// Render all courses for one scheduleId
/*
const RenderSchema = ({courses, withBorder, language, color}) => {
    //let courseNameMap = groupBy(courses.sort((a,b)=>a.sequenceNumber - b.sequenceNumber), it => it.name)
    //let courseNames = [...courseNameMap.keys()]
    let activeCourses=courses;
    let courseIdMap = groupBy(activeCourses.sort((a,b)=>a.sequenceNumber - b.sequenceNumber), it => it.courseId)
    let courseIds = Array.from(courseIdMap.keys())
    const eventName = activeCourses[0].eventName
    const year = activeCourses[0].year
    //let courses = this.coursesOfSchema(scheduleId); // Courses for one schema
    //let names = this.namesForCourses(courses.sort((a,b)=>a.sequenceNumber - b.sequenceNumber)); // Titles for one schema
    return (
        <div style={withBorder?styles.schedule:styles.scheduleNoBorder}> 
            <div>
                <ShoppingCartButton productType='course' iconColor={tkColors.Olive.Light} />
            </div>        
            <h1 style={{width:'100%', textAlign:'top',color, fontSize:24, fontStyle:'oblique', fontWeight:'bold'}}>{eventName}&nbsp;{year}</h1>    
            {courseIds.map(key =>
                <RenderCourses courses={courseIdMap.get(key)} language={language}/>
            )}
        </div>
    )
}
*/
const ScheduleCourse = props => {
    const {list, language, style, color, courseId} = props
    const [textId, setTextId] = useState()

    let schemaMap = groupBy(list.sort((a,b) => a.productId - b.productId), it => it.eventType+it.year)
    let scheduleIds = [...schemaMap.keys() ]
    const withBorder = scheduleIds.length > 1
    const adjStyle=style.globalBackground?{background:props.style.globalBackground}:styles.root
    return(
        <div style={styles.root}>
            {textId?
                <div style={styles.desc}>
                    <RenderDesc textId={textId} setTextId={setTextId} />
                </div>
            :    
                <div style={styles.schema}>
                    {courseId?
                        <TextShow url={'/getTexts'} style={styles.text} groupId={'Schema'} textId={courseId} language={language} />
                    :
                        null
                    }   
                    {list.length > 0?
                        scheduleIds.map(scheduleId =>  
                            <RenderSchema 
                                courses={schemaMap.get(scheduleId)} 
                                withBorder={withBorder} 
                                language={language} 
                                color={color}
                                courseId={courseId}
                                setTextId={id =>setTextId(id)}
                            />
                        )
                    :
                        <CircularProgressTerminate text={TEXTS.NO_SCHEMA[language]} />
                    }
                </div>
            }    
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: '',
        password: '',
        language: state.language,
        list: state.schedule.list,
        shoppingCartList: state.shoppingCart.list,
        style:state.style, 
        url:'/scheduleCourse?language=' + state.language,
    }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        setList: (list) => { dispatch(setScheduleList(list)) },
    }        
}

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
) (withListFromStore(withBreakpoints(ScheduleCourse), false));    
