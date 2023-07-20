import React from 'react';
import tkColors from 'Settings/tkColors';

let styles = {
    root:{position:'relative',
        marginRight:'auto',
        marginLeft:'auto',
        borderColor:tkColors.border,
        color: 'red',
    },
    table: {
        marginRight:'auto',
        marginLeft:'auto',
        paddingTop:10,
    },
    tbody: {
        border:2, 
        cellpadding:20,
    },
    trHeader: {
        height:20,
        verticalAlign:'top',
        padding: 5,
        fontSize: 16,
    },
    tr: {
        height:20,
        verticalAlign:'top',
        padding: 5,
        fontSize: 14,
    },
    tdHeader: {
        verticalAlign:'top',
        textAlign:'center',
        maxWidth:20,
        fontSize:18,
        color:tkColors.color,
    },
    tdHeader: {
        verticalAlign:'top',
        padding: 8,
        color:tkColors.color,
        minWidth:15,
        maxWidth:'auto',
        borderBottom:'1px solid',
        borderColor:tkColors.border,
    },
    tdFirst: {
        verticalAlign:'top',
        padding: 8,
        color:tkColors.color,
        minWidth:15,
        maxWidth:'auto',
        borderRight:'1px solid',
        borderColor:tkColors.border,
    },
    td: {
        verticalAlign:'top',
        padding: 8,
        color:'gray',
        minWidth:15,
        maxWidth:'auto',
    },
};


// Use addressid to expand to full address
const EventHeader = (props) => {
    // Render 
    let hasEventHeader=props.event?true:false;
    let ev = props.event?props.event:null
    return(
            <div style={styles.root}>
                {hasEventHeader?
                    <table style={styles.table} >
                        <div style={styles.event}>    

                            <tbody style={styles.tbody}>
                                <tr style={styles.trHeader}>
                                <td colSpan={3} style={styles.tdHeader}>
                                    {ev.displayName}&nbsp;  
                                    ({ev.startWeekday} {ev.startDate} {ev.startTime}&mdash;{ev.endWeekday} {ev.endDate} {ev.endTime}) 
                                    </td>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={styles.td}>{ev.description}</td>
                                </tr>   
                            </tbody>
                        </div>
                    </table>
                :null}
            </div>
    )
}

export default EventHeader