import React from 'react';
import { connect } from 'react-redux'
import withRecords from 'Components/Table/withRecords'
import {Link} from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import { withBreakpoints } from 'react-breakpoints'
import TextShow from 'Components/Text/TextShow'
import tkColors from 'Settings/tkColors';
import config, {TEACHER_IMAGE_DIR} from 'Settings/config' 
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'


import CircularProgressTerminate from 'Components/CircularProgressTerminate';

const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + TEACHER_IMAGE_DIR

const styles=
{
  avatarContainer: {
      display:'flex',
      margin:'auto',
      flexDirection:'column',
      justifyContent:'left',
      maxWidth:400,
      margin:'auto',
  },
  avatar:{
    display:'flex',
    flexDirection:'row',
    height:50,
    margin:2,
  },
  pageContainer:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  pageItem: width=>({
    display:'inline-block',
    position:'relative',
    width,
    padding:'2%',
    fontSize:12,
    color:tkColors.color,
  }),
  image: {
    borderRadius:32,
  },
  imageText:{
    alignSelf:'center',
  },  
  text:{
    position:'relative',
    width:200, 
    padding:0, 
    margin:0, 
  }, 
  languageButton: {
    textAlign:'center',
    bottom:15,
  },
}

const TEXTS = {
  NO_TEACHERS:{
    SV:'Inga lärare definierade',
    ES:'No teachers defined in database',
    EN:'No teachers defined in database',
  }
}


const _AvatarView = (teachers, language) => {
  return(
    teachers.length > 0?
      <div style={styles.avatarContainer}>
        {teachers.filter(it=>it.active==1).map(it=>(  
          <Link style={{textDecoration:'none', color:'black'}} to={'/teacher/' + it.shortName} >
            <div style={styles.avatar}>
              <span style={{width:50, margin:5}}>
                  <img className='dumb' height={50} style={styles.image} src={it.image?imageUrl + it.image:null} alt={'No image'}/>
              </span>
              <span style={styles.imageText}>{it.firstName + ' ' + it.lastName}</span>
            </div>
          </Link>
        ))}
        <div style={{height:50}}/>
      </div>  
    :
      <CircularProgressTerminate text={TEXTS.NO_TEACHERS[language]} />

  )
}


const _FullPageView = (teachers, language, currentBreakpoint, breakpoints) => {
  const _image = (teacher) => {
    return(teacher.img?teacher.img:imageUrl + teacher.image);
  }
  const _width = (currentBreakpoint, breakpoints) => {return(
    breakpoints[currentBreakpoint] <= breakpoints.mobile?200
    :250
  )}
  const width = _width(currentBreakpoint, breakpoints);
  const name = (teacher) => (teacher.firstName + ' ' + teacher.lastName);
  return(
    teachers.length > 0?
      <div style={styles.pageContainer}>
        {teachers.map(teacher=>(  
          <span style={styles.pageItem(width)}>
            <h2>{name(teacher)}</h2>
            <Link to={'/teacher/' + teacher.shortName} >
              <img classname='dumb' src={_image(teacher)} style={styles.image} width={width} alt={teacher.img} />  
            </Link>
            <div style={styles.text}>
              {teacher.email}&nbsp;
              <Tooltip title={'Click to send mail'}>
                <a href={'mailto:' + teacher.email + '?subject=Hello teacher ' + '"' + teacher.firstName + '"'} 
                  target="_bottom">
                  <EmailIcon style={{cursor:'pointer'}}/>
                </a>
              </Tooltip>
              {teacher.phone?
                  <Tooltip title="Click to make phone call">
                      <a href={'tel:' + teacher.phone} 
                        target="_top">
                        <PhoneIphoneIcon style={{cursor:'pointer'}} />
                      </a>
                  </Tooltip>
              :
                null
              }
              <TextShow 
                  url={'/getTexts'} 
                  style={styles.text}
                  groupId={'Teacher'} textId={teacher.shortName} 
              >
                  {teacher.text}
              </TextShow>    
            </div>
          </span>
        ))}
      </div>  
    :
      <CircularProgressTerminate text={TEXTS.NO_TEACHERS[language]} />
  )
}

const _useAvatarList = (currentBreakpoint, breakpoints) => breakpoints[currentBreakpoint] <= breakpoints.mobileLandscape?true :false

const ContactList = (props) => {
  const {list, currentBreakpoint, breakpoints, language, privateLessons} = props; 
  let activeTeachers = privateLessons?list.filter(te=>te.privateLessons==='1' && te.active === '1'):list.filter(te=>te.active==='1');
  console.log('Teacher list has length', props.list.length)
  return (
    <div>
      {(activeTeachers.length > 0)?_useAvatarList(currentBreakpoint,breakpoints)?_AvatarView(activeTeachers, language)
       :_FullPageView(activeTeachers, language, currentBreakpoint, breakpoints)
        :<CircularProgressTerminate text={TEXTS.NO_TEACHERS[language]} />   
      }
    </div>
  )
};

const mapStateToProps = state => {
  return {
    username:state.user.username,
    password:state.user.password,
    language:state.language,
    url:'/teacher',
  }
}

export default connect( 
  mapStateToProps
) (withRecords(withBreakpoints(ContactList)));
