/* 
activeDow can be set to combinations of 1234567XD
1=Mo, 2=Tu, 
1234567 means all days and can be replaced D for daily
X is used to exclude days for example X67 means all days except Saturday and Sunday
*/

export const tkEvents = [
    {
        title:'Practica',
        start:'2017-06-01',
        end:'2017-10-31',
        description:'',
        address: 'Västgöta Nation',
        city: 'Lund',
        time:'20:30-23:00',
        excludeDateList:[],
        validDow:'D',  /* 1=Mo, 2=Tu, ... The string can be 1234567 or D for Daily (=1234567) or X for exclude X67 means 12345 */
    },
    {
        title:'Grundkurs 1',
        start:'2017-07-15',
        end:'2017-12-31',
        description:'',
        address: 'Västgöta Nation',
        city: 'Lund',
        time:'19:00-21:00',
        excludeDateList:[],
        validDow:'4',  /* 0=Su, 1=Mo, 2=Tu, ... The string can be 1234567 or D for Daily (=1234567) or X for exclude X67 means 12345 */
    },
];

export const tkEventsBig = [
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2017, 6, 0),
    'end': new Date(2017, 6, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 6, 7),
    'end': new Date(2017, 6, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2017, 8, 13, 0, 0, 0),
    'end': new Date(2017, 8, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2017, 6, 9, 0, 0, 0),
    'end': new Date(2017, 6, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2017, 6, 11),
    'end': new Date(2017, 6, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2017, 6, 12, 10, 30, 0, 0),
    'end': new Date(2017, 6, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2017, 6, 12, 12, 0, 0, 0),
    'end': new Date(2017, 6, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2017, 6, 12,14, 0, 0, 0),
    'end': new Date(2017, 6, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2017, 6, 12, 17, 0, 0, 0),
    'end': new Date(2017, 6, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2017, 6, 12, 20, 0, 0, 0),
    'end': new Date(2017, 6, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2017, 6, 13, 7, 0, 0),
    'end': new Date(2017, 6, 13, 10, 30, 0)
  }
]