import React from 'react';
import withRouter from 'functions/withRouter'
import { withBreakpoints } from 'react-breakpoints'
import { connect } from 'react-redux'
//import Button from 'Components/Button'
import withRecords from 'Components/Table/withRecords'
import { tkColors } from 'Settings/tkColors'
import groupBy from 'functions/groupBy'
import { COURSE_TYPE } from 'Settings/Const'
import ScheduleSingleCourse from 'scenes/Schedule/ScheduleSingleCourse';
import TextShow from 'Components/Text/TextShow'
import config from 'Settings/config';
const imageUrl = config[process.env.NODE_ENV].apiBaseUrl + '/images/show/'
const img = imageUrl + 'DanielAnnaShow.png'


const TEXTS = {
    PRICE: {
        SV: 'Pris',
        EN: 'Price',
        ES: 'Preso',
    },
    COURSE: {
        SV: 'Kursnamn',
        EN: 'Name of course',
        ES: 'Nombre de curso',
    },
    COURSES: {
        SV: 'Kurser',
        EN: 'Courses',
        ES: 'Cursos',
    },
    GENERAL_INFO: {
        SV: 'Allmän info',
        EN: 'General info',
        ES: 'Información',
    },
    LENGTH: {
        SV: 'Längd',
        EN: 'Length',
        ES: 'Duración',
    },
}




// This component takles 2 props (groupId and TextId) and will return ta lists of the textBody from tbl_text in the database 
// Get the state from the Map the props that you want to pass to the State

const styles = {
    container: {
        display: 'flex',
        flexFlow:'row',
        alignItems: 'stretchflex-start',
        justivyContent:'space-between',
        textAlign: 'left',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1200,
    },
    menu: {
        display:'block',
        width:150,
        marginTop: '2%',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: '2%',
        textAlign:'center',
    },
    body: {
    },

    groupItem: open => ({
        width:'100%',
        padding: 4,
        marginTop: 2,
        marginBottom: 2,
        textAlign: 'center',
        fontSize: 12,
        border: '1px solid',
        background: open ? 'transparent' : 'linear-gradient(135deg, #2A6267 0%, #779540 100%)',
        color: open ? '#779540' : tkColors.background,
        borderColor: open ? '#779540' : 'transparent',
        cursor: 'pointer',
    }),
    courseItem: open => ({
        width: '92%',
        padding: 2,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 2,
        marginBottom: 2,
        textAlign: 'center',
        border: '1px solid',
        background: open ? 'transparent' : '#779540',
        color: open ? '#779540' : tkColors.background,
        borderColor: open ? '#779540' : 'transparent',
        borderRadius: 12,
        fontSize: 12,
        cursor: 'pointer',
    }),
    course: {
        clear: 'both',
        maxWidth: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 2,
        // border: '5px solid green',
        textAlign: 'left',

    },
    courseText: {
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        // border:'5px solid red',
    },
    schedule: {
        marginRight: 'auto',
        marginLeft: 'auto',
        // border: '5px solid orange',
    },
    header: {
        width: '100%',
        textAlign: 'center',
    },
    generalInfo: {
        width: '100%',
        textAlign: 'center'
    }
};

class Course extends React.Component {
    constructor() {
        super();
        this.state = { openCourseId: undefined, openCourseType: undefined };
        this.setOpenCourseType = this.setOpenCourseType.bind(this);
        this.setOpenCourseId = this.setOpenCourseId.bind(this);
        this.goBackToMenu = this.goBackToMenu.bind(this);
    }

    isValidCourseId(courseId) {
        return this.props.list?this.props.list.find(it=>it.courseId === courseId)?true:false:false
    }

    isValidCourseType(courseType) {
        return Object.entries(COURSE_TYPE).find(it => it[0] === courseType)?true:false
    }

