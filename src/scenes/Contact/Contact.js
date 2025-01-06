import React from 'react';
import tkColors from 'Settings/tkColors'
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import {PAYMENT_TK} from 'Settings/Const'

const styles = {
  table: {
    margin:'auto',
    width:'auto',
    color: tkColors.color,
    paddingTop:30,
  },
  tbody: {
    cellpadding:8,
  },
  tr: {
    height:40,
    padding: 10,
    width:400,
  },
  td: haveBorder => ({
    padding: 10,
    verticalAlign:'middle',
    borderBottom:haveBorder?'1px solid':'none',
    borderColor:tkColors.border,
    // backgroundColor:'transparent',
  }),
};

const Lokaler = () =>
<>
  <tr style={styles.tr}>
  <td style={styles.td(true)}>Lokal i Malmö</td>
  <td style={styles.td(true)}>Tangokompaniet studio (TKstudio)<br />Fredriksbergsgatan 7</td>
  </tr>
  <tr style={styles.tr}>
  <td style={styles.td(true)}>Lokaler i Lund</td>
  <td style={styles.td(true)}>
      Västgöta Nation<br />Tornavägen 17
      <br /><br />Svaneskolan<br />Möllegatan 6
      <br /><br />Michael Hansens Kollegium<br />Dag Hammarskjölds Väg 4
  </td>
  </tr>
</>


const Contact = () => (
<table style={styles.table} >
<tbody style={styles.tbody}>
<tr style={styles.tr}>
<td style={styles.td(true)}>E-mail:</td>
<td style={styles.td(true)}><a href="&#x6d;&#x61;&#x69;&#x6c;&#116;&#111;:info&#x40;&#x74;&#x61;&#x6e;&#x67;&#111;kompa&#x6e;&#x69;&#x65;&#x74;&#x2e;&#99;om">&#105;n&#x66;o&#x40;t&#x61;n&#x67;o&#x6b;o&#x6d;&#112;&#x61;&#110;i&#101;t&#x2e;c&#x6f;m</a></td>
</tr>
<tr style={styles.tr}>
  <td style={styles.td(false)}>Telefon:</td>
  <td style={styles.td(false)}>
    Daniel Carlsson +46 (0)736 563609&nbsp;<a href="tel:+46736563609"><PhoneIphoneIcon style={{cursor:'pointer'}}/></a> 
  </td>
</tr>
<tr style={styles.tr}>
  <td style={styles.td(true)}/>
  <td style={styles.td(true)}>
  Anna Solakis +46 (0)705 150345&nbsp;<a href="tel:+46705150345"><PhoneIphoneIcon style={{cursor:'pointer'}}/></a> 
  </td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>Bankgiro:</td>
<td style={styles.td(true)}>{PAYMENT_TK.BG}</td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>Swish-nummer:</td>
<td style={styles.td(true)}>{PAYMENT_TK.SWISH}</td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>IBAN</td>
<td style={styles.td(true)}>{PAYMENT_TK.IBAN}</td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>Bankens BIC</td>
<td style={styles.td(true)}>{PAYMENT_TK.BIC}</td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>Kontoinnehavare</td>
<td style={styles.td(true)}>Daniel Carlsson, Tangokompaniet Öresund AB,<br />
Södra Promenaden 25 C, 211 38 Malmö</td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>Bank</td>
<td style={styles.td(true)}>Swedbank</td>
</tr>
<tr style={styles.tr}>
<td style={styles.td(true)}>Org.nr:</td>
<td style={styles.td(true)}>{PAYMENT_TK.ORG_NUMMER}</td>
</tr>
<td></td>
</tbody>
</table>
)

export default Contact;    
