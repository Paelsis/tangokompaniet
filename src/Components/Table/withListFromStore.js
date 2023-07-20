import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import fetchList from 'functions/fetchList';
import config from 'Settings/config';

// Note thh url can either arrive from props
// More components
const withListFromStore = (WrappedComponent, loadOnce) => {
    return class _withListFromStore extends Component {
        static propTypes = {
            username: PropTypes.string,
            password: PropTypes.string,
            url: PropTypes.string,
            list: PropTypes.array,
            setList: PropTypes.func
        };
    
        constructor(props) {
            super();
            this.fetchFromDatabase = this.fetchFromDatabase.bind(this);
        }
        
    
        componentDidMount () {
            if (!loadOnce || this.props.list.length === 0) {
                console.log('componentDidMount: withListFromStore this.props.url=', this.props.url?this.props.url:'nextProps.url not found'); 
                this.fetchFromDatabase(this.props.url)
            }    
        }  
    
    
        componentWillReceiveProps(nextProps) {
            if (this.props.url !== nextProps.url && (!loadOnce || this.props.list.length === 0))  {
                console.log('componentDidMount: withListFromStore nextProps.url=', nextProps.url?nextProps.url:'nextProps.url not found'); 
                this.fetchFromDatabase(nextProps.url)
            } 
        }
    
        // Choose url either from props or from state (the latter if sent via Link)
        findUrl(propsUrl) {
            let urlActive=null;
            if (propsUrl) {
                urlActive=config[process.env.NODE_ENV].apiBaseUrl + propsUrl;
            } else if (typeof this.props.location != "undefined") {    
                let {url}=this.props.location.state?this.props.location.state:{url:'No url in location state'};
                urlActive=config[process.env.NODE_ENV].apiBaseUrl + url;
            } else {
                console.log('ERROR: Function \"withListFromStore\" did not find any url in props or in this.props.location.state'); 
            }   
            return urlActive;
        }    
    
    
        // Fetchrecords from database
        fetchFromDatabase(propsUrl) {
            let url = this.findUrl(propsUrl);
            try {
                const username=this.props.username?this.props.username:undefined
                const password=this.props.password?this.props.password:undefined
                
                fetchList(username, password, url, (records) => {
                    console.log('(withListFromStore) Number of found records:', records.length)
                    if (typeof this.props.setList != undefined) {
                        this.props.setList(records);
                    } else {
                        console.log('ERROR: function setList in call')
                    }   
                })
            } catch(e) {
                this.props.setList([]);
                let errMessage = 'ERROR:' + e.message + ' ' + ' url=' + url;
                console.log(errMessage);
                alert(errMessage);
            } 
        }
    
      
        render () {
            return(<WrappedComponent  {...this.props} />)    
        }    
    }  
    
}

export default withListFromStore;