    componentDidMount() {
        if (this.props?this.props.params?true:false:false) {
            const {courseId, courseType} = this.props.params   
            if (courseId) {
                this.setState({openCourseType:undefined, openCourseId:courseId})
            } else if (this.isValidCourseType(courseType)) {   
                this.setState({openCourseType:courseType, openCourseId:undefined})
            } else {
                this.setState({openCourseType:undefined, openCourseId:undefined})
            }
        }  
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match?nextProps.match.params?true:false:false) {
            const {courseId, courseType} = nextProps.match.params   
            if (courseId) {
                this.setState({openCourseType:undefined, openCourseId:courseId})
            } else if (this.isValidCourseType(courseType)) {   
                this.setState({openCourseType:courseType, openCourseId:undefined})
            } else {
                this.setState({openCourseType:undefined, openCourseId:undefined})
            }
        }
    }    

    setOpenCourseId(openCourseId) {
        this.setState({ openCourseId, openCourseType: undefined })
    }

    setOpenCourseType(openCourseType) {
        this.setState({ openCourseId: undefined, openCourseType})
    }

    goBackToMenu() {
        console.log('goBack fired')
        this.setState({openCourseId: undefined, openCourseType: undefined })
    }

    generalInfo() {
        const { breakpoints, currentBreakpoint } = this.props
        const geMobileLandscape = breakpoints[currentBreakpoint] > breakpoints.tablet;
        const gtMobile = breakpoints[currentBreakpoint] > breakpoints.mobile;
        return (
            <div style={styles.body}>
                <h1 style={styles.header}>{TEXTS.COURSES[this.props.language]}</h1>
                <TextShow url={'/getTexts'} groupId={'Course'} textId={'TopText'} language={this.props.language} />
                <img
                    src={img}
                    width={'80%'}
                    alt={img}
                />
            </div>
        )
    }

    courseInfo(courseDef) {
        const { language } = this.props
        const courseLength = courseDef?courseDef['courseLength' + language] ? courseDef['courseLength' + language] : 'no course length': 'no course length'
        const price = courseDef?courseDef.price + ' SEK':''
        return (
            <>
                {courseDef !== undefined?
                    <>
                        <h1 style={{ textAlign: 'center', paddingLeft:20}}>
                            {courseDef['name' + language]}
                        </h1>
                        <h2 style={{ textAlign: 'center', paddingLeft:20}}> 
                            {TEXTS.LENGTH[language] + ':' + courseLength + ' ' + TEXTS.PRICE[language] + ':' + price}
                        </h2>
                        <TextShow url={'/getTexts'} groupId={'Course'} textId={courseDef.textId?courseDef.textId:'TopText'} language={language} />
                    </>
                :
                    <h2 style={{color:'red'}}>Course with courseId = {this.state.openCourseId} not found in course defintions</h2>
                }
            </>
        )
    }

    groupInfo(courseType) {
        const { language } = this.props
        return (
            <>
                <div style={styles.header}>
                    <h1 style={{ textAlign: 'center' }}>{COURSE_TYPE[courseType]?COURSE_TYPE[courseType][language]:'Unknown course type ...'}</h1>
                </div>
                <TextShow url={'/getTexts'} groupId={'Course'} textId={courseType} language={language} />
            </>    
        )
    }

    courseMenu() {
        const { language, list } = this.props;
        const groupedMap = groupBy(list, it => it.courseType);
        const courseTypes = Array.from(groupedMap.keys()).sort((a, b) => a.groupSequenceNumber - b.groupSequenceNumber);
        console.log('groupedMap:', groupedMap);
        console.log('courseTypes:', courseTypes);
        const styleType = coType => styles.groupItem(coType === this.state.openCourseType)
        const styleCourse = courseId => styles.courseItem(courseId === this.state.openCourseId)
        const styleGeneral = styles.groupItem(this.state.openCourseType === undefined && this.state.openCourseId === undefined)
        return (
                <div style={{display:'flex', flexFlow:'column wrap'}}>
                {courseTypes.map((coType, index) =>
                    <>
                        <div key={index}
                            style={styleType(coType)}
                            onClick={() => this.setOpenCourseType(coType)}
                        >
                            {groupedMap.get(coType)[0]['groupName' + language]?groupedMap.get(coType)[0]['groupName' + language]:groupedMap.get(coType)[0]['groupName' + language]}
                        </div>
                        {groupedMap.get(coType).sort((a, b) => a.groupSequenceNumber - b.groupSequenceNumber).map((courseDef, index) =>
                            <div key={index}
                                style={styleCourse(courseDef.courseId)}
                                onClick={() => this.setOpenCourseId(courseDef.courseId)}
                            >
                                {courseDef['name' + language]}
                            </div>
                        )}
                    </>
                )}
                <div
                    style={styleGeneral}
                    onClick={() => this.setState({ openCourseId: undefined, openCourseType: undefined })}
                >
                    {TEXTS.GENERAL_INFO[language]}
                </div>
            </div>
        )
    }


    render = () => {
        const { list } = this.props
        const {openCourseType, openCourseId} = this.state
        const courseDef = openCourseId?list.find(it => it.courseId === openCourseId):undefined

        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    <div style={styles.menu}>
                        {this.courseMenu()}
                    </div> 
                    <div style={styles.body}>
                        {openCourseType !== undefined && openCourseId === undefined?
                            this.groupInfo(openCourseType)
                        :openCourseType === undefined && openCourseId !== undefined?
                            this.courseInfo(courseDef)
                        :
                            this.generalInfo()
                        }
                    </div>
                </div>
                {courseDef ?
                    <div style={{display:'block', clear: 'both' }}>
                        <ScheduleSingleCourse courseId={this.state.openCourseId} style={styles.schedule} />
                    </div>
                : undefined}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        username: '',
        password: '',
        language: state.language,
        url: '/courseDef',
    }
}


export default connect(mapStateToProps)(withBreakpoints(withRecords(withRouter(Course))))

