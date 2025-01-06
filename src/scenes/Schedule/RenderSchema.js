import React from 'react';
import RenderCourses from './RenderCourses'
import tkColors from 'Settings/tkColors';
import groupBy from 'functions/groupBy';

const background = courseType => {
        switch (courseType) {
            case 'GK':return 'linear-gradient(45deg, #81185B 0%,  #330a41 100%)'
            case 'FK':return 'linear-gradient(45deg, #81185B 0%,  #330a41 100%)'
            case 'HK':return 'linear-gradient(45deg, blue 0%,  #330a41 100%)'
            case 'TE':return 'linear-gradient(45deg, red 0%,  #330a41 100%)'
            case 'XX':return 'linear-gradient(45deg, orange 0%,  #330a41 100%)'
            default:return 'black'
        }    
    }
    
const boxColor = courseType => {
        switch (courseType) {
                case 'GK':return '#81185B'
                case 'FK':return '#81185B'
                case 'HK':return 'blue'
                case 'TE':return 'red'
                case 'XX':return 'orange'
                default:return 'pink'
        }    
}

/*
<div>
<ShoppingCartButton productType='course' iconColor={tkColors.Olive.Light} />
</div>        
*/

const styles = {
        header:color=>({
            color, 
            // fontStyle:'oblique', 
            padding:50,
            textAlign:'center'
        }),
        h1:{
            fontSize:36, 
            fontWeight:900, 
            color:'grey'
        },
        th:{        
            textAlign:'center',
            color:'white',
            verticalAlign:'bottom',
            padding:2,
            minWidth:28,
            fontSize:12,
        },
        scheduleNoBorder:{
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',    
        },
        schedule:{
            background: 'whiteSmoke',
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            //alighItems:'top',    
            width:'98vw',
        
            //marginTop:20,
            //marginBottom:40,
            border:'1px solid',
            borderRadius:16,
            color:tkColors.Purple.Light,
            borderColor:tkColors.Purple.Light,
            // boxShadow:'0 13px 27px -5px ' + tkColors.Purple.Light,
            margin:50,
            margin:'auto'
        },
};
    

// RenderSchema
const RenderSchema = ({courses, isBeginner, withBorder, language, color, setTextId}) => {
        //let courseNameMap = groupBy(courses.sort((a,b)=>a.sequenceNumber - b.sequenceNumber), it => it.name)
        //let courseNames = [...courseNameMap.keys()]

        let courseIdMap = groupBy(courses.filter(it=>isBeginner?it.isBeginner:true).sort((a,b)=>a.sequenceNumber - b.sequenceNumber), it => it.courseId)
        let courseIds = Array.from(courseIdMap.keys())
        const eventName = courses[0].eventName
        const year = courses[0].year
        return (
            <div>
                <div style={styles.header(color)}>
                    <h1 style={styles.h1}>{eventName}&nbsp;{year}</h1>    
                </div>
                <div style={withBorder?styles.schedule:styles.scheduleNoBorder}> 
                    {courseIds.map(key =>
                    <RenderCourses courses={courseIdMap.get(key)} language={language} setTextId={setTextId} style={styles.th} />
                    )}
                </div>
            </div>
        )
}

export default RenderSchema
    