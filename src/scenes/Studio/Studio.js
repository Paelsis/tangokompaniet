import React from 'react'
import { withBreakpoints } from 'react-breakpoints'
import { connect } from 'react-redux'
import {setList} from 'redux/actions/actionsTeacher'
import TextShow from 'Components/Text/TextShow'
import withListFromStore from 'Components/Table/withListFromStore'
import {setGlobalStyle} from 'redux/actions/actionsStyle'
import tkColors from 'Settings/tkColors'
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import config, {TEACHER_IMAGE_DIR} from 'Settings/config';


const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + TEACHER_IMAGE_DIR


const TEXTS = {
    'TITLE':{
        'SV':'Festlokal',
        'ES':'El curso está completo. Estas en la lista de espera.' ,
        'EN':'Course is full. You are put on waitlist'
    },   
    'SUBTITLE': {
        'SV':'Denna lokal är för uthyrning',
        'ES':'Este local se alquila para fiestas y otros arreglos.',
        'EN':'This room is for rent for parties and other events' 
    },    
    'CONTACT': {
        'SV':'Kontakt',
        'ES':'Contacto',
        'EN':'Contact' 
    },    
    'PHONE': {
        'SV':'mobil',
        'ES':'mobilo',
        'EN':'mobile' 
    },    
    'RESPONSIBLE': {
        'SV':'Ansvarig för uthyrning',
        'ES':'Responsable del alquiler',
        'EN':'Responsible for rental' 
    },    
    'LOCATION':'Fredriksbergsgatan 7, Malmö',
}

const images1 = [
    {name:require('images/Fredriksbergsgatan 7.png'), show: true},
    {name:require('images/studion/soffan.jpg'), show: true},
    {name:require('images/studion/baren.small.jpeg'), show: true}, 
    {name:require('images/studion/scenen.jpeg'), show: true},
]    

const images2 = [
    {name:require('images/studion/scenen.small.jpeg'), show: false},
    {name:require('images/studion/dansgolvet.jpeg'), show: true},
    {name:require('images/studion/dansgolvet.small.jpeg'), show: false},
    {name:require('images/studion/entren.jpeg'), show: true},
    {name:require('images/studion/hissen.png'), show: true},
]

const styles = {
    root:{
        display:'flex', 
        color:tkColors.Text.Dark,
        marginRight:'auto', 
        marginLeft:'auto', 
        width:'100%'
     },
    row:{
       flex:1,
       display:'flex',
       justifyContent:'center',
       flexDirection:'row',        
    },
    column:{
        flexDirection:'column',        
    },
    left:{
        flex:3,
        margin:'3%',
        flexDirection:'column',
        float:'left',
    },
    middle:{
        flex:4,
        flexDirection:'column',
        float:'left'
    },
    right:{
        flex:3,
        margin:'3%',
        flexDirection:'column',
        float:'left',
    },
    rowSmall:{
        margin:'5%',
    },
    image:{
        width:'100%',
    },
    link: {
        color: 'blue'
    }
}

const MyText = ({language}) => <TextShow url={'/getTexts'} groupId={'Studio'} textId={'Text'} language={language} />

const Contact = ({teacher}) =>
    <div>
        <ul style={{listStyleType:'none'}}>
            <li>{teacher.firstName} {teacher.lastName}</li>
            <li>
                Email:&nbsp;{teacher.email}
                &nbsp;
                <Tooltip title={'Click to send mail'}>
                    <a href={'mailto:' + teacher.email + '?subject=Renting Studio'}><EmailIcon /></a>
                </Tooltip>
            </li>
            <li>
                Tel:&nbsp;{teacher.phone}
                &nbsp;
                <Tooltip title={'Click to call'}>
                    <a href={'tel:' + teacher.phone}><PhoneIphoneIcon /></a>
                </Tooltip>
            </li>
        </ul>   
    </div>    
    
const Images = ({images}) => 
    <div>
        {images.filter(it =>it.show===true).map(im =>
            <img key={im.name} style={styles.image} src={im.name} alt={"missing image"} />
        )}    
    </div>
        

const Studio = (props) => {
    const {list, language, breakpoints, currentBreakpoint}= props
    const teacher = list?list.find(it => it.shortName === 'D'):undefined
    const geMobileLandscape = breakpoints[currentBreakpoint] > breakpoints.tablet
    return (
        <div style={styles.root}>
            {teacher===undefined?
                <h4>No responsible found</h4>            
            :geMobileLandscape?
                 <div style={styles.row}>
                    <div style={styles.left}>
                        <Images images={images1} />
                    </div>
                    <div style={styles.middle}>
                        <MyText language={language} />
                        <Contact teacher={teacher} />
                    </div>
                    <div style={styles.right}>
                        <Images images={images2} />
                    </div>
                </div> 
            :       
                <div style={styles.column}>
                    <div style={styles.rowSmall}><MyText language={language} /></div>
                    <div style={styles.rowSmall}><Contact teacher={teacher} /></div>
                    <div style={styles.rowSmall}><Images images={images1} /></div>
                    <div style={styles.rowSmall}><Images images={images2} /></div>
                </div>
            }   
            <div styles={{clear:'both'}} />
        </div>    
)
}

const mapStateToProps = state => {
    return {
      username:'',
      password:'',
      language:state.language,
      url:'/teacher',
      list: state.teachers.list
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        setList: (list) => { dispatch(setList(list)) },
        setBackground: (background) =>  {dispatch(setGlobalStyle({background}))},
    }
}

  
export default connect( 
    mapStateToProps,
    mapDispatchToProps
) (withBreakpoints(withListFromStore(Studio, true)))    
