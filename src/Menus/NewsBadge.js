import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import fetchList from 'functions/fetchList';
import {tkColors} from 'Settings/tkColors'
import config from 'Settings/config';

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const iconColorOpen='orange' //tkColors.Purple.Light;
const textColorOpen=tkColors.background
const iconColorClosed=tkColors.Purple.Dark
const textColorClosed=tkColors.background

const TEXTS = {
  NEWS:{
    SV:'Nyheter',
    EN:'News',
    ES:'Noticias',
  },
  CLOSE:{
    SV:'Stäng',
    EN:'Close',
    ES:'Cerca',
  },
}

const styles = info =>{
  return(info?
  {
        color:tkColors.Purple.Dark,  // Color of the text in the badge
        backgroundColor:'orange', // Set the icon color of the badge
  }:
  {
      color:tkColors.Purple.Light,  // Color of the text in the badge
      backgroundColor:tkColors.background,
  }  
  )
}


export default props => {
  const {info, setInfo, list} = props
  const style = styles(props.info)
    return (
      list.length > 0?
        <IconButton 
            tooltip="Click to review your shoppingcart"
        > 
            <Badge
              badgeStyle={style}
              badgeContent={list.length}
              //primary={true}
              onClick={()=>{setInfo(!info)}}
              >
                {list.length}
                
                
            </Badge>
        </IconButton>
        :null
  )
}


