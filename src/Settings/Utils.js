import {BOOKING_STATUS, AVA_STATUS} from './Const'

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


