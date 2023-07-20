import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import fetchList from 'functions/fetchList';
import config from 'Settings/config';

// Note thh url can either arrive from props

// More components
const withMultipleListsFromStore = (WrappedComponent) => {
    return class _withMultipleListsFromStore extends Component {
        static propTypes = {
            username: PropTypes.string,
            password: PropTypes.string,
            urls: PropTypes.array,
            lists: PropTypes.array,
            setLists: PropTypes.array,
        };

        constructor(props) {
            super();
            this.fetchFromDatabase = this.fetchFromDatabase.bind(this);
        }
        

        componentDidMount () {
            this.props.urls.forEach((url, index) => {
                console.log('componentDidMount: withMultiple... this.props.urls=', url?url:'url not found'); 
                this.fetchFromDatabase(url, index)
            })    
        }  


        componentWillReceiveProps(nextProps) {
            nextProps.urls.forEach((url, index) => {
                if (this.props.urls[index] !== url) {
                    console.log('componentDidReceiveProps: withMultiple nextProps.url=', url?url:'nextProps.url not found'); 
                    this.fetchFromDatabase(url, index)
                }})
        }

        // Fetchrecords from database
        fetchFromDatabase(url, index) {
            let username=this.props.username?this.props.username:'';
            let password=this.props.password?this.props.password:'';
            try {
                let urlComplete=config[process.env.NODE_ENV].apiBaseUrl + url;
                fetchList(username, password, urlComplete, (records) => {
                    console.log('(withMultiple ...) Number of found records:', records.length)
                    if (typeof this.props.setLists[index] !== undefined) {
                        this.props.setLists[index](records);
                    } else {                           
                        console.log('ERROR: function setLists in call')
                    }   
                })
            } catch(e) {
                this.setLists[index]([]);
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

export default withMultipleListsFromStore;