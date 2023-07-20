import React from 'react';
import Iframe from 'react-iframe'

const YouTube = (props) =>{
    const {url, width, height} = props
return(
    <div style={{position:'relative', marginLeft:'auto', marginRight:'auto', width, height}}>
        <Iframe
           url={url}
            width={'100%'}
            height={'100%'}
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
        />
    </div>
)}

export default YouTube
