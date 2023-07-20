import React, {useEffect, useState} from 'react';
import ReactRte from 'react-rte';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import tkColors from 'Settings/tkColors';

const RichReactRte = props => {
  const [value, setValue] = useState(ReactRte.createValueFromString(props.value, 'html'))
  const [edit, setEdit] = useState(props.edit?props.edit:false)

  const handleSave = () => {
      setEdit(props.edit?props.edit:false)
      props.onCommit(value.toString('html'));
  }

  const handleToggle = () => setEdit(props.edit?props.edit:!edit)
  return (
      <div>
          {edit?
            <>
              {props.edit?null:<CloseIcon style={{color:tkColors.Olive.Dark, padding:0}} onClick={()=>handleToggle()} />}
              <SaveIcon  style={{color:tkColors.Olive.Dark, padding:0}} key={'commit'} onClick={handleSave} />
              <br/>
              <ReactRte 
                style={{color:tkColors.Olive.Dark, padding:0}} 
                value={value} onChange={val => setValue(val)}
              />
            </>
          :
            <>
              <EditIcon style={{color:tkColors.Olive.Dark, padding:0}} onClick={()=>handleToggle()} />
              <div dangerouslySetInnerHTML={{__html: props.value}} />      
            </>
          }  
      </div>
  )
}

export default RichReactRte

