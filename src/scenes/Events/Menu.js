import React from 'react';
import {connect} from 'react-redux'

const styles = {
    button:{

      fontWeight:200,
      fontStyle:'italic',
      textAlign:'center',
      verticalAlign:'middle',
      overflow:'hidden',
      width:'100%',
      height:50,
      zIndex:20,
      border:'none',
    }
}

const buttonStyle = (style, open) =>
{
  return(open?{...styles.button, ...style, height:style.height * 1.25, opacity:1.0}
    :{...styles.button, ...style, opacity:0.8})
}  

const Menu = ({menuList, openIndex, handleClick, language, style}) => 
<div>
    {menuList.map((it, index) =>
        <button className="button" key={index} style={buttonStyle(style, index === openIndex)} onClick={(e)=>handleClick(e, index)}>
          {it.label?it.label:it['label' + language]?it['label' + language]:'Menu item' + index + 1}
        </button>
    )}
</div>

const mapStateToProps = (state) => {
  return {
      language: state.language,
  }
}    

export default connect(mapStateToProps)(Menu)
