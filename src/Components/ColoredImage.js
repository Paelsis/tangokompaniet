import React, {Component} from 'react';

const styles = (src, width, height, backgroundColor, opacity) => ({
  container:{
    position: 'relative',
    marginLeft:'auto', marginRight:'auto',
    marginBottom:2,
    width,
    // textAlign:'center',
    height, 
  },
  imageContainer:{
      position:'relative',
      height,
      backgroundImage:`url(${src})`,
      backgroundSize:'cover',
      cursor:'pointer',
    },
    imageOverlay:{
      position:'absolute',
      width:'100%', 
      height:'100%', 
      opacity,
    },
    textOverlay:{
      position:'absolute',
      textAlign:'center',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color:'white',
      fontSize:20,
      fontWeight:200,
      fontStyle:'italics',
    },
    photographer: {
      position:'absolute',
      bottom: '1%',
      right:'1%',
      fontSize:11,
      fontWeight:100,
      fontStyle:'italic',
      color:'white',
    },
    link:{
      textDecoration:'none'
    },
  })
  
  // ColoredImage
  export default props =>  {
      const {src, width, height, backgroundColor, opacity, handleClick, link} = props;
      const style = styles(src, width, height, backgroundColor, opacity);
  
      return (
        <div style={style.container} onClick = {()=>handleClick(link)} >
          <div style={style.imageContainer}>
              <div style={style.imageOverlay}/>
          </div> 
          <div style={props.style?props.style:style.textOverlay}>
              {props.children}               
          </div>
          {props.photographer?
            <div style={style.photographer}>
                {props.photographer}               
            </div>
          :null}   
        </div>
      )
}

  