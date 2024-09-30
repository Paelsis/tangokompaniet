import React, {Component} from 'react';
import { withBreakpoints } from 'react-breakpoints'
import { connect } from 'react-redux'
import { setScheduleList } from 'redux/actions/actionsSchedule'
import tkColors from 'Settings/tkColors';
import EditText from 'Components/Text/EditText';
import withListFromStore from 'Components/Table/withListFromStore';
import groupBy from 'functions/groupBy';
import RenderCoRegHeader from './RenderCoRegHeader'
import RenderCoRegLine from './RenderCoRegLine'


const TEXTS = {
    REG_INFO: {
        SV:'Registera dig genom att trycka på knappen med texten "Kursanmälan"',
        EN:'Register by pressing the button with text "Register"',
        ES:'Regístrese presionando el botón verde con el texto "Registrare"',
    },
    NO_SCHEMA: {
        SV:'Schemat för denna kurs är ännu ej lagt till på denna sida',
        EN:'The course schedule for this course has not yet been added to this page',
        ES:'El horario del curso aún no se ha agregado a esta página',
    }
}    

let styles = {
    root:{
        position:'relative',
        marginRight:'auto',
        marginLeft:'auto',
        maxWidth:700,
    },
    table: {
        marginBottom:25,
        padding:8,
        marginLeft:'auto',
        marginRight:'auto',
        color:tkColors.Text.Light,
        background: 'linear-gradient(to bottom right, #81185B, #610a41)',
        boxShadow:'0 13px 27px -5px ' + tkColors.Purple.Light,
        borderColor:tkColors.Purple.Light,
        borderRadius:8,
    },
    sid:{
        textAlign:'center',
    },
    th: {
        padding:2,
        textAlign:'center',
        color:'white',
        verticalAlign:'bottom',
        fontSize:12,
    },
};


class ScheduleSingleCourse extends Component {
    constructor() {
        super();
        this.state = { open: false, toggleText:false, textId:'', dialogOpen:false, leader:false};
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.renderCourseTemplateId = this.renderCourseTemplateId.bind(this)
    }

    handleOpen = () => {
        this.setState({open: true});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };
        

    // Render all courses for one scheduleId
    renderCourseTemplateId(courses) {
        // // console.log('renderCourseTempateId, courses:', courses)
        const weekend = courses?courses[0].courseType === 'HK':false
        return (
                <>
                   {courses?
                        <table style={styles.table} >
                            <thead>
                                <RenderCoRegHeader language = {this.props.language} weekend={weekend} style={styles.th} />
                            </thead> 
                            <tbody>
                                {courses.filter(it => it.active).sort((a,b)=>a.id - b.id).map((co, index) => 
                                    <RenderCoRegLine course={co} color={tkColors.background} language={this.props.language} />)
                                }
                            </tbody>
                        </table>
                    :  
                        <table style={{...styles.table}} >
                            <h4 style={{textAlign:'center'}}>Please contact Tangokompaniet for info about schedule</h4>
                        </table>    
                    }
                </>    
        )
    }

    // Render 
    render() {   
        const language=this.props.language;
        const nameXX = 'name' + language;
        const breakpoints = this.props.breakpoints;
        const currentBreakpoint = this.props.currentBreakpoint;
        let courseDefMap = groupBy(this.props.scheduleList.sort((a,b) => a.productId - b.productId), it => it.courseId);

        return(
            <div style={styles.root}>                    
                {this.state.toggleText?
                    <div>                    
                        <EditText url={'/getTexts'} groupId={'Course'} textId={this.state.textId}>
                            <h4>Enter text for {this.state.textId} ...</h4>
                        </EditText>
                        <button className="button" onClick={() => this.setState({toggleText:!this.state.toggleText})}>Back</button>
                    </div>
                :
                    <div style={styles.sid}> 
                        {this.props.scheduleList.length > 0?
                            this.props.courseId?    
                                    this.renderCourseTemplateId(courseDefMap.get(this.props.courseId))
                            :
                                Array.from(courseDefMap.keys()).map((courseId, index) =>  
                                    <div index={index}> 
                                        <h4 index={index}>{courseDefMap.get(courseId)[0][nameXX]}</h4>
                                        {this.renderCourseTemplateId(courseDefMap.get(courseId), index)}
                                    </div>    
                                )
                            
                        :
                           <h2>{TEXTS.NO_SCHEMA[this.props.language]}</h2>
                        }    
                    </div>           
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: '',
        password: '',
        language: state.language,
        scheduleList: state.schedule.list,
        shoppingCartList: state.shoppingCart.list,
        url:'/scheduleSingleCourse',
    }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        setList: (list) => {dispatch(setScheduleList(list))}
    }        
}

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
) (withBreakpoints(withListFromStore(ScheduleSingleCourse, false)));    
