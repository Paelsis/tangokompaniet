import React from 'react';
import RenderCourses from './RenderCourses'
import tkColors from 'Settings/tkColors';
import groupBy from 'functions/groupBy';
import ShoppingCartButton from 'scenes/Shop/ShoppingCartButton';


const background = courseType => {
        switch (courseType) {
            case 'GK':return 'linear-gradient(45deg, #81185B 0%,  #330a41 100%)'
            case 'FK':return 'linear-gradient(45deg, #81185B 0%,  #330a41 100%)'
            case 'HK':return 'linear-gradient(45deg, blue 0%,  #330a41 100%)'
            case 'TE':return 'linear-gradient(45deg, red 0%,  #330a41 100%)'
            case 'XX':return 'linear-gradient(45deg, orange 0%,  #330a41 100%)'
        }    
    }
    
const boxColor = courseType => {
        switch (courseType) {
                case 'GK':return '#81185B'
                case 'FK':return '#81185B'
                case 'HK':return 'blue'
                case 'TE':return 'red'
                case 'XX':return 'orange'
        }    
}

/*
<div>
<ShoppingCartButton productType='course' iconColor={tkColors.Olive.Light} />
</div>        
*/

const styles = {
        header:color=>({
            margin:'auto', 
            textAlign:'top',
            color, 
            fontSize:24, 
            // fontStyle:'oblique', 
            fontWeight:500, 
        }),
        scheduleNoBorder:{
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',    
        },
        schedule:{
            background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 50%)',
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            //alighItems:'top',    
            width:'100%',
        
            //marginTop:20,
            //marginBottom:40,
            border:'1px solid',
            borderRadius:16,
            color:tkColors.Purple.Light,
            borderColor:tkColors.Purple.Light,
            boxShadow:'0 13px 27px -5px ' + tkColors.Purple.Light,
            margin:'auto'
        },
};
    

// RenderSchema
export default ({courses, courseId, withBorder, language, color, setTextId}) => {
        //let courseNameMap = groupBy(courses.sort((a,b)=>a.sequenceNumber - b.sequenceNumber), it => it.name)
        //let courseNames = [...courseNameMap.keys()]
        let activeCourses=courses;

        let courseIdMap = groupBy(activeCourses.filter(it=>courseId?it.courseId.includes(courseId):true).sort((a,b)=>a.sequenceNumber - b.sequenceNumber), it => it.courseId)
        let courseIds = Array.from(courseIdMap.keys())
        const eventName = activeCourses[0].eventName
        const year = activeCourses[0].year
        //let courses = this.coursesOfSchema(scheduleId); // Courses for one schema
        //let names = this.namesForCourses(courses.sort((a,b)=>a.sequenceNumber - b.sequenceNumber)); // Titles for one schema
        return (
            <>
            <div style={styles.header(color)}>
                <h1 style={{fontWeight:300, textAlign:'center'}}>{eventName}&nbsp;{year}</h1>    
            </div>
            <div style={withBorder?styles.schedule:styles.scheduleNoBorder}> 
                {courseIds.map(key =>
                    <RenderCourses courses={courseIdMap.get(key)} language={language} setTextId={setTextId} />
                )}
            </div>
            </>
        )
}
    