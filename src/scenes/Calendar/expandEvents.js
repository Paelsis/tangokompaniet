import moment from 'moment';

// Duplicate Events
const duplicateEvent = (event, rrule) => {
    const momentFreq = (FREQ) => {
        let freq
        switch (FREQ) {
            case 'DAILY':
                freq='days';
            case 'WEEKLY':
                freq='weeks';
            case 'MONTHLY':
                freq='months';
            case 'YEARS':
                freq='years';
            default:
                freq='weeks';    
        }
        return freq
    }

    let start=moment(event.start);
    let end=moment(event.end);
    let endDate = rrule.UNTIL?moment(rrule.UNTIL).clone():moment().clone().add(0.5, 'years')
    let freq = momentFreq(rrule.FREQ);
    let interval = rrule.INTERVAL;
    console.log('dublicate event start:', start)
    console.log('dublicate event end:', end)
    console.log('dublicate event endDate:', endDate)
    console.log('INTERVAL:', interval)
    console.log('FREQ:', freq)
    let maxCount=rrule.COUNT?rrule.COUNT:100;
    let count=0;
    while ((start < endDate) && (count < maxCount))  {
        start.add(interval?interval:1, freq);
        end.add(interval?interval:1, freq);
        let strLog='start:'+ start.format('YYYY-MM-DD HH:mm') + ' end:'+ end.format('YYYY-MM-DD HH:mm') + ' count:' + count;
        console.log(strLog)
        count++;
    }
}
// Expand events
export function expandEvents (events) {
    // rruleObject
    function rruleObject(rruleFields) {
        let dates=[];
        let count=1;

        let rrule={
            FREQ:null,
            COUNT:0,
            INTERVAL:0,
            UNTIL:null,
            BYDAY:null
        }
        rruleFields.forEach(field => { 
            let name=field.split('=')[0];
            let value=field.split('=')[1];
            let strLog='name=' + name + ' value=' + value
            switch (name) {
                case 'FREQ':
                    rrule.FREQ=value;                        
                    break;
                case 'COUNT':
                    rrule.COUNT=value;
                    break;
                case 'INTERVAL':
                    rrule.INTERVAL=value;                        
                    break;
                case 'UNTIL':
                    rrule.UNTIL=value;
                    break;
                case 'BYDAY':
                    rrule.BYDAY=value        
                    break;
                default:
                    break;    
            }
        })        
        return rrule;
    }

    // Here starts the function
    let rrule1='RRULE:FREQ=WEEKLY;COUNT=5;INTERVAL=2;BYDAY=SU'
    //let rrule2="RRULE:FREQ=WEEKLY;UNTIL=20171223T120000Z;BYDAY=SA";
    let arr = []

    // Loop over Ants    
    events.forEach((event) => {
        arr.push(event);

        // Check if there is any recurrence 
        if (event.recurrence?true:false) {
            event.recurrence.forEach(rr =>{
                let rrule = rruleObject(rr.split(':')[1].split(';')) 
                console.log('XXXXXXXXXXXXX rrule', rrule);

                // Duplicate the events with repect to the RRULE 
                duplicateEvent(event, rrule);

                
            })    
        }
    })    
}    
/*
export function recurrenceEvents(events) {

    let arr = []
    events.forEach((event) => {
      arr.push(event);

    //  if (event.recurrence?true:false) {
        console.log(event.title);

        let endDateRecurrance = moment('20191031', 'YYYYMMDD');
        let nextStart=moment('20170728', 'YYYYDDMM').add(1, 'week') ;
        let nextEnd=moment('20170728', 'YYYYDDMM').add(1,'week');
        while (nextEnd <= endDateRecurrance) {
          console.log('1111111111111111111111111');
          arr.push(
              {start: nextStart, end: nextEnd, title: event.title, }  
          )
          nextStart=nextStart.add(1, 'week') 
          nextEnd=nextEnd.add(1, 'week') 
        }  
    //  }  
    })
    return arr
} 
*/  
