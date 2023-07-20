import React, {useState} from 'react'
import Weekdays from 'Settings/Weekdays';
import {ROLE} from 'Settings/Const'

const styles = {
    open: {
        fontSize:15,
        fontWeight:400,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:2,
        textAlign:'center',
        color:'white',
        transition: '0.5s ease'
    }, 
    closed:{
        fontSize:18,
        fontWeight:600,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:2,
        textAlign:'center',
        color:'white',
        transition: '0.5s ease'
    } 
}



const MapMapHeader = ({list, headerFields, language, open, handleOpen, headerProps}) => {
    const row = list[list.length-1] 
    const cntTotal =list.filter(it => it.deleted?it.deleted == 0:true).length  
    const cntLeaders=list.filter(it => it.leader?it.leader == 1 && (it.deleted?it.deleted == 0:true):false).length 
    const cntFollowers=list.filter(it => it.leader?it.leader == 0 && (it.deleted?it.deleted == 0:true):false).length
    const cntOnline=list.filter(it => it.danceSite?it.danceSite === 'ONLINE' && (it.deleted?it.deleted == 0:true):false).length
    const cntSite=list.filter(it => it.danceSite?it.danceSite === 'SITE' && (it.deleted?it.deleted == 0:true):true).length
    //const genderImbalance = Math.abs (cntLeaders - cntFollowers) > 3
    //const opacity = row.opacity;
    const style = open?headerProps.open?{...styles.open, ...headerProps.open}:headerProps.open
                  :headerProps.closed?{...styles.closed, ...headerProps.closed}:headerProps.closed
    const cntLEADER=list.filter(it => it.role === ROLE.LEADER && !it.deleted).length
    const cntFOLLOWER=list.filter(it => it.role === ROLE.FOLLOWER && !it.deleted).length
    const cntBOTH=list.filter(it => it.role === ROLE.BOTH && !it.deleted).length
    const textCourse = cntLeaders + ' förare, ' + cntFollowers + ' följare, ' + cntBOTH + ' båda roller, ' + cntSite + ' danslokal, ' + cntOnline + ' online, ' + cntTotal + ' tot'
    const textFestival = cntLEADER + ' förare, ' + cntFOLLOWER + ' följare, ' + cntBOTH + ' båda roller, ' + cntTotal + ' tot'
    const textTotal = cntTotal + ' totalt antal'
    return(
        <div key={row.id} style={style} onClick={handleOpen}>
            {headerFields.map(fld =>
                fld==='dayOfWeek'?
                    <span key={row[fld]}>
                        {Weekdays[language][row.dayOfWeek?row[fld]-1:1-1]}&nbsp;&nbsp;
                    </span>
                :
                    <span key={fld} >
                        {row[fld]} &nbsp;&nbsp;
                    </span>

            )}     
            ({
                cntLeaders || cntFollowers?textCourse
                :cntLEADER || cntFOLLOWER || cntBOTH?textFestival
                :textTotal
            })
        </div>    
    )    
}

export default MapMapHeader