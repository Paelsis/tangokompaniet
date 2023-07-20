import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import * as EmailValidator from 'email-validator';
import tkColors from 'Settings/tkColors'
import config from 'Settings/config';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import TableAdd from './TableAdd'
import postCrud from 'functions/postCrud';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'


const ORIGINAL_SUFFIX='__ORIGINAL'
const ADD_PREFIX='A'

const styles = {
  root:{
      padding:10,
      backgroundColor:tkColors.background,
      fontSize:14,
  },
  table: {
      paddingTop:10,
      backgroundColor:'darkGrey',
      borderCollapse:'collapse',
      color:'white'
  },
  thead: {
    cellpadding:2,
  },  
  tbody: {
    cellpadding:2,
  },  
  trNoBorder: {
    height:20,
    verticalAlign:'top',
    padding: 5,
  },
  tr: {
      height:20,
      verticalAlign:'top',
      padding: 5,
      borderColor:tkColors.border,
  },
  th: {
      verticalAlign:'bottom',
      padding: 8,
      color: 'white',
      minWidth:15,
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
      color:'white',
      minWidth:15,
  },
  add:{
    color:'black', 
    fontStyle:'normal',
    backgroundColor:'pink',
  },
  inputSearch:{
    color:'green', 
    fontStyle:'italic',
    backgroundColor:'lightyellow',
  },
  inputModified:{
    color:'red', 
    backgroundColor:'lightYellow',
    maxWidth:400,
  },
  inputUnmodified: {
    color:'grey',
    maxWidth:400,
  },
};

const TEXTS = {
  'LABEL_SAVE':{
      'SV':'Spara ändringar',
      'ES':'Guardar cambios' ,
      'EN':'Save changes'
  },   
}

