import React, {Component} from 'react';
import tkColors from 'Settings/tkColors';
import config from 'Settings/config';
import fetchList from 'functions/fetchList';
import PropTypes from 'prop-types'; 
import Tooltip from '@material-ui/core/Tooltip';
import {IconButton} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root:{
      position:'relative',
      paddingTop:20,
      paddingLeft:0, 
      width:'200vw',
      fontSize:14,
  },
  table: {
      paddingTop:10,
      borderCollapse:'collapse',
  },
  tbody: {
    border:2, 
    cellpadding:10,
  },  
  trNoBorder: {
    height:20,
    verticalAlign:'top',
    padding: 5,
  },
  tr: {
      height:20,
      verticalAlign:'top',
  },
  th: {
      color:'grey',
      verticalAlign:'bottom',
      minWidth:20,
  },
  tdNoBorder: {
    verticalAlign:'top',
    minWidth:25,
    fontStyle:'italic',
  },
  input: {
      maxWidth:200, color:'black', backgroundColor:'pink', fontStyle:'italic'
  },

};

// More components
export default class TableAdd extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    addRow: PropTypes.func,
  };

  constructor() {
      super();
      this.state = { columns:[], emptyRow:{}, row:{}, validEmails:[]};
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.fetchFromDatabase = this.fetchFromDatabase.bind(this)
    }

  componentDidMount () {
    const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/tkcolumns?tableName=' + this.props.table;
    console.log('component TableAdd mounted url=', url); 
    this.fetchFromDatabase(url)
  }  


  componentWillReceiveProps(nextProps) {
    if (this.props.table !== nextProps.table) {
      const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/tkcolumns?tableName=' + nextProps.table;
      this.fetchFromDatabase(url)
      console.log('component TableAdd recieved props url=', url); 
    }   
  }

  fetchFromDatabase(url) {
    try {
      fetchList(this.props.username, this.props.password, url, (columns) => {
        console.log('fetching from database columns: ', columns)
        // Set the columns
        this.setState({columns});

        // Set validEmails array with a true/false flag for each column (true if email address)
        let emptyRow = {}
        columns.forEach(it => emptyRow =  {...emptyRow, [it.Field]:''})
        this.setState({emptyRow, row:emptyRow});
      })
    } catch(e) {
      this.setState({columns:[]})
      let errMessage = 'ERROR:' + e.message 
      console.log(errMessage);
      alert(errMessage)
    }    
  }

  // Handle property change of a column in the Add row
  handleChange(e) {
    this.setState({row: {...this.state.row, [e.target.name]:e.target.value}})
    e.preventDefault();
  }

  isModified = (rec, obj) => {
    return (this.state.updatecolumns.find(it => rec.id===it.updateId?it[obj[0]]!==it[obj[0] + '_ORIGINAL']?true:false:false))
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.addRow(this.state.row); 
      this.setState({row:this.state.emptyRow}); 
      console.log('TableAdd: handleSubmit with row:', this.state.row);
    }

  render() {
      return(
      <div>
        {this.state.columns.length > 0?
          <form onSubmit={this.handleSubmit}>
              <table style={styles.table}>    
                <thead>
                  {Object.values(this.state.columns).map(obj=>
                    <th style={styles.th}>
                        {(obj.Field.includes('id')||obj.Field.includes('creaTimestamp')||obj.Field.includes('updTimestamp'))?null:obj.Field}
                    </th>
                  )}
                  <th>Add</th>
                </thead>
                <tbody>
                  <tr style={styles.tr}>
                    {Object.values(this.state.columns).map((obj, colIndex)=>
                        obj.Field === 'id' ||obj.Field === 'creaTimestamp' ||obj.Field ==='updTimestamp'?
                          <td style={styles.trNoBorder}></td>
                        :obj.Field ==='textBody'?
                          <td style={styles.td}>
                            <textarea 
                              style={styles.input} 
                              name={obj.Field} 
                              value={this.state.row[obj.Field]} 
                              placeholder={obj.Field} 
                              cols={25} 
                              rows={5} 
                              maxLength={300}
                              onChange={this.onChange}
                            />
                          </td>  
                        :
                          <td> 
                            <input 
                              key={colIndex}
                              type={obj.Field.includes('Time')?'time':obj.Field.includes('Date')?'date':obj.Field.includes('email')?'email':'text'} 
                              style={styles.input} 
                              name={obj.Field} 
                              value={this.state.row[obj.Field]} 
                              placeholder={obj.Field} 
                              onChange={this.handleChange}/>
                          </td>  
                    )}
                    <td style={styles.trNoBorder}>
                      <Tooltip title='Add row'>
                        <IconButton type="submit" style={{padding:0, margin:0, top:0, left:0}}>
                          <AddCircleIcon style={{cursor:'pointer', color:'grey'}}/>
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>  
              </table>
          </form>
        :null}
      </div>
    )  
  }
};

