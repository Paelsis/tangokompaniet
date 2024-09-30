import React, {useState, useEffect} from "react"
import EditText from 'Components/Text/EditText';

const styles = {
    event:{
        width:'100%',
        textAlign:'center'
    },
    language:{
        width:'100%',
        textAlign:'center'
    },
    label:{
        width:'100%',
        textAlign:'center'
    },
    table:{width:100, fontSize:10},
    thead:{color:'white'},
    th:{color:'white'},
    active:{backgroundColor:'black', color:'yellow'},
    inactive:{backgroundColor:'whitesmoke', color:'black'},
}

const _EditText = ({groupId, textId, language}) =>   <EditText url='/getTexts' groupId={groupId} textId={textId} overruleLanguage={language} />


const mailText = [
    /*
    {
        eventName:'COURSE',
            list:[
            {
                label:'Subject',
                groupId:'MAIL_COURSE', 
                textId:'SUBJECT' ,
            },
            {
                label:'Body',
                groupId:'MAIL_COURSE', 
                textId:'BODY', 
            },
            {
                label:'Legal',
                groupId:'MAIL_COURSE', 
                textId:'LEGAL', 
            },
            {
                label:'Thank you',
                groupId:'MAIL_COURSE', 
                textId:'THANK_YOU', 
            },
        ],
    },
    */
    {
        eventName:'MARATHON',
        list:[
        {
            label:'Subject',
            groupId:'MAIL_MARATHON', 
            textId:'SUBJECT', 
        },
        {
            label:'Body',
            groupId:'MAIL_MARATHON', 
            textId:'BODY', 
        },
        {
            label:'Legal',
            groupId:'MAIL_MARATHON', 
            textId:'LEGAL', 
        },
        {
            label:'Thank you',
            groupId:'MAIL_MARATHON', 
            textId:'THANK_YOU', 
        },
    ]},
    {
        eventName:'EASTER',
        list:[
            {
                label:'Subject',
                groupId:'MAIL_EASTER', 
                textId:'SUBJECT', 
            },
            {
                label:'Body',
                groupId:'MAIL_EASTER', 
                textId:'BODY', 
            },
            {
                label:'Legal',
                groupId:'MAIL_EASTER', 
                textId:'LEGAL', 
            },
            {
                label:'Thank you',
                groupId:'MAIL_EASTER', 
                textId:'THANK_YOU', 
            },
        ],
    },    
    {eventName:'SUMMER',
        list:[
            {
                label:'Subject',
                groupId:'MAIL_SUMMER', 
                textId:'SUBJECT', 
            },
            {
                label:'Body',
                groupId:'MAIL_SUMMER', 
                textId:'BODY', 
            },
            {
                label:'Legal',
                groupId:'MAIL_SUMMER', 
                textId:'LEGAL', 
            },
            {
                label:'Thank you',
                groupId:'MAIL_SUMMER', 
                textId:'THANK_YOU', 
            },
        ]
    },
    {
        eventName:'FESTIVALITO',
        list:[
            {
                label:'Subject',
                groupId:'MAIL_FESTIVALITO', 
                textId:'SUBJECT', 
            },
            {
                label:'Body',
                groupId:'MAIL_FESTIVALITO', 
                textId:'BODY', 
            },
            {
                label:'Legal',
                groupId:'MAIL_FESTIVALITO', 
                textId:'LEGAL', 
            },
            {
                label:'Thank you',
                groupId:'MAIL_FESTIVALITO', 
                textId:'THANK_YOU', 
            },
        ],
    }    
]


export default () => {
    return(
        <div className='has-background-primary' style={{width:'100vw'}}>
            <h3 className='title is-3 has-text-light' style={styles.event}>Mail texts</h3>

            {mailText.map(ev=>
                <div className='has-text-light has-background-link'>
                    <h4 className='title is-4 has-text-light has-background-danger' style={styles.event}>{ev.eventName}</h4>
                    {['SV', 'EN'].map(language=>
                        <div className='has-text-light has-background-link'>
                            <h5 className='title is-5 has-text-light' style={styles.language}>Language = {language}</h5>
                            <div className='columns is-centered has-text-dark has-background-warning m-0 p-0 is-multiline'>
                                {ev.list.map(it=>
                                    <div className='column is-3 is-narrow'>
                                        <h6 className='title is-6' style={styles.label}>{it.label}</h6>
                                        <_EditText 
                                            groupId={it.groupId} 
                                            textId={it.textId} 
                                            language={language}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}       
        </div>        
    )
}