// More components
class _TableEdit extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    list: PropTypes.array,
    table: PropTypes.string,
    setList:PropTypes.func, 
    language:PropTypes.string,
  };

  constructor() {
      super();
      this.state = {searchValues:[], validEmails:[], insertRecords:[], updateRecords:[], deleteRows:[], addedIndex:0};
      this.initSearchKeys = this.initSearchKeys.bind(this)
      this.initValidEmails = this.initValidEmails.bind(this)
      this.changeRecord = this.changeRecord.bind(this)
      this.addRow = this.addRow.bind(this)
      this.deleteRow = this.deleteRow.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.setListAfterCRUD = this.setListAfterCRUD.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleChangeRange = this.handleChangeRange.bind(this)
      this.compareFunction = this.compareFunction.bind(this)
  }

  componentDidMount () {
    console.log('_TableEdit.componentDidMount: _TableEdit passed this.props.list=', this.props.list)
    console.log('_TableEdit.componentDidMount: _TableEdit number of records in this.props.list =', this.props.list.length)

    // Initially add all NEW records (where id starts with an N, which is the first letter of ADD_PREFIX) and add them to insertedList
    const insertRecords = this.props.list.filter(rec => rec.id?rec.id[0]==='A':false) 
    if (insertRecords.length > 0) {
      this.setState({insertRecords});
    }
    this.initSearchKeys(this.props.list);
    this.initValidEmails(this.props.list);
  }  

  componentWillReceiveProps(nextProps) {
    // if (nextProps.list?true:false) {
    if (nextProps.list != this.props.list) {  
      console.log('componentWillReceiveProps: _TableEdit passed nextProps.list=', nextProps.list)
      console.log('componentWillReceiveProps: _TableEdit number nextProps.list length', nextProps.list.length)
      
      const insertRecords = nextProps.list.filter(rec => rec.id?rec.id[0]==='A':false) 
      if (insertRecords.length > 0) {
        this.setState({insertRecords});
      }
      this.initValidEmails(nextProps.list);
    } 
  }   
  
  initSearchKeys(records) {
    let searchValues = [];
    if (records.length > 0) {
        Object.keys(records[0]).forEach((key, index) => searchValues = [...searchValues, ''])
        this.setState({searchValues})
    }
  }

  initValidEmails = (records) => {
    let validEmails = [];
    if (records.length > 0) {
      Object.values(records[0]).forEach((value, index) => 
        validEmails = [...this.state.validEmails, EmailValidator.validate(value)]
      )
      this.setState({validEmails})
    }
  }

  logArray = (title, array) => {
    array.forEach((rec, index) => {
        let line=title + ': ';
        Object.entries(rec).forEach((obj, colIndex) => {
            line=line + '[\'' + obj[0] + '\']:' + obj[1] + ','; 
        })
        console.log(line)
    })
  }

  setListAfterCRUD = list => {
      if (list) {
        console.log('After crud:', list)    
        console.log('List length:', list.length)    
        this.setState({searchValues:[]})
        if (list !== null && list.length > 0) {
          this.props.setList(list);
          this.setState({insertRecords:[], updateRecords:[], deleteRows:[], addedIndex:0})
        } else {
          alert('The record could not be inserted into the database !')
        }  
      } else {
        //alert('No list returned after crud')
      }   
  }

  handleChange(event, index) {
    let searchValues = [...this.state.searchValues];
    searchValues[index] = event.target.value;
    this.setState({searchValues});
  }

  handleChangeRange(event, index, fld) {
    let obj = {...this.state.searchValues[index], [fld]:event.target.value}
    let arr = [...this.state.searchValues];
    arr[index] = obj;
    this.setState({searchValues:arr});
  }


  handlePost = (crud) => { 
      // Post the updated data to url
      let url=config[process.env.NODE_ENV].apiBaseUrl +'/admin/crud'
      postCrud(url, this.props.username, this.props.password, this.props.table, crud, 
        list=>{
          this.setListAfterCRUD(list)
          this.props.handleSave()
      });
  }
    
  // The function handleSave send info about all inserted, deleted and change objects over to caller 
  handleSave = () => {
    let insertRecords = this.state.insertRecords.filter(ins => this.state.deleteRows.find(del => ins.id === del.id)?false:true).
                                                     filter(ins1 => this.state.updateRecords.find(upd => ins1.id === upd.id)?false:true);
    let updateInsertRecords = insertRecords.filter(ins => this.state.updateRecords.find(upd => upd.id === ins.id)?true:false).
                                                     filter(upd1 => this.state.insertRecords.find(ins => ins.id === upd1.id)?false:true);
    let updateRecords = this.state.updateRecords.filter(upd => this.state.deleteRows.find(del => upd.id === del.id)?false:true).
                                                   filter(upd1 => this.state.insertRecords.find(ins => ins.id === upd1.id)?false:true);
    

    // Remove the ORIGINAL_SUFFIX elements from the updated inserted records 
    let adjInsertedRecords = [];

    updateInsertRecords.forEach(upd => {
      delete upd[ORIGINAL_SUFFIX];
      // remove __ORIGINAL_SUFFIX 
      let withoutOriginal = {}
      Object.entries(upd).map((obj, index) => {
        // Do not send over variables that contains ORIGINAL_SUFFIX and don't send unchanged values
        if (obj[0].indexOf(ORIGINAL_SUFFIX)==-1 && obj[0]!=='id') {
          // console.log('my fucking object:', obj)
          withoutOriginal = {...withoutOriginal, [obj[0]]:obj[1]}
        }
      });
      // console.log('updWithoutOriginal', updWithoutOriginal);
      adjInsertedRecords = [...adjInsertedRecords, upd];
    })
    insertRecords = [...insertRecords, ...adjInsertedRecords];
    insertRecords.sort((a,b) => {
      if (a.id > b.id ) {
        return(1);
      } else {
        return(-1);
      }
    });

    console.log('sortedRecords:', insertRecords);

    // Remove the ORIGINAL_SUFFIX elements from the updated records 
    let adjUpdatedRecords = [];
    updateRecords.forEach(upd => {
      delete upd[ORIGINAL_SUFFIX];
      /*
      // remove __ORIGINAL_SUFFIX 
      let withoutOriginal = {}
      Object.entries(upd).map((obj, index) => {
        // Do not send over variables that contains ORIGINAL_SUFFIX and don't send unchanged values
        if (obj[0].indexOf(ORIGINAL_SUFFIX)==-1 && obj[1]!=upd[obj[0] + ORIGINAL_SUFFIX]) {
          // console.log('my fucking object:', obj)
          withoutOriginal = {...withoutOriginal, [obj[0]]:obj[1]}
        }
      });    
      // console.log('updWithoutOriginal', updWithoutOriginal);
      adjUpdatedRecords = [...adjUpdatedRecords, withoutOriginal];
      */
     adjUpdatedRecords = [...adjUpdatedRecords, upd];
    })
    updateRecords = adjUpdatedRecords;

    this.setState({insertRecords, updateRecords, searchValues:[]});

    // If the inserted or updated set exusts in the final set of deleted, then remove them
    let crud = {
        inserted:insertRecords,
        updated:updateRecords,
        deleted:this.state.deleteRows, 
    }
    this.logArray('inserted', crud.inserted);
    this.logArray('updated', crud.updated);
    this.logArray('deleted', crud.deleted);

    this.handlePost(crud);
  }


  addRow = (rec) => {
    let recAdd = {...rec, id:ADD_PREFIX + (this.state.addedIndex+1)}
    let newList = [recAdd, ...this.props.list];
    this.props.setList(newList);
    this.setState({insertRecords: [...this.state.insertRecords, recAdd], addedIndex:this.state.addedIndex+1});
    console.log('_TableEdit insertRecords: ', this.state.insertRecords);
  }

  deleteRow = (id) => {
    const newList=this.props.list.filter(it => it.id !==id);
    this.props.setList(newList)
    this.setState({deleteRows: [...this.state.deleteRows, {id:id}]})
    this.setState({insertRecords: this.state.insertRecords.filter(it => it.id !==id)?
    this.state.insertRecords.filter(it => it.id !==id):[]})
    console.log('Delete record id:', id);
  }

  changeRecord = (event, id) => {
    const name = event.target.name;
    const value = event.target.value;
    const actionIndex = this.props.list.findIndex(it => it.id === id)
    
    if (this.state.updateRecords.find(it => it.id === id)) {
        let updateRecords = this.state.updateRecords.map(item => {
          if(item.id !== id) {
              // This isn't the item we care about - keep it as-is
              return item;
          }
          // Otherwise, only the [name] to true for fields that are updated
          if (typeof(item[name])==='undefined')  {
              // First time the variable is updated the original value is saved in a separate field 
              return {...item, [name]:value, [name + ORIGINAL_SUFFIX]:this.props.list[actionIndex][name]}    
          } else {
              // Subsequent times only the value is set
              return {...item, [name]:value}    
          }    
       });
       this.setState({updateRecords})   
       // console.log('original changeRecords:', updateRecords); 
      } else {
        // New record (new id)

        // There is no record for this updateId, so create one
        let updateRecords = this.state.updateRecords;
        updateRecords = [...updateRecords, {id, [name]:value, [name + ORIGINAL_SUFFIX]:this.props.list[actionIndex][name]}]
        this.setState({updateRecords})   
        // console.log('subsequent... changeRecords:', updateRecords); 
    }
    
    let list = this.props.list.map((item, index) => {
        if(index !== actionIndex) {
            return item;
        }
  
        // this is item we look for - return an updated value
        return {...item,[name]:value};  
    });
    this.props.setList(list);
    // console.log('value:', value)
  }

  handleSearch(event, index) {
    let searchValues = [...this.state.searchValues];
    searchValues[index] = event.target.value;
    this.setState({searchValues});
  }

  isModified = (rec, obj) => {
    return (this.state.updateRecords.find(it => rec.id===it.id?it[obj[0]]!==it[obj[0] + ORIGINAL_SUFFIX]?true:false:false))
  }


  searchRow() {
    return(
      <tr>
          {Object.keys(this.props.list[0]).map((key, index) =>
            key==='id'?<td/>
            :key.indexOf('Timestamp')!== -1?   
              <td key={key} style={styles.tdNoBorder}>
                <input 
                  key={key} 
                  type="text" 
                  style={styles.inputSearch} 
                  value={this.state.searchValues[index]?this.state.searchValues[index].from?this.state.searchValues[index].from:undefined:undefined} 
                  placeholder={'Från'} 
                  onChange={e=>this.handleChangeRange(e, index, 'from')}
                />
                <input key={key} 
                  type="text" 
                  style={styles.inputSearch} 
                  value={this.state.searchValues[index]?this.state.searchValues[index].to?this.state.searchValues[index].to:undefined:undefined} 
                  placeholder={'Till'} 
                  onChange={e=>this.handleChangeRange(e, index, 'to')}
                />
              </td>  
            :key==='textBody'?
              <td>
                <textarea 
                  style={styles.add} 
                  placeholder={'Sök ' + key} 
                  cols={25} 
                  rows={5} 
                  maxLength={300}
                  value={this.state.searchValues[index]?this.state.searchValues[index]:''} 
                  onChange={event=>this.handleChange(event, index)}
                />
              </td>  
          :
              <td key={key} style={styles.tdNoBorder}>
                <input 
                  type={key.includes('Time')?'time':key.includes('Date')?'date':key.includes('email')?'email':'text'} 
                  style={styles.inputSearch} 
                  value={this.state.searchValues[index]?this.state.searchValues[index]:''} 
                  placeholder={'Sök ' + key} 
                  onChange={event=>this.handleChange(event, index)}
                />
              </td>
          )}   
          <td/>
      </tr>  
    )
  }  
       
  renderHeader() {
    return(
      <thead style={styles.thead}>
          {Object.keys(this.props.list[0]).map(key =>
              <th style={styles.th}>{key}</th>
          )}
          <th style={styles.th} />
      </thead>
    )     
  }  

  renderBody(filterList) {

    return(
      <tbody style={styles.tbody} >
        {this.searchRow()}  
        {filterList.map((rec) => 
          <tr key={rec.id} style={styles.tr}>
            {Object.entries(rec).map((obj, colIndex)=>
              <td key={colIndex} style={styles.td}>
                {(obj[0]==='id'||obj[0].indexOf('Timestamp')!==-1)?obj[1]
                :obj[0]==='textBody'?
                  <textarea 
                    cols={25} 
                    rows={5} 
                    maxLength={300}
                    value={obj[1]} 
                    name={obj[0]} 
                    onChange={e=>this.changeRecord(e, rec.id)}
                    />
                :<input 
                    key={colIndex} 
                    type={obj[0].includes('Time')?'time':obj[0].includes('Date')?'date':'text'} 
                    style={this.isModified(rec, obj)?styles.inputModified:styles.inputUnmodified} 
                    size={obj[1]?Math.max(obj[1].length, 1):1}
                    name={obj[0]} 
                    value={obj[1]} 
                    onChange={e=>this.changeRecord(e, rec.id)}
                  />
                }
              </td>    
            )}
            <td style={styles.td} onClick={()=>this.deleteRow(rec.id)}>
                <Tooltip title={'Delete row'}>
                  <DeleteForeverIcon style={{color:'white', cursor:'pointer'}} />
                </Tooltip>
            </td>
          </tr>    
        )}  
    </tbody>          
    )
  }

  renderTable(filterList) {
    return( 
      <div>
        <table id="table-update-to-xls" style={{backgroundColor:'grey', borderColapse:'colapse'}}>
          {this.renderHeader()}
          {this.renderBody(filterList)}
        </table>
      </div>
    )
  }  

  compareFunction(a, b) {
    if (this.props.sortBy) {
      for (let i=0; i < this.props.sortBy.length; i++)
      {
        const fld = this.props.sortBy[i]
        const ret = a[fld].localeCompare(b[fld])
        if (ret !== 0) {
          return ret;
        }
      }
    }
    return(0);
  }


  render() {
    let idColumnExists = true;
    let filterList = this.props.list;
    if (this.props.list?this.props.list.length > 0:false) {
      console.log('_TableEdit filterList 1:', filterList.length)
      this.state.searchValues.forEach((sv, index) => {
        typeof sv === 'object'?
          filterList = sv?(sv.from && sv.to)?filterList.filter(it => (sv.from.localeCompare(Object.entries(it)[index][1]) <=0 && sv.to.localeCompare(Object.entries(it)[index][1])>=0)):filterList:filterList
        :
          filterList = sv?sv.length > 0?filterList.filter(it => Object.entries(it)[index][1].indexOf(sv) !== -1):filterList:filterList
      })
      console.log('_TableEdit filterList 2:', filterList.length)
      if (this.props.list[0].hasOwnProperty('id') === false) {
       idColumnExists = false;
      }
    }
    if (this.props.sortBy) {
      filterList = filterList.sort((a,b) => this.compareFunction(a,b))
    }
    return(
      <>
        <Tooltip title={'Enter edit mode'}> 
          <IconButton type="submit" onClick={()=>this.handleSave()}> 
              <SaveIcon style={{color:tkColors.Purple.Light}}/>        
          </IconButton>     
        </Tooltip>  
        <div style={styles.root}>
        <ReactHTMLTableToExcel
                          className="btn btnInfo"
                          table="table-update-to-xls"
                          filename={this.props.table?this.props.table:"ReportExcel"}
                          sheet="Sheet"
                          buttonText="Download as XLS"/>
          {this.props.note?<h1 style={{color:'orange'}}>{this.props.note}</h1>:null}                
          <TableAdd addRow={(obj)=>this.addRow(obj)} {...this.props} />    
          {this.props.list && (this.props.list.length > 0)?idColumnExists===true?
          this.renderTable(filterList)  
          :<h1>Column with name id is missing. The table cannot be edited.</h1>:<h1>No entries in database</h1>}
        </div>                   
      </>
    )  
  }
};

export default _TableEdit

//{this.state.updateRecords.find(cell => rec.id===cell.updateId?it[obj[0]]!==cell[obj[0] + '_ORIGINAL']?true:false:false)?
