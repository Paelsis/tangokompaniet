import React from 'react';
import {connect} from 'react-redux';
import ProductList from './ProductList'
import ProductFilterNew from './ProductFilterNew'
import {setProductList} from 'redux/actions/actionsProducts'
import withListFromStore from 'Components/Table/withListFromStore'


// const shoeexistingSizes=[35,36,37,38,39,40,41,42,43,44,45,46,47,48]

// const clotheexistingSizes=['XS','S','M','L','XL','XXL','XXXL']

const styles = {
  root:{
    display:'block',
    fontSize:15,
  },
  filter: {
    marginRight:'auto',
    marginLeft:'auto',
    maxWidth:800,
  },
  products: {
    postion:'relative',
    padding:10, 
    textAlign:'center'},
};

let _Shop = ({list, filterKeys}) => {
  
  console.log('vivalla ... filterKeys:', filterKeys);
  return(
  <div style={styles.root}>
    <div style={styles.filter}>
      <ProductFilterNew label='Type' name='productType' list={list}  />  
      <ProductFilterNew label='Product' name='productId' list={list} />  
      <ProductFilterNew label='Gender' name='gender' list={list}  />  
      <ProductFilterNew label='Brand' name='brandId' list={list}  />  
      <ProductFilterNew label='Color' name='color' list={list}  />  
      <ProductFilterNew label='Size' name='size' list={list}  />  
      <ProductFilterNew label='Open heel' name='openHeel' list={list}  />  
      <ProductFilterNew label='Open toe' name='openToe' list={list} />  
    </div>    
        <div style={styles.products}> 
          <ProductList filterKeys={filterKeys} list={list} /> 
        </div>  
    <p />
  </div>
)
}



const mapStateToProps = state => {
  return {
    username:'',
    password:'',
    language:state.language,
    list: state.products.list,
    filterKeys: state.filterKeys,
    url:'/getProducts',  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setList: (list) => { dispatch(setProductList(list)) },
    }        
}

export default connect(mapStateToProps, mapDispatchToProps)
  (withListFromStore(_Shop, true))



