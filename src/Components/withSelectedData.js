import React, {Component} from 'react';
import config from 'Settings/config';
import fetchList from './fetchList'

const withSelectedData = (WrappedComponent) => {

  // Returns a class
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { records:[] }
      this.fetchFromDatabase = this.fetchFromDatabase.bind(this)
    }

    componentDidMount () {
      let url=config[process.env.NODE_ENV].apiBaseUrl + this.props.url?this.props.url:this.props.xxx;
      this.fetchFromDatabase(url)
      console.log('componentDidMount (datafeched from DB for url:' + url); 
    }  


    componentWillReceiveProps(nextProps) {
      if (this.props.url !== nextProps.url) {
        let url=config[process.env.NODE_ENV].apiBaseUrl + nextProps.url;
        console.log('component Table recieved props'); 
        this.fetchFromDatabase(url)
      }   
    }

    fetchFromDatabase(url) {
      try {
        let username=this.props.username?this.props.username:'';
        let password=this.props.password?this.props.password:'';
        
        fetchList(username, password, url, (records) => {
          this.setState({records});
          this.initList(records);
        })

      } catch(e) {
        this.setState({records:[]})
        let errMessage = 'ERROR:' + e.message 
        console.log(errMessage);
        alert(errMessage)
      }    
    }

    render() {
      return(
          <div>
          {this.state.records.length > 0?
            <WrappedComponent records={this.state.records} {...this.props} />
          :
            <h2>Waiting for database to load ...</h2>  
          }  
          </div>  
      )      
    }      
  }  
}

export default withSelectedData;

