import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import config from 'Settings/config';
import InventoryImage from './InventoryImage'
import tkColors from 'Settings/tkColors'
import postImageNames from 'functions/postImageName'
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


class InventoryUpdateImage extends Component {
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
    }  

    handleChangeProduct(e) {
        e.preventDefault()
        this.setState({product:{...this.state.product, [e.target.name]:e.target.value}})
    }


    handleSubmit = (e) => {
        let url=apiBaseUrl + '/renameImages2'
        let products = this.state.products;
        this.setState({buttonPressed:true});
        console.log('handleSumbitImages: products:', products);  
        e.preventDefault()

        postImageNames(url, this.props.username, this.props.passsword, products, (list) => this.setList(list));
    }

    render = () => {
        const edit=this.props.edit;
        return(
            <form onSubmit={this.handleSubmit}>
                <InventoryImage edit={this.state.edit} product={this.state.product} handleChange={this.handleChangeProduct} />
                <input style={this.state.buttonPressed?styles.buttonPressed:styles.buttonUnpressed} type='submit' value={'Rename'} />
            </form>
        )    
    }    
}

export default InventoryUpdateImage;