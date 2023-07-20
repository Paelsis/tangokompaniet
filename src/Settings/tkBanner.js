import React from 'react';
import tkColors from './tkColors';

const styles={
    divStyle:{
        verticalAlign:'middle'
    },
    header: {
        position:'absolute', 
        top: '42%', left: '25%',
        transform: 'translate(-50%, -50%)',      
        color:'white',
        fontSize:28,
    },
    photographer: {
        position:'absolute',
        bottom: '1%',
        right:'1%',
        fontSize:11,
        fontWeight:100,
        fontStyle:'italics',
        color:'white',
        zIndex:10,
      },
  }

const img1=require('images/banner/tk_logotype.png');
const img2=require('images/banner/lina_daniel_banner.jpg');

export const Banner = ({banner, photographer}) =>
<div style={styles.divStyle}>
    {banner?<img src={banner} width={'100%'} alt={banner}/>:<img src={img2} width={'100%'}/>}
    <div style={styles.photographer}>
            <i>{photographer?photographer:'Photo:Unknown'}</i>               
    </div>
</div>

export const BannerWithHeader = ({text, banner, photographer}) => 
<div style={styles.divStyle}>
    {banner?<img src={banner} width={'100%'} alt={banner}/>:<img src={img2} width={'100%'}/>}
    <h1 style={styles.header}>{text}</h1>
    <div style={styles.photographer}>
            <i>Photo:{photographer?photographer:'Unknown'}</i>               
    </div>
</div>
