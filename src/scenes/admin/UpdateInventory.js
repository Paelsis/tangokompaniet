import React, {Component} from 'react';
import postSell from 'scenes/Shop/Products/postSell'
import config from 'Settings/config';

export default class UpdateInventory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {id: '', size:'', increment:0, sizeCountNew:'Unset value'};
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    sell = (id, size, increment) => {
        let url=config[process.env.NODE_ENV].apiBaseUrl +'/postSell';
        const keys={['id']:id, ['productId']:'NOT USED'};
        const data={['size']:size, ['increment']:increment};
        postSell(url,
            this.props.username, 
            this.props.password,
            keys,
            data,
            (sizeCountNew) => this.setState({sizeCountNew}));
    }

    handleSubmit = (event) => {
        this.sell(this.state.id, this.state.size, this.state.increment);
        event.preventDefault();
    }
  
    render() {
      return (
        <div>  
            <form onSubmit={this.handleSubmit}>
                <label>
                    Id:
                    <input type="text" style={{width:20}} value={this.state.id} onChange={e => this.setState({id:e.target.value})} />
                </label>
                <label>
                    Size:
                    <input type="text" style={{width:40}} value={this.state.size} onChange={e => this.setState({size:e.target.value})} />
                </label>
                <label>
                    Increment:
                    <input type="text" style={{width:20}} value={this.state.increment} onChange={e => this.setState({increment:e.target.value})} />
                </label>
            <input type="submit" value="Submit" />
            </form>
            <h1>{this.state.sizeCountNew}</h1>
        </div>
      );
    }
  }
  