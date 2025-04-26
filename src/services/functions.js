import {BOOKING_STATUS, AVA_STATUS} from '../Settings/Const'

// Static utility functions
export const acceptKeys = (obj, keys) => {
    return Object.keys(obj)
        .filter(k => keys.includes(k))
        .map(k => Object.assign({}, {[k]: obj[k]}))
        .reduce((res, o) => Object.assign(res, o), {});
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const wait = (ms, callback) => {
    sleep(ms).then(callback);
} 

export const isMobileDevice = () => {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

export const valueBetweenDelimiters = (str, delimiter1, delimiter2) => {
    let pos1
    let pos2
    
    if ((pos1 = str.indexOf(delimiter1)) === -1) {
        return undefined
    } 

    if ((pos2 = str.indexOf(delimiter2)) === -1) {
        return undefined
    } 

    if (pos1 < pos2) {
        return str.substring(pos1+1, pos2)
    } else {
        return undefined
    }
}   

export const lengthOfType = type => {
    if (type === 'text') {
        return 32000
    } else if (type.includes('varchar')) {
        const length = valueBetweenDelimiters(type, '(', ')')
        return length?length:2000
    } else {
        return undefined
    }   
}    

export const extendedColumns = columns => {
    return columns.map(col => {
        let Type = col.Type
        let Type2 
        let MaxLength
        let RadioValues
        let Min 
        let Max
        if (Type === 'text') {
            Type2 = 'textarea'
        } else if (Type.includes('tinyint')) {
            Type2 = 'checkbox' // number
            Min = 0
            Max = 1
        } else if (Type.includes('int')) {
            Type2 = 'number'
            MaxLength = lengthOfType(Type)
        } else if (Type.includes('enum')) {
            Type2 = 'radio'
            RadioValues = valueBetweenDelimiters(Type, '(', ')').replaceAll("'","")
        } else if (Type.includes('varchar')) {
            Type2 = 'text'    
            MaxLength = lengthOfType(Type)
            Number(valueBetweenDelimiters(Type, '(', ')'))
        } else {
            Type2 = 'text'    
        }  
        return {...col, Type2, MaxLength, RadioValues, Min, Max} 
    })    
}    



