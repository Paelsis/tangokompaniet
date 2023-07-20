import React, { useContext, useState } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { withBreakpoints } from 'react-breakpoints'
import tkColors from 'Settings/tkColors'
import ShoppingCartButton from 'scenes/Shop/ShoppingCartButton'
import imgUrl140 from "images/logo/TK_element140.png";
import imgTk600 from "images/logo/TK_vit600.png";
import imgCovid from "images/covid19.jpg";
import defaultGradientBackground from 'Settings/tkColors'
import {LOGGED_IN_FLAG} from 'redux/actions/actionsUser'
import RightMenu from './RightMenu'
import NewsBadge from './NewsBadge'

const imageSnirkel=imgUrl140;
const imageTk=imgTk600;
const imageCovid=imgCovid;

const TEXTS = {
  GO_HOME:{
    ['SV']:'Gå till startsidan',
    ['ES']:'Ir a la página de inicio',
    ['EN']:'Go to the homepage', 
  },
  SECONDARY_MENU:{
    ['SV']:'Sekundär meny',
    ['ES']:'Menú secundario',
    ['EN']:'Secondary menu', 
  }
}

const styles = {
  container: {
    position:'fixed',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    //alignItems:'center', /* horizontally in middle */
    top:0,
    left:0,
    height:50,
    zIndex:100,
    width:'100vw',
    overflow:'hidden',
    color:tkColors.AppBar.color,
    // backgroundColor:tkColors.AppBar.background,
    // background:'linear-gradient(90deg, #590039 0%, #8a973b 100%)',
    //background:'linear-gradient(45deg, #324147 0%, #D1188B 100%)',
    background:defaultGradientBackground,

  },
  leftContainer:{
    display:'flex',
    flexDirection:'row-reverse',
    height:50,
  },
  snirkel:{
    position:'absolute',
    marginLeft:0,
    marginTop:0,
    marginBottom:0,
    height:50,
    opacity:0.8,  
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'top left',
    zIndex:20,
  },
  goHomeText: (hover)=>({
    position:'absolute',
    display:hover.left?'block':'none',
    color:'white',
    height:50,
    verticalAlign:'middle',
    cursor:'pointer',
    fontSize:20,
    marginLeft:50, 
    padding:10,
    opacity:hover.left?0.9:0.0,  
    willChange: 'opacity',
    transition: '1s all ease',
    cursor:'pointer'
  }),
  covid: (hover)=>({
    position:'relative',
    mixBlendMode: 'multiply',
    paddingRight:hover?0:0,
    marginTop:2,
    marginBottom:2,
    height:46,
    cursor:'pointer',
    opacity:hover.left?0.0:0.9,  
    willChange: 'opacity',
    transition: '1s all ease',
    cursor:'pointer',
  }),
  tkLogo: (hover)=>({
    position:'absolute',
    marginLeft:50,
    marginTop:2,
    marginBottom:2,
    height:46,
    cursor:'pointer',
    opacity:hover.left?0.0:0.9,  
    willChange: 'opacity',
    transition: '1s all ease',
    cursor:'pointer'
  }),
  iconMenu:{
    position:'relative',
    height:50,
    width:50,
    marginRight:15,
    opacity:0.8,  
    zindex:20,
    cursor:'pointer'
  },
  rightContainer:{
    display:'flex',
    alignSelf:'flex-end',
    alignItems:'center',
    justifyContent:'center', /* horizontally in middle */
    flexDirection:'row',
    position:'relative',
    height:50,
  },
  shoppingCart: (hover)=>({
    position:'relative',
    //display:hover.right?'none':'block',
    color:'white',
    paddingRight:12, 
    opacity:hover.right?0.0:0.9,  
    //willChange: 'opacity',
    //transition: '1s all ease',
    cursor:'pointer'
  }),
  secondaryMenu: (hover)=>({
    display:hover.right?'block':'none',
    color:'white',
    fontSize:14,
    padding:10,
    opacity:hover.right?0.9:0.0,  
    willChange: 'opacity',
    transition: '1s all ease',
    cursor:'pointer'
  }),
  listStyle:{
    backgroundColor:tkColors.black,
    opacity:0.8,
  },
  menuItem: {
    textAlign: 'left',
    inverse: false,
    backgroundColor:tkColors.black,
    color: 'white', 
    opacity:0.8,
  },
  divider: {
    backgroundColor: 'white',
    opacity:0.8, 
  },  
  headerText:{
    position:'absolute',
    width:'100vw',
    paddingTop:16,
    zindex:11,
    color:'white',
    opacity:0.8,
    fontSize:20,
    textAlign:'center',
    textDecoration:'none',
  },
  iconButton: {
    padding:0,
    margin:0,
    width:'100%',
    opacity: 0.9,
  },
  iconButtonIcon:{
    position:'relative',
    width: 46,
    height:46,
  },
}


const helpText=  {
  home:{SV:'Gå till förstasidan (Home)', EN:'Go to first page (Home)', ES:'Botón de inicio (Home)'},
  rightMenu:{SV:'Sekundär meny', EN:'Secondary Menu', ES:'Menú secundario'},
}

        


const AppBarTop = props => {
    const {language, loggedInFlag, background,  breakpoints, currentBreakpoint} = props
    const geDesktop = breakpoints[currentBreakpoint] >= breakpoints.desktop
    const [hover, setHover] = useState({})  
    const geMobileLandscape = breakpoints[currentBreakpoint] > breakpoints.tablet
    const [redirect, setNavigate] = useState(false)
    const covid19 = 
      <Link style={{textDecoration:'none'}} to={'/covid19'}>
        <img src={imageCovid} style={styles.covid(hover)}/>
      </Link>
    return(
    <header 
      style={{...styles.container, background}}
    >
      <span onMouseEnter={()=>geDesktop?setHover({left:true}):null} onMouseLeave={()=>geDesktop?setHover({left:undefined}):null} >
        <Link 
          style={{textDecoration:'none'}} 
          to={'/home'}
        >  
          <img src={imageSnirkel} style={styles.snirkel}/>
          <img src={imageTk} style={styles.tkLogo(hover)} />
          <div style={styles.goHomeText(hover)}>{TEXTS.GO_HOME[language]}</div>
        </Link>
      </span>
      <span style = {styles.rightContainer} >
        {/*covid19*/}
        <NewsBadge {...props}/>
        <div style={styles.shoppingCart(hover)}>
          <ShoppingCartButton iconColor={'white'} textColor={tkColors.Purple.Light}/>
        </div>
        <div style={styles.secondaryMenu(hover)}>{TEXTS.SECONDARY_MENU[language]}</div>
        <div 
          style={styles.iconMenu} 
          onMouseEnter={()=>geDesktop?setHover({right:true}):null} 
          onMouseLeave={()=>geDesktop?setHover({right:undefined}):null} 
          onClick={()=>geDesktop?setHover({right:undefined}):null}
        >
          <RightMenu />
        </div>  
      </span>
    </header>  
  )   
} 

const mapStateToProps = state => {
  return {
    language: state.language,
    loggedInFlag:state.user[LOGGED_IN_FLAG],
    background: state.style.background,
  }
}

export default connect(mapStateToProps)(withBreakpoints(AppBarTop))

