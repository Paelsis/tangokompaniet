import React from 'react';
import {connect } from 'react-redux'
import tkColors from 'Settings/tkColors'
import TextShow from 'Components/Text/TextShow'
import YouTube from 'Components/YouTube'
 

const styles = {
  page: {
    position: 'relative',
    margin:'auto',
    width:'90%',
    maxWidth:1200, 
    paddingTop:20,
    paddingBottom: 58,
    height:'auto',
    textAlign: 'left',
    // lineHeight: '24px',
    color: tkColors.color,
    backgroundColor:'transparent',
    fontWeight:200,
  },
  h1: {
    textAlign:'center',
  },
}  

const _StartText = () =>
  <div>  
    <h1 style={styles.h1}>Företagsarrangemang</h1>
    <div style={styles.textCol1}>  
    <h2>Förslag på arrangemang</h2>
    Vill ni göra något nytt och kul på företagsfesten, på teambuildingen eller på temadagen?
    Tangokompaniet har lång erfarenhet av att hålla arrangemang i Argentinsk Tango till företag – vid firmafester, temadagar, kick-off:s mm.
    Tidigare kunder är bland annat Semcon, Nordea, Lunds Universitet, Anoto, Tlth, Liseberg, Lunds kommun- Sjukvården, Bonniers, Vodaphone,
    Arbetsförmedlingen, Kriminalvården, Scoutföreningar samt personalföreningar, skolor mm.
    Vi erbjuder undervisning, uppvisning, underhållning, föredrag, kommunikationsövningar i ett skräddarsydda paket just till er.
    Kombinera tango med handledning eller tango med ledarskapsföredrag eller med kommunikationskurser.
    </div>  
    <div style={styles.textCol2}>  
    <h2>Kostnadsförslag</h2>
    Nedan följer ett antal prisexempel på för tangoarrangemang. Vi kan även skräddarsy en lösning till din tillställning.
    <p><i>Lokal- och resekostnad tillkommer. Vi har en utmärkt lokal på Fredriksbergsgatan 7 som vi hyr ut för tillställningar upp till 75 personer.</i></p>
    <h4>Grundpaket Tango, Lektion, uppvisning, 1 CD</h4>
    <p>1½ timme med 2 danslärare<br />
    Pris: 4000 kr exkl moms (upp till 30 deltagare)</p>
    <h4>Grundpaket Tango till större grupp, Lektion, uppvisning, 1 CD</h4>
    <p>1½ timme med 2 danslärare<br />
    Pris: 6000 kr exkl moms (vid 30 eller fler deltagare)</p>
    <h4>Kombipaket 2 olika danser, Lektion, uppvisning, 1 CD</h4>
    <p>2 timmar med 2 danslärare i tango och 2 danslärare i till exempel salsa<br />
    Pris: 8000 kr exkl moms (upp till 30 deltagare), 9000 kr vid fler än 50 deltagare</p>
    <h4>Heldagspaket</h4>
    <p>Heldag 6 timmar med tangokoncept- föredrag, dansundervisning, kommunikationsövningar, kroppsmedvetenhetsövningar, fokus, hållning och en uppvisning<br />
    Pris: 12000 kr exkl moms</p>
    <h4>Specialpaket med finess, Lektion, uppvisning, 1 CD</h4>
    <p>Koreografi- vi lär en grupp från företaget en tangokoreografi och hjälper till med uppförandet av showen på firmafesten! Vi DJar med passande tangomusik under middagen och kan eventuellt även genomföra en uppvisning och undervisningstimme i samband med festen.<br />
    Pris: 16000 kr exkl moms</p>
    </div>  
    <div style={{clear:'both'}} />
  </div>


const url='https://www.youtube.com/embed/mTFErnNA1tA'

// More components
const Companies = (props) => (
  <div style={styles.page}>
    <TextShow url={'/getTexts'} groupId={'Companies'} textId={'Text'}>
      <_StartText />
    </TextShow>  
    <YouTube url={url} width={'100%'} height={'56vw'}/>
  </div>
);

export default Companies;
