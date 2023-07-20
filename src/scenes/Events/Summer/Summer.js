import React from 'react';
import Event from '../Event'
import tkColors, {linearGradient} from 'Settings/tkColors'
import { EVENT_TYPE } from 'Settings/Const';
import ScheduleEvent from 'scenes/Schedule/ScheduleEvent'

const text="Welcome to a week full of, first of all tango, good classes, live music, performances, lots of dancing, playful exploration and cosy and beautiful surroundings!\
Take inspiring workshops in tango with Anna Sol, Martin Nymann, Daniel Carlsson & Eva Lehrmann. You can come as a beginner or experienced dancer; there is something for everyone! We offer different packages or you pick the modules that fit you.\
The milongas in the evenings will have great tango music for you to dance to and there will be performances of the teachers and also from the choreography group of the festival. Also we have a live set being played by Bandonegro Tango Orquesta during the festival!\
And last but not least we hopefully end the week with a beautiful sunset and outdoor milonga! Come and enjoy tango; 100%!"

const background = linearGradient(tkColors.Summer.Light, tkColors.Summer.Dark)
const eventType=EVENT_TYPE.SUMMER
const banner=require('images/banner/summer_banner.jpg');
const photographer='Tangokompaniet'
const style = {
        // backgroundImage:`url(${img3})`,
        // backgroundRepeat:'no-repeat',
        color:tkColors.Summer.Light, 
        background: linearGradient(tkColors.Summer.Light, tkColors.Summer.Dark),
        height:40,
}
const formFields = [
        {
                type:'radio',
                label:'Dance role',
                name:'role',
                values:['LEADER', 'FOLLOWER', 'BOTH'],
                required:true
        },
        {
            type:'text',
            label:'First name',
            name:'firstName',
            required:true,
            style:{'textTransform':'capitalize'},

        },
        {
            type:'text',
            label:'Last name',
            name:'lastName',
            required:true,
            style:{'textTransform':'capitalize'},
        },
        {
                type:'email',
                label:'email',
                name:'email',
                required:true
        },
        {
            type:'textarea',
            cols:30,
            rows:2,
            maxLength:160,
            label:'Address',
            name:'address',
            required:true
        },
        {
            type:'text',
            label:'phone',
            name:'phone',
            required:true
        },
        {
            type:'radio',
            label:'Food preference',
            name:'food',
            values:['MEAT', 'VEGETARIAN', 'VEGAN'],
            required:true
        },
        {
                type:'text',
                label:'Food allergies',
                name:'allergies',
        },
        {
                type:'checkbox',
                label:'Have Dance Partner',
                name:'dancePartner',
        },
        {
            type:'text',
            label:'Partners first name',
            name:'firstNamePartner',
            required:true,
            notHiddenIf:'dancePartner',
            style:{'textTransform':'capitalize'},
        },
        {
                type:'text',
                label:'Partners last name',
                name:'lastNamePartner',
                required:true,
                notHiddenIf:'dancePartner',
                style:{'textTransform':'capitalize'},
        },
        {
                type:'email',
                label:'Partners email',
                name:'emailPartner',
                required:true,
                notHiddenIf:'dancePartner'
        },
        {
                type:'checkbox',
                label:'Helper',
                name:'helper',
        },
        {
                type:'text',
                label:'agentCode',
                name:'agentCode',
        },
        {
                type:'textarea',
                cols:30,
                rows:2,
                label:'How did you get info about the Summer Event ?',
                name:'comment',
                required:true,
        },
]


export const menuList = [
        {
                label:'Start',
        },
        {
                label:'Schedule',
        },
        {
                label:'Seminar',
        },
        {
                label:'Crew',
        },
        {
                label:'Prices',
        },
        {
                label:'Register',
                registrationComponent:React.cloneElement(<ScheduleEvent />, {eventType})
        },
        {
                label:'Venues',
        },
        {
                label:'Other information',
        },    
        {
                label:'Contact us',
        }
    ]
       

// More components
const Summer = () => (
    <Event 
        eventType = {eventType} 
        menuList = {menuList} 
        banner = {banner}
        photographer = {photographer}
        style = {style}
    />
);

export default Summer
