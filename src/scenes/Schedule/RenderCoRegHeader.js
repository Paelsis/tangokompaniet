import React from 'react';
import { withBreakpoints } from 'react-breakpoints'

let styles = {
    th: {
        verticalAlign:'bottom',
        margin:2,
        height:12,
        fontSize:10,
        fontWeight: 400,
        color:'white'
    },
};

export const renderRegistrationHeader = (language, weekend, style) => {
    return(
    <tr>
        {weekend?null
        :
            <>
                <th style={style}>{language==='SV'?'Veckodag':language==='EN'?'Day':'Día'}</th>
                <th style={style}>{language==='SV'?'Tid':language==='EN'?'Time':'Tiempo'}</th>
            </>
        }
        <th style={style}>{language==='SV'?'Stad':language==='EN'?'City':'Ciudad'}</th>
        <th style={style}>{language==='SV'?'Kursstart':language==='EN'?'Start':'Comienzo'}</th>
        <th style={style}>{language==='SV'?'Lärare':language==='EN'?'Teachers':'Maestro'}</th>
        <th style={style}>{language==='SV'?'Anmälan':language==='EN'?'Register':'Aplicación'}</th>
    </tr>
    )    
}     

const RenderRegistrationHeader = props => {
    const {language, weekend, style} = props;
    const styleTh = {...styles.th, ...style}
    return renderRegistrationHeader(language, weekend, styleTh);
}

export default withBreakpoints(RenderRegistrationHeader)