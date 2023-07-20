import React from 'react';
import {connect} from 'react-redux'
import {tkColors} from 'Settings/tkColors'
import TextShow from 'Components/Text/TextShow'
import Background from 'images/under-construction-1.png';

// This component takles 2 props (groupId and TextId) and will return ta lists of the textBody from tbl_text in the database 
// Get the state from the Map the props that you want to pass to the State


const styles={
    root:{
        color:tkColors.Text.Dark,
        maxWidth:1000,
        width: '100%',
        margin:'auto',
        padding:20,
        flex: 1,
        resizeMode: 'contain' 
    },
    text:{
        position:'relative',
        left:0,
        margin:20,
    }
}

const TEXT_MISSING = {
    ['SV']:"Text saknas",
    ['ES']:"Falta texto",
    ['EN']:"Text missing",
}

const Comp = ({groupId, textId, language}) => (
    <div style={styles.root}>        
            <TextShow style={styles.text} url={'/getTexts'} groupId={groupId} textId={textId}> 
            {TEXT_MISSING[language]}
            </TextShow>  
    </div>
);

const mapStateToProps = (state) => {
    return {
        groupId:'About',
        textId:'Text',    
        language: state.language
    }
}    

export default connect(mapStateToProps)(Comp);    
  