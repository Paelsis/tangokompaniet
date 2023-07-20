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

const TextEdit = props => {
    const value = props.value
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
        } else if (props.addFlag) {
            crud = {
                action:true,
                inserted:[{['groupId']:props.groupId, ['textId']:props.textId, ['textBody']:value, ['language']:props.language}],
                updated:[],
                deleted:[],
            }
        } else {
            alert('WARNING: The text for groupId:' + props.groupId.toUpperCase()  + ' textId:' + props.textId.toUpperCase() + 'was not found in DB')
        }      

        // Post the updated data to url
        if (crud.action) {
            let url=config[process.env.NODE_ENV].apiBaseUrl +'/admin/crud'
            postCrud(url, 
                props.username, 
                props.password, 
                props.tableName?props.tableName:TBL_TEXT, 
                crud, 
                list=>props.setList(list));

        }    
    }
    const noValueYet=props.language===LANGUAGE_SV?'Ingen text på svenska ännu ! (Byt språk till EN och se om texten finns där)'
        :props.language===LANGUAGE_ES?'Aún no traducio !'
        :'No translation to english yet';
    return(
        <>
            {value?
                <div>
                    <TextAndHtmlEditor editor={props.editor} value={value} onCommit={value => onCommit(value)} />
                </div>
            :
                <div>
                    {props.children?
                        <div>
                            <div>{props.children}</div>   
                            <TextAndHtmlEditor editor={props.editor} value={reactToString(props.children)} onCommit={value => onCommit(value)} />
                        </div>    
                    :    
                        <div style={props.style}>
                            <TextAndHtmlEditor  editor={props.editor} value={noValueYet} onCommit={value => onCommit(value)} />
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
        language: state.language,
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
)(withListFromStore(TextEdit))    

