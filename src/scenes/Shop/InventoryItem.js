import React from 'react'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {tkItems} from 'Data/tkShop'
import AddComment from './Forms/AddComment'

const InventoryItem = (props) => {
    const tkItem=tkItems.find(it=>it.productId == props.productId)
    let backgroundColor='blue'
    let opacity=1
    let color='black'
    if (props.count === 0 && props.reservedCount === 0) {
        backgroundColor='red',
        color='white',
        opacity=0.8
    } else if (props.count > 0 && props.reservedCount === 0) {
        backgroundColor='green',
        color='white',
        opacity=1
    } else if (props.count < props.reservedCount) {
        backgroundColor='orange'
        color='black',
        opacity=0.70
    } else if (props.count >= props.reservedCount) {
        backgroundColor='yellow'
        opacity=1.0
    }

    const styles = {
        chip: {
            margin: 4,
            opacity: opacity,
            color:color,
            backgroundColor: backgroundColor,
        },   
        labelStyle:{
            color:color,
        } 
    }
    
    return(
     <span>   
     <Chip
          onRequestDelete={props.onClick}
          style={styles.chip}
          labelStyle={styles.labelStyle}
        >
        {tkItem?<Avatar src={tkItem.img}/>:null}
        {props.productId?' Id:' + props.productId:null} 
        {props.size?' Storlek:' + props.size:null}
        {props.count||props.reservedCount?' Lager:' + props.count:null}
        {props.reservedCount?' Reserverade:' + props.reservedCount:null}
        {props.comment?' (' + props.comment + ')':null}
    </Chip>
    <button className="button" onClick={props.subtractCount}>- Lager</button>
    <button className="button" onClick={props.addCount}>+ Lager</button>
    <button className="button" onClick={props.subtractReservation}>-Reservera</button>
    <button className="button" onClick={props.addReservation}>+ Reservera</button>
    <AddComment addComment={props.addComment} />
    </span>    
    )
}

       // <img src={require('images/teachers/anna.jpg')} width={80} alt={'Missing pic' + {productId}}

export default InventoryItem;

