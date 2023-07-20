import React, {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import tkColors from 'Settings/tkColors';

const HTMLEditor = (props) => {
    const [value, setValue] = useState(props.value)
    const [edit, setEdit] = useState(props.edit?props.edit:false)
  
    const handleSave = () => {
      setEdit(props.edit?props.edit:false);
      props.onCommit(value);
    }
  
    const toggleEdit = () => setEdit(props.edit?props.edit:!edit)
    const onChangeHTML = e => setValue(e.target.value)
  
    return (
      <>
          {edit?
            <div>
              {props.edit?null:<CloseIcon style={{color:tkColors.Purple.Dark}} onClick={()=>toggleEdit()} />}
              <SaveIcon  key={'commit'} style={{color:tkColors.Purple.Dark}} onClick={()=>handleSave()} />
              <br/>
              <textarea 
                style={props.style}
                name={'value'} 
                cols={100} 
                rows={25}
                value={value} 
                onChange={onChangeHTML}
              />
            </div>
          :
            <div>
              <EditIcon style={{color:tkColors.Purple.Dark}} onClick={()=>toggleEdit()} />
              <div dangerouslySetInnerHTML={{__html: value}} />      
            </div>
          }  
      </>
    );
  }
  

export default HTMLEditor

