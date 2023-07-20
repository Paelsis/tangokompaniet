import React, {useState} from 'react'
import { connect } from 'react-redux'
import Button from 'Components/Button';
import { makeStyles } from '@material-ui/core/styles';
import tkColors,{boxShadowValue} from 'Settings/tkColors'

import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES, setLanguage} from 'redux/actions/actionsLanguage'

const styles = {
  contained:color => ({
    color:tkColors.background,
    borderColor:tkColors.background,
    backgroundColor:color,
  }),
  outlined:color => ({
    color:color,
    borderColor:color,
    backgroundColor:'transparent',
    boxShadow:boxShadowValue(color)
  })
  }


const LANGUAGE = {
  'SV':'Svenska',
  'EN':'English',
  'ES':'Espanol',
} 

const LanguageButton = ({language, setLanguage, globalStyle}) => {
  const myStyle = it => language===it?styles.contained(globalStyle.color):styles.outlined(globalStyle.color)
  const languages = [LANGUAGE_SV, LANGUAGE_EN, LANGUAGE_ES]
  return (
    <div>
        {languages.map((it) =>
          <button className="button" 
            key={it}
            style={myStyle(it)}
            onClick={()=>setLanguage(it)}
          >
            {LANGUAGE[it]} 
          </button>
        )}  
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
      globalStyle:state.style,
      language: state.language,
  }   
}

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      setLanguage: language => dispatch(setLanguage(language)),
  }        
}


export default connect(mapStateToProps, mapDispatchToProps)(LanguageButton)

