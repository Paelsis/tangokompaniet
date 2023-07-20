import React, {Component} from 'react';
import { withBreakpoints } from 'react-breakpoints'
import { connect } from 'react-redux'
import { setScheduleList } from 'redux/actions/actionsSchedule'
import tkColors, {boxShadow} from 'Settings/tkColors';
import ExpandTextDialog from 'Components/ExpandTextDialog';
import TextShow from 'Components/Text/TextShow';
import ShoppingCartButton from 'scenes/Shop/ShoppingCartButton';
import withListFromStore from 'Components/Table/withListFromStore';
import groupBy from 'functions/groupBy';
import RegistrationButton from '../School/Registration/RegistrationButton'
import {COURSE_REJECT, COURSE_ACCEPT, COURSE_LEADER_SURPLUS, COURSE_FOLLOWER_SURPLUS, COURSE_FULL} from 'Settings/Const';
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import {renderRegistrationHeader} from './RenderCoRegHeader'
import {renderRegLine} from './RenderCoRegLine'


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
        margin:0,
        marginRight:'auto',
        marginLeft:'auto',
        maxWidth:600,
    },
    flatButton:{
        labelSize:8

    },

    divCourse: {
        marginBottom:25,
        marginLeft:'auto',
        marginRight:'auto',
        background: 'linear-gradient(45deg, #81185B 0%,  #610a41 100%)',
        color:tkColors.Text.Light,
        border:'0.001px solid',
        boxShadow:'0 3px 5px 2px ' + '#81185B',
        borderColor:tkColors.Purple.Light,
    },
    tbody: {
     //   border:2, 
     //   cellpadding:20,
    },
    trhead: {
        height:10,
        verticalAlign:'top',
        padding: 5,
        fontSize: 14,
    },
    tr: {
        padding: 5,
        fontSize: 12,
        height:15,
        verticalAlign:'top',
    },
    tdTitle: {
        verticalAlign:'top',
        fontSize:14,
        fontWeight: 'bold',
    },
    tdBlank: {
        verticalAlign:'top',
    },
    sid:{
        textAlign:'center',
    },
    th: {
        verticalAlign:'bottom',
        paddingLeft: 5,
        paddingRight: 5,
        height:12,
        minWidth:28,
        fontSize:12,
        fontWeight: 'lighter',
    },
    td: {
        verticalAlign:'top',
        padding: 5,
        minWidth:15,
    },
    explanation: {
        fontSize:15,
    },
    tdExplanation: {
        verticalAlign:'top',
        padding: 8,
        color:'gray',
    },
    cirklarProgress: {
        paddingTop:'50%',
        textAlign:'center',
        paddingTop:'50vh',
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
        console.log('renderCourseTempateId, courses:', courses)
        const weekend = courses?courses[0].courseType === 'HK':false
        return (
                <>
                   {courses?
                        <table style={{...styles.divCourse, color:'white'}} >
                            <thead>
                                {renderRegistrationHeader(this.props.language, weekend)}
                            </thead> 
                            <tbody>
                                {courses.filter(it => it.active).sort((a,b)=>a.id - b.id).map((co, index) => (renderRegLine(co, tkColors.background, this.props.language)))}
                            </tbody>
                        </table>
                    :  
                        <table style={{...styles.divCourse, color:'white'}} >
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
                        <TextShow url={'/getTexts'} groupId={'Course'} textId={this.state.textId}>
                            <h4>Enter text for {this.state.textId} ...</h4>
                        </TextShow>
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
