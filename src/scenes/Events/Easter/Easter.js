import React from 'react';
import Event from '../Event'
import tkColors, {linearGradient} from 'Settings/tkColors'
import { EVENT_TYPE } from 'Settings/Const';
import ScheduleEvent from 'scenes/Schedule/ScheduleEvent'

const text="Påskfestivalen är en lite större festival med dans och undervisning"

const background = linearGradient(tkColors.Easter.Light, tkColors.Easter.Dark)
const eventType=EVENT_TYPE.EASTER
const banner=require('images/banner/easter_banner.jpg');
const photographer='Tangokompaniet'
const style = {
        // backgroundImage:`url(${img3})`,
        // backgroundRepeat:'no-repeat',
        color:tkColors.Festivalito.Light, 
        background: linearGradient(tkColors.Festivalito.Light, tkColors.Festivalito.Dark),
        height:50,
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
        /*
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
        */
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
                label:'How did you get info about the Easter Festivalito ?',
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
                label:'Teachers',
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
                label:'Contact Us',
        }
]
    
       
// More components
const Easter = () => (
    <Event 
        eventType={eventType} 
        menuList={menuList} 
        banner={banner}
        photographer={photographer}
        style={style}
    />
);

export default Easter
