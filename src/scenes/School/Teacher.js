import React from 'react';
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {setList} from 'redux/actions/actionsTeacher'
import IconContactPhone from 'material-ui/svg-icons/communication/contact-phone';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import tkColors from 'Settings/tkColors';
import {setLanguage, LANGUAGE_SV} from 'redux/actions/actionsLanguage' 
import TextShow from 'Components/Text/TextShow'
import { withBreakpoints } from 'react-breakpoints'
import config, {TEACHER_IMAGE_DIR} from 'Settings/config';
import withListFromStore from 'Components/Table/withListFromStore'
import Tooltip from '@material-ui/core/Tooltip';
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'


const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + TEACHER_IMAGE_DIR

const SHOP_IMAGES_URL=config[process.env.NODE_ENV].apiBaseUrl + TEACHER_IMAGE_DIR

// const menuIcon = <IconMenu />;
// const whaffleIcon = <IconWaffle />;
// const beachIcon = <BeachAccess />;
// const personIcon = <IconPerson iconStyle={{color: 'red'}} />;
// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;

const _imageWidth = (breakpoints, currentBreakpoint) =>
  breakpoints[currentBreakpoint] <= breakpoints.mobile?'100%'
  :breakpoints[currentBreakpoint] <= breakpoints.mobileLandscape?'30%'
  :breakpoints[currentBreakpoint] <= breakpoints.tablet?'30%'
  :breakpoints[currentBreakpoint] <= breakpoints.tabletLandscape?'30%'
  :breakpoints[currentBreakpoint] <= breakpoints.desktop?'30%'
  :breakpoints[currentBreakpoint] <= breakpoints.desktopLarge?'30%'
  :breakpoints[currentBreakpoint] <= breakpoints.desktopWide?'20%'
  :'12.5%'

const _textWidth = (breakpoints, currentBreakpoint) =>
    breakpoints[currentBreakpoint] <= breakpoints.mobile?'100%'
    :breakpoints[currentBreakpoint] <= breakpoints.mobileLandscape?'50%'
    :breakpoints[currentBreakpoint] <= breakpoints.tablet?'50%'
    :breakpoints[currentBreakpoint] <= breakpoints.tabletLandscape?'60%'
    :breakpoints[currentBreakpoint] <= breakpoints.desktop?'70%'
    :breakpoints[currentBreakpoint] <= breakpoints.desktopLarge?'70%'
    :breakpoints[currentBreakpoint] <= breakpoints.desktopWide?'80%'
    :'80%'

const styles = {
    root: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        margin:'auto',
        maxWidth:800,
        backgroundColor:tkColors.background
    },
    image : {
        margin:'auto',
        marginTop:10,
        borderRadius:24
    },
    text : {
        margin:10,

    }
}

const Teacher = (props) => { 
    const {list, language, history, breakpoints, currentBreakpoint} = props
    const params = useParams()
    const teacher = list.find(it => it.shortName === params.shortName); 
    let stylesImage={...styles.image, width:_imageWidth(breakpoints, currentBreakpoint)}
    const navigate = useNavigate()
    return(
        teacher?
            <div style={styles.root} onClick={()=>navigate(-1)}>
                <img className="image-shake" style={styles.image} width={'80%'} src={imageUrl + teacher.image} alt={'No pic on ' + teacher.firstName} />
                <text style={styles.text}>
                        <span>
                            &nbsp;{teacher.email}
                        </span>  
                    &nbsp;&nbsp;    
                    <Tooltip title={'Click to send mail'}>  
                            <a href={'mailto:' + teacher.email + '?subject=Hello dear tangoteacher ' + '"' + teacher.firstName + '"'} 
                                target="_top"><EmailIcon style={{cursor:'pointer'}} />
                            </a>
                    </Tooltip>
                    {teacher.phone?
                            <Tooltip title={'Click to make call'}>  
                                <a href={'tel:' + teacher.phone}><PhoneIphoneIcon style={{cursor:'pointer'}}/></a>
                            </Tooltip>
                    :null}
                    <TextShow url={'/getTexts'} groupId={'Teacher'} textId={teacher.shortName} language={language}>
                            {teacher.text}
                    </TextShow>    
                </text>  
            </div>
        :
            <h4>Fetching from database ...</h4>
    )
};

const mapStateToProps = state => {
    return {
      language: state.language,
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
    mapStateToProps,
    mapDispatchToProps
) (withBreakpoints(withListFromStore(Teacher, true)));    


