import React, {Component} from 'react';
import tkColors from 'Settings/tkColors'
import Background from 'images/under-construction-1.png';

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
const ErrorPayPal = () => (
    <div style={style}>
        <h1>Error PayPal</h1>
        Failed to execute PayPal payment
    </div>
);

export default ErrorPayPal;