import React from 'react';
import { connect } from 'react-redux'
import {tkColors} from 'Settings/tkColors'
import TextShow from 'Components/Text/TextShow'

// This component takles 2 props (groupId and TextId) and will return ta lists of the textBody from tbl_text in the database 
// Get the state from the Map the props that you want to pass to the State


const styles={
    root:{
            maxWidth:800,
            margin:'auto'                
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

const func = ({language}) => (
    <div style={styles.root}>        
            <TextShow style={styles.text} url={'/getTexts'} groupId={'Help'} textId={'Text'}> 
            {TEXT_MISSING[language]}
            </TextShow>  
    </div>
);

const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}    

export default connect(mapStateToProps)(func);    
  