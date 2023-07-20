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
          const calendarStartTime = mstart.format('LT')
          const calendarEndTime = mend.format('LT')
          const dateShift =  mstart.dayOfYear() - mend.dayOfYear() !== 0
          const timeRange = start.length > 10?(mstart.format('LT') + '-' + mend.format('LT')):'Whole day'
          const timeRangeWithDay = dateShift?(mstart.format('dddd LT') + '-' + mend.format('dddd LT')):(mstart.format('dddd LT') + '-' + mend.format('LT'))
          const title = it.summary?it.summary:'No Title'
          const city = cityForEvent(title, location)
          const weekNumber = mstart.isoWeek()
          const maxRegistrants = Number(maxInd?maxInd:maxPar?(maxPar*2):500)
          const useRegistrationButton =description?(description.indexOf('MAX_IND')!==-1 || description.indexOf('MAX_PAR')!==-1):false
          

          isLightColor = weekNumber===previousWeekNumber?isLightColor:!isLightColor
          previousWeekNumber = weekNumber

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
            calendar,
              calendarStartTime,
            calendarEndTime,
            city,
            maxInd,
            maxPar,
            swishAmount, 
            maxImbalance,
            maxRegistrants,
            useRegistrationButton,
          }  
          events.push(event)
          previousEndDate=end
         
        })
        callback(events)
      } 
    })
}