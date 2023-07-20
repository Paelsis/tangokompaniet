import React, {useState, useEffect} from 'react';
import {connect } from 'react-redux'

import { withBreakpoints } from 'react-breakpoints'
//import ReactTooltip from 'react-tooltip'
// import tkColors from 'Settings/tkColors';
import {statusMessageClear} from 'functions/statusMessage'
import tkColors from 'Settings/tkColors'
import {EVENT_TYPE} from 'Settings/Const'

import fetchList from 'functions/fetchList'
import config from 'Settings/config';
import { eventsModTitle } from '../Calendar/calendarUtil';
const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const SCHEDULE_EVENT_URL = apiBaseUrl + "/scheduleEvent"


//const imgHome=require('images/homepage/annaAndMartin.png');
//const imgHome=require('images/homepage/DanielAnna.png');
//const imgHome=require('images/homepage/VastraHamnenSvartVit.png');

const imgs = {
  dance:require('images/homepage/dance.png'),
  calendar:require('images/homepage/calendar.png'),
  shoes:require('images/homepage/shoes.png'),
  studio:require('images/homepage/studio.png'),
  easter:require('images/banner/easter_banner.jpg'),
  summer:require('images/banner/summer_banner.jpg'),
  festivalito:require('images/banner/festivalito_banner.jpg'),
  default:require('images/banner/festivalito_banner.jpg'),
} 

const IMAGES=[
    {img:imgs.dance, 
      active:true, 
      open:false, // Left menu open when hover
      backgroundColor:'#fa333b', 
      opacity:0.6, 
      link:'/scheduleBeginner', 
      title:{EN:'BEGINNERS', SV:'GRUNDKURS', ES:'BEGINNERS'},
      helpText:{SV:'Grundkurs för nybörjarei Tango',
                EN:'Start dance tango, courses for beginners',
                ES:'Start dance tango, courses for beginners',
      },
    },
    {img:imgs.dance, 
      active:true, 
      open:false, // Left menu open when hover
      backgroundColor:'#81185B', 
      opacity:0.6, 
      link:undefined, 
      title:{EN:'DANCE', SV:'DANSA', ES:'DANZA'},
      helpText:{SV:'Kursanmälan, Social Dans, Privatlektioner, Företag, Lärare',
                EN:'Courses, Registrations, Social dancing, Private lessons, Copmainies, Teachers', 
                ES:'Cursos, Registro, Baile social, Lecciones, Acuredo de negocios, Maestro'
      },
    },
    {img:imgs.calendar, 
      active:true, 
      backgroundColor:'#8a973b', 
      open:false,
      opacity:0.6, 
      link:'/calendar', 
      title:{EN:'CALENDAR', SV:'KALENDER', ES:'CALENDARIO'},
      helpText:{  SV:'Kalender med aktiviteter', 
                  EN:'Calendar with acitivities',
                  ES:'Calendario para Tangokompaniet'
      }, 
    },
    {img:imgs.shoes, 
      active:true, 
      open:false,
      backgroundColor:'#81185B', 
      opacity:0.6, 
      link:'/shop', 
      title:{EN:'SHOE STORE', SV:'SKOAFFÄR', ES:'ZAPATERIA'},
      helpText:{EN:'Shoe store / Shoe showroom', 
                SV:'Skoaffär / Showroom',
                ES:'Zapatos / Sala de exposoción'
      }, 
    },
    {img:imgs.studio, 
      active:true, 
      open:false,
      backgroundColor:'#8a973b', 
      opacity:0.6, 
      link:'/studio', 
      title:{EN:'RENT LOCAL', SV:'HYR LOKAL', ES:'ALQUILAR LOCAL'},
      helpText:{EN:'Party room for rent', 
                SV:'Festlokal för uthyrning',
                ES:'Habitacion en alquiler'
      }, 
    },
    {img:imgs.summer, 
      eventType:EVENT_TYPE.SUMMER,
      open:false,
      backgroundColor:tkColors.Summer.Light, 
      opacity:0.6, 
      title:{EN:'SUMMER', SV:'SOMMAR', ES:'SUMMER'},
      helpText:{EN:'Summer festival', 
                SV:'Sommarfestival',
                ES:'Summer festival'
      }, 
    },
    {img:imgs.festivalito, 
      eventType:EVENT_TYPE.FESTIVALITO,
      open:false,
      backgroundColor:tkColors.Festivalito.Light, 
      opacity:0.6, 
      title:{EN:'FESTIVALITO', SV:'FESTIVALITO', ES:'FESTIVALITO'},
      helpText:{EN:'FESTIVALITO', SV:'FESTIVALITO', ES:'FESTIVALITO'},
    }, 
    {img:imgs.easter, 
      eventType:EVENT_TYPE.EASTER,
      open:false,
      backgroundColor:tkColors.Easter.Light, 
      opacity:0.6, 
      title:{EN:'EASTER FESTIVAL', SV:'PÅSKFESTIVAL', ES:'EASTER FESTIVAL'},
      helpText:{EN:'EASTER FESTIVAL', SV:'PÅSKFESTIVAL', ES:'EASTER FESTIVAL'},
    },
    {img:imgs.default, 
      eventType:EVENT_TYPE.WEEKEND,
      open:false,
      backgroundColor:tkColors.Weekend.Light, 
      opacity:0.6, 
      helpText:{EN:'Course during one or multiple weekends', 
                SV:'Kurs som pågår under en eller flera helger',
                ES:'Curso durante uno o varios fines de semana'
      }, 
    },
    {img:imgs.default, 
      eventType:EVENT_TYPE.SEMINAR,
      open:false,
      backgroundColor:'deepOrange', 
      opacity:0.6, 
      helpText:{EN:'', 
                SV:'',
                ES:''
      }, 
    },
    {img:imgs.default, 
      eventType:EVENT_TYPE.DEFAULT,
      open:false,
      backgroundColor:tkColors.Default.Light, 
      opacity:0.6, 
      helpText:{EN:'', 
                SV:'',
                ES:''
      }, 
    }, 
    {img:imgs.default, 
      eventType:EVENT_TYPE.DEFAULT,
      open:false,
      backgroundColor:tkColors.Default.Light, 
      opacity:0.6, 
      helpText:{EN:'', 
                SV:'',
                ES:''
      }, 
    }, 
    /*
    {img:require('images/banner/maraton_banner.jpg'), 
      eventType:EVENT_TYPE.MARATHON,
      active:false, 
      open:false,
      backgroundColor:tkColors.Easter.Light, 
      opacity:0.6, 
      link:'/malmotangomarathon', 
      title:{EN:'MARATHON', SV:'MALMOTANGOMARATON', ES:'MARATHON'},
      helpText:{EN:'Malmp Tango Marathon', 
                SV:'Malmö tango marathon',
                ES:'Habitacion en alquiler'
      }, 
    },
    */
]

