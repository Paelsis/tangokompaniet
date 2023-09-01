import React from 'react';
import {connect} from 'react-redux'
import tkColors, {linearGradient} from 'Settings/tkColors';
import {setGlobalStyle} from 'redux/actions/actionsStyle'
import TextShow from 'Components/Text/TextShow'
import { withBreakpoints } from 'react-breakpoints'
import ColoredImage from 'Components/ColoredImage'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'
import CalendarToday from 'scenes/Calendar/CalendarToday'
import { lookupTextBody } from '../../Components/Text/TextShow';


//const imgHome=require('images/homepage/annaAndMartin.png');
//const imgHome=require('images/homepage/DanielAnna.png');
const urlImageDefault=require(process.env.REACT_APP_DEFAULT_HOME_IMAGE);

const styles = {
  section:{
    backgroundColor:tkColors.background,
  },
  container:height=>({
    position: 'relative',
    display:'block',
    width:'100%',
    height,
    textAlign:'center',
  }),
  overlayImage: wide =>({
    position: 'absolute',
    top: wide?35:20,
    padding: 20,
    fontSize: wide?28:20,
    right:0,
    zIndex:20,
    width:'50vw',	
    color:'white',
    transform: 'skewY(4deg)',

  }),
  overlayText: visible => ({
    position:'absolute', 
    color:'white',
    width:'42vw',	
    opacity:visible?1.0:0.0, 
    transition: '1000ms all ease',
    willChange: 'opacity',
  }),
  text: {
    margin:0,
    display:'flex', 
    textAlign:'left',
    clear:'both',
    justifyContent:'center', 
    alignItems:'center'
  },
  textDesktop: {
    margin:0,
    padding:10,
    display:'flex', 
    textAlign:'left',
    clear:'both',
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:tkColors.background,
  },
  version:{
    opacity:0.3,
    textAlign:'left', 
    padding:2,
  },
  calendar:{
    position:'absolute',
    color: 'white',
    opacity:0.8,
    fontSize: 26,
    top: '10%',
    left:'75%',
    transform: 'translate(-50%, -50%)',
  }
}



class _Home extends React.Component {       
  constructor() {
    super();
    this.state = {version:1, link:'/home', geTablet:true, file:undefined, hover:true, urlImage:urlImageDefault, photographer:'Photo: Anita Dobi'};
    this.handleMouseOver=this.handleMouseOver.bind(this)
    this.handleMouseLeave=this.handleMouseLeave.bind(this)
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      const background = linearGradient(deepPurple[900], deepPurple[200]); 
      this.props.setColors(deepPurple[900], background)
    } else if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_ENVIRONMENT === 'test') {
      const background = linearGradient(deepOrange[900], deepOrange[200]); 
      this.props.setColors(deepOrange[900], background)
    } 
    const {breakpoints, currentBreakpoint} = this.props
    if (breakpoints[currentBreakpoint] >= breakpoints.tablet) {
      lookupTextBody('HOME', 'URL_IMAGE', 'SV', urlImage => urlImage?this.setState({urlImage}):null)
      lookupTextBody('HOME', 'PHOTOGRAPHER', 'SV', photographer => photographer?this.setState({photographer}):null)
    }  
  }

  handleMouseOver() {
      this.setState({hover:true})
  }


  handleMouseLeave() {
    this.setState({hover:false})
  }

  renderDesktop() {
    const backgroundColor=tkColors.black
    const opacity=this.state.hover?0.1:0.1;
    const height = '100vh'
    const wide = false;
    return(
      <section style={styles.section}>
        <TextShow style={styles.textDesktop} url={'/getTexts'} groupId={'Home'} textId={'HomeText'} language={this.props.language} /> 
        <div style={{...styles.container(height), top:0, transition:this.state.hover?'2.0s ease':null}} 
            onMouseOver={this.handleMouseOver} 
            onMouseLeave={this.handleMouseLeave}
        >
              <ColoredImage
                src={this.state.urlImage} 
                style={styles.overlayImage(wide)}
                width={'100%'}
                height={height}
                backgroundColor={backgroundColor} 
                opacity={opacity} 
                handleClick={(link) => this.setState({version:(this.state.version+1)%8, link})}
                photographer={this.state.photographer}
                alt={this.state.urlImage}
                link={'/home'}

              >
                <CalendarToday style={styles.overlayText(this.state.hover)} fontSize='large' noButton />
              </ColoredImage>        
        </div>      
      </section>  
    )
  }

  renderWidescreen() {
    const backgroundColor=tkColors.black
    const opacity=this.state.hover?0.1:0.1;
    const height = '100vh'
    const wide = true;
    return(
        <div style={styles.container(height)} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>     
          <ColoredImage
            src={this.state.urlImage} 
            style={styles.overlayImage(wide)}
            height={height}
            backgroundColor={backgroundColor} 
            opacity={opacity} 
            handleClick={(link) => this.setState({version:(this.state.version+1)%8, link})}
            photographer={this.state.photographer}
            link={'/home'}
          >
              <CalendarToday style={styles.overlayText(this.state.hover)} fontSize='large' noButton />
              <TextShow style={styles.overlayText(!this.state.hover)} url={'/getTexts'} groupId={'Home'} textId={'HomeText'} language={this.props.language} />
          </ColoredImage>
        </div>  
    )
       
  }

  renderMobile() {
    return(
      <div onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <TextShow url={'/getTexts'} groupId={'Home'} textId={'HomeText'} language={this.props.language} /> 
        <div style={styles.text} >
            <div>
                <CalendarToday />
            </div>
        </div>
      </div> 
    ) 
  }

  _form() {
    return(
    <form action={(e) => alert(e.target.name)}>
      <input type="file" name="pic" accept="image/*" onChange={e=>alert(e.target.value)} />
      <input type="submit" />
    </form>
    )
  }


  render = () => {  
    
    const {breakpoints, currentBreakpoint} = this.props
    return(
          breakpoints[currentBreakpoint] < breakpoints.tablet?
            this.renderMobile()
          :breakpoints[currentBreakpoint] <= breakpoints.desktop?
            this.renderDesktop() 
          : 
            this.renderDesktop() 
            //this.renderWidescreen()
      )
  }
}    

const mapStateToProps = (state) => {
  return {
      language: state.language,
  }
}    

const mapDispatchToProps = (dispatch) => {
  return ({
      setColors: (color, background) =>  {dispatch(setGlobalStyle({color, background}))},
  })        
}


export default connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(_Home))