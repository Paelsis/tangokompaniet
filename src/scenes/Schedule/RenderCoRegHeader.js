import React from 'react';

// RenderCoRegHeader
export default ({language, weekend, style}) => 
    <thead>
        <tr>
            {weekend?null
            :
                <>
                    <th style={style}>{language==='SV'?'Veckodag':'Day'}</th>
                    <th style={style}>{language==='SV'?'Tid':'Time'}</th>
                </>
            }
            <th style={style}>{language==='SV'?'Stad':'City'}</th>
            <th style={style}>{language==='SV'?'Kursstart':'Start'}</th>
            <th style={style}>{language==='SV'?'Lärare':'Teachers'}</th>
            <th/> 
        </tr>
    </thead>