// ALQUILAR EL ESTUDIO

const _imageStyleNew = (width, height, img, opacity, hover, backgroundColor) => ({
  container: {
    position: 'relative',
    float:'left',
    width,
    overflow:'hide',
    cursor:'pointer',
    backgroundColor,
    objectFit:'cover',
    zIndex:20,
  },
  image: {
    position:'relative',
    display: 'block',
    height,  
    padding:'1%',
    backgroundColor,
    /*
    backgroundImage:`url(${img})`,
    backgroundSize:'cover',
    overflow:'hidden',
    */
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor,
    opacity:hover?1.0:opacity,
    transition: '.5s ease',
  },
  text:{
    position:'absolute',
    top: '50%',
    left: width==='100%'?'75%':'50%',
    transform: 'translate(-50%, -50%)',
    color:'white',
    fontSize:width==='100%'?18:14,
    fontWeight:400,
    fontStyle:'italic',
    cursor:'pointer',
  },

  text1: {
    position: 'absolute',
    color: 'blue',
    fontSize: 20,
    top: '50%',
    left: width==='100%'?'75%':'50%',
    transform: 'translate(-50%, -50%)',
  },
  link:{
    textDecoration:'none'
  },
})


const _imageStyle = (width, height, img, opacity, hover, backgroundColor) => ({
  container:{
    position: 'relative',
    float:'left',
    width,
    textAlign:'center',
    cursor:'pointer',
    overflow:'hide',
    zIndex:20,
  },
  image:{
    position:'relative',
    display:'block',
    margin:1,
    height,
    backgroundColor:'yellow',
    backgroundImage:`url(${img})`,
    backgroundSize:'cover',
    overflow:'hidden',
    borderRadius:height > 25?0:8,
    // border:hover?'3px solid ' + backgroundColor:null,
    // borderColor:backgroundColor,
    cursor:'pointer',

  },
  overlay:{
    position:'absolute',
    width:'100%', 
    height:'100%', 
    backgroundColor,
    cursor:'pointer',
    opacity:hover?1.0:opacity, 
    transition: '1000ms all ease',
    willChange: 'opacity',
  },
  text:{
    position:'absolute',
    top: '50%',
    left: hover?'50%':width==='100%'?'75%':'50%',
    transform: 'translate(-50%, -50%)',
    color:width==='100%'?'white':tkColors.background,
    fontSize:width==='100%'?22:16,
    fontWeight:width==='100%'?300:300,
    fontStyle:'italic',
    cursor:'pointer',
    opacity:hover?1.0:0, 
    transition: '1000ms all ease',
    willChange: 'opacity',
  },
  textInverse:{
    position:'absolute',
    top: '50%',
    left: hover?'50%':width==='100%'?'75%':'50%',
    transform: 'translate(-50%, -50%)',
    color:width==='100%'?'white':tkColors.background,
    fontSize:width==='100%'?22:18,
    fontWeight:width==='100%'?300:300,
    fontStyle:'italic',
    cursor:'pointer',
    opacity:hover?0:1.0, 
    transition: '1000ms all ease',
    willChange: 'opacity',
  },
  link:{
    textDecoration:'none'
  },
})

