import React from 'react';
import tkColors from 'Settings/tkColors'

const styles = {
    button:{
      color:tkColors.background,
      backgroundColor:tkColors.Purple.Light,
    },
    buttonPressed:{
      color:tkColors.Easter,
      backgroundColor:tkColors.bakground,
      opacity:0.5,
    },
    buttonUnpressed:{
      color:tkColors.background,
      backgroundColor:tkColors.Purple.Light,
      opacity:1.0
    },
    buttonAllowedPressed:{
      color:'green',
      backgroundColor:'orange',
      opacity:0.7,
    },
    buttonAllowedUnpressed:{
      color:'orange',
      backgroundColor:'green',
      opacity:1.0,
    },
  };


const editProductIdLine = (image, index, handleChange, handleSave) => (
    <table>
        <tbody>
            <tr>    
                <td>index:{index}</td>
                <td>productId:
                    <input 
                        style={{width:75}} 
                        type="text"  
                        name={'productId'} 
                        value={image.productId} 
                        onChange={e=>handleChange(e, index)}
                    />
                </td>
                <td>imageNumber:
                    <input 
                        style={{width:50}} 
                        type="number" 
                        name={'sequenceNumber'} 
                        value={image.sequenceNumber}
                        min={0}
                        onChange={e=>handleChange(e, index)} />
                </td>        
            </tr>    
            <tr>        
                <td colSpan={2}>file:{image.filename}</td>
                <td>
                    <button className="button" 
                                style={styles.buttonUnpressed} 
                                onClick={()=>handleSave(index)} 
                    >
                    Save
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
)

 

const showProductIdLine = (image, index, toggleEdit) => (
    <table>
        <tbody>
            <tr key={image.productId + image.sequenceNumber}>       
                <td>index:{index}</td>
                <td>product ID:{image.productId}</td>
                <td>imageNumber:{image.sequenceNumber}</td>
            </tr>
            <tr>    
                <td colSpan={2}>file:{image.filename}</td>
                <button className="button" 
                    style={styles.buttonPressed} 
                    onClick={()=>toggleEdit(index)} 
                >
                    Edit
                </button>
            </tr>
        </tbody>
    </table>
)


const InventoryImage = ({image, index, handleChange, edit, toggleEdit}) => {
    return(
                edit?editProductIdLine(image, index, handleChange, toggleEdit)
                :showProductIdLine(image, index, toggleEdit)
    )    
}

export default InventoryImage;