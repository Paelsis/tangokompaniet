import React, {useState} from 'react';
import reactToString from 'react-to-string';
import { connect } from 'react-redux'
import config from 'Settings/config';
import tkColors from 'Settings/tkColors';
import postCrud from 'functions/postCrud';
import TextAndHtmlEditor from './TextAndHtmlEditor'
import withListFromStore from 'Components/Table/withListFromStore'
import {setTextList} from 'redux/actions/actionsText'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const TBL_TEXT = 'tbl_text'


// component takles 2 props (groupId and TextId) and will return ta lists of the textBody from tbl_text in the database 
// Get the state from the Map the props that you want to pass to the State

let styles = {
    root:{position:'relative',
        maxWidth:1200,
        marginRight:'auto',
        marginLeft:'auto',
        borderColor:tkColors.border,
    },
};
/*
const ObjectEntries = ({obj}) => (
    <div>        
        {Object.entries(obj).map(it=>
        <div>
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
*/

const EditRecord = props => {
    const {username, password, tableName, value, groupId, textId, addFlag, setList, language, editor, style, children} = props
    const record = props.list.find(it => it.groupId.toUpperCase() === props.groupId.toUpperCase() && it.textId.toUpperCase() === props.textId.toUpperCase() && it.language === props.language);
    const onCommit = value => {
        let crud = {action:false};
        if (record) {
            // Update existing entry
            crud = {
                action:true,
                inserted:[],
                updated:[{...record, ['textBody']:value }],
                deleted:[],
            }
        } else if (addFlag) {
            crud = {
                action:true,
                inserted:[{['groupId']:groupId, ['textId']:textId, ['textBody']:value, ['language']:language}],
                updated:[],
                deleted:[],
            }
        } else {
            alert('WARNING: The text for groupId:' + groupId.toUpperCase()  + ' textId:' + textId.toUpperCase() + 'was not found in DB')
        }      

        // Post the updated data to url
        if (crud.action) {
            let url=process.env.REACT_APP_API_BASE_URL +'/admin/crud'
            postCrud(url, 
                username, 
                password, 
                tableName?tableName:TBL_TEXT, 
                crud, 
                list=>setList(list));

        }    
    }
    const noValueYet=language===LANGUAGE_SV?'Ingen text för groupId = ' + groupId + ' textId = ' + textId + ' language = ' + language
        :'Text missing for groupId = ' + groupId + ' textId = ' + textId + ' language = ' + language
    return(
        <>
            {value?
                <div>
                    <TextAndHtmlEditor editor={editor} value={value} setValue={value => onCommit(value)} />
                </div>
            :
                <div>
                    {children?
                        <div>
                            <div>{children}</div>   
                            <TextAndHtmlEditor editor={editor} value={reactToString(children)} setValue={value => onCommit(value)} />
                        </div>    
                    :    
                        <div style={style}>
                            <TextAndHtmlEditor  editor={editor} value={noValueYet} setValue={value => onCommit(value)} />
                        </div>
                    }    
                </div>
            }    
       </>         
    )

} 

const mapStateToProps = state => {
    return {
        username: state.user.username,
        password: state.user.password,
        list: state.text.list,
    }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = dispatch => {
    return {
        setList: list=>dispatch(setTextList(list)) 
    }        
}

export default  connect( 
    mapStateToProps,
    mapDispatchToProps,
)(withListFromStore(EditRecord))    

