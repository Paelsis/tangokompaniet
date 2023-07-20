import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'; 
import * as EmailValidator from 'email-validator';
import Divider from 'material-ui/Divider';
import tkColors from 'Settings/tkColors'
import fetchList from 'functions/fetchList';
import {BRAND} from 'Settings/Const';
import config, {SHOP_IMAGE_DIR} from 'Settings/config';
import withRecords from 'Components/Table/withRecords'
import InventoryUpdate from './InventoryUpdate'
import InventoryUpdateImage from './InventoryUpdateImage'
const productDefault = { 
    id:0, 
    productId: 0,
    productType:'shoe', 
    productName:undefined, 
    image:undefined, 
    imageNumber:1,
    priceGroup:undefined, 
    price:undefined,
    color:undefined, 
    comment:undefined,
    // Keys
    heel:undefined, 
    size:undefined, 
    // Filter 
    gender:undefined,
    brandId:undefined,
    openHeel:undefined,
    openToe:undefined,
    // Inventory
    counter:0,
 };




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
class _Inventory extends Component {
    static propTypes = {
        username: PropTypes.string,
        password: PropTypes.string,
        list: PropTypes.array,
        setList: PropTypes.func,
    };


    constructor() {
        super();
        this.state = {
            products:[], 
            inventoryList:[], 
            bottonPressed:false, 
            filterProductId:'', 
            editProductId:false, 
            productEdit:undefined, 
            inventoryListUpdate:[]
        };
        this.toggleEdit = this.toggleEdit.bind(this)
        this.renderFilterProductId = this.renderFilterProductId.bind(this)
        this.setList = this.setList.bind(this)
        this.resetBothLists = this.resetBothLists.bind(this)
        this.handleAllow = this.handleAllow.bind(this)
    }   

    resetBothLists = (inventoryList) => {
        // Each product will be updated with latest records from tbl_proudcts_def
        let products = this.state.products.map(pr => {
            let invFound = inventoryList.find(iv => pr.productId === iv.productId);  
            if (typeof(invFound) !== 'undefined') {
                let updProduct = {...pr, ...invFound}
                console.log('updProduct:', updProduct);
                return(updProduct)
            }    
            return(pr);
        })
        console.log('resetBothLists:', products)
        this.setState({inventoryList, products})
    }




    getLists = (products) => {
        console.log('products:', products)
        this.setState({products});
    }


    componentDidMount () {
        this.setState({products:this.props.list.sort((a,b)=>a.productId.localeCompare(b.productId))});
    }  

    componentWillReceiveProps(nextProps) {
        if (this.props.list != nextProps.list && typeof(nextProps.list)!= "undefined") {  
            this.setState({products:nextProps.list.sort((a,b)=>a.productId.localeCompare(b.productId))});
        }
    }   

    setFilterProductId = (filterProductId) =>{
        this.setState({filterProductId});
    }
        
    removeExtension = (filename) => {
        var lastDotPosition = filename.lastIndexOf(".");
        if (lastDotPosition === -1) {
            return filename;
        } else { 
            return filename.substr(0, lastDotPosition);
        }    
    }

    createProducts = (list) => {
        var products=[];
        let id=0;
        console.log('number of products:' + list.length)
        
        // list contains all image names in the shops images directory
        if (typeof(list) != "undefined") {
            list.forEach(it => 
            {   
                let imageNumber=this.removeExtension(it).split('.').pop()
                products.push({ ...productDefault, 
                                productId: it.split('.')[0], 
                                id,                
                                image:it, 
                                imageNumber:imageNumber?imageNumber:1,
                            });
                id++;
            })  
        }
        products.sort((a,b)=>{
            let A=a.productId.toUpperCase();
            let B=b.productId.toUpperCase();
            if (A > B) {
                return 1;
            } else if (A < B) {
                return -1;
            } else if (a.imagenNumber > b.imageNumber) {
                return 1;
            } else if (b.imagenNumber > a.imageNumber) {
                return -1;
            } else {
                return 0;    
            }
        })    
        console.log('number of products:' + products.length)
        return(products);
    }

