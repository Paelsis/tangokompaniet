import React from 'react';
import { useParams } from 'react-router-dom';
import tkColors from 'Settings/tkColors'
import Background from 'images/other/VästraHamnen.jpeg';
import TextShow from 'Components/Text/TextShow'
import {LANGUAGE_SV, LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'


const styles = {
    root:{flex: 1,
        marginRight:'auto',
        marginLeft:'auto',
        resizeMode: 'contain',
        minHeight:'100vh',
        maxWidth:800,
        backgroundImage: `url(${Background})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        opacity:0.8,
        textAlign:'center',
        color:tkColors.Purple.Light,
    }, 
    footer:{
        position:'absolute',
        align:'center',
        width:'100%', 
        maxWidth:800,
        bottom:0,
        height:100   /* Height of the footer */
    }
}

const TEXTS = (groupId, textId) => ({
    NO_TEXT:{   
        SV:'Ingen text funnen i database tabell tbl_text för groupId = ' + groupId + ' och textId = ' + textId + '. Vänligen editera texten !!!',
        EN:'No text found in tbl_text for groupId = ' + groupId + ' and textId = ' + textId + '. Please fill in !!!',
        ES:'No se encontró texto en la tabla de base de datos tbl_text para groupId = ' + groupId +' y textId = ' + textId + '. Por favor, edite el texto',
    },    
})


const CallbackText = props => {
    const params = useParams();
    const groupId = params.groupId?params.groupId:''
    const textId = params.textId?params.textId:'' // params.amount is expressed in minimum units (ören)
    const language = params.language===LANGUAGE_SV || params.language===LANGUAGE_ES?params.language:LANGUAGE_EN

    // Return 
    return(
        <div style={styles.root}>
            <TextShow url={'/getTexts'} groupId={groupId} textId={textId} language={language} >
                <h2>{TEXTS(groupId, textId).NO_TEXT[language]}</h2>
            </TextShow>
        </div>   
    )
};

export default CallbackText;