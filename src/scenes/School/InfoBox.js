import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'Components/Button'
import TextShow from 'Components/Text/TextShow'
import Background from 'images/covid19.jpg'

const TEXTS = {
  GO_BACK:{
    SV:'Gå tillbaka',
    EN:'Go back',
    ES:'Regresar',
  },
}

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

const InfoBox = ({history}) => {

    const navigate = useNavigate()
    return(
    <div style={styles.container}>
      <TextShow url={'/getTexts'} style={styles.text} groupId={'Info'} textId={'Box'} />
      <div style={styles.image} />
      <Button 
        variant="outlined"
        onClick={()=>{navigate(-1)}}
        >
            {TEXTS.GO_BACK['EN']}
      </Button>      
    </div>
    )
}
export default InfoBox
