import React from 'react'
import TextShow from 'Components/Text/TextShow'
import Background from 'images/covid19.jpg'


const styles = {
  container: {
    position:'relative',
    // overflow: 'hidden',
    padding: 10,
    minHeight:'calc(100vh)',
  },
  text:{
    maxWidth:1200, 
    margin:'auto',
    position:'relative',
    textAlign:'center',
    zIndex:2,
    fontSize:18,
    fontWeight:400,
  },
  image: {
    // content: ' ',
    position:'absolute',
      display:'block',
      top:0, 
      left:0, 
      width:'100%',
      height:'100%',
      opacity:0.2,
      backgroundImage: `url(${Background})`,
      backgroundSize:'cover',
      backgroundPosition:'50% 0',
      backgroundRepeat:'no-repeat',
      textAlign:'center',
  },
};

const Covid19 = () => 
    <div style={styles.container}>
      <TextShow url={'/getTexts'} style={styles.text} groupId={'Covid19'} textId={'Column1'} />
      <div style={styles.image} />
    </div>

export default Covid19
