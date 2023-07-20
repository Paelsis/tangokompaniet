import React, {Component} from 'react';
import tkColors from 'Settings/tkColors'
import Background from 'images/other/VästraHamnen.jpeg';

// More components

const style = {
    flex:1,
    marginRight:'auto',
    marginLeft:'auto',
    resizeMode: 'contain',
    minHeight:'100vh',
    maxWidth:800,
    backgroundImage: `url(${Background})`,
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    opacity:0.5,
    color:tkColors.Purple.Light,
    textAlign:'center',
 }

// More components
const Exception404 = () => (
    <div style={style}>
        <h4>URL not found (Error:404)</h4>
        The url you typed in the address bar above cannot be found.
        <p />
        Please click on the text Tangokompaniet at top to be redirected to Homepage of this app.
    </div>
);

export default Exception404;