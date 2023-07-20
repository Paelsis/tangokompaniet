import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import moment from 'moment-with-locales-es6'
import indigo from '@material-ui/core/colors/indigo'
import teal from '@material-ui/core/colors/teal'
import red from '@material-ui/core/colors/red'
import lime from '@material-ui/core/colors/lime'
import lightGreen from '@material-ui/core/colors/lightGreen'
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import tkColors from 'Settings/tkColors'
import { CALENDAR_TYPE } from 'Settings/Const';
export const CULTURE = (language) => language===LANGUAGE_SV?'sv':language===LANGUAGE_ES?'es':'en'
export const CALENDAR_SIZE = {
  SMALL:'SMALL',
  LARGE:'LARGE'
}
export const EVENT_STYLES_TK = {
  'selected':{
    style:{
        color:tkColors.background,
        backgroundColor:red[500],
      } 
  },
  'sommar':{
    style:{
      color:tkColors.background,
      backgroundColor:tkColors.Summer.Dark,
    }, 
  },
  'maraton':{
    style:{
      color:tkColors.background,
      backgroundColor:tkColors.Marathon.Dark,
    }  
  }, 
  'marathon':{
      style:{
        color:tkColors.background,
        backgroundColor:tkColors.Marathon.Dark,
      }, 
   },
  'easter':{
    style:{
      color:tkColors.background,
      backgroundColor:tkColors.Easter.Dark,
    },  
  },
  'festivalito':{
    style:{
      color:tkColors.background,
      backgroundColor:tkColors.Festivalito.Dark,
    },  
  },
  'GK1':{
    style:{
      color:tkColors.background,
      backgroundColor:lightGreen[700],
    } 
  },
  'GK2':{
    style:{
      color:tkColors.background,
      backgroundColor:lightGreen[900],
    } 
  },
  'F1':{
    style:{
      color:tkColors.background,
      backgroundColor:indigo[500],
    } 
  },
  'F2':{
    style:{
      color:tkColors.background,
      backgroundColor:indigo[800],
    } 
  },
  'E1':{
    style:{
      color:tkColors.background,
      backgroundColor:brown[700],
    } 
  },
  'E2':{
    title:'erfarna',
    style:{
      color:tkColors.background,
      backgroundColor:brown[900],
    } 
  },
  'A1':{
    title:'Avancerade',
    style:{
      color:tkColors.background,
      backgroundColor:deepOrange[700],
    } 
  },
  'A2':{
    title:'Avancerade',
    style:{
      color:tkColors.background,
      backgroundColor:deepOrange[900],
    } 
  },
  'T1':{
    exactMatch:['T1'],
    title:'Teknik',
    style:{
      color:tkColors.background,
      backgroundColor:red[700],
      opacity:0.8
    } 
  },
  'extra':{
    title:'Extra',
    style:{
      color:'yellow',
      backgroundColor:red[900],
      opacity:0.8
    } 
  },
  'racing':{
    style:{
      color:tkColors.background,
      backgroundColor:tkColors.Purple.Light,
      opacity:0.7,
    }, 
  },
  'brunch':{
    style:{
      color:tkColors.background,
      backgroundColor:deepOrange[700],
    },  
  },
  'teatime':{
    style:{
      color:tkColors.background,
      backgroundColor:teal[600],
    },
  },  
  'prak':{
    style:{
      color:'white',
      backgroundColor:lightGreen[600],
    },
  },
  'prac':{
    style:{
      color:'white',
      backgroundColor:lightGreen[700],
    },
  },
  'milonga':{    
    style:{
      color:tkColors.background,
      backgroundColor:tkColors.Purple.Light,
    },
  },
  'teknik':{    
    style:{
      color:tkColors.background,
      backgroundColor:'darkBlue',
    },
  },
  default:(isLightClolor) => ({
    style:{
      color:'white',
      backgroundColor:deepOrange[700],
    }  
  }),
}  

