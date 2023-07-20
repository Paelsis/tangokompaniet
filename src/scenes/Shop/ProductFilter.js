import React from 'react'
import FilterLink from './Filters/FilterLink'
import {tkColors} from 'Settings/tkColors'
import {tkItemTypes, ITEM_TYPE_ALL} from 'Data/tkShop'


const ProductFilter = () => {
let styles={
  root:{
    display: 'flex',
    justifyContent: 'center',
    //    alignItems: 'center',
  },
  filterButton:{
    width:'80vw',
    maxWidth:640,
    padding:2,
    margin:4,
    marginRight:'auto',
    marginLeft:'auto',
    textAlign:'center',
    backgroundColor:tkColors.Olive.Light,
    opacity:0.8,
    color:tkColors.Text.Light,
    borderRadius:16, 
    fontSize:12,
  },
  button:{
      backgroundColor:tkColors.Olive.Light,
      color:tkColors.background,
      fontSize:16,
  }    
}
 

return(
  <div style={styles.root} >
    {tkItemTypes.map(it=>
      <FilterLink key={it.productType} filter={it.productType}>
       <button className="button" style={styles.button}>{it.name}</button>
      </FilterLink>
    )}  
    <FilterLink filter={ITEM_TYPE_ALL}>
       <button className="button" style={styles.button}>Alla</button>
    </FilterLink>
  </div>)

}

export default ProductFilter
