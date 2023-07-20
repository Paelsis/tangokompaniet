import React from 'react';
import TextShow from 'Components/Text/TextShow'
import tkColors from 'Settings/tkColors'
import YouTube from 'Components/YouTube'
import config, {TEACHER_IMAGE_DIR} from 'Settings/config';


const Alert = (msg) => {
  alert('click:' + msg)
}

const styles = {
  root: {
    width:'95%',
    maxWidth:1200,
    marginRight:'auto',
    marginLeft:'auto',
  },
  text:{
    width:'100%',
    margin:'auto', 
  },
  h1:{
    textAlign:'center',
  },
  h3:{
    textAlign:'center',
  },
  flatButton: {
    backgroundColor: tkColors.color,
    color: 'white',
  },
}

const TEXTS={
  ['CardTitle']:{
    ['SV']:"Tangoshow",
    ['ES']:"Show de tango",
    ['EN']:"Tango show",
  },
  ['SubTitle']:{
    ['SV']:"Vi ger shower i argentinsk tango med ett eller flera uppvisningspar",
    ['ES']:"Realizamos shows en tango argentino con una o más parejas de shows.",
    ['EN']:"We perform shows in Argentine tango with one or more show pairs",
  },
  ['CardTitlePhoto']:{
    ['SV']:"Uppvisning av dans på festival",
    ['ES']:"Actuación de danza en el festival.",
    ['EN']:"Dance performance at the festival",
  },
  ['CardSubTitlePhoto']:{
    ['SV']:"Daniel Carlsson och Anna Solakis",
    ['ES']:"Daniel Carlsson y Anna Solakis",
    ['EN']:"Daniel Carlsson and Anna Solakis",
  },
  ['CardText']:{
    ['SV']:"En show i tangosammanhang består av att ett erfaret par visar upp sin dansskicklighet. \
      En uppvisning betstår  normalt av tre till fyra danser och pågår totalt i cirka tjugo minuter.\
      Tangokompaniet kan erbjuda ett antal uppvisningspar som gör shower mot rimlig ersättning.",
    ['ES']:"Un espectáculo en el contexto del tango consiste en una pareja experimentada que muestra \
      sus habilidades de baile. Una exhibición usualmente ocurre de tres a cuatro bailes y dura un total \
      de unos veinte minutos. Tangokompaniet puede ofrecer una serie de fiestas de espectáculos que hacen \
      duchas para una compensación razonable ",
    ['EN']:"A show in the tango context consists of an experienced couple showing off his dance skills. \
      An exhibition usually occurs from three to four dances and lasts a total of about twenty minutes. \
      Tangokompaniet can offer a number of show parties that do showers for reasonable compensation.",
  },
}

const url="https://www.youtube.com/embed/Fuv2ISU_LTw"

/*
const path=config[process.env.NODE_ENV].apiBaseUrl + TEACHER_IMAGE_DIR 
const img=path + '/' + 'DanielAnnaShow.png'
const Image = () => 
  <img style={{display:'inline'}} src={image} alt="DanielAnnaShow.jpg" />
*/

const _StartText = ({language}) =>  
  <div>
  <h1 style={styles.h1}>{TEXTS['CardTitle'][language]}</h1> 
  <h3 style={styles.h3}>{TEXTS['SubTitle'][language]}</h3>
  {TEXTS['CardText'][language]} 
</div>

const Show = () => 
  <div style={styles.root}>
    <TextShow style={styles.text} url={'/getTexts'} groupId={'Show'} textId={'Text'} />
    <YouTube url={url} width={'100%'} height={'60vh'}/>
  </div>

export default Show;