    handleFilterProductId = (event) => {
        this.setState({filterProductId:event.target.value});
    }

    setList = (products) => {
        this.setState({buttonPressed:false});  
        this.props.setList(products);
    }

    updateButtonPressed = (productId, buttonPressed) => {
    let products = this.state.products.map((item, index) => {
            if(item.productId !== productId) {
                // This isn't the item we care about - keep it as-is
                return item;
            }

            // this is item we look for - return an updated value
            return {...item, buttonPressed};  
        });
        this.setState({products});
    }

    setInventoryList = (productId, inventoryList) => {
        this.updateButtonPressed(productId, false);
        this.setState({inventoryList, edit:false, productEdit:undefined})
    }
    


    
    toggleEdit = (pr, index) => {
        if (this.state.productEdit) {
            if (this.state.productEdit[index]) {
                this.updateInventory(pr, index);       
                return;
            } else {
                this.setState({productEdit:{...this.state.productEdit, [index]:true}})
                return;
            }
        } else {
            this.setState({productEdit:{[index]:true}})
        }
    }


    

    renderEditButton = (pr, index) =>  (  
        <tr>
            <td>
                <button className="button" 
                    style={pr.buttonPressed?styles.buttonPressed:styles.buttonUnpressed} 
                    onClick={()=>this.toggleEdit(pr, index)} 
                >
                    {this.state.productEdit?this.state.productEdit[index]?'Save':'Update':'Update'}
                </button>
            </td>
            <td>
            </td>
            <td colSpan={4} />
        </tr>       
    )
   

    handleSubmit = (o) => {
        alert('handleSubmit:', o)
    }




    handleAllow = () => {
        if (this.state.editProductId) {
            this.handleSubmitImages()
        }
        this.setState({editProductId:!this.state.editProductId})
    }

    renderFilterProductId = (value) => (
        <div>  
        Filter on productId:     
        <input
            type='string'
            style={{width:100}} 
            value={value}
            onChange={e=>this.handleFilterProductId(e)} 
        />
        </div>
    )  



    renderImage = (pr, index) => {
        console.log('buttonPressed:', pr.buttonPressed)  
        
        return(
            <div>
                <img key={index} src={imageUrl + pr.image[0]} alt={'no image'} width={200} />
                &nbsp;&nbsp;&nbsp;
                <h4>{pr.image[0]}</h4>
                <InventoryUpdateImage product={pr} edit={true}/>
                <Divider color={tkColors.color} style={styles.divider} />
            </div>
        )
    }


    renderInventory = (pr, index) => {
        console.log('buttonPressed:', pr.buttonPressed)  
        
        return(
            <div key={pr.id}>
                {pr.images.map((image, ix) => 
                    <div key={ix}>
                    <img key={ix} src={imageUrl + image} alt={'no image'} width={200} />
                        &nbsp;&nbsp;&nbsp;
                        {image}
                    </div>    
                )}    
                <InventoryUpdate {...this.props} product={pr} edit={true} inventoryList={pr.inv} />
                <Divider color={tkColors.color} style={styles.divider} />
            </div>
        )
    }


    render() {
        let products=this.state.products;
        if (this.state.productEdit) {
            products=this.state.products.
                filter((it, index) => this.state.productEdit?this.state.productEdit[index]?true:false:false);
        } else if (this.state.filterProductId.length > 0) {  
            products=this.state.products.
                filter(it => it.productId.indexOf(this.state.filterProductId) !== -1);
        }    
        return(
        <div style={styles.root}>
            {this.renderFilterProductId(this.state.filterProductId, this.setFilterProductId)}
            {products.length > 0?
                <div>
                    <h4>Number of products: {products.length}</h4>
                    {products.map((pr, index)  =>
                        this.state.editProductId?this.renderImage(pr, index):this.renderInventory(pr, index)
                    )}
                </div>
            :<h4>Wait 3-5 seconds for images to load ...</h4>}    
        </div>
        )  
    }
};

let Inventory = withRecords(_Inventory);

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        url:'/getProducts',
        sortKey:'productId',
    }
}    

Inventory =  connect( 
    mapStateToProps,
) (Inventory);    

export default Inventory;

