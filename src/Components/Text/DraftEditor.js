import React, {useEffect, useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import tkColors from 'Settings/tkColors';
import {
    EditorState,
    ContentState,
    convertFromHTML, 
 } from "draft-js";
import { convertToHTML }  from 'draft-convert';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'App.css';



const DraftEditor = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [edit, setEdit] = useState(false)
  
    const handleSave = () => {

        const html = convertToHTML(editorState.getCurrentContent())
        props.onCommit(html)

        setEdit(false);
    }

    useEffect(()=>{    
        const blocksFromHTML = convertFromHTML(props.value);
          
        const content = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        if (content) {
            setEditorState(EditorState.createWithContent(content)) 
        }    
    }, [props.value]);


    const handleToggle = () => setEdit(!edit)
    return (
        <div>
          <div>
            {edit? 
              <CloseIcon style={{color:'orange', padding:0}} onClick={()=>handleToggle()} />
            :
              <EditIcon style={{color:tkColors.Olive.Dark, padding:0}} onClick={()=>handleToggle()} />
            }  
            {edit?
                <SaveIcon  key={'commit'} onClick={handleSave} style={{color:'orange'}} />
            :
                null
            }  
          </div>
          {edit?
                <div className="App-header">
                    <Editor 
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        editorState={editorState}
                        onEditorStateChange={setEditorState} 
                    />
                </div>
          :
              <div dangerouslySetInnerHTML={{__html: props.value}} />      
          }
        </div>
    )
  }
  
  

export default DraftEditor

