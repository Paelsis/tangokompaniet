import React, { useRef, useState } from 'react';
import { EditorState, ContentState } from "draft-js"
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import {  convertToRaw } from 'draft-js'
import "draft-js/dist/Draft.css";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import 'App.css';

const emptyEditorState = () => {
  return EditorState.createEmpty()
} 

const generateEditorStateFromValue = value => {
  const blocksFromHTML = htmlToDraft(value)
  const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
  return EditorState.createWithContent(content)
}


export default props => {
  const [editorState, onEditorStateChange] = useState(props.value?generateEditorStateFromValue(props.value):emptyEditorState())
  const [edit, setEdit] = useState(false)

  const handleSave = () => {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      props.setValue(html);
      setEdit(!edit)
  }
  

  return (
      <div style={props.style}>
          {edit?
            <>
              <SaveIcon onClick={()=>handleSave()} />
              <CloseIcon onClick={()=>setEdit(!edit)} />              
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </>
        :
            <>
              <EditIcon onClick={()=>setEdit(!edit)} />
              <div dangerouslySetInnerHTML={{__html: props.value}} />      
            </>
        }
      </div>
  )
}


