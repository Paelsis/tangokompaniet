import React from 'react';
import { connect } from 'react-redux'
import tkColors from 'Settings/tkColors'
import config, {SHOP_IMAGE_DIR} from 'Settings/config';
import withRecords from 'Components/Table/withRecords'
import InventoryImage from './InventoryImage'
import postImageName from 'functions/postImageName'
import ProductFilterNew, {FilterList} from 'scenes/Shop/ProductFilterNew'

const SHOP_IMAGES_URL=config[process.env.NODE_ENV].apiBaseUrl + SHOP_IMAGE_DIR

const styles = {
  root:{
      flex:1,
      position:'relative',
      paddingTop:20,
      paddingLeft:0, 
      backgroundColor:tkColors.background,
      fontSize:14,
  },
  header:{
      backgroundColor:tkColors.Purple.Light,
      opacity:0.5,
      color:tkColors.Text.Light,
      textAlign:'center',
  }
};


// More components
const _Images = ({username, password, list, handleChangeIndex, handleChangeValueByIndex, edit, toggleEdit, subdir, filterKeys}) => {
    const updateFilename = (image, index) =>  handleChangeValueByIndex('filename', image.filename, index);
    const toggleEditLocal = (index) => {
        console.log('Updating image:', list[index])
        if (edit[index] !== undefined) {
            postImageName(username, password, list[index], subdir, index, (image) => image.code?image.code==200?updateFilename(image, index)
                :alert('Message:' + image.message)
                :alert('Message:' + 'No return code from server' + ' Message:' + image.message?image.message:'No message'))
        }    
        toggleEdit(index);
    }
    const imgUrl = (subdir, it) => {
        if (subdir) {
            return(SHOP_IMAGES_URL + subdir + '/' + it.filename);
        } else {
            return(SHOP_IMAGES_URL + it.filename);
        }
    }
    const filterList = FilterList(list, filterKeys);
    return(
        <div style={styles.root}>
            <ProductFilterNew label='Filter on productId' name='productId' list={list} />  
            {filterList.map((it, idx) =>
                <div>
                    {idx>0?it.productId != filterList[idx-1].productId?<h4 style={styles.header}>{it.productId}</h4>:null
                    :idx===0?<h4 style={styles.header}>{it.productId}</h4>
                    :null}
                    <img key={it.index} src={imgUrl(subdir, it)} alt={imgUrl(subdir, it)} width={200} />
                    <InventoryImage 
                        image={it} 
                        index={it.index} 
                        handleChange={handleChangeIndex}
                        edit={edit[it.index]?true:false} 
                        toggleEdit={toggleEditLocal} 
                    />
                </div>    
            )}
        </div> 
    )   
};

let Images = withRecords(_Images);

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        url:'/getImages?subdir=/images/shop',
        sortKey:'filename',
        filterKeys: state.filterKeys,
    }
}    

Images =  connect( 
    mapStateToProps,
) (Images);    

export default Images;

