import React, { useRef } from 'react';
import { EditorState, ContentState, convertFromHTML } from "draft-js"
import { Editor } from 'react-draft-wysiwyg';
import "draft-js/dist/Draft.css";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs'

import 'App.css';

/*
const oldFunction = props => {
    const editor = React.useRef(null);
    const blocksFromHTML = convertFromHTML(props.value)
    const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
    const [editorState, setEditorState] = useState(EditorState.createWithContent(content))
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(()=>setEditorState(EditorState.createWithContent(content))
    ,[props.value.length > 0])

    function handleChange(val) {
        setEditorState(val)
        setHtml(stateToHTML(editorState.getCurrentContent()))
        props.onChange(stateToHTML(val.getCurrentContent()))
        props.onChange(val)
    }
    function focusEditor() {
        editor.current.focus();
    }

    return (
    <div onClick={focusEditor} style={{border:'solid 1px'}}>
        <Editor
            editorState={props.editorState}
            onEditorStateChange={props.onEditorStateChange}
            placeholder="The message goes here..."
        />
    </div>
    )
}
*/

export const emptyEditorState = () => {
  return EditorState.createEmpty()
} 

export const generateEditorStateFromValue = value => {
  const blocksFromHTML = htmlToDraft(value)
  const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
  return EditorState.createWithContent(content)
}

// Whenever you use the draft editor and you have aq html field you must expand those to a draft values with fields prefixed with draft_
export const enhanceValueWithDraftVariables = (fields, value)  => {
  let draftValues = value?value:{}
  fields.forEach(fld => {
      if (fld.type === 'draft') {
          const draftValue = value?value[fld.name]?generateEditorStateFromValue(value[fld.name]):emptyEditorState():emptyEditorState()
          draftValues = {...draftValues, ['draft_' + fld.name]:draftValue}
      }
  })
  return draftValues
}    

export const removeAllDraftVariables = value  => {
  let valueWithoutDraft = {}  
  Object.entries(value).map(it=> {
    if (!it[0].includes('draft_')) {
      valueWithoutDraft = {...valueWithoutDraft, [it[0]]:it[1]}
    }
  })
  return valueWithoutDraft
}    



export default props => {
  const editor = useRef(null);
  const {editorState, onEditorStateChange, style} = props

  
  const focusEditor = () => {
      editor.current.focus();
  }

  return (
      <div style={style}>
        <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
        />
      </div>
  )
}


