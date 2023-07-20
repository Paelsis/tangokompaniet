import React, {Component} from 'react';
import { Navigate } from 'react-router'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {MuiThemeProvider as V0MuiThemeProvider} from 'material-ui/styles';  // Mui theme from material-ui
import {MuiThemeProvider, createTheme} from '@material-ui/core/styles'
import ReactBreakpoints from 'react-breakpoints'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import indigo from '@material-ui/core/colors/indigo'
import ScrollToTop from './ScrollToTop'
import LoadRecords from 'Components/Table/loadRecords'
import MyForm from 'Components/myForm'

import { withBreakpoints } from 'react-breakpoints'

import AppBarTop from 'Menus/AppBarTop'
import Home from 'scenes/Home/Home';
import HomeMenuWithDrawer from 'scenes/Home/HomeMenuWithDrawer';
import LanguageButton from 'scenes/Home/LanguageButton';
import Photos from 'scenes/Photos/Photos';
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
import SocialDancing from 'scenes/Events/SocialDancing';
import EventHeader from 'Components/EventHeader'

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
import ThankYou from 'scenes/Payment/ThankYou'
import Admin from 'scenes/Admin/Admin'
import Exception404 from 'Router/Exception404'
import Registration from 'scenes/School/Registration/Registration' 

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
      width:'100%',
      minHeight:'calc(100vh + 200px)',
      content: "",
      //backgroundImage:`url(${imgBackground})`,
      //backgroundSize:'cover',
      //backgroundRepeat:'no-repeat',
      bottom: 0,
      right: 0,
      //fontFamily: 'Titillium Web',
    },   
    content: {
      display:'block',
      position:'relative',
      width:'100%',
      minHeight:'calc(100vh + 10px)',
      paddingBottom:50, 
      top:50,
      marginLeft:'auto',
      marginRight:'auto',
      backgroundSize:'cover',
      textAlign:'left',
    },
    languageButton: {
      display:'block',
      width:'100vw',
      position:'relative',
      // top:35,
      clear:'both',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign:'center',
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


class Wrapper extends Component {
  constructor() {
      super();
      this.state = {open:false};
      this.toggleMenuOpen = this.toggleMenuOpen.bind(this)
      this.setMenuOpen = this.setMenuOpen.bind(this)

      document.title = process.env.NODE_ENV==='production'?'Tangokompaniet'
        :process.env.NODE_ENV==='development'?'TK development'
        :'TK test'
  }

  toggleMenuOpen() {
    this.setState({open:!this.state.open})
  }

  setMenuOpen(open) {
    this.setState({open})
  }
  
  render() {
    return (
        <Router onUpdate={this.handleUpdate}>
            <MuiThemeProvider theme={theme} >
                <V0MuiThemeProvider muiTheme={V0muiTheme} >

                <div style={styles.root}>
                  <ReactBreakpoints breakpoints={breakpoints}>
                    <AppBarTop />
                    <HomeMenuWithDrawer open={this.state.open} setMenuOpen={this.setMenuOpen} toggleMenuOpen={this.toggleMenuOpen} />
                    <div style={styles.content} onClick={()=>this.setMenuOpen(false)}>
                      <ScrollToTop>
                      <Switch>
                          <Route exact path="/" component={Home}/>
                          <Route path="/home" component={Home}/>
                          <Route path="/loadRecords/:url*" component={LoadRecords}/>
                          <Route path="/about" component={About}/>
                          <Route path="/photos/:rootdir/:subdir*" component={Photos}/>
                          <Route path="/help" component={Help}/>
                          <Route path="/course" component={Course}/>
                          <Route path="/scheduleChange" component={ScheduleChange}/>
                          <Route path="/scheduleSingleCourse" component={ScheduleSingleCourse}/>
                          <Route path="/scheduleCourse" component={ScheduleCourse}/>
                          <Route exact path="/scheduleEvent" component={ScheduleEvent}/>
                          <Route exact path='/scheduleEvent/:eventType' component={ScheduleEvent} />
                          <Route path="/contactlist" component={ContactList}/>
                          <Route exact path="/contact" component={Contact}/>
                          <Route exact path="/calendar" component={Calendar}/>
                          <Route exact path="/calendartWeek" component={CalendarWeek}/>
                          <Route path="/companies" component={Companies}/>
                          <Route path="/show/" component={Show}/>
                          <Route path="/myForm/" component={MyForm}/>
                          <Route path="/productshow/:productId" component={ProductShow}/>
                          <Route path="/privatelessons" component={PrivateLessons}/>
                          <Route exact path="/teachers" component={Teachers}/>
                          <Route path="/danielnews" component={DanielNews}/>
                          <Route path="/covid19" component={Covid19}/>
                          <Route exact path="/vocabulary" component={Vocabulary}/>
                          <Route exact path='/teacher/:shortName' component={Teacher} />
                          <Route path="/studio" component={Studio}/>
                          <Route exact path="/shop" component={Shop}/>
                          <Route path="/shoppingcart" component={ShoppingCart}/>
                          <Route path="/order" component={Order}/>
                          <Route path="/inventoryfetch" component={InventoryFetch}/>
                          <Route exact path="/editor" component={Editor}/>
                          <Route exact path="/eventheader" component={EventHeader}/>
                          <Route exact path="/text" component={TextShow} />
                          <Route exact path="/thankyou" component={ThankYou} />
                          <Route exact path="/admin" component={Admin} />
                          <Route exact path='/errorPaypal' component={ErrorPayPal} />
                          <Route exact path='/okPaypal' component={OkPayPal} />
                          <Route exact path='/paymentAccept/:orderId/:amount/:currency/:language' component={PaymentAccept} />
                          <Route exact path='/paymentCancel/:orderId/:language' component={PaymentCancel} />
                          <Route exact path='/registration/:productType/:productId' component={Registration} />
                          <Route path='/callbackText/:groupId/:textId/:language' component={CallbackText} />
                          <Route path='/paypal' component={() => window.location = 'https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies'}/>
                          <Route path="/malmotangomaraton" component={Marathon}/>
                          <Route exact path="/marathon" render={() => {return (<Navigate to="/malmotangomaraton" />)}} />
                          <Route path="/festivalito" component={Festivalito}/>
                          <Route exact path="/malmotangomarathon" render={() => {return (<Navigate to="/malmotangomaraton" />)}} />
                          <Route path="/easter" component={Easter}/>
                          <Route path="/summer" component={Summer}/>
                          <Route path="/social" component={SocialDancing}/>
                          <Route path='/linkFestivalito' component={() => window.location = 'https://festivalito.tangokompaniet.com'}/>
                          <Route path='/linkEaster' component={() => window.location = 'https://easter.tangokompaniet.com'}/>
                          <Route path='/linkSummer' component={() => window.location = 'https://summer.tangokompaniet.com'}/>
                          <Route path='/linkMarathon' component={() => window.location = 'https://tangomaraton.tangokompaniet.com'}/>
                          <Route path='/Exception404' component={Exception404} />
                          <Route path="/image/:subdir*" component={ImageUpload}/>
                          <Route path="/images" component={ImageUploadMultiple}/>

                      </Switch>
                      </ScrollToTop>  
                    </div> 
                    <div style={styles.languageButton}>
                        <LanguageButton />
                    </div>
                   <StatusLine />   
                   </ReactBreakpoints>
                </div>
                </V0MuiThemeProvider>
            </MuiThemeProvider>
        </Router>
    );
  }
}


export default Wrapper;