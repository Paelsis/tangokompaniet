import React from 'react';
import { connect } from 'react-redux'
import tkColors from 'Settings/tkColors';
import withListFromStore from 'Components/Table/withListFromStore'
import TextEdit from './TextEdit'
import {setTextList} from 'redux/actions/actionsText'
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import CircularProgressTerminate from 'Components/CircularProgressTerminate'
import {LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'



// This component takles 2 props (groupId and TextId) and will return ta lists of the textBody from tbl_text in the database 
// Get the state from the Map the props that you want to pass to the State

const styles = {
    root:{
        flex:1, 
        marginRight:'auto',
        marginLeft:'auto',
        padding:10,
        position:'relative',
        maxWidth:'100%',
    },
    divText: {
        // border:'none',
        borderColor:tkColors.border,
    },
};

const filterList = (records, groupId, textId, language) => {
    var list=records;
    console.log('filterList: groupId:' + groupId + ' textId:' + textId  + ' language:' + language);
    console.log('filterList: list size before filter:' + list.length);
    list = list.filter(it => it.groupId === groupId && it.textId === textId && it.language=== language)
    console.log('filterList.list size after filter:' + list.length);
    return list;
} 


const findRecord = (records, groupId, textId, language) => {
    return records.find(it => it.groupId.toUpperCase() === groupId.toUpperCase() && 
                                 it.textId.toUpperCase() === textId.toUpperCase() && 
                                 it.language.toUpperCase() === language);
} 

const ObjectEntries = ({obj}) => (
    <div>        
        {Object.entries(obj).map(it=>
        <div div={styles.divText}>
            <h2>{it[0]} = {it[1]}</h2>
        </div>
        )}
    </div>
)

const MyText = (htmlText) => (
    <div>
        {htmlText}
    </div>
)

const getRecordKeys = (props) => {
    if (typeof props.location != "undefined") {
        const {url, groupId, textId} = props.location.state; // props passed via router lin (special treatment vi state)
        return {['url']:url, ['groupId']:groupId, ['textId']:textId };
    } else if (props.url) {
        const {url, groupId, textId} = props;
        return {['url']:url, ['groupId']:groupId, ['textId']:textId };
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
    NO_CHILDREN:{
        SV:'Ingen text definierad',
        ES:'Sin texto definido',
        EN:'No translation to English',
    }
}

const PropsChildrenText = (props) => (
        props.children?
            <p>{props.children}</p>
        :
            <CircularProgressTerminate text={TEXTS.NO_TRANSLATION[props.language]  + ' (groupId=' + props.groupId + ', textId =' +  props.textId + ')'} />
)

const TextShow = (props) => {
    const {loggedInFlag, list, language, style} = props;  
    let recordKeys = getRecordKeys(props);

    if (recordKeys) {
        const {groupId, textId} = recordKeys;
        let rec = findRecord(list, groupId, textId, language);
       
        if (!loggedInFlag) {
            const languages=[LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES]
            let i=0
            while (languages[i] && rec === undefined) {
                rec = findRecord(list, groupId, textId, languages[i]);
                i++
            }    
        } 

        return(
            <div style={style?style:styles.root}>
                {loggedInFlag?
                    !rec?<TextEdit record={null} value={null} addFlag={true} {...props} />
                    :<TextEdit record={rec} value={rec.textBody} key={rec.id} {...props} />
                 :!rec?<PropsChildrenText {...props} groupId={groupId} textId={textId} language={language} />
                 :<div style={style?style:styles.root} dangerouslySetInnerHTML={{__html: rec.textBody}} />      
                }    
            </div>           
        )                 
    } else {
        return (
            <div style={props.style?props.style:{}} >
                <PropsChildrenText {...props} />
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        username: '',
        password: '',
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
) (withListFromStore(TextShow, true));    
