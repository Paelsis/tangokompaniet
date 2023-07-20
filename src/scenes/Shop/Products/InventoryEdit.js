
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'; 
import tkColors from 'Settings/tkColors'
import {BRAND} from 'Settings/Const';
import config from 'Settings/config';
import fetchList from 'functions/fetchList';
import postInventory from './postInventory'


const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl
const invUrl=config[process.env.NODE_ENV].apiBaseUrl + '/getInventory';

let invCount=0;

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
  

class InventoryEdit extends Component {
    static propTypes = {
        inventory: PropTypes.object,
        index: PropTypes.number,
    };

    constructor() {
        super();
        this.state = {
            product:{}, 
            inventoryList:[], 
            updateButtonPressed:false,
        };
        this.renderProductIdLine = this.renderProductIdLine.bind(this)
        this.renderProductLine = this.renderProductLine.bind(this)
        this.renderAddInvLine = this.renderAddInvLine.bind(this)
        this.handleInvAdd = this.handleInvAdd.bind(this)
        this.handleInvDelete = this.handleInvDelete.bind(this)
        this.handleInvUpdate = this.handleInvUpdate.bind(this)
        this.handleInvSubmit = this.handleInvSubmit.bind(this)
    }   

    componentDidMount () {
        console.log('_Inventory.componentDidMount: _Inventory passed this.props.product=', this.props.product)
        console.log('_Inventory.componentDidMount: _Inventory number of records in this.props.index =', this.props.index)
        fetchList(this.props.username, this.props.password, invUrl, (inventoryList)=> this.setState({inventoryList}));
        this.setState({product:this.props.product, index:this.props.index});
    }  

    componentWillReceiveProps(nextProps) {
        if (this.props.product != nextProps.product || this.props.index != nextProps.index) {  
            console.log('_Inventory.componentDidMount: _Inventory passed this.props.product=', this.props.product)
            console.log('_Inventory.componentDidMount: _Inventory number of records in this.props.index =', this.props.index)
            fetchList(this.props.username, this.props.password, invUrl, (inventoryList)=> this.setState({inventoryList}));
            this.setState({product:this.props.product, index:this.props.index});
        }
    }   

    toggleEdit = (pr) => {
        this.setState({productEdit:pr, edit:true})
        this.setState({inventoryListEdit:this.state.inventoryList.filter(it => it.productId === pr.productId)});
    }

    handleProductChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let product = {...this.state.product, [name]:value}
        this.setState({product})
    }

    handleInvAdd(pr) {
        let inv = {id : 'NEW_' + invCount++, productId:pr.productId, heel:pr.heel, size:pr.size, counter:pr.counter};  
        this.setState({inventoryList: [...this.state.inventoryList, inv]});
    }

    handleInvDelete(id) {
        let inventoryList = this.state.inventoryList.filter((iv) => iv.id !== id);
        this.setState({inventoryList}) 
    }

    handleInvUpdate(event, id) {
        const name = event.target.name;
        const value = event.target.value;
        let inventoryList = this.state.inventoryList.map((it, ix) => {
            if(it.id !== id) {
                // This isn't the item we care about - keep it as-is
                return it;
            }
            return {...it,[name]:value};  
        });
        this.setState({inventoryList});
    }

    handleInvSubmit(product) {
        let url=apiBaseUrl + '/updateInventory';
        let productId = product.productId;
        let inventoryList = this.state.inventoryList.filter(iv => iv.productId === product.productId);
        this.updateButtonPressed(productId, true);
        postInventory(url, this.props.username, this.props.password, 
            product, 
            inventoryList, 
            (inventoryList)=>this.setState({inventoryList})) 
    }



    renderProductIdLine = (pr, index) => (
        <tbody>  
            <tr key={index}>       
                <td>productId:
                    {this.state.editProduct?
                    <input key={index} 
                        style={{width:75}} 
                        type="text"  
                        name={'productId'} 
                        value={pr.productId} 
                        //disabled={!this.state.editProductId}
                        onChange={event=>this.handleProductChange(event)}
                    />
                        :pr.productId
                    }
                </td>
                <td>imageNumber:
                    <input key={index} 
                        style={{width:80}} 
                        type="number" 
                        name={'imageNumber'} 
                        value={pr.imageNumber}
                        min={0}
                        //disabled={!this.state.editProductId}
                        onChange={event=>this.handleProductChange(event)} />
                </td>
                <td>Comment:        
                        <input key={index} 
                                style={{width:120}} 
                                type="string" 
                                name={'comment'} 
                                placeholder={'optional'}
                                value={pr.comment}
                                disabled={this.state.editProductId}
                                onChange={event=>this.handleProductChange(event)} />
                </td>
                <td>priceGroup:        
                        <input key={index} 
                            style={{width:40}} 
                            type="number" 
                            name={'priceGroup'} 
                            value={this.state.product.priceGroup} 
                            min={0}
                            max={100}
                            onChange={event=>this.handleProductChange(event)} />
                </td>
                <td>productType:        
                    <select name={'productType'} value={pr.productType} onChange={event=>this.handleProductChange(event)}> 
                                <option value={''}>Undefined</option>
                                <option value={'shoe'}>Shoe</option>
                                <option value={'t-shirt'}>T-shirt</option>
                                <option value={'skirt'}>Skirt</option>
                                <option value={'hoodie'}>Hoodie</option>
                    </select>            
                </td>   
                <td>(id={pr.id})</td>
                <td colspan={1} />
            </tr>
        </tbody>
    )

    renderInv = (pr) => {
        let list = this.state.inventoryList?
            this.state.inventoryList.filter((iv)=>(iv.productId===pr.productId) && (iv.counter > 0)).sort((a,b)=>a.size - b.size===0?a.color -b.color:a.size - b.size):[];

        return(
            <tbody>
                {list.map((iv, ix) =>
                        <tr key={ix}>
                                <td>Heel Height:{iv.heel}</td>
                                <td>Size:{iv.size}</td>
                                <td>Counter:
                                    <input key={ix} 
                                        style={{width:30}} 
                                        type="number" 
                                        name={'counter'} 
                                        value={iv.counter}
                                        onChange={event=>this.handleInvUpdate(event, iv.id)} 
                                    />
                                </td>
                                <td><button className="button" style={styles.button} onClick={()=>this.handleInvDelete(iv.id)}>Delete</button></td>
                        </tr>  
                )}
            </tbody>
        )  
    }

    

    renderProductLine = (pr, index) => (
        <tbody>  
            <tr>         
                <td>Gender:        
                    <select name={'gender'} value={pr.gender} onChange={event=>this.handleProductChange(event)}> 
                                <option value={'undefined'}>Undefined</option>
                                <option value={'Female'}>Female</option>
                                <option value={'Male'}>Male</option>
                                <option value={'Hen'}>Hen</option>
                    </select>            
                </td>
                <td>Color:        
                    <input key={index} 
                            style={{width:60}} 
                            type="string" 
                            name={'color'} 
                            placeholder={'optional'}
                            value={pr.color}
                            onChange={event=>this.handleProductChange(event)}
                     />
                </td>     
                <td>Toe:        
                    <select name={'openToe'} value={pr.openToe} onChange={event=>this.handleProductChange(event)}> 
                                <option value={'undefined'}>Undefined</option>
                                <option value={'Open'}>Open</option>
                                <option value={'Closed'}>Closed</option>
                    </select>            
                </td>
                <td>Heel:        
                    <select name={'openHeel'} value={pr.openHeel} onChange={event=>this.handleProductChange(event)}> 
                                <option value={'undefined'}>Undefined</option>
                                <option value={'Open'}>Open</option>
                                <option value={'Closed'}>Close</option>
                    </select>        
                </td>
                <td colSpan={1} >Brand:        
                    <select name={'brandId'} value={pr.brandId} onChange={event=>this.handleProductChange(event)}> 
                        <option value={'undefined'}>Undefined</option>
                        {BRAND.map(it => <option value={it.name}>{it.label}</option>)}
                    </select>        
                </td>   
            </tr>
        </tbody>    
    )

    renderAddInvLine = (pr, index) => (
        <tbody>  
            <tr>
                <td >Heel Height:        
                    <select name={'heel'} value={pr.heelValue} onChange={event=>this.handleProductChange(event)}> 
                        <option value={0}>Unset</option>
                        <option value={5}>5 cm</option>
                        <option value={6}>6 cm</option>
                        <option value={7}>7 cm</option>
                        <option value={8}>8 cm</option>
                        <option value={9}>9 cm</option>
                        <option value={10}>10 cm</option>
                        <option value={11}>11 cm</option>
                    </select>        
                </td>            
                <td>Size
                    <input name={'size'} type="text" value={pr.size} onChange={event=>this.handleProductChange(event)} /> 
                </td>
                <td colSpan={1}>Counter: 
                    <input key={index} 
                        style={{width:30}} 
                        type="number" 
                        name={'counter'} 
                        value={pr.counter}
                        onChange={event=>this.handleProductChange(event)} />
                </td>            
                <td> 
                    <button className="button" style={styles.button} onClick={()=>this.handleInvAdd(pr)}>Add</button> 
                </td>            
            </tr>
        </tbody>
    )


    renderOnlyImageNumber = (pr, index) => (
        <tr>
            <td colSpan={6}>imageNumber:
            <input key={index} 
            style={{width:100}} 
            type="number" 
            name={'imageNumber'} 
            value={pr.imageNumber}
            onChange={event=>this.handleProductChange(event)} />
            </td>
        </tr>
    )

    handleSubmit = (e) => {
        let url=apiBaseUrl + '/updateInventory';
        let productId = this.state.product.productId;
        let inventoryList = this.state.inventoryList.filter(iv => iv.productId === productId);
        this.setState({updateButtonPressed:true})
        postInventory(url, this.props.username, this.props.password, 
                        this.state.product, 
                        inventoryList, 
                        (inventoryList)=>this.setState({inventoryList, updateButtonPressed:false})) 
        e.preventDefault();
      
    }


    renderSubmitButton = (pr) =>  (  
        <tr>
            <td>
                <input style={this.state.updateButtonPressed?styles.buttonPressed:styles.buttonUnpressed} type='submit' value={'Submit'} />
            </td>
            <td colSpan={5} />
        </tr>       
    )
  

    renderProduct = (pr, index)  => (
        <form onSubmit={this.handleSubmit} >
            <table>    
                <tbody>
                    {this.renderProductIdLine(pr, index)}
                    {this.renderProductLine(pr, index)}                    
                    {this.renderAddInvLine(pr, index)}
                    {this.renderInv(pr)}
                    {this.renderSubmitButton(pr)}
                </tbody>  
            </table>
        </form>
    )  

    render = () => {
        return(this.renderProduct(this.state.product, this.props.index));
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        url:'/shopImages',
    }
}    

InventoryEdit =  connect( 
    mapStateToProps,
) (InventoryEdit);    

export default InventoryEdit