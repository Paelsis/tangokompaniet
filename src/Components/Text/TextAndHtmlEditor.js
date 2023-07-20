import React, {useState} from 'react';
import HTMLEditor from './HTMLEditor'
import DraftEditor from './DraftEditor'
import RichTextEditor from './RichTextEditor'
import tkColors from 'Settings/tkColors';


export const TEXT_EDITOR = 'TEXT_EDITOR'
export const HTML_EDITOR = 'HTML_EDITOR'
export const DRAFT_EDITOR = 'DRAFT_EDITOR'

const styles = {
  textButton:{
    fontSize:'small', 
    padding:1, 
    color:tkColors.Olive.Dark, 
    borderColor:tkColors.Olive.Dark
  },  
  htmlButton:{
    fontSize:'small', 
    padding:1, 
    color:tkColors.Purple.Dark, 
    borderColor:tkColors.Purple.Dark, 
    backgroundColor:'yellow'
  },
  draftButton:{
    fontSize:'small', 
    padding:1, 
    color:'white', 
    borderColor:'white', 
    backgroundColor:'red'
  },
  textEditor:{
    fontSize:'normal', 
    border:'1px solid',
    borderColor:tkColors.Olive.Dark,
    padding:1,
    color: tkColors.Olive.Dark,
    backgroundColor:'lightGrey',
    cursor:'pointer',
  },
  htmlEditor:{
    fontSize:'norlmal',
    border:'1px solid',
    borderColor:tkColors.Purple.Dark,
    padding:1,
    color: tkColors.Purple.Dark,
    backgroundColor:'lightYellow',
    cursor:'pointer',
  },
}


const TextAndHtmlEditor = props => {
  const [editor, setEditor] = useState(props.editor?props.editor:TEXT_EDITOR)
  const toggleEditor = () => {
    setEditor(editor===TEXT_EDITOR?HTML_EDITOR:TEXT_EDITOR)
  }
  return(
    <div>
      {props.editor?null
      :
        <button className="button" 
          style={editor===TEXT_EDITOR?styles.textButton:styles.htmlButton}
          onClick={()=>toggleEditor()}
        >  
          {editor===TEXT_EDITOR?TEXT_EDITOR:HTML_EDITOR}
        </button>
      }
      {editor === HTML_EDITOR ?
        <HTMLEditor {...props} style={styles.htmlEditor} />
      :
        <RichTextEditor {...props} style={styles.textEditor} edit={props.editor?true:props.edit}/>
      }  
    </div>
  )  
}

export default TextAndHtmlEditor