import React from 'react';
import Inventory from 'scenes/Shop/Products/Inventory'
import GetOrder from 'scenes/School/Registration/GetOrder'
import Camera from 'Components/Camera'
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
import GetPresenceHistoryNew from 'scenes/School/Registration/GetPresenceHistoryNew'
import GetAbsenceHistory from 'scenes/School/Registration/GetAbsenceHistory'
import CreateCourse from 'scenes/Schedule/CreateCourse'
import CreatePackage from 'scenes/Schedule/CreatePackage'
import CreateWorkshop from 'scenes/Schedule/CreateWorkshop'
import Images from 'scenes/Shop/Products/Images'
import ImagesSubdir from 'scenes/Shop/Products/ImagesSubdir'


export const regList = [   
    { 
        titleSV:'Anmälan till social dans', 
        titleEN:'Registrations social',  
        titleES:'Aplicación social', 
        component:React.cloneElement(<GetRegistrationSocial />),

    },
    { 
        titleSV:'Anmälan (per schema)', 
        titleEN:'Registrations (by schedule)',  
        titleES:'Aplicación supuesto (argrupados per curso)', 
        component:React.cloneElement(<GetRegistrationBySchedule />),
    },
    { 
        titleSV:'Anmälan (per kurs)', 
        titleEN:'Registrations (by course)',  
        titleES:'Aplicación supuesto (argrupados per curso)', 
        component:React.cloneElement(<GetRegistrationByCourse />),
    },
    { 
        titleSV:'Anmälan (per lärarpar)', 
        titleEN:'Registrations (by teacher)', 
        titleES:'Aplicación supuesto (argrupar per profesor)', 
        component:React.cloneElement(<GetRegistrationByTeacher />),
    },
    { 
        titleSV:'Anmälan Maraton', 
        titleEN:'Registration MARATHON',  
        titleES:'Aplicación event', 
        component:React.cloneElement(<GetRegistrationMarathon />),
    },
    { 
        titleSV:'Anmälan Festival', 
        titleEN:'Registration Festival',  
        titleES:'Aplicación festival', 
        component:React.cloneElement(<GetRegistrationFestival />),
    },
    { 
        titleSV:'Anmälan Festival per Product', 
        titleEN:'Registration Festival by product',  
        titleES:'Aplicación festival en product', 
        component:React.cloneElement(<GetRegistrationFestivalByProduct />),
    },
    { 
        titleSV:'Anmälan Festival Totalt', 
        titleEN:'Registration Festival Totalt',  
        titleES:'Aplicación festival total', 
        component:React.cloneElement(<GetRegistrationFestivalTotal />),
    },
    { 
        titleSV:'Historik', 
        titleEN:'History', 
        titleES:'History', 
        component:React.cloneElement(<GetRegistrationHistory />),
    },
    { 
        titleSV:'Närvaro - registering + kommentar', 
        titleEN:'Precense - register + comment',  
        titleES:'Precensia - registrarse + commentario', 
        component:React.cloneElement(<GetPresence />),
    },
    { 
        titleSV:'Närvaro - historik', 
        titleEN:'Presence - history',  
        titleES:'Histora del presencia', 
        component:React.cloneElement(<GetPresenceHistory />),
    },
    { 
        titleSV:'Närvaro - historik (Ny)', 
        titleEN:'Presence - history (New)',  
        titleES:'Histora del presencia (Nuevo)', 
        component:React.cloneElement(<GetPresenceHistoryNew />),
    },
    { 
        titleSV:'Frånvaro - historik', 
        titleEN:'Absence - history',  
        titleES:'Historial de ausencia', 
        component:React.cloneElement(<GetAbsenceHistory />),
    },
    { 
        titleSV:'Lärarens noteringar', 
        titleEN:'Teachers notes',  
        titleES:'Las notas del maestro', 
        component:React.cloneElement(<GetTeacherNote />),
    },
    { 
        titleSV:'Lärarens noteringar (Ny)', 
        titleEN:'Teachers comment (New)',  
        titleES:'Profesor + commentario (Nuevo)', 
        component:React.cloneElement(<GetTeachersNoteNew />),
    },
]

export const scheduleList = [   
    { 
        titleSV:'Skapa kursschema', 
        titleEN:'Create course schedule', 
        titleES:'Horario de curso', 
        component:React.cloneElement(<CreateCourse />),
    },
    { 
        titleSV:'Skapa workshops', 
        titleEN:'Create workshop schedule', 
        titleES:'Horario de taller', 
        component:React.cloneElement(<CreateWorkshop />),
    },
    { 
        titleSV:'Skapa Festivalpaket', 
        titleEN:'Create package events', 
        titleES:'Package for event', 
        component:React.cloneElement(<CreatePackage />),
    },
    { 
        titleSV:'Omläggning av schema', 
        titleEN:'Reschedule schema', 
        titleES:'Cambio de horario', 
        component:React.cloneElement(<ScheduleChange />),  
    },
]    