const _ImageNew = (im, hover, width, height, language, handleClick, gtMobile) =>  {
  const {img, link, title, backgroundColor}=im;
  const opacity = hover?0.5:im.opacity
  const imageStyle = _imageStyleNew(width, height, img, opacity, hover, backgroundColor);
  return (
    <div style={imageStyle.container} onClick = {()=>handleClick(link)}>
      <img  src={img} style={imageStyle.image} />
      <div style={imageStyle.overlay}></div>
      <div style={imageStyle.text}>{hover?im.helpText[language]:title[language]}</div>
    </div>
  )
}    

const _Image = (image, hover, width, height, language, handleClick) =>  {
    const {img, link, helpText, backgroundColor, overlayColor}=image;
    const title = image.title?image.title[language].toUpperCase():undefined
    const opacity = hover?0.1:image.opacity 
    const imageStyle = _imageStyle(width, height, img, opacity, hover, overlayColor?overlayColor:backgroundColor);
    const altText = helpText[language]?helpText[language].length > 0?helpText[language]:title:title
    return (

      <div style={imageStyle.container} onClick = {()=>handleClick(link)} >
        <div  style={imageStyle.image}>
            <div style={imageStyle.overlay}/>
        </div> 
        <div style={imageStyle.text}>{height > 25?altText:''}</div>
        <div style={imageStyle.textInverse}>{title}</div>
      </div>
    )
}

const HomeMenu = (props) => {
  const [images, setImages] = useState(IMAGES)
  const [hoverIndex, setHoverIndex] = useState(undefined)
  const {height, language, breakpoints, currentBreakpoint} = props;
  const geMobileLandscape = breakpoints[currentBreakpoint] >= breakpoints.mobileLandscape;
  const geDesktop = breakpoints[currentBreakpoint] >= breakpoints.desktop;
  const widthPercent = 100/images.filter(it => it.active===true).length 
  const width = geMobileLandscape?widthPercent + '%':'100%'

  const handleMouseEnter = index => {
    setHoverIndex(index)
  }

  const handleMouseLeave = () => {
    setHoverIndex(undefined)
  }

  const handleClick = link => {
    statusMessageClear();
    setHoverIndex(undefined)
    props.handleClick(link)
  }
  useEffect(()=>{
    const staticImages = IMAGES.filter(im => im.active?im.active:false)  
    const eventImages = props.list.filter(ev=>((ev.active?ev.active:false) && (ev.menu1))).map(ev =>
    {
          const {nameSV, nameEN, nameES} = ev
          const foundImage = IMAGES.find(im=>im.eventType===ev.eventType)
          const image=foundImage?foundImage:IMAGES[IMAGES.length-1]
          const title = {SV:nameSV, EN:nameEN, ES:nameES}
          const link = ev.link /* + '/' + ev.dateRange */
          return({...image, ...ev, title, link})
    })
    const images =  [...staticImages, ...eventImages]
    setImages(images)
  }, [props.list])  
  return(      
    <div style={{clear:'both'}} >
      {images.map((image, index) =>
        <div
          // data-tip={im.helpText[language]}
          onMouseEnter={()=>geDesktop?handleMouseEnter(index):null}
          onMouseLeave={geDesktop?handleMouseLeave:null}
          key={index} 
        >
          {_Image(image, 
              
              hoverIndex===index, 
              width, 
              height, 
              language, 
              handleClick)
          }
        </div>
      )}
      {/*geMobileLandscape===true?<ReactTooltip />:null*/}
      <div style={{clear:'both'}} />
    </div>
  )   
}    

const mapStateToProps = state => {
  return {
    list: state.eventSchedule.list,
  }
}


export default connect(mapStateToProps)(withBreakpoints(HomeMenu))

 

