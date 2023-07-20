
// Create REDUX store
import React, {useState, useCallback, useEffect} from 'react';
import {connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useLocation, 
} from "react-router-dom";
import {MuiThemeProvider as V0MuiThemeProvider} from 'material-ui/styles';  // Mui theme from material-ui
import {MuiThemeProvider, createTheme} from '@material-ui/core/styles'
import ReactBreakpoints from 'react-breakpoints'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import indigo from '@material-ui/core/colors/indigo'
import LoadRecords from 'Components/Table/loadRecords'
import MyForm from 'Components/myForm'
import withListFromStore from 'Components/Table/withListFromStore'
import trackPathForAnalytics from './functions/trackPathForAnalytics';
import 'bulma/css/bulma.min.css';

// Login
import FirebaseSignin from 'login/FirebaseSignin'
import Signout from 'login/signout'
import FirebaseSignup from 'login/FirebaseSignup'
import FirebaseAuth from 'login/FirebaseAuth'
import FirebaseResetPassword from 'login/FirebaseResetPassword'
import {setUser, LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'

// App bar
import AppBarTop from 'Menus/AppBarTop'

// Home 
import Home from 'scenes/Home/Home';
import HomeMenuWithDrawer from 'scenes/Home/HomeMenuWithDrawer';
import LanguageButton from 'scenes/Home/LanguageButton';
// Calendar
import Calendar from 'scenes/Calendar/Calendar';
import CalendarWeek from 'scenes/Calendar/CalendarWeek';

// Right Menu
import ContactList from 'scenes/Contact/ContactList';
import Contact from 'scenes/Contact/Contact';
import About from 'scenes/About/About';
import Help from 'scenes/Help/Help';
// Events
import Marathon from 'scenes/Events/Marathon/Marathon';
import Festivalito from 'scenes/Events/Festivalito/Festivalito';
import Summer from 'scenes/Events/Summer/Summer';
import Easter from 'scenes/Events/Easter/Easter';
import SmallEvent from 'scenes/Events/SmallEvent/SmallEvent';
import EventHeader from 'Components/EventHeader'
import SocialDancing from 'scenes/Events/SocialDancing';

// School
// import School from 'scenes/School/School';
import Show from 'scenes/School/Show';
import Teachers from 'scenes/School/Teachers'
import Teacher from 'scenes/School/Teacher'
import Companies from 'scenes/School/Companies'
import PrivateLessons from 'scenes/School/PrivateLessons';
import DanielNews from 'scenes/School/DanielNews';
import Covid19 from 'scenes/School/Covid19';
import Studio from 'scenes/Studio/Studio'
import Course from 'scenes/School/Registration/Course';
import Vocabulary from 'scenes/School/Vocabulary';
import CancelRegistration from 'scenes/School/Registration/CancelRegistration';

// Schedule
import ScheduleChange from 'scenes/Schedule/ScheduleChange';
import ScheduleCourse from 'scenes/Schedule/ScheduleCourse';
import ScheduleEvent from 'scenes/Schedule/ScheduleEvent';
import ScheduleSingleCourse from 'scenes/Schedule/ScheduleSingleCourse';

// Shop
import Shop from 'scenes/Shop/Shop'
// import InventoryList from 'scenes/Shop/InventoryList';
import InventoryFetch from 'scenes/Shop/InventoryFetch';
import ShoppingCart from 'scenes/Shop/ShoppingCart'
import ProductShow from 'scenes/Shop/ProductShow';
import Order from 'scenes/Shop/Order/Order'

// Editor
import Editor from 'scenes/Editor/Editor'

// Payment
import OkPayPal from 'scenes/Payment/OkPayPal'
import ErrorPayPal from 'scenes/Payment/ErrorPayPal'
import TextShow from 'Components/Text/TextShow'
import InputText from 'Components/Text/InputText'
import ThankYou from 'scenes/Payment/ThankYou'
import Admin from 'scenes/admin/Admin'
import Exception404 from 'Router/Exception404'
import Registration from 'scenes/School/Registration/Registration' 
import InfoBox from 'scenes/School/InfoBox'

// Not found  
import PageNotFound from 'scenes/PageNotFound/PageNotFound' 

// Callbacks
import PaymentCancel from 'callback/PaymentCancel'
import PaymentAccept from 'callback/PaymentAccept'
import CallbackText from 'callback/CallbackText'

// Data
import tkColors from 'Settings/tkColors'
// Components
import StatusLine from 'Components/StatusLine'
import ImageUpload from 'Components/ImageUpload'
import ImageUploadMultiple from 'Components/ImageUploadMultiple'
import {setList} from 'redux/actions/actionsEventSchedule'

import config from 'Settings/config';
import fetchList from './functions/fetchList';
const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const SCHEDULE_EVENT_URL = apiBaseUrl + "/scheduleEvent"

const colorDark='#81185B';
const colorLight='#8a973b';


const V0muiTheme = getMuiTheme({
    appBar: {
        color: tkColors.color,
        height: 50,
        //padding: spacing.desktopGutter,
    },
    avatar: {
        color: tkColors.color,
        backgroundColor: tkColors.background,
      },
    button: {
        color: tkColors.Button.color,
        backgroundColor: tkColors.Button.backgroundColor,
    }, 
    badge: {
        color: tkColors.color,
        textColor: tkColors.color,
    },    
    palette: {
        primary1Color: tkColors.color,
        primary2Color: tkColors.color,
        primary3Color: tkColors.color,
        textColor: tkColors.color,
    },
})

const theme = createTheme({
    /*overrides:{ 
      MuiButton: {
        text:{
          background: "linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)",
          borderRadius: 3,
          border: 0,
          color: "white",
          height: 42,
          padding: "0 10px",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          borderRadius: 16
        }
      },
    },
    */
    palette: {
      // type:'dark',
      primary: { main:tkColors.Purple.Light},
        // Purple and green play nicely together.
      secondary: { main:'#FAFAFA'}, // This is just green.A700 as hex.
      disabled:  { main:indigo[500]},
      background: {
        paper:'white',
        default:'red',
      }
    },
    typography: { 
      useNextVariants: true,
      fontSize: 14, // Font size in buttons from Material-UI
    },
    shape: {
      borderRadius:4,
    },
  });



const styles ={
    root:{
      position:'relative',
      top: 0,
      left: 0,
      display:'block',
      minHeight:'calc(100vh + 200px)',
      content: "",
      //backgroundImage:`url(${imgBackground})`,
      //backgroundSize:'cover',
      //backgroundRepeat:'no-repeat',
      //fontFamily: 'Titillium Web',
    },   
    content: {
      position:'relative',
      display:'block',
      width:'100vw',
      minHeight:'100vh',
      top:50,
      paddingBottom:50, 
      marginLeft:'auto',
      marginRight:'auto',
      textAlign:'left',
    },
    languageButton: {
      display:'block',
      position:'relative',
      clear:'both',
      width:'100vw',
      // top:35,
      clear:'both',
      marginTop: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign:'center',
    },
    text:{
      padding:'2%'
    }, 
    info:{
      position:'relative',
      backgroundColor:'orange',
      color:'black',
      top:50,
      padding:'2vh'
    },    
    triangle: {
      textAlign:'center',
      position: 'fixed',
      bottom:'-5vw', 
      left:'-5vw',
      width: '10vw',
      height: '10vw',
      transform: 'rotate(45deg)',
      opacity:0.5,
      background: 'orange',
    },
 
} 

const breakpoints = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920,
}

