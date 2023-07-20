import React, {useState} from 'react';
import RenderCoHeader from './RenderCoHeader'
import RenderCoRegHeader from './RenderCoRegHeader'
import TextShow from 'Components/Text/TextShow';
import Button from 'Components/Button';
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

import tkColors from 'Settings/tkColors';
import {renderRegLine} from './RenderCoRegLine'

const background = courseType => {
        switch (courseType) {
            case 'GK':return 'linear-gradient(45deg, #81185B 0%,  #330a41 100%)'
            case 'FK':return 'linear-gradient(45deg, #81185B 0%,  #330a41 100%)'
            case 'HK':return 'linear-gradient(45deg, blue 0%,  #330a41 100%)'
            case 'TE':return 'linear-gradient(45deg, red 0%,  #330a41 100%)'
            case 'XX':return 'linear-gradient(45deg, orange 0%,  #330a41 100%)'
        }    
    }
    
const boxColor = courseType => {
switch (courseType) {
        case 'GK':return '#81185B'
        case 'FK':return '#81185B'
        case 'HK':return 'blue'
        case 'TE':return 'red'
        case 'XX':return 'orange'
}    
}

    

const styles = {
    container:{
        marginLeft:'auto',
        margihRight:'auto',
        display:'flex', 
        flexDirection:'column'
    },
    text:{
        textAlign:'left',
        marginLeft:'auto',
        marginRight:'auto',
    },
    button:{
        size:'small',
        marginLeft:'auto',
        marginRight:'auto',
    },
};
// RenderText
export default ({textId, language, setTextId}) => {
        return (
                <div className='column is-full columns is-narrow is-centered'>
                        <div className='column is-2'>
                            <Button variant="outlined" onClick={()=>setTextId(undefined)}>
                                    {language===LANGUAGE_SV?'Gå tillbaka'
                                    :language===LANGUAGE_ES?'Para volver, haga clic.'
                                    :'Go back'}
                            </Button>    
                        </div>
                        <div className='column is-6'>
                            <TextShow url={'/getTexts'} style={styles.text} groupId={'Course'} textId={textId} language={language}>
                            <h4>Enter text for groupId={'Course'} and textId={textId} ...</h4>
                            </TextShow>
                        </div>
                </div>
        ) 
}
    