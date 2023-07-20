import React from 'react';
import { connect } from 'react-redux'
import tkColors from 'Settings/tkColors'
import config, {SHOP_IMAGE_DIR} from 'Settings/config';
import withRecords from 'Components/Table/withRecords'
import InventoryImage from './InventoryImage'
import postImageName from './postImageName'
import groupBy from 'functions/groupBy';


const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + SHOP_IMAGE_DIR

const styles = {
  root:{
      flex:1,
      position:'relative',
      paddingTop:20,
      paddingLeft:0, 
      backgroundColor:tkColors.background,
      fontSize:14,
  },
  tbody:{
    display:'block',
    borderBottom: 'solid 2px black',
    borderColor:tkColors.border,
    borderCollapse: 'separate',
    borderSpacing:4,
    marginBottom:4,
  },
  divider:{
    backgroundColor:tkColors.color,
    marginBottom:10,
  },
  trProduct:{
    borderBottom: '1px solid black',
  },
  button:{
    color:tkColors.background,
    backgroundColor:tkColors.Purple.Light,
  },
  buttonPressed:{
    color:tkColors.bakground,
    backgroundColor:tkColors.Purple.Light,
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


// More components
const _Images = ({username, password, list, handleChangeIndex, handleChangeValueByIndex, edit, toggleEdit}) => {
    const updateFilename = (image, index) =>  handleChangeValueByIndex('filename', image.filename, index);
    const toggleEditLocal = (index) => {
        console.log('Updating image:', list[index])
        edit[index]?
            postImageName(username, password, list[index], index, (image) => image.code?image.code===200?updateFilename(image, index)
                :alert('Message:' + image.message)
                :alert('Message:' + 'No return code from server' + ' Message:' + image.message?image.message:'No message'))
            :null;
        toggleEdit(index);
    }
    const fieldMap = groupBy(list, it => it.productId);
    let idx=0;
    return(
        <div style={styles.root}>
            {Array.from(fieldMap.keys()).map(key => 
                <div style={{clear:'both'}}>
                    <h4 style={{clear:'both'}}>{fieldMap.get(key)[0].productId}</h4>    
                    {fieldMap.get(key).map(it =>
                        <span style={{float:'left'}}>
                            <img key={idx} src={imageUrl + it.filename} alt={it.filename} width={200} />
                            <InventoryImage 
                                image={it} 
                                index={idx} 
                                handleChange={handleChangeIndex}
                                edit={edit[idx]?true:false} 
                                toggleEdit={toggleEditLocal} 
                            />
                            {idx++?null:null}
                        </span>
                    )}    
                </div>    
            )}
        </div> 
    )   
};

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        url:'/getImages',
        sortKey:'productId',
    }
}    

const Images =  connect( 
    mapStateToProps,
) (withRecords(_Images));    

export default Images;

