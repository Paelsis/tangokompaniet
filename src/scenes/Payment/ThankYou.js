import React from 'react';
import {connect} from 'react-redux'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage' 
import config from 'Settings/config'

const baseUrl=config[process.env.NODE_ENV].baseUrl;

const mapStateToProps = state => {
    return {
      language: state.language
    }
}


const _ThankYou = (props) => {
  return (
      <div>
        <div>  
        {props.language===LANGUAGE_SV?'Klicka på knappen nedan om du vill återgå till Tangokompaniets hemsida'
            :props.language===LANGUAGE_ES?'Haga clic en el botón de abajo para regresar a nuestro sitio Tangokompaniet'
            :'Click on button below to return to homepage of Tangokompaniet'}
        </div>
        <a href={baseUrl}>
        <button className="button" className={props.classes.button}>
                {props.language===LANGUAGE_SV?'Hem'
                :props.language===LANGUAGE_ES?'Casa'
                :'Home'}
        </button>
        </a>
      </div>
  );
}



export default connect(mapStateToProps, null)  (_ThankYou);    
