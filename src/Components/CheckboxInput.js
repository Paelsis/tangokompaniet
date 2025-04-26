import React from 'react'

// CheckboxInput
export default ({name, value, handleChange}) => {
    const checked = value==1?true:false
    return(
        <input 
            type={'checkbox'} 
            checked={checked} 
            name={name} 
            onChange={handleChange}
        />
    )
}
    