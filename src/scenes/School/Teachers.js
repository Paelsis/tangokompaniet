import React, {Component} from 'react';
import { connect } from 'react-redux'
// import withRecords from 'Components/Table/withRecords'
import withListFromStore from 'Components/Table/withListFromStore'
import {setList} from 'redux/actions/actionsTeacher'
import { withBreakpoints } from 'react-breakpoints'
import {setLanguage} from 'redux/actions/actionsLanguage' 
import {Link} from 'react-router-dom'
import tkColors from 'Settings/tkColors';



const styles = {
  root: {
    padding:0,
    marginTop:50,  
    marginBottom:0, 
    marginLeft:0,
    marginRight:0,
    overflowY:'auto',
  },
  link: {
    textDecoration:'none'
  }
};

const handleClick = (id) => alert("The teacher it shall link to has id:" + id) 

const _Teacher = (teacher, language, breakpoints, currentBreakpoint) => {
  let imageStyle = {
    container:{
      position: 'relative',
      float:'left',
      width:breakpoints[currentBreakpoint] > breakpoints.mobile?'25%':'100%',
      textAlign:'center',
      zindex:100,
      opacity:1.0
    },
    link:{
      textDecoration:'none'
    },
    imageContainer:{
      position:'relative',
      width:'100%',
      height:'50vh',
      // backgroundColor:'yellow',
      backgroundImage:`url(${teacher.img})`,
      backgroundRepeat:'no-repeat',
      overflow:'hidden',
      zindex:12,
    },
    imageOverlay:{
      position:'absolute',
      width:'100%', 
      height:'100%', 
      opacity:0.4, 
      backgroundColor:tkColors.Purple.Light,
    },
    title:{
      position:'absolute',
      top: '85%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color:'white',
      fontWeight:600,
      fontStyle:'italic',
    }
  }
  return (
    <div style={imageStyle.container}>
        <div style={{margin:2}}>
          <div style={imageStyle.imageContainer}>
                <div style={imageStyle.imageOverlay}/>
          </div> 
          <div style={imageStyle.title}>
                {teacher.name}
          </div>
        </div>  
    </div>
  )
}

const Teachers = (props) => {
    console.log('Teachers:', props.list)
    return (
      props.list.length > 0?
        <div style={styles.root}>
          {props.list.filter(it=>it.active===true && it.showWithImage?true:false).map((teacher) => (
            <Link style={styles.link} to={'/teacher' + '/' + teacher.id}>
                {_Teacher(teacher, props.language, props.breakpoints, props.currentBreakpoint)}
            </Link>
          ))}
          <div clear='both' />    
        </div>
      :
        <h4>No teachers found in database</h4>
    )
  };

const mapStateToProps = state => {
  return {
    username:'',
    password:'',
    language:state.language,
    url:'/teacher',
    list: state.teachers.list,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLanguageClick: language => {dispatch(setLanguage(language))},
      setList: (list) => { dispatch(setList(list)) }
  }
}



export default connect( 
  mapStateToProps, mapDispatchToProps
) (withListFromStore(withBreakpoints(Teachers)), false);    
