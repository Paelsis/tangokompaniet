import React, {Component} from 'react';
import tkColors from 'Settings/tkColors'
import Background from 'images/other/VästraHamnen.jpeg';

// More components

const style = {
    flex: 1,
    marginRight:'auto',
    marginLeft:'auto',
    resizeMode: 'contain',
    height:'100vh',
    maxWidth:800,
    backgroundImage: `url(${Background})`,
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    opacity:0.5,
    textAlign:'center',
 }

// More components
const OkPayPal = () => (
    <div style={style}>
        <h4>Thank you for shopping at Tangokompaniet</h4>
        Please visit our shop soon again.
    </div>
);

export default OkPayPal;