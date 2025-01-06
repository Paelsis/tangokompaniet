import React from 'react';
import Inventory from 'scenes/Shop/Products/Inventory'
import GetOrder from 'scenes/School/Registration/GetOrder'
import Camera from 'camera/Camera'
import GetRegistrationBySchedule from 'scenes/School/Registration/GetRegistrationBySchedule'
import GetRegistrationByCourse from 'scenes/School/Registration/GetRegistrationByCourse'
import GetRegistrationByTeacher from 'scenes/School/Registration/GetRegistrationByTeacher'
import GetRegistrationSocial from 'scenes/School/Registration/GetRegistrationSocial'
import GetRegistrationMarathon from 'scenes/School/Registration/GetRegistrationMarathon'
import GetRegistrationFestival from 'scenes/School/Registration/GetRegistrationFestival'
import GetRegistrationFestivalByProduct from 'scenes/School/Registration/GetRegistrationFestivalByProduct'
import GetRegistrationFestivalTotal from 'scenes/School/Registration/GetRegistrationFestivalTotal'
import GetRegistrationHistory from 'scenes/School/Registration/GetRegistrationHistory'
import ScheduleChange from 'scenes/Schedule/ScheduleChange'
import GetTeacherNote from 'scenes/School/Registration/GetTeacherNote'
import GetTeachersNoteNew from 'scenes/School/Registration/GetTeachersNoteNew'
import GetPresence from 'scenes/School/Registration/GetPresence'
import GetPresenceHistory from 'scenes/School/Registration/GetPresenceHistory'
import GetPresenceHistoryMatrix from 'scenes/School/Registration/GetPresenceHistoryMatrix'
import GetAbsenceHistory from 'scenes/School/Registration/GetAbsenceHistory'
import CreateCourse from 'scenes/Schedule/CreateCourse'
import CreatePackage from 'scenes/Schedule/CreatePackage'
import CreateWorkshop from 'scenes/Schedule/CreateWorkshop'
import Images from 'scenes/Shop/Products/Images'
import ImagesSubdir from 'scenes/Shop/Products/ImagesSubdir'
import MailText from 'scenes/Mails/MailText'


export const regList = [   
    { 
        titleSV:'Anmälan till social dans', 
        titleEN:'Registrations social',  
        component:React.cloneElement(<GetRegistrationSocial />),

    },
    { 
        titleSV:'Anmälan (per schema)', 
        titleEN:'Registrations (by schedule)',  
        component:React.cloneElement(<GetRegistrationBySchedule />),
    },
    { 
        titleSV:'Anmälan (per kurs)', 
        titleEN:'Registrations (by course)',  
        component:React.cloneElement(<GetRegistrationByCourse />),
    },
    { 
        titleSV:'Anmälan (per lärarpar)', 
        titleEN:'Registrations (by teacher)', 
        component:React.cloneElement(<GetRegistrationByTeacher />),
    },
    { 
        titleSV:'Anmälan Maraton', 
        titleEN:'Registration MARATHON',  
        component:React.cloneElement(<GetRegistrationMarathon />),
    },
    { 
        titleSV:'Anmälan Festival', 
        titleEN:'Registration Festival',  
        component:React.cloneElement(<GetRegistrationFestival />),
    },
    { 
        titleSV:'Anmälan Festival per Product', 
        titleEN:'Registration Festival by product',  
        component:React.cloneElement(<GetRegistrationFestivalByProduct />),
    },
    { 
        titleSV:'Anmälan Festival Totalt', 
        titleEN:'Registration Festival Totalt',  
        component:React.cloneElement(<GetRegistrationFestivalTotal />),
    },
    { 
        titleSV:'Historik', 
        titleEN:'History', 
        component:React.cloneElement(<GetRegistrationHistory />),
    },
    { 
        titleSV:'Lärarens noteringar', 
        titleEN:'Teachers comment',  
        component:React.cloneElement(<GetTeachersNoteNew />),
    },
    { 
        titleSV:'Närvaro - registering', 
        titleEN:'Precense - register',  
        component:React.cloneElement(<GetPresence />),
    },
    { 
        titleSV:'Närvaro - tabell', 
        titleEN:'Presence - table',  
        component:React.cloneElement(<GetPresenceHistory />),
    },
    { 
        titleSV:'Närvaro - kryss-markeringar', 
        titleEN:'Presence - cross-marks',  
        component:React.cloneElement(<GetPresenceHistoryMatrix />),
    },
    { 
        titleSV:'Frånvaro - tabell', 
        titleEN:'Absence - history',  
        component:React.cloneElement(<GetAbsenceHistory />),
    },
    { 
        titleSV:'Mail text', 
        titleEN:'Mail text',  
        component:React.cloneElement(<MailText />),
    },
    /*
    { 
        titleSV:'Lärarens noteringar', 
        titleEN:'Teachers notes',  
        titleES:'Las notas del maestro', 
        component:React.cloneElement(<GetTeacherNote />),
    },
    */
]

