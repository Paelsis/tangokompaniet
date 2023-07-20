import React from 'react'
import tkColors from 'Settings/tkColors';
import Background from 'images/swish_vertical_main_rgb.png';

const BACKGROUND_COLOR_DEFAULT=tkColors.Purple.Light
const BACKGROUND_COLOR_1='rgba(129, 24, 92, 1.0)'
const BACKGROUND_COLOR_2='rgba(163, 163, 163)'
const BACKGROUND_COLOR_3='linear-gradient(45deg, #BE6B8B 30%, #FF8E53 90%)'
const BACKGROUND_COLOR_4=tkColors.Purple.Light

const styles={
    enabled: {
        // height: 24,
        width:400,
        height:400,
        padding:0, 
        paddingRight:20,
        paddingLeft:20,
        margin:8,
        color: 'white',
        background: 'transparent',
        borderRadius: 16,
        border: 0,
        padding: 0,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .5)',
        boxShadow: '0 3px 5px 2px rgba(129, 24, 92, 0.5)',
        textAlign: 'center',
        verticalAlign:'middle'
    },
    disabled: {
        height: 24,
        padding:0, 
        paddingRight: 20,
        paddingLeft:20,
        color: 'white',
//        background: BACKGROUND_COLOR_DEFAULT,
        opacity:0.5, /* Note OPACITY 0.5 for disabled */
        borderRadius: 16,
        border: 0,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        textAlign: 'center',
    },
    link:{
        textDecoration:'none'
    }
}


const ImageButton = (props) => 
{
    const styleDisabled=props.styles?props.styles.disabled?{...styles.disabled, ...props.styles.disabled}:styles.disabled:styles.disabled
    const styleEnabled=props.styles?props.styles.enabled?{...styles.enabled, ...props.styles.enabled}:styles.enabled:styles
    const styleEnabledNew = {...styleEnabled, backgroundImage:`url(${Background})`}
    return(
        <button className="button" 
            {...props} style={props.disabled?styleDisabled:styleEnabledNew}
        >
            {props.children}
        </button>  
)   
}
export default ImageButton;