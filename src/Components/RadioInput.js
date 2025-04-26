import React from 'react';

// RadioInput
export default ({name, value, radioValues, handleChange}) => {
    const arr = radioValues.split(',')
    return(
        arr.map(it =>
            <label>
                <input 
                    key={(it.value?it.value:it)}
                    type='radio'
                    value={it.value?it.value:it} 
                    name={name} 
                    checked={value?(value === (it.value?it.value:it)):undefined}
                    onChange={handleChange}
                />
                &nbsp;<span>{it.value?it.value:it}</span>&nbsp;
            </label>
        )
    )
}