const TEXTS = {
  NEWS:{
    SV:'Nyheter',
    EN:'News',
    ES:'Noticias',
  },
  CLOSE:{
    SV:'Stäng',
    EN:'Close',
    ES:'Cerca',
  },
}


const App = props => {
  const [open, setOpen]=useState(false)
  const [info, setInfo]=useState(false)
  const [newsList, setNewsList]=useState([])

  const toggleMenuOpen = () => {
    setOpen(!open)
  }
  const setMenuOpen = (open) => {
    setOpen(open)
  }
	
  useEffect(()=> {
    document.title = process.env.NODE_ENV==='production'?'Tangokompaniet'
    :process.env.NODE_ENV==='development'?'Development'
    :process.env.NODE_ENV==='daniel'?'Daniel'
    :process.env.NODE_ENV==='admin'?'Admin'
    :'TK'

    props.setUser(USERNAME, localStorage.getItem(USERNAME))
    props.setUser(PASSWORD, localStorage.getItem(PASSWORD))
    props.setUser(LOGGED_IN_FLAG, localStorage.getItem(USERNAME)!==null?true:false)    
    fetchList('', '', apiBaseUrl + '/getNews', list=>setNewsList(list))
  }, [])  
  
  return (
      <BrowserRouter>
            <MuiThemeProvider theme={theme} >
                <V0MuiThemeProvider muiTheme={V0muiTheme} >
                <ReactBreakpoints breakpoints={breakpoints}>
                <div style={styles.root}>
                    <AppBarTop list={newsList} info={info} setInfo={info => setInfo(info)} />
                    {info===true?
                      <div style={styles.info} >
                        <table>
                        {newsList.map(li =>
                            <tr style={{color:li.color?li.color:'black', backgroundColor:li.backgroundColor?li.backgroundColor:'orange'}}>
                                {Object.entries(li).map(it => it[0] !== 'color' && it[0] !== 'backgroundColor'?<td>{it[1]}</td>:null)}
                            </tr>
                        )}
                        </table>
                        <span style={{width:'100vw', margin:'auto', alignItems:'center'}}>
                          <button style={{borderColor:'black', color:'black'}} onClick={()=>setInfo(!info)} className='button'>{TEXTS.CLOSE[props.language]}</button>
                        </span>
                      </div>
                    :  
                      <HomeMenuWithDrawer open={open} setMenuOpen={setMenuOpen} toggleMenuOpen={toggleMenuOpen} />
                    }
                    <div style={styles.content} onClick={()=>setMenuOpen(false)}>
                    <FirebaseAuth>

                    <Routes>
                          <Route exact path="/" element={<Home/>}/>
                          <Route path="/home" element={<Home/>}/>
                          <Route path="/loadRecords/:url*" element={<LoadRecords/>}/>
                          <Route path="/about" element={<About/>}/>
                          <Route path="/help" element={<Help/>}/>
                          <Route path="/course/:courseType/:courseId" element={<Course/>}/>
                          <Route path="/course/:courseType" element={<Course/>}/>
                          <Route path="/course" element={<Course/>}/>
                          <Route path="/scheduleChange" element={<ScheduleChange/>}/>
                          <Route path="/scheduleSingleCourse" element={<ScheduleSingleCourse/>}/>
                          <Route path="/scheduleCourse" element={<ScheduleCourse/>}/>
                          <Route path="/scheduleBeginner" element={<ScheduleCourse courseId='GK1' />}/>
                          <Route path='/scheduleEvent/:eventType' element={<ScheduleEvent/>} />
                          <Route path='/scheduleEvent' element={<ScheduleEvent/>} />
                          <Route path="/contactlist" element={<ContactList/>}/>
                          <Route exact path="/contact" element={<Contact/>}/>
                          <Route exact path="/calendar" element={<Calendar/>}/>
                          <Route exact path="/calendartWeek" element={<CalendarWeek/>}/>
                          <Route path="/companies" element={<Companies/>}/>
                          <Route path="/show/" element={<Show/>}/>
                          <Route path="/myForm/" element={<MyForm/>}/>
                          <Route path="/productshow/:productId" element={<ProductShow/>}/>
                          <Route path="/privatelessons" element={<PrivateLessons/>}/>
                          <Route exact path="/teachers" element={<Teachers/>}/>
                          <Route path="/danielnews" element={<DanielNews/>}/>
                          <Route path="/covid19" element={<Covid19/>}/>
                          <Route exact path="/vocabulary" element={<Vocabulary/>}/>
                          <Route path="/cancelRegistration/:token/:tableName" element={<CancelRegistration/>}/>
                          <Route path="/cancelRegistration/:token" element={<CancelRegistration/>}/>
                          <Route path="/cancelRegistration" element={<CancelRegistration/>}/>
                          <Route path='/teacher/:shortName' element={<Teacher />}/>
                          <Route path="/studio" element={<Studio/>}/>
                          <Route exact path="/shop" element={<Shop/>}/>
                          <Route path="/shoppingcart" element={<ShoppingCart/>}/>
                          <Route path="/order" element={<Order/>}/>
                          <Route path="/inventoryfetch" element={<InventoryFetch/>}/>
                          <Route exact path="/editor" element={<Editor/>}/>
                          <Route exact path="/eventheader" element={<EventHeader/>}/>
                          <Route exact path="/text" element={<TextShow/>} />
                          <Route path="/inputText/:text" element={<InputText/>} />
                          <Route path="/inputText" element={<InputText/>} />
                          <Route exact path="/thankyou" element={<ThankYou/>} />
                          <Route exact path="/admin" element={<Admin/>} />
                          <Route exact path='/errorPaypal' element={<ErrorPayPal/>} />
                          <Route exact path='/okPaypal' element={<OkPayPal/>} />
                          <Route exact path='/paymentAccept/:orderId/:amount/:currency/:language' element={<PaymentAccept/>} />
                          <Route exact path='/paymentCancel/:orderId/:language' element={<PaymentCancel/>} />
                          <Route exact path='/registration/:productType/:productId/:avaStatus' element={<Registration/>} />
                          <Route exact path='/registration/:productType/:productId' element={<Registration/>} />
                          <Route path='/callbackText/:groupId/:textId/:language' element={<CallbackText/>} />
                          <Route path='/paypal' element={<a href='https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies'/>}/>
                          <Route path="/malmotangomaraton" element={<Marathon/>}/>
                          <Route exact path="/marathon" element={<Navigate to="/malmotangomaraton" />} />
                          <Route exact path="/malmotangomarathon" element={<Navigate to="/malmotangomaraton"/>} />
                          <Route path="/festivalito" element={<Festivalito/>}/>
                          <Route path="/easter" element={<Easter/>} />
                          <Route path="/summer" element={<Summer/>} />
                          <Route path="/smallEvent/:dateRange" element={<SmallEvent/>}/>
                          <Route path="/smallEvent" element={<SmallEvent/>}/>
                          <Route path="/social" element={<SocialDancing/>} />
                          <Route path='/linkFestivalito' element={<a href='https://festivalito.tangokompaniet.com'/>}/>
                          <Route path='/linkEaster' element={<a href='https://easter.tangokompaniet.com'/>}/>
                          <Route path='/linkSummer' element={<a href='https://summer.tangokompaniet.com'/>}/>
                          <Route path='/linkMarathon' element={<a href='https://tangomaraton.tangokompaniet.com'/>}/>
                          <Route path='/Exception404' element={<Exception404/>} />
                          <Route path="/image/:subdir*" element={<ImageUpload/>}/>
                          <Route path="/images" element={<ImageUploadMultiple/>}/>
                          <Route path="/firebaseSignin" element={<FirebaseSignin/>}/>
                          <Route path="/signout" element={<Signout/>}/>
                          <Route path="/firebaseSignup" element={<FirebaseSignup/>}/>
                          <Route path="/firebaseResetPassword" element={<FirebaseResetPassword/>}/>
                          <Route path="*" element={<PageNotFound />} />0
                      </Routes>
                      </FirebaseAuth>  
                    </div> 
                    <div style={styles.languageButton}>
                        <LanguageButton />
                    </div>
                    <StatusLine />   
                </div>
                </ReactBreakpoints>
                </V0MuiThemeProvider>
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

// Map the dispatch to onMyClick

const mapStateToProps = state => {
  return {
    language: state.language, 
    list: state.eventSchedule.list,
    url:'/scheduleEvent'
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      setUser: (key, value) => {dispatch(setUser(key, value))},
      setList: (list) => { dispatch(setList(list)) }
    }        
}

export default connect(mapStateToProps, mapDispatchToProps)(withListFromStore(App, true));

