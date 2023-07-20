import React, {Component} from 'react';
import * as EmailValidator from 'email-validator';
import tkColors from 'Settings/tkColors'
import fetchList from 'functions/fetchList';
import config from 'Settings/config';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Alert = (msg) => {
  Text('click:' + msg)
}

const styles = {
  root:{
      position:'relative',
      paddingTop:20,
      paddingLeft:0, 
      width:'200vw',
      backgroundColor:tkColors.background,
      fontSize:14,
  },
  table: {
      paddingTop:10,
      backgroundColor:tkColors.background,
      // borderCollapse:'collapse',
      borderColor:tkColors.border,
  },
  tbody: {
    border:2, 
    cellpadding:10,
  },  
  trNoBorder: {
    height:20,
    verticalAlign:'top',
    padding: 5,
    fontSize: 15,
  },
  tr: {
      height:20,
      verticalAlign:'top',
      padding: 5,
      fontSize: 14,
      border:'0.1px solid',
      borderColor:tkColors.border,
  },
  th: {
      verticalAlign:'bottom',
      padding: 8,
      fontSize:16,
      color: 'grey',
      borderBottom:'0.1px solid',
      borderColor:tkColors.border,
      minWidth:20,
  },
  tdNoBorder: {
    verticalAlign:'top',
    padding: 8,
    color:tkColors.color,
    minWidth:15,
  },
  td: {
      verticalAlign:'top',
      padding: 8,
      color:tkColors.color,
      borderBottom:'0.1px solid',
      borderColor:tkColors.border,
      maxWidth:90,
      minWidth:15,
  },

};


// More components
export default class TableUpdate extends Component {
  constructor() {
      super();
      this.state = { records:[], updateRecords:[],  searchValues:[], validEmails:[]};
      this.handleChange = this.handleChange.bind(this)
      this.initializeStateVariables = this.initializeStateVariables.bind(this) 
  }

  initializeStateVariables(records) {
    // Set the records
    this.setState({records});

    this.setState({updateRecords:[]})

    // Make an array with the length equal to number of columns and all elements empty string to begin with
    this.setState({searchValues: []})
    Object.keys(records[0]).forEach((key, index) => 
        this.setState({searchValues: [...this.state.searchValues, '']})
    )

    // Set validEmails array with a true/false flag for each column (true if email address)
    this.setState({validEmails: []})
    Object.values(records[0]).forEach((value, index) => 
      this.setState({validEmails: [...this.state.validEmails, EmailValidator.validate(value)]})
    )
  }    

  componentDidMount () {
    let url=config[process.env.NODE_ENV].apiBaseUrl + this.props.url;
    console.log('component Table mounted with process.env.NODE_ENV', pricess.env.NODE_ENV); 

    // If there the records already are included in call, use this (no need to read new ones)
    if (this.props.list?true:false) {
      this.setState({records:this.props.list})
      this.initializeStateVariables(this.props.list);
    } else {
      this.fetchFromDatabase(url);
    }  
  }  


  componentWillReceiveProps(nextProps) {
    // If url or records props modified, then rerender
    if ((this.props.url !== nextProps.url) && nextProps.records?false:true) {
      // Load records from DB via URL
      let url=config[process.env.NODE_ENV].apiBaseUrl + nextProps.url;
      console.log('TableUpdate: new url or new records'); 
      this.fetchFromDatabase(url)
    } else {
      // Get records from props
      console.log('component taking Table recieved props'); 
      this.initializeStateVariables(nextProps.records);
    } 
  }

  fetchFromDatabase(url) {
    try {
      let username=this.props.username?this.props.username:'';
      let password=this.props.password?this.props.password:'';
      
      fetchList(username, password, url, (records) => {
         // After return from fetchList set all the state lists
         this.initializeStateVariables(records);
      })

    } catch(e) {
      this.setState({records:[]})
      let errMessage = 'ERROR:' + e.message 
      console.log(errMessage);
      alert(errMessage)
    }    
  }

  delRecord(id) {
    const users = this.state.recorusers;
    delete users[id];
    this.setState(users);
    
  }

  handleChange(event, id) {
    const name = event.target.name;
    const value = event.target.value;
    const actionIndex = this.state.records.findIndex(it => it.id === id)
    
    if (this.state.updateRecords.find(it => it.updateId === id)?false:true) {
        // There is no record for this updateId, so create one
        this.setState({ updateRecords: [...this.state.updateRecords, 
                                        {updateId:id, [name]:value, [name + '_ORIGINAL']:this.state.records[actionIndex][name]}
                                       ]
                      }
                     )        
    } else {
        // There already exist a record for this id
        let updateRecords = this.state.updateRecords.map(item => {
            if(item.updateId !== id) {
                // This isn't the item we care about - keep it as-is
                return item;
            }

            // Otherwise, only the [name] to true for fields that are updated
            if (typeof(item[name])==='undefined')  {
                // First time the variable is updated the original value is saved in a separate field 
                return {...item, [name]:value, [name + '_ORIGINAL']:this.state.records[actionIndex][name]}    
            } else {
                // Subsequent times only the value is set
                return {...item, [name]:value}    
            }    
        });
        console.log('updateRecords:', updateRecords)
        this.setState({updateRecords});
    }
    
    let records = this.state.records.map((item, index) => {
        if(index !== actionIndex) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
  
        // this is item we look for - return an updated value
        return {...item,[name]:value};  
      });
      this.setState({records});
      console.log('value:', value)
  
    }

  handleSearch(event, index) {
    let searchValues = [...this.state.searchValues];
    searchValues[index] = event.target.value;
    this.setState({searchValues});
  }
  
  render() {
      let filterList = this.state.records;
      if (this.state.searchValues.length > 0) {
        this.state.searchValues.forEach((sv, index) => {
          if (sv.length > 0) {
            filterList = filterList.filter(it => Object.entries(it)[index][1].indexOf(sv) !== -1)
          }  
        })
      }  

      return(
      <div style={styles.root}>
        <ReactHTMLTableToExcel
        id="button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"/>
        {this.state.records.length>0?
          <div>
            <div>

              <table id="table-to-xls" style={styles.table} >
                  <tbody style={styles.tbody} >
                    <div>
                    <tr style={styles.trNoBorder}>
                      {Object.keys(this.state.records[0]).map(key=><th style={styles.th}>{key}</th>)}
                    </tr>
                    <tr style={styles.trNoBorder}>
                      {Object.keys(this.state.records[0]).map((key, index) =>
                        <td style={styles.tdNoBorder}>
                        <input type="text" value={this.state.searchValues[index]} placeholder={'Sök ' + key} onChange={event=>this.handleSearch(event, index)}/>
                        </td>)}
                    </tr>
                    {filterList.map((rec) => 
                        <tr style={styles.tr}>
                        {Object.entries(rec).map((obj, colIndex)=>
                            <td style={styles.td}>
                              {this.state.updateRecords.find(it => rec.id===it.updateId?it[obj[0]]!==it[obj[0] + '_ORIGINAL']?true:false:false)?
                                <input type="mail" style={{backgroundColor:'yellow'}} name={obj[0]} value={obj[1]} onChange={event=>this.handleChange(event, rec.id)}/>
                              :
                                <input type="text" style={{color:'grey'}} name={obj[0]} value={obj[1]} onChange={event=>this.handleChange(event, rec.id)}/>
                              }
                            </td>
                        )}
                      </tr>)}
                    </div>
                  </tbody>
                </table>
            </div>
          </div>
        :  
          'No records found'}
      </div>
    )  
  }
};