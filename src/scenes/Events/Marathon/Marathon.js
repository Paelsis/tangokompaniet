import React from 'react';
import Event from '../Event'
import tkColors, {linearGradient} from 'Settings/tkColors'
import { EVENT_TYPE } from 'Settings/Const';

import ScheduleMarathon from 'scenes/Schedule/ScheduleMarathon'

const banner=require('images/banner/maraton_banner.jpg');
const photographer='Tangokompaniet'
const background = linearGradient(tkColors.Marathon.Light, tkColors.Marathon.Dark)
const eventType=EVENT_TYPE.MARATHON
const style = {
        // backgroundImage:`url(${img3})`,
        // backgroundRepeat:'no-repeat',

        color:tkColors.Marathon.Light, 
        background: linearGradient(tkColors.Marathon.Light, tkColors.Marathon.Dark),
        height:40,
    }

const text= 
"Ett tangomaraton är en förlängd weekend med dygnet-runt-dans för tangonördar. \
Man avsätter helt enkelt en helg åt non-stop tangodans. Tangomaraton skiljer sig från festivaler genom \
att de inte har live music utan dansar endast till DJ. På ett maraton pågår nästan hela dygnet under 3-5 dagar med uppehåll förknippning \
sömn mellan 6-12 varje dag. På ett tangomaraton finns inga kurser och det är avset för den \
erfarne dansaren. Det krävs ofta ett par års danserfarenhet för att bli medtagen på \
ett tangomaraton. Det är ofta lättare för förare än följare att komma in på ett maraton. I \
Europa finns idag ofta minst ett maraton per vecka att åka till. Normalpris i västeruopa är 100-200 EUR \
beroende av om där serveras mat eller ej. I östeuropa är maratonen ofta billigare, menllan 40-80 EUR. \
Tangokompaniet har ett normalt ett eller två maraton om året."

const today = new Date();
const yyyy = today.getFullYear();


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
            style:{'textTransform':'capitalize'}
        },
        {
            type:'text',
            label:'Last name',
            name:'lastName',
            required:true,
            style:{'textTransform':'capitalize'}
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
                style:{'textTransform':'capitalize'}

        },
        {
                type:'text',
                label:'Partners last name',
                name:'lastNamePartner',
                required:true,
                notHiddenIf:'dancePartner',
                style:{'textTransform':'capitalize'}

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
                label:'How did you get info about the marathon ?',
                name:'comment',
                required:true,
        },
    ]
    
export const menuList = [
        {
                label:'The concept',
                style,
        },
        {
                label:'Schedule',
                style,
        },
        {
                label:'DJs',
        },
        {
                label:'Agents and helpers',
        },
        {
                label:'Contact us',
        },
        {
                label:'The venue',
        },
        {
                label:'Getting there',
        },
        {
                label:'Sleeping',
        },
        {
                label:'Eating and drinking',
        },
        {
                label:'Prices',
        },
        {
                label:'Register',
                registrationComponent:React.cloneElement(<ScheduleMarathon />, {eventType}),
        },
        {
                label:'Past marathons',
        }    
    ]
            

const Marathon = () => (
      <Event 
        eventType = {eventType} 
        menuList = {menuList}
        banner = {banner}
        photographer = {photographer}
        style = {style}
      />
);

export default Marathon
