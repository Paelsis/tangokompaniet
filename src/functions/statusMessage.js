import {store} from 'index.js'
import {setStatusMessage, setSleepTime} from 'redux/actions/actionsStatusMessage' 
import {wait} from 'Settings/Utils'

export const STATUS_OK='STATUS_OK';
export const STATUS_WARNING='STATUS_WARNING';
export const STATUS_ERROR='STATUS_ERROR';
export const STATUS_MESSAGE='STATUS_MESSAGE';
export const STATUS_UNSET='STATUS_UNSET';


export const statusMessage = (status, message) => {
    store.dispatch(setStatusMessage(status, message));
    const sleepTime=status===STATUS_OK?1000
        :status===STATUS_WARNING?20000
        :status===STATUS_ERROR?20000
        :2000;

    wait(sleepTime, ()=>store.dispatch(setStatusMessage(null, null)));       
}

export const statusMessageSleep = (status, message, sleep) => {
    store.dispatch(setStatusMessage(status, message));
    wait(sleep, ()=>store.dispatch(setStatusMessage(null, null)));       
}

export const setSleep = (sleep) => {
    store.dispatch(setSleepTime(sleep));
}

export const statusMessageStatic = (status, message) => {
    store.dispatch(setStatusMessage(status, message));
}

export const statusMessageClear = () => {
    store.dispatch(setStatusMessage(null, null));
}

export const sleepTime = (sleepTime) => {
    store.dispatch(setSleepTime(sleepTime));
}

export default statusMessage;

