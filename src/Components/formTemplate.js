import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'
import Button from 'Components/Button'

const TEXTS={
    BUTTON:{
        SV:'Skicka in anmälan',
        EN:'Send registration', 
        ES:'Enviar notificacón',
    }
}


const DEV_TEST_OBJECT1= {
    role:'LEADER',
    firstName: 'Per Eskilson',
    lastName: 'Eskilson',
    email: 'paelsis@hotmail.com',
    phone: '0733789747',
    address: 'Plönegatan 8',
    havePartner: true,
    firstNamePartner:'Therese',
    lastNamePartner:'Clarhed',
    emailPartner:'therese_clarhed@hotmail.com',
    newsletter: true,
    food:'MEAT',
    allergies:'none',
    comment:'Friends'
}

const DEV_TEST_OBJECT = {
}


const formTemplate = ({language, globalStyle, schedule, fields, handleSubmit}) => {
    //const [value, setValue] = useState({})
    const development = process.env.NODE_ENV === 'development'
    
    const [value, setValue] = useState(development?DEV_TEST_OBJECT:{})
    const handleChangeRadioOrCheck = e => {
        // Cannot remove haveParter when imbalance for the choosen role
        let newValue = {...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?e.target.checked:undefined:e.target.value}
        if ((schedule.avaStatus === 'IL' && newValue.role === 'LEADER') || (schedule.avaStatus === 'IF' && newValue.role === 'FOLLOWER')) {
            newValue = {...newValue, havePartner:true}
        } 
        setValue(newValue)
    }            
    const handleChange = e => {
        // Cannot remove haveParter when imbalance for the choosen role
        let newValue = {...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?e.target.checked:undefined:e.target.value}
        setValue(newValue)
    }            
    const disabledFunc = avaStatus => (avaStatus === 'CC') || 
        (value.role === 'LEADER' && ['CC', 'CL', 'OF', 'OB'].includes(avaStatus)) ||
        //(value.role === 'LEADER' && ['IL'].includes(avaStatus) && value.havePartner?false:true) ||
        (value.role === 'FOLLOWER' && ['CC', 'CF', 'OL', 'OB'].includes(avaStatus)) ||
        //(value.role === 'FOLLOWER' && ['IF'].includes(avaStatus) && value.havePartner?false:true) ||
        (value.role === 'BOTH' && ['CC', 'CB', 'OL', 'OF'].includes(avaStatus)) 
    const disabled = disabledFunc(schedule?schedule.avaStatus:'AV')
    const renderField = fld => {
        const show = fld.hiddenIf?value[fld.hiddenIf]?false:true:true && fld.notHiddenIf?value[fld.notHiddenIf]?true:false:true
        const radioValues = fld['radioValues' + language]?fld['radioValues' + language].split(',').map(it=>it.trim()):fld.values?fld.values:undefined
        const label = fld['label' + language]?fld['label' + language]:fld.label?fld.label:'No label'

        if (show) {
            switch (fld.type) {
                case 'checkbox':
                        return(
                            <p>
                                {label}&nbsp;{fld.required==1?<sup style={{color:'red'}}>*</sup>:null}
                                <input type={fld.type} checked={value[fld.name]?true:false} name={fld.name} style={fld.style} required={fld.required} onChange={handleChangeRadioOrCheck} />
                            </p> 
                        )
                case 'checkboxes':
                    return(
                        <p>
                            {label}&nbsp;{fld.required==1?<sup style={{color:'red'}}>*</sup>:null}
                            <br/>
                            {fld.names.map(name =>
                                <>
                                    {name}&nbsp;<input keytype={'checkbox'} name={name} checked={value[fld.name]?true:false} required={fld.required} onChange={handleChangeRadioOrCheck}/>
                                </>
                            )}
                        </p> 
                    )
                case 'radio':
                    return(
                        <p>

                            {label}&nbsp;{fld.required==1?<sup style={{color:'red'}}>*</sup>:null}<br/>
                            {radioValues?radioValues.map(val =>
                                <>
                                <input type={fld.type} value={val} name={fld.name} checked={val===value[fld.name]} onChange={handleChangeRadioOrCheck}/>&nbsp;{val}
                                </>
                            ):[]}
                        </p> 
                    )
                case 'textarea':
                    return(  
                        <p>
                            {label}&nbsp;{fld.required==1?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                            <textarea 
                                type={fld.type} 
                                cols={fld.cols?fld.cols:30}
                                rows={fld.rows?fld.rows:fld.numberOfRows?fld.NumberOfRows:6}
                                maxLength={fld.maxLength?fld.maxLength:300}
                                value={value[fld.name]} disabled={disabled} name={fld.name} onChange={handleChange} required={fld.required} />
                        </p>
                    )    
                default:
                    return(
                        <p>
                            {label}&nbsp;{fld.required==1?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                            <input type={fld.type} value={value[fld.name]} disabled={disabled} name={fld.name} style={fld.style}  onChange={handleChange} required={fld.required} />
                        </p>
                    )
            }
        } else {
                return(null)
        }    
    
    }
    
    

    return(
        <form onSubmit={e=>handleSubmit(e, value)}>
            {fields.map(fld => renderField(fld))}     
            {disabled?null:
                <Button type="submit" variant="outlined" disabled={disabled} className="button" style={{color:globalStyle.color, borderColor:globalStyle.color}}>
                    {TEXTS.BUTTON[language]}
                </Button>
            }
        </form>
    )
}

const mapStateToProps = state => {
    return {
      language: LANGUAGE_EN,
      globalStyle:state.style
    }
  }
  
export default connect(mapStateToProps)(formTemplate)






 