
import React from 'react'
import Weekdays from 'Settings/Weekdays';
import {PRODUCT_TYPE} from 'Settings/Const'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const TEXTS = {
    COURSE_FULL:{
        SV:'Kursen är full. Du är placerad på väntlista',
        EN:'Course is full. You are put on waitlist'
    },   
    COURSE_GENDER_IMBALANCE: {
        SV:'Kursen har har för tillfället obalans mellan följare och förare. Du är placerad på väntlista för partner.',
        EN:'This course currently suffer of gender imbalance. You are put on waitlist for partner' 
    },    
    MARATHON_FULL:{
        SV:'Detta maraton är fullbokat. Du är satt på väntelista',
        EN:'This marathon is fully booked. You are put on waitlist'
    },   
    MARATHON_GENDER_IMBALANCE: {
        SV:'Detta maraton har för tillfället har obalans mellan följare och förare. Du är placerad på väntlista för partner.',
        EN:'This marathon currently suffer of gender imbalance between followers and leaders. You are put on waitlist for partner.' 
    },    
    WORKSHOP_FULL:{
        SV:'Denna workshop är fullbokad. Du är placerad på väntlista',
        EN:'This workshop is fully booked. You are put on waitlist'
    },   
    WORKSHOP_GENDER_IMBALANCE: {
        SV:'Denna workshop har har obalans mellan följare och förare. Du är placerad på väntlista för partner.',
        EN:'This workshop currently suffer of gender imbalance. You are put on waitlist for partner' 
    }, 
    START_DATE:{
        SV:'Startdatum',
        EN:'Starts at date'
    },   
    LEADER:{
        SV:'förare',
        EN:'leader'
    },
    FOLLOWER:{
        SV:'följare',
        EN:'follower'
    }
}

const Item = (props) => {
    const language=props.language;
    const weekday = Weekdays[props.language][props.dayOfWeek-1];   
    const startDate=TEXTS['START_DATE'][language] + ':' + props.startDate;
    const price=props.debitable?props.price:'';
    const courseFull=props.courseFull;
    const genderSurplus = ((props.leader && props.leaderSurplus >= props.genderBalance) || 
                           (!props.leader && props.followerSurplus >= props.genderBalance));
    const name = language===LANGUAGE_SV?props.nameSV:
       language===LANGUAGE_ES?props.nameES:
       props.nameEN
    // console.log('Function Item(), props=', props)
    return (
        <div style={props.style}>
            {props.productType === PRODUCT_TYPE.COURSE?
                <div>
                    {courseFull?
                        TEXTS['COURSE_FULL'][language]
                    :genderSurplus?
                        TEXTS['COURSE_GENDER_IMBALANCE'][language]
                    :null}  
                    {name?name + ' ':null} 
                    {' ' + props.city + ' ' + weekday + ' ' + props.startTime + ' ' + startDate + ' ' +  price + ' ' + props.currency}   
                </div>
            :props.productType === PRODUCT_TYPE.WORKSHOP?
            <div>
                    {courseFull?
                        TEXTS['WORKSHOP_FULL'][language]
                    :genderSurplus?
                        TEXTS['WORKSHOP_GENDER_IMBALANCE'][language]
                    :null}  
                    {name?name + ' ':null} 
                    {' ' + props.city + ' ' + weekday + ' ' + startDate + ' ' + props.startTime + ' ' +  price + ' ' + props.currency}   
            </div>
            :props.productType === PRODUCT_TYPE.MARATHON?
            <div>
                    {courseFull?
                        <div>{TEXTS['MARATHON_FULL'][language]}</div>
                    :genderSurplus?
                        <div>{TEXTS['MARATHON_GENDER_IMBALANCE'][language]}</div>
                    :null}  
                    {name?name + ' ':null} 
                    {' ' + props.city + ' ' + props.startDate + ' - ' +  props.endDate + price + ' ' + props.currency}   
                </div>
            :props.productType === PRODUCT_TYPE.PACKAGE?
                name?name + ' ':null + ' ' + price + ' ' + props.currency   
            :props.productType === PRODUCT_TYPE.SHOE?
                props.productId + ' ' + props.value + ' ' + price + ' ' + props.currency   
            :
                props.productType + ' ' + props.productId + ' ' + price + ' ' + props.currency   
            }
        </div>
     ) 
}
  
export default Item;  