const EVENT_STATUS_STYLES=(isLightColor, eventFinished)=>({
  CC:{    
    paddingLeft:2, paddingRight:2,
    color:tkColors.background,
    background:isLightColor?'linear-gradient(45deg, #324147 0%, #D1188B 100%)':'linear-gradient(45deg, #324147 0%, #D1188B 100%)',
    opacity:eventFinished?0.5:1.0,
  },
  OL:{    
    paddingLeft:2, paddingRight:2,
    color:tkColors.background,
    background:isLightColor?"linear-gradient(90deg,#5D8170 70%, #203354 90%)":"linear-gradient(90deg,#365A49 80%, #203354 90%)",
    opacity:eventFinished?0.5:1.0,
  },
  CL:{    
    paddingLeft:2, paddingRight:2,
    color:tkColors.background,
    background:isLightColor?"linear-gradient(90deg,#5D8170 50%, #203354 70%)":"linear-gradient(90deg,#365A49 50%, #203354 60%)",
    opacity:eventFinished?0.5:1.0,
  },
  OF:{    
    paddingLeft:2, paddingRight:2,
    color:tkColors.background,
    background:isLightColor?"linear-gradient(90deg, #800000 10%, #5D8170 30%)":"linear-gradient(90deg, #800000 10%, #365A49 20%)",
    opacity:eventFinished?0.5:1.0,
  },
  CF:{    
    paddingLeft:2, paddingRight:2,
    color:tkColors.background,
    background:isLightColor?"linear-gradient(90deg, #800000 30%, #5D8170 50%)":"linear-gradient(90deg, #800000 40%, #365A49 50%)",
    opacity:eventFinished?0.5:1.0,
  },
  AV:{    
    paddingLeft:2, paddingRight:2,
    color:tkColors.background,
    background:isLightColor?'#5D8170':'#365A49',
    opacity:eventFinished?0.5:1.0,
  },
})

const EVENT_STYLE_CLASSES = (isLightColor, eventFinished) =>({    
  //border:'2px dotted ' + tkColors.background,
  color:tkColors.background,
  background:isLightColor?tkColors.Purple.Light:tkColors.Purple.Dark,
  opacity:eventFinished?0.5:1.0
})

export function eventStyle(event, isSelected, calendarType) {
  let newStyle=undefined
  const eventFinished = moment(event.end) < moment()


  if (calendarType === CALENDAR_TYPE.SOCIAL) {
      return(EVENT_STATUS_STYLES(event.isLightColor, eventFinished)[event.avaStatus]);
  } else if (isSelected==1) {
      return(EVENT_STYLES_TK['selected'].style);
  } else {  
    Object.keys(EVENT_STYLES_TK).map(key => {
      if (event.title?(event.title.toLowerCase().indexOf(key.toLowerCase()) > -1):false) {
        newStyle=EVENT_STYLES_TK[key].style
      } 
    })  

    if (newStyle === null) {
      Object.keys(EVENT_STYLES_TK).map(key => {
        if (event.description?(event.description.indexOf(key.toLowerCase()) > -1):false) {
          newStyle=EVENT_STYLES_TK[key].style
        }  
      })  
    }
    return(EVENT_STYLE_CLASSES(event.isLightColor, eventFinished));
  }
}


export const eventsModTitle = (events, isSelected, EVENT_STYLES_TK) => {
  let newEvents = events.map(event => {
    let newTitle=event.title?event.title:'Unkown title';
    Object.keys(EVENT_STYLES_TK).map(key => {
          if (event.title?(event.title.toLowerCase().indexOf(key.toLowerCase()) > -1):false) {
            newTitle=EVENT_STYLES_TK[key].title
          } else if (event.description?(event.description.toLowerCase().indexOf(key.toLowerCase()) > -1):false) {
            newTitle=EVENT_STYLES_TK[key].title
          }  
    })
    let newEvent = event
    newEvent.title = newTitle
    return newEvent
  })
  return(newEvents)
}  

  
