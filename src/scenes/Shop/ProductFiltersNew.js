import React, {Component} from 'react'
import {tkColors} from 'Settings/tkColors'
import {FILTER_TYPE_BRAND, FILTER_TYPE_GENDER, FILTER_TYPE_COLOR, FILTER_TYPE_SIZE, FILTER_TYPE_TOE, FILTER_TYPE_HEEL} from 'Settings/Const'
import {addFilterKey} from 'redux/actions/actionsFilterKeys.js'


const filters = [
  {type:FILTER_TYPE_BRAND, label:'Brand', column:'brandId'},
  {type:FILTER_TYPE_GENDER, label:'Gender', column:'gender'},
  {type:FILTER_TYPE_COLOR, label:'Color', column:'color'},
  {type:FILTER_TYPE_SIZE, label:'Size', column:'size'},
  {type:FILTER_TYPE_TOE, label:'Open or closed toe', column:'toe'},
  {type:FILTER_TYPE_HEEL, label:'Open or closed heel', column:'heel'},
]

const styles={
  root:{
    // display: 'flex',
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
    textDecoration:'none',
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

class ProductFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:[],
    };
    this.onChange = this.onChange.bind(this);
    this.getPickList = this.getPickList.bind(this);
  };

  
render = () => {
  return(
    <div style={styles.root} >
      {this.props.filterProps.map(it=>
        filterProps=
        <div style={styles.filterButton}>{it.label}</div>
      )}  
      <div style={styles.filterButton}>{'Clean all filters ...'}</div>
    </div>)

  }
}
export default ProductFilters
