import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import tkColors from 'Settings/tkColors'

var invCount=0;

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
  

class InventoryInv extends Component {
    static propTypes = {
        productId:PropTypes.string,
        inventoryList: PropTypes.array,
        handleChange: PropTypes.func,
    };

    constructor() {
        super();
        this.state = {
            inv:{heel:undefined, size:undefined, counter:undefined},
            buttonPressed:false,
        };
        this.handleInvAdd = this.handleInvAdd.bind(this)
        this.renderInvAdd = this.renderInvAdd.bind(this)
        this.handleInvUpdate = this.handleInvUpdate.bind(this)
        this.renderInvAdd = this.renderInvAdd.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderShow = this.renderShow.bind(this)
    }   

    handleInvChange = (e) => {
        this.setState({inv: {...this.state.inv, [e.target.name]:e.target.value}})
    }

    handleInvAdd = () => {
        const inventoryList=[...this.props.inventoryList,
             {id:'NEW_' + invCount++, productId:this.props.productId, ...this.state.inv}];  
        this.props.handleChange(inventoryList);
    }

    handleInvDelete = (id) => {
        let inventoryList = this.props.inventoryList.filter((iv) => iv.id !== id);
        this.props.handleChange(inventoryList);
    }

    
    handleInvUpdate = (event, id, index) => {
        const inventoryList = [...this.props.inventoryList]
        inventoryList[index][event.target.name]=event.target.value;
        this.props.handleChange(inventoryList);
    }

    renderInvAdd = () => (
                <tr>
                    <td >Heel Height:        
                        <select name={'heel'} value={this.state.inv.heel?this.state.inv.heel:undefined} onChange={e=>this.handleInvChange(e)}> 
                            <option value={undefined}>Undefined</option>
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
                        <input name={'size'} type="text" value={this.state.inv.size?this.state.inv.size:undefined} onChange={e=>this.handleInvChange(e)} /> 
                    </td>
                    <td colSpan={1}>Counter: 
                        <input  
                            style={{width:20}} 
                            type="number" 
                            name={'counter'} 
                            value={this.state.inv.counter?this.state.inv.counter:0}
                            onChange={event=>this.handleInvChange(event)}
                        />
                    </td>            
                    <td> 
                        <button className="button" style={styles.button} onClick={()=>this.handleInvAdd()}>Add</button> 
                    </td>            
                </tr>
    )
    

    renderEdit = () => {
        const list = this.props.inventoryList?this.props.inventoryList.filter(iv=>iv.counter > 0).sort((a,b)=>a.size - b.size):undefined
        return(
            list?
                <table>
                    <tbody>
                    {this.renderInvAdd()}
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
                                            onChange={event=>this.handleInvUpdate(event, iv.id, ix)} 
                                        />
                                    </td>
                                    <td colSpan={1}><button className="button" style={styles.button} onClick={()=>this.handleInvDelete(iv.id)}>Delete</button></td>

                            </tr>  
                    )}
                    </tbody>
                </table> 
            :
                <h2>Inventory list not found</h2>        
        )  
    }    

    renderShow = () => {
        let list = this.props.inventoryList.filter(iv => iv.counter > 0).sort((a,b)=>a.size - b.size===0);
        return(
            <table>
                <tbody>
                {this.renderInvAdd()}
                {list.map((iv, ix) =>
                        <tr key={ix}>
                                <td>Heel:{iv.heel} cm</td>
                                <td>Size:{iv.size}</td>
                                <td colSpan={2}>Counter:{iv.counter}</td>
                        </tr>  
                )}
                <tr>
                    <td colSpan={4}>        
                    <button className="button" 
                        style={this.state.buttonPressed?styles.buttonPressed:styles.buttonUnpressed} 
                        onClick={()=>this.updateInventory()} 
                    >
                        {this.state.buttonPressed?'Saving ...':'Update'}
                        </button>
                    </td>        
                </tr>    
                </tbody>
            </table>    
        )  
    }    

    render = () => {
        return(this.props.edit?this.renderEdit():this.renderShow())
    }    
}

export default InventoryInv;
