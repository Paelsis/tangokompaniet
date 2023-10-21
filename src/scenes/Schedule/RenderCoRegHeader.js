import React from 'react';

// RenderCoRegHeader
export default ({language, weekend, style}) => 
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
        <th/> 
    </tr>

