import request from 'superagent'
import {eventStyle} from './calendarUtil'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import moment from 'moment-with-locales-es6'
const CULTURE = language => language===LANGUAGE_SV?'sv':language===LANGUAGE_ES?'es':'en'
const CALENDAR_ID_ORIG = 'tb8ckdrm61bdsj6jfm7khob4u5@group.calendar.google.com'
const API_KEY_ORIG = 'AIzaSyAOuDzSlG24RPBn3OKVAyjW3OK_EJhCUbp'
//let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID_ORIG}/events?key=${API_KEY_ORIG}`

// Pers calendar  
//const CALENDAR_ID = 'e8crjpja77kp13nv2u9q52rkcc@group.calendar.google.com'
const CALENDAR_ID = 'per.eskilson@gmail.com'
const API_KEY = 'AIzaSyBMhuxVODuB4qYKmIoSguPYuQuTfct-QIs'
//const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

//Daniels Tangokompaniet calendar
const CALENDAR_ID_TK = 'tangokompaniet@gmail.com'
const API_KEY_TK = 'AIzaSyB0EBiE8xd5ItS59IahMyficWWAanHhMzU' // Per 2

const findNumberInText = (s, val) => {
  const idx = s.indexOf(val)  
  console.log('findParameter', val, 'idx',  idx)
  if (idx != -1) {
    const value = Number(s.slice(idx).match(/(\d+)/)[0])
    console.log('newString', s.slice(idx), 'value', value)
    return value
  } else {
    return undefined
  }  
}  

function _forceSmallFonts(event) {
  if ( (typeof _forceSmallFonts.mstartPreviousBigEvent == 'undefined')|| (event === undefined)) {
    // It has not... perform the initialization
    _forceSmallFonts.mstartPreviousBigEvent = moment('2000-01-01T00:00')
    return event
  } else if (event.durationHours > 24) {
      const daysBetweenEvents = moment.duration(event.mstart.diff(_forceSmallFonts.mstartPreviousBigEvent)).asDays()
      _forceSmallFonts.mstartPreviousBigEvent = event.mstart
      if (daysBetweenEvents < 6) {
        return {...event, forceSmallFonts:true};
      } else {
        return event
      }
  } else {  
      return event
  }  
}  



// export means that this function will be available to any module that imports this module
export function getEvents (calendarId, apiKey, callback, timeMin, timeMax, language) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=${true}&orderBy=startTime`
  
  function cityForEvent (title, location) {
    if ((title.toLowerCase().indexOf('malmö') !== -1) ||
        (title.toLowerCase().indexOf('lund') !== -1)) {
        return undefined 
    } else {        
        return location?(location.toLowerCase().indexOf('malmö') !== -1)?'Malmö'
               :(location.toLowerCase().indexOf('lund') !== -1)?'Lund'
               :(location.toLowerCase().indexOf('michael') !== -1)?'Lund'
               :(location.toLowerCase().indexOf('tangokompaniet') !== -1)?'Malmö'
               :(location.toLowerCase().indexOf('studio') !== -1)?'Malmö'
               :undefined:undefined          
    }    
  }    

  
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        // create array to push events into
        const events = []
        let previousEndDate=null
        let dateStyle = null
        // in practice, this block should be wrapped in a try/catch block, 
        // because as with any external API, we can't be sure if the data will be what we expect
        moment.locale(CULTURE(language))
        let previousWeekNumber = 0
        let isLightColor = false

        JSON.parse(resp.text).items.map((it) => {
          const start = it.start.dateTime?it.start.dateTime:it.start.date
          const end = it.end.dateTime?it.end.dateTime:it.end.date
          const mstart = moment(start)
          const mend = moment(end)
          const timeStart = mstart.format('LT')
          const timeEnd = mend.format('LT')
          const dateShift = mend.dayOfYear() - mstart.dayOfYear()  
          const fullDay = start.length <= 10 || (timeStart==="00:00" && timeEnd ==="00:00") && dateShift <= 1 || (timeStart==="00:00" && timeEnd ==="23:59")
          const durationHours = moment.duration(mend.diff(mstart)).asHours()
          const endsOtherDay=(mstart.calendar('l') !== mend.calendar('l')) && (mend.diff(mstart, 'hours') > 11) && !fullDay
          const description = (it.description?it.description:'')
          const maxPar = findNumberInText(description, 'MAX_PAR')
          const maxInd = findNumberInText(description, 'MAX_IND')
          const swishAmount = findNumberInText(description, 'SWISH_AMOUNT')
          const maxImbalance = findNumberInText(description, 'MAX_IMBALANCE')
          const location = it.location?it.location.replace(/Tangokompaniet, |, 212 11 |, 224 64|, 223 63|, Sverige|Stiftelsen Michael Hansens Kollegium, /g, ' ').replace('Fredriksbergsgatan','Fredriksbergsg.'):'Plats ej angiven'
          const sameDate = mstart.isSame(moment(previousEndDate), 'd') && moment(start).isSame(mend, 'd')
          const isToday = moment().isSame(mstart, 'day')?true:false
          const isWeekend = mstart.isoWeekday() >=6;
          const calendar = mstart.calendar()
          const dateTimeRange = mstart.format('ddd D MMM H:mm') + ' - ' +  mend.format('ddd D MMM H:mm')
          const timeRange= fullDay?'Full day':(mstart.format('LT') + '-' + mend.format('LT'))
          const timeRangeWithDay = dateShift?(mstart.format('dddd LT') + '-' + mend.format('dddd LT')):(mstart.format('dddd LT') + '-' + mend.format('LT'))
          const title = it.summary?it.summary:'No Title'
          const city = cityForEvent(title, location)
          const weekNumber = mstart.isoWeek()
          const maxRegistrants = Number(maxInd?maxInd:maxPar?(maxPar*2):500)
          const useRegistrationButton =description?(description.indexOf('MAX_IND')!==-1 || description.indexOf('MAX_PAR')!==-1):false

          isLightColor = weekNumber===previousWeekNumber?isLightColor:!isLightColor
          previousWeekNumber = weekNumber

          _forceSmallFonts(undefined)

          let event = {
            start,
            end,
            mstart, 
            mend,
            description,
            title,
            location,
            sameDate,
            isToday,
            isWeekend,
            isLightColor,
            weekNumber,
            timeRange,
            timeRangeWithDay,
            durationHours,
            calendar,
            dateTimeRange,
            endsOtherDay, 
            city,
            maxInd,
            maxPar,
            swishAmount, 
            maxImbalance,
            maxRegistrants,
            useRegistrationButton,
          }  

          event = _forceSmallFonts(event) 
                    
          events.push(event)
          previousEndDate=end
         
        })
        callback(events)
      } 
    })
}