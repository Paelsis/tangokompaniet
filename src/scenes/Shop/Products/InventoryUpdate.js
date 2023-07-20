import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import config from 'Settings/config';
import InventoryProduct from './InventoryProduct'
import InventoryInv from './InventoryInv'
import tkColors from 'Settings/tkColors'
import postInventory from './postInventory'

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl

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


class InventoryUpdate extends Component {
    static propTypes = {
        product: PropTypes.object,
        inventoryList: PropTypes.array,
    };

    constructor() {
        super();
        this.state = {
            product:{},
            edit:true,
            inventoryList:[],
            buttonPressed:false,
        };
        this.handleChangeProduct = this.handleChangeProduct.bind(this)
        this.handleChangeInventory = this.handleChangeInventory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    } 

    componentDidMount () {
        this.setState({product:this.props.product});
        this.setState({inventoryList:this.props.product.inv})
    }  

    handleChangeProduct(e) {
        e.preventDefault()
        this.setState({product:{...this.state.product, [e.target.name]:e.target.value}})
    }

    handleChangeInventory(inventoryList) {
        this.setState({inventoryList})
    }

    handleRefreshInventory = (product, inventoryList) => {
        this.setState({product, inventoryList, buttonPressed:false})
    }    

    handleSubmit = (e) => {
        console.log('product:', this.state.product)
        e.preventDefault()
        this.setState({buttonPressed:true})
        postInventory(apiBaseUrl + '/updateProduct', 
            this.props.username, 
            this.props.password, 
            this.state.product,
            this.state.inventoryList, 
            (product, inventoryList)=>this.handleRefreshInventory(product, inventoryList))
    }       

    render = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <InventoryProduct edit={this.state.edit} product={this.state.product} handleChange={this.handleChangeProduct} />
                <InventoryInv edit={this.state.edit} productId={this.state.product.productId} inventoryList={this.state.inventoryList} handleChange={this.handleChangeInventory} />
                <input style={this.state.buttonPressed?styles.buttonPressed:styles.buttonUnpressed} type='submit' value={'Submit'} />
            </form>
        )    
    }    
}

export default InventoryUpdate;