export const cameraList = [   
    { 
        titleSV:'Generellt (root)', 
        titleEN:'General (root)', 
        titleES:'General (root)', 
        component:React.cloneElement(<Camera />),
    },
    { 
        titleSV:'Lärare', 
        titleEN:'Teacher', 
        titleES:'Profesor', 
        component:React.cloneElement(<Camera rootdir='teacher' />),
    },
    { 
        titleSV:'Maraton', 
        titleEN:'Marathon', 
        titleES:'Maratòn', 
        component:React.cloneElement(<Camera rootdir='marathon' />),
    },
    { 
        titleSV:'Påsk', 
        titleEN:'Easter', 
        titleES:'Pasqua', 
        component:React.cloneElement(<Camera rootdir='easter' />),
    },
    { 
        titleSV:'Sommar', 
        titleEN:'Summer', 
        titleES:'Summer', 
        component:React.cloneElement(<Camera rootdir='summer' />),
    },
    { 
        titleSV:'Festivalito', 
        titleEN:'Festivalito', 
        titleES:'Festivalito', 
        component:React.cloneElement(<Camera rootdir='festivalito' />),
    },
]

export const orderList = [   
    { 
        titleSV:'Beställning', 
        titleEN:'Order', 
        titleES:'Ordero', 
        component:React.cloneElement(<GetOrder />),
    },
    { 
        titleSV:'Skoaffär - bilder i huvudmap', 
        titleEN:'Shoe store - images i man dir', 
        titleES:'Zapatos - fotos de zapatos main-dir', 
        component:React.cloneElement(<Images />),
    },
    { 
        titleSV:'Skoaffär - bilder i undermapp', 
        titleEN:'Shoe store - img in sub-dir', 
        titleES:'Zapatos - fotos de subdirectorio', 
        component:React.cloneElement(<ImagesSubdir />),
    },
    { 
        titleSV:'Skoaffär - inventory', 
        titleEN:'Shoe stor - inventory', 
        titleES:'Zapatos - inventario', 
        component:React.cloneElement(<Inventory />),
    },
]  

export const tableList = [
    { 
        name:'tbl_news',
        titleSV:'Nyheter', 
        titleEN:'News', 
        titleES:'Noticias', 
    },
    { 
        name:'tbl_phonebook',
        titleSV:'Telefonbok', 
        titleEN:'Phonebook', 
        titleES:'Directorio telfónico', 
        button:{name:'Update Phonebook', link:'/updatePhonebook'},
    },
    { 
        name:'tbl_teacher',
        mandatoryColumns:['workshopId', 'nameEN'],
        titleSV:'Lärare', 
        titleEN:'Teacher', 
        titleES:'Maestro', 
    },
    { 
        name:'tbl_site',
        titleSV:'Danslokal', 
        titleEN:'Place', 
        titleES:'Sitio', 
    },
    {
        name:'tbl_course_def',
        titleSV:'Kurs definition', 
        titleEN:'Course definitions', 
        titleES:'Cursos programados', 
    },
    {
        name:'tbl_course',
        sortBy:['productId'],
        titleSV:'Kurs schema', 
        titleEN:'Course schedule', 
        titleES:'Hourario de los cursos', 
    },
    { 
        name:'tbl_price_group',
        titleSV:'Prisgrupp', 
        titleEN:'Pricegroup', 
        titleES:'Grupo de precios', 
    },
    {
        name:'tbl_schedule_def',
        titleSV:'Event schema', 
        titleEN:'Event schedule', 
        titleES:'Event horario', 
    },
    {
        name:'tbl_workshop',
        sortBy:['productId'],
        titleSV:'Workshop schema', 
        titleEN:'Workshop schedule', 
        titleES:'Hourario de workshop', 
    },
    {
        name:'v_marathon_names',
        titleSV:'Maraton namnlista', 
        titleEN:'Marathon namelist', 
        titleES:'Nombre en marathon', 
        url:'/admin/tktableWithoutId?tableName=v_marathon_names'

    },
    {
        name:'tbl_course_type',
        titleSV:'Kursgruppering', 
        titleEN:'Course grouping', 
        titleES:'Agroupacion de courses', 
    },
    {
        name:'tbl_text',
        titleSV:'Texter (tbl_text)', 
        titleEN:'Text (tbl_text)', 
        titleES:'Text (tbl_text)', 
    },
    {
        name:'tbl_form_fields',
        titleSV:'Formulär (tbl_form_fields)', 
        titleEN:'Forms (tbl_form_fields)', 
        titleES:'Forms (tbl_form_fields)', 
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

