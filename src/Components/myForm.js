import React, {useState, useEffect} from 'react';
import  {Component } from 'react'

import FormTemplate from 'Components/formTemplate';
//import config from 'Settings/config' 
//const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const fields = [
    {
        type:'text',
        label:'Name',
        name:'name',
        required:true,
    },
    {
        type:'text',
        label:'Address',
        name:'address',
    },
    {
        type:'checkbox',
        label:'Checkbox',
        name:'chk',
    },
    {
        type:'checkboxes',
        label:'Checkboxes',
        names:['checkbox1', 'checkbox2', 'checkbox3'],
    },
    {
        type:'radio',
        label:'Gender',
        name:'gender',
        values:['Male', 'Female', 'Other'],
    },
    {
        type:'textarea',
        label:'Textarea',
        name:'textarea',
    },
]

export default () => {
    //const handleSubmit = e => {e.preventDefault(); alert(checkValue()?checkValue() + ' is missing':'value:' + JSON.stringify(value))}
    const handleSubmit = (e, value) => {e.preventDefault(); alert(JSON.stringify(value))}

    return(
        <FormTemplate fields={fields} handleSubmit={handleSubmit}/>
    )
}

