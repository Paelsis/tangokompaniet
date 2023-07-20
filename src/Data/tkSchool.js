const COURSE_TYPE_BASIC=1
const COURSE_TYPE_CONTINUE=2
const COURSE_TYPE_TEMA=3

export const tkCourses = [
{
    type: COURSE_TYPE_BASIC,
    name:'Grundkurs 1',
    days:[ 
            { 
                day:'Söndag',
                city:'Malmö',
                time:'16:00',
                start:'4/6',
                length:'4v 7v',
                teacher:'D&A',
            },
            { 
                day:'Söndag',
                city:'Malmö',
                time:'16:00',
                start:'5/2',
                length:'',
                teacher:'A',
            },
            { 
                day:'Måndag',
                city:'Malmö',
                time:'20:00',
                start:'6/3',
                length:'7v',
                teacher:'T&N',
            },
            { 
                day:'Måndag',
                city:'Lund',
                time:'17:30',
                start:'6/2',
                length:'7v',
                teacher:'A',
            },
            { 
                day:'Tisdag',
                city:'Lund',
                time:'16:00',
                start:'4/6',
                length:'4v 7v',
                teacher:'S&C',
            },
            { 
                day:'Onsdag',
                city:'Malmö',
                time:'16:00',
                start:'4/6',
                length:'4v 7v',
                teacher:'D&A',
            },
        ],
    },                
    {
        type: COURSE_TYPE_CONTINUE,
        name:'Tango Tools',
        days:[ 
                { 
                    day:'Varannan Söndag',
                    city:'Malmö',
                    time:'16:00',
                    start:'4/6',
                    length:'4v 7v',
                    teacher:'D&A',
                }
            ],
    },        
    {
        type: COURSE_TYPE_CONTINUE,
        name:'Steg & Dansglädje',
        days:[ 
                { 
                    day:'Måndag',
                    city:'Lund',
                    time:'19:00',
                    start:'23/1',
                    length:'19v',
                    teacher:'A',
                },
                { 
                    day:'Torsdag',
                    city:'Malmö',
                    time:'20:30',
                    start:'26/1',
                    length:'19v',
                    teacher:'A',
                },
        ]    
    },        
    {
        type: COURSE_TYPE_CONTINUE,
        name:'Kram & Hållning',
        days:[ 
                { 
                    day:'Onsdag',
                    city:'Malmö',
                    time:'17:40',
                    start:'23/1',
                    length:'19v',
                    teacher:'A',
                },
        ]        
    },        
    {
        type: COURSE_TYPE_CONTINUE,
        name:'Dynamik',
        days:[ 
                { 
                    day:'Måndag',
                    city:'Lund',
                    time:'20:30',
                    start:'23/1',
                    length:'19v',
                    teacher:'D&A',
                },
        ]        
    },        
    {
        type: COURSE_TYPE_CONTINUE,
        name:'Dynamik på Djupet',
        days:[ 
                { 
                    day:'Torsdag',
                    city:'Malmö',
                    time:'19:00',
                    start:'26/1',
                    length:'19v',
                    teacher:'D&A',
                },
        ]        
    }, 
    {
        type: COURSE_TYPE_TEMA,
        name:'Följarteknik',
        days:[ 
                { 
                    day:'Onsdag',
                    city:'Malmö',
                    time:'19:00',
                    start:'26/1',
                    length:'Always',
                    teacher:'D&A',
                },
        ]        
    },        
 ]        




