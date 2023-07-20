const WeekdaysShort = {
    'SV':['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'],
    'EN':['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    'ES':['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
}

const Weekdays = {
    'SV':['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
    'EN':['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'ES':['Lunes', 'Martes', 'Mieroles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
}


const DurationUnit = {
    SV:{'m':'månader', 'v':'veckor', 'w':'veckor', 'd':'dagar', t:'termin', h:'1/2 termin'},
    EN:{'m':'months', 'v':'weeks', 'w':'weeks', 'd':'days', t:'semester', h:'1/2 semester'},
    ES:{'m':'meses', 'v':'semana', 'w':'semana', 'd':'dias', t:'1/2 conf', h:'confentermina'},
}

const DurationUnitShort = {
    SV:{'m':'månr', 'v':'v', 'w':'v', 'd':'d', t:'termin', h:'1/2 termin'},
    EN:{'m':'mon', 'v':'w', 'w':'w', 'd':'d', t:'sem', h:'1/2 sem'},
    ES:{'m':'mes', 'v':'sem', 'w':'sem', 'd':'d', t:'1/2 conf', h:'conf'},
}

export const CourseLength = (len, language) => {
    let numb = parseInt(len);
    let unit = len.includes('m')?DurationUnit[language]['m']
        :len.includes('v')?DurationUnit[language]['v']
        :len.includes('w')?DurationUnit[language]['w']
        :len.includes('d')?DurationUnit[language]['d']
        :len.includes('t')?DurationUnit[language]['t']
        :len.includes('t')?DurationUnit[language]['h']
        :DurationUnit[language]['m'];

    let ret=language==='SV'?'Kurslängd: ':language==='EN'?'Duration: ':'Duración: ';
    ret = numb>0?ret + numb  + ' ' +  unit:ret + unit   
    return(ret)
}

export const DateToDaynameShort = (sdate, language) => {
    const dat = new Date(sdate);
    const dow = (dat.getDay() + 6)%7;
    // console.log('sdate=', sdate, ' jsdow=', dat.getDay(), ' dow=', dow)
    return(WeekdaysShort[language?language:'SV'][dow])
}    

export const DateToDayname = (sdate, language) => {
    const dat = new Date(sdate);
    const dow = (dat.getDay() + 6)%7;
    // console.log('sdate=', sdate, ' jsdow=', dat.getDay(), ' dow=', dow)
    return(Weekdays[language?language:'SV'][dow])
}    

export default Weekdays;

