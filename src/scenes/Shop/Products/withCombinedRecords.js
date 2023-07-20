import React, {Component} from 'react';
import fetchTwoList from 'functions/fetchTwoLists';
import config from 'Settings/config';
import PropTypes from 'prop-types'; 

// More components
const withCombinedRecords = (WrappedComponent) => {
    
    return class withCombinedRecords extends Component {
        static propTypes = {
            username: PropTypes.string,
            password: PropTypes.string,
            list: PropTypes.array,
            setList: PropTypes.func,
            url1: PropTypes.string,
            url2: PropTypes.string,
            concatinateLists: PropTypes.func,
        };

        constructor(props) {
            super();
            // this.state = { list:[]} ;
            this.fetch2FromDatabase = this.fetch2FromDatabase.bind(this);
            this.handleLists = this.handleLists.bind(this);
        }

        componentDidMount () {
            console.log('componentDidMount: withCombinedRecords'); 
            this.fetch2FromDatabase(this.props.url1, this.props.url2, 
                (list1, list2) => this.props.handleLists(list1, list2));
        }  

        componentWillReceiveProps(nextProps) {
            console.log('componentWillReceiveProps: withCombinedRecords'); 
            if (this.props.url1 !== nextProps.url1 && this.props.url2 !== nextProps.url2)  {
                this.fetch2FromDatabase(nextProps.url1, nextProps.url2, 
                    (list1, list2) => this.props.handleLists(list1, list2));
            } 
        }

        handleLists = (list1, list2) => {
            // Combine the two lists with a handleLists function in props
            let list = this.props.concatinateLists(list1, list2);
            this.props.setList(list);
        }


        // Fetchlists from database
        fetch2FromDatabase(propsUrl1, propsUrl2, handleLists) {
            let url1 = config[process.env.NODE_ENV].apiBaseUrl + propsUrl1
            let url2 = config[process.env.NODE_ENV].apiBaseUrl + propsUrl2
            try {
                let username=this.props.username?this.props.username:'';
                let password=this.props.password?this.props.password:'';
                fetchTwoList(username, password, [url1, url2], (list1, list2) => {
                    console.log('(withCombinedRecords) Number of found lists1:', list1.length)
                    console.log('(withCombinedRecords) Number of found lists2:', list2.length)
                    this.handleLists(list1, list2);
                })
            } catch(e) {
                this.handleLists([], []);
                let errMessage = 'ERROR:' + e.message + ' ' + ' url1=' + url1 + ' url2=' + url2;
                console.log(errMessage);
                alert(errMessage);
            } 
        }

      
        render () {
            return(
                <div>
                    {this.props.list.length > 0  ?
                        <WrappedComponent records={this.props.list} {...this.props} />    
                    :     
                       <h2>Trying to read two lists from database but failed. No records returned</h2>
                    }
                </div>    
            )    
        }   
    }  
}

export default withCombinedRecords;



