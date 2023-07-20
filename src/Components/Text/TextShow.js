import React from 'react';
import { connect } from 'react-redux'
import tkColors from 'Settings/tkColors';
import withListFromStore from 'Components/Table/withListFromStore'
import TextEdit from './TextEdit'
import {setTextList} from 'redux/actions/actionsText'
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import CircularProgressTerminate from 'Components/CircularProgressTerminate'
import {LOGGED_IN_FLAG} from 'redux/actions/actionsUser'
import {store} from 'index.js'
import fetchList from 'functions/fetchList'
import config from 'Settings/config';

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;



// This component takles 2 props (groupId and TextId) and will return ta lists of the textBody from tbl_text in the database 
// Get the state from the Map the props that you want to pass to the State

const styles = {
    root:{
        marginRight:'auto',
        marginLeft:'auto',
        padding:50,
        position:'relative',
        maxWidth:'100%',
        //fontSize:'15px'
    },
};

const _lookupTextRecord = (list, groupId, textId, language) => {
    if (groupId === undefined ||  textId === undefined) { 
        return undefined
    } else if (list?list.length > 0:false) {
            return list.find(it => it.groupId.toUpperCase() === groupId.toUpperCase() && 
                    it.textId.toUpperCase() === textId.toUpperCase() && 
                    it.language.toUpperCase() === language)
    } else {
        return undefined
    }   
} 

export const lookupTextBody = (groupId, textId, language, handleReply) => {
    const list = store.getState().text.list
    let rec=_lookupTextRecord(list, groupId, textId, language)
    if (rec) {
        handleReply(rec.textBody)
    } else {    
        const url = apiBaseUrl + '/getTexts'
        fetchList('', '', url, li => {
            rec=_lookupTextRecord(li, groupId, textId, language)
            handleReply(rec?rec.textBody:undefined)
        })    
    }    
}

const getRecordKeys = (props) => {
    if (typeof props.location != "undefined") {
        const {url, groupId, textId} = props.location.state; // props passed via router lin (special treatment vi state)
        return {url, groupId, textId};
    } else if (props.url) {
        const {url, groupId, textId} = props;
        return {url, groupId, textId};
    } else {
        return null;
    }    
}
const TEXTS={
    NO_TRANSLATION:{
        SV:'Ingen text på svenska',
        ES:'Sin traduccíon al esopañol',
        EN:'No translation to English',
    },
}

const PropsChildrenText = (props) => (
        props.children?
            <div>{props.children}</div>      
        :
            <CircularProgressTerminate text={TEXTS.NO_TRANSLATION[props.language]  + ' (groupId=' + props.groupId + ', textId =' +  props.textId + ', language=' + props.language + ')'} />
)



const Func = (props) => {
    const {loggedInFlag, list, language, style} = props;  
    let recordKeys = getRecordKeys(props);

    if (recordKeys) {
        const {groupId, textId} = recordKeys;
        let rec = _lookupTextRecord(list, groupId, textId, language);
       
        if (!loggedInFlag) {
            const languages=[LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES]
            let i=0
            while (languages[i] && rec === undefined) {
                rec = _lookupTextRecord(list, groupId, textId, languages[i]);
                i++
            }    
        } 

        return(
            <div  style={style?style:styles.root} >
                {rec?
                    loggedInFlag?<TextEdit record={rec} value={rec.textBody} key={rec.id} {...props} />
                    :<div dangerouslySetInnerHTML={{__html: rec.textBody}} />      
   
                :   
                    loggedInFlag?<TextEdit value={undefined} record={undefined} addFlag={true} {...props} />
                    :<PropsChildrenText {...props} groupId={groupId} textId={textId} language={language} />
                }        
           </div>           
        )                 
    } else {
        return (
            <div style={style?style:styles.root} >
                <PropsChildrenText {...props} />
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        //username: '',
        //password: '',
        loggedInFlag: state.user[LOGGED_IN_FLAG],
        language: state.language,
        list:state.text.list
    }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        setList: (list) => {dispatch(setTextList(list))}
    }        
}

export default  connect( 
    mapStateToProps,
    mapDispatchToProps,
) (withListFromStore(Func, true));    
