import React, {useState} from 'react'
const defaultText='No <text> found in route /InputText/<text>'

export default (props) => {

    const text = props.match?props.match.params?props.match.params.text?props.match.params.text:defaultText:defaultText:defaultText
    return(
    <div style={{textAlign:'center', width:'100%'}}>    
        <h1>
            {text}
        </h1>
    </div>
    )
}