export const scheduleList = [   
    { 
        titleSV:'Kurser', 
        titleEN:'Courses', 
        component:React.cloneElement(<CreateCourse />),
    },
    { 
        titleSV:'Workshops', 
        titleEN:'Workshops', 
        component:React.cloneElement(<CreateWorkshop />),
    },
    { 
        titleSV:'Festivalpaket', 
        titleEN:'Festival packages', 
        component:React.cloneElement(<CreatePackage />),
    },
    { 
        titleSV:'Omläggning av existierande schema', 
        titleEN:'Reschedule existing schema', 
        component:React.cloneElement(<ScheduleChange />),  
    },
]    

export const cameraList = [   
    { 
        titleSV:'Generellt (root)', 
        titleEN:'General (root)', 
        component:React.cloneElement(<Camera rootdir=''/>),
    },
    { 
        titleSV:'Lärare', 
        titleEN:'Teacher', 
        component:React.cloneElement(<Camera rootdir='teacher' />),
    },
    { 
        titleSV:'Maraton', 
        titleEN:'Marathon', 
        component:React.cloneElement(<Camera rootdir='marathon' />),
    },
    { 
        titleSV:'Påsk', 
        titleEN:'Easter', 
        component:React.cloneElement(<Camera rootdir='easter' />),
    },
    { 
        titleSV:'Sommar', 
        titleEN:'Summer', 
        component:React.cloneElement(<Camera rootdir='summer' />),
    },
    { 
        titleSV:'Festivalito', 
        titleEN:'Festivalito', 
        component:React.cloneElement(<Camera rootdir='festivalito' />),
    },
]

export const orderList = [   
    { 
        titleSV:'Beställning', 
        titleEN:'Order', 
        component:React.cloneElement(<GetOrder />),
    },
    { 
        titleSV:'Skoaffär - bilder i huvudmap', 
        titleEN:'Shoe store - images i man dir', 
        component:React.cloneElement(<Images />),
    },
    { 
        titleSV:'Skoaffär - bilder i undermapp', 
        titleEN:'Shoe store - img in sub-dir', 
        component:React.cloneElement(<ImagesSubdir />),
    },
    { 
        titleSV:'Skoaffär - inventory', 
        titleEN:'Shoe stor - inventory', 
        component:React.cloneElement(<Inventory />),
    },
]  

export const tableList = [
    { 
        name:'tbl_news',
        titleSV:'Nyheter', 
        titleEN:'News', 
    },
    { 
        name:'tbl_phonebook',
        titleSV:'Telefonbok', 
        titleEN:'Phonebook', 
        button:{name:'Update Phonebook', link:'/updatePhonebook'},
    },
    { 
        name:'tbl_teacher',
        mandatoryColumns:['workshopId', 'nameEN'],
        titleSV:'Lärare', 
        titleEN:'Teacher', 
    },
    { 
        name:'tbl_site',
        titleSV:'Danslokal', 
        titleEN:'Place', 
    },
    {
        name:'tbl_course_def',
        titleSV:'Kurs definition', 
        titleEN:'Course definitions', 
    },
    {
        name:'tbl_course',
        sortBy:['productId'],
        titleSV:'Kurs schema', 
        titleEN:'Course schedule', 
    },
    { 
        name:'tbl_price_group',
        titleSV:'Prisgrupp', 
        titleEN:'Pricegroup', 
        titleES:'Grupo de precios', 
    },
    {
        name:'tbl_schedule_def',
        titleSV:'Festival/Maraton schema', 
        titleEN:'Festival/Maratthon schedule', 
    },
    {
        name:'tbl_workshop',
        sortBy:['productId'],
        titleSV:'Workshop schema', 
        titleEN:'Workshop schedule', 
    },
    {
        name:'v_marathon_names',
        titleSV:'Maraton namnlista', 
        titleEN:'Marathon namelist', 
        url:'/admin/tktableWithoutId?tableName=v_marathon_names'

    },
    {
        name:'tbl_course_type',
        titleSV:'Kursgruppering', 
        titleEN:'Course grouping', 
    },
    {
        name:'tbl_text',
        titleSV:'Texter (tbl_text)', 
        titleEN:'Text (tbl_text)', 
    },
    {
        name:'tbl_form_fields',
        titleSV:'Formulär (tbl_form_fields)', 
        titleEN:'Forms (tbl_form_fields)', 
    },
    /*
    { 
        name:'tbl_order',
        titleSV:'Beställning', 
        titleES:'Orden', 
        titleEN:'Order', 
        url:'/admin/tktableWithoutId?tableName=tbl_order'
    },
    { 
        name:'tbl_order_product',
        titleSV:'Varor per beställning', 
        titleES:'Bienes ordenados', 
        titleEN:'Products ordered', 
    },
    */
]

