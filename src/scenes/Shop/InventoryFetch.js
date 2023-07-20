import React from 'react';
import {tkInventory} from 'Data/tkInventory';
import fetchList from 'functions/fetchList';
import config from 'Settings/config';


const url='http://slimserver.local:8080/inventory'
//const url='http://nyasidan.tangokompaniet.com/api/slim_test/public/inventory'
// const url='https://randomuser.me/api/'

export default class InventoryFetch extends React.Component {
    constructor() {
        super();
        this.state = { inventory: [] };
    }

    // Immediately after a component is mounted, fetch inventory
    componentDidMount () {
        console.log('InventoryFetch mounted'); 

        let username=this.props.userid?this.props.userid:'';
        let password=this.props.password?this.props.password:'';
        
        // const url='http://slimserver.local:8080/classes'
        let environment = process.env.NODE_ENV;
        const url=config[process.env.NODE_ENV].apiBaseUrl + '/inventory'
        console.log('process.env.NODE_ENV =' +  environment);
        console.log('URL =' +  url);
        
        try {
            fetchList(username, password, url, (inventory) => this.setState({inventory}));
        } catch(e) {
            this.setState({inventory:[]})
            let errMessage = 'ERROR:' + e.message 
            console.log(errMessage);
            alert(errMessage)
        }    

    }
   
    // Render 
    render() {        
       return(
           <div>
               <div>Items:</div>
               {this.state.inventory.length!=0?    
                    <ul>
                    { this.state.inventory.map(item=> (
                            <li>Product:{item.productId} Size:{item.size} Count:{item.count} Reserved:{item.reservedCount}</li>
                        ))}    
                    </ul>
                :
                    'No elements in inventory'         
                }
           </div>  
       )
   }
}