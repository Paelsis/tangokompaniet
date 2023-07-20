import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import tkColors from 'Settings/tkColors'
import {loadDropdownList} from 'Components/Table/loadDropdownList';
import groupBy from 'functions/groupBy';
import {DateToDaynameShort} from 'Settings/Weekdays';
import DownloadIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import ContentCopyIcon from '@material-ui/icons/FileCopy';
//import TodayIcon from '@material-ui/icons/Today';
const NO_VALUE = ''

const styles = {
  root:{
      position:'relative',
      backgroundColor:tkColors.background,
      fontSize:14,
  },
  header:{
    textAlign:'center',
    color:tkColors.Purple.Light,
    fontSize:36,
    fontWight:600,
    opacity:0.4,
  },
  table: {
      backgroundColor:tkColors.background,
      // borderCollapse:'collapse',
      borderColor:tkColors.border,
      whiteSpace:'nowrap',
  },
  add: {
    color:tkColors.Text.Dark,
    backgroundColor:'pink',
  },
  selectList: {
    backgroundColor:tkColors.Purple.Light,
    color:tkColors.Text.Light,
  },
  input: {
    width:100,
    backgroundColor:'lightYellow',
  },
  inputNumber: {
    width:20,
    backgroundColor:'lightYellow',
  },
  inputList: {
    maxWidth:400,
    color:tkColors.Text.Dark,
  },
  inputNumberList: {
    width:20,
    color:tkColors.Text.Dark,
  },
  textarea: {
    backgroundColor:'lightYellow',
  },
  textareaList: {
    backgroundColor:tkColors.Purple.Light,
    color:tkColors.Text.Light,
  },
  tbody: {
    border:2, 
    cellpadding:2,
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
      fontSize: 12,
      border:'0.1px solid',
      borderColor:tkColors.border,
  },
  th: {
    verticalAlign:'bottom',
    padding: 8,
    borderBottom:'0.1px solid',
    borderColor:tkColors.border,
    fontSize:12,
    color: 'grey',
  },
  thSelect: {
    verticalAlign:'bottom',
    padding: 8,
    borderBottom:'0.1px solid',
    borderColor:tkColors.border,
    fontSize:12,
    color: 'grey',
  },
  thInput: {
    verticalAlign:'bottom',
    padding: 8,
    width:'70%',
    borderBottom:'0.1px solid',
    borderColor:tkColors.border,
    fontSize:12,
    color: 'grey',
  },
  tdNoBorder: {
    verticalAlign:'top',
    padding: 8,
    color:tkColors.color,
  },
  td: {
      maxWidth:'60%',
      width:'50%',
      verticalAlign:'top',
      padding: 4,
      color:tkColors.color,
      borderBottom:'0.1px solid',
      borderColor:tkColors.border,
  },
};


// More components
class ScheduleEdit extends Component {
  static propTypes = {
    table: PropTypes.string.isRequired,
    handleSave:PropTypes.bool.isRequired,
    templateName:PropTypes.string.isRequired,
    columns:PropTypes.array.isRequired,
    list:PropTypes.array.isRequired,
  };

  constructor() {
      super();
      this.state = {record:{}, selectLists:{}};
      this.clearRecord=this.clearRecord.bind(this);
      this.loadDropdownLists = this.loadDropdownLists.bind(this);
      this.onChange=this.onChange.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
  }

  clearRecord = () => {
    this.setState({record:{}})
  }
 
  loadDropdownLists(columns) {
      columns.filter(col=>col.selectKey?true:false).forEach(col =>  {
        loadDropdownList(
            this.props.username, 
            this.props.password, 
            col.tableName, 
            col.selectKey,
            col.selectValue,    
            (list)=>this.setState({selectLists:{...this.state.selectLists, [col.name]:list}})
        )
      })
  }    
    

  componentDidMount() {
    this.loadDropdownLists(this.props.columns);
    this.clearRecord();
  }        
  
  onChange (e) {
    console.log('e.target.name:', e.target.name);
    console.log('e.target.value:', e.target.value);
    this.setState({record:{...this.state.record, [e.target.name]:e.target.value}});  
    
  }

  onChangeChk = (e) => {
    console.log('e.target.name:', e.target.name);
    console.log('e.target.checked:', e.target.checked);
    this.setState({record:{...this.state.record, [e.target.name]:e.target.checked}});  
  }

  _ListElement = (li, col) =>     
      <td key={col.name}>
        {col.type==='select'&&this.state.selectLists[col.name]?
          <select
            key={col.name + li.id} 
            name={col.name}
            onChange={(e)=>this.props.handleChangeId(e, li.id)}
            value={li[col.name]?li[col.name]:NO_VALUE}
          > 
            <option name={null} value={NO_VALUE}>No value</option>
            {this.state.selectLists[col.name].map(it =>
                <option 
                  style={styles.enabled} 
                  value={it.key} 
                >
                  {it.value}
                </option>
            )}  
          </select>
        :col.type === 'checkbox'?
            <input type="checkbox" 
              key={col.name + li.id} 
              name={col.name} 
              checked={li[col.name]==1?true:false}
              onChange={e=>this.props.handleChangeId(e, li.id)} /> 
        :col.type==='textarea'?
            <textarea 
              key={col.name + li.id} 
              style={styles.textareaList}
              name={col.name} 
              cols={25} 
              rows={3} 
              maxLength={300}
              value={li[col.name]?li[col.name]:''} 
              placeholder={col.placeholder?col.placeholder:''} 
              onChange={e=>this.props.handleChangeId(e, li.id)}
              />
        :
            <input 
              key={col.name + li.id} 
              style={col.type==='number'?styles.inputListNumber:styles.inputList}
              type={col.type?col.type:'text'}
              name={col.name}  
              value={li[col.name]?li[col.name]:''} 
              selected={col.selected}
              placeholder={col.placeholder?col.placeholder:col.name} 
              onChange={(e)=>this.props.handleChangeId(e, li.id)}
            />
        }    
    </td>

  _compare = (o1, o2) => {
    return(o1.id - o2.id)
  }    

  


    



  _AddRow = () =>
    <form onSubmit={this.handleAdd}>
    <table style={styles.table} >
      <thead>
        {this.props.columns.filter(it=>it.hidden===true?false:true).map(col=>
          col.type==='select'?<th key={col.name} style={styles.thSelect}>{col.label}</th>
          :col.type==='input'?<th key={col.name} style={styles.thInput}>{col.label}</th>
          :<th key={col.name} style={styles.th}>{col.label}</th>
        )}
        <th style={styles.th}>Add row to schedule</th>
      </thead>
    <tbody style={styles.tbody} >
      <tr>
        {this.props.columns.filter(it=>it.hidden===true?false:true).map(col=>
            <td key={col.name}>
              {col.type==='select'&&this.state.selectLists[col.name]?
                  <select 
                    name={col.name}
                    onChange={this.onChange}
                    width={80}
                    value={this.state.record[col.name]?this.state.record[col.name]:NO_VALUE}
                    required={col.required}
                  > 
                    <option name={null} value={NO_VALUE}>No value</option>
                    {this.state.selectLists[col.name].map(it =>
                          <option 
                            style={styles.enabled} 
                            value={it.key} 
                          >
                            {it.value}
                          </option>
                    )}  
                </select>
              :col.type === 'checkbox'?
                <input 
                  type={col.type}
                  style={styles.add} 
                  name={col.name} 
                  checked={this.state.record[col.name]==1?true:false} 
                  required={col.required}
                  onChange={this.onChangeChk} /> 
              :col.type==='textarea'?
                <textarea 
                  style={styles.add} 
                  placeholder={col.placeholder?col.placeholder:''} 
                  name={col.name} 
                  cols={25} 
                  rows={3} 
                  maxLength={300}
                  value={this.state.record[col.name]?this.state.record[col.name]:''} 
                  required={col.required}
                  onChange={this.onChange}
                  />
              :
                <input 
                  key={col.name} 
                  style={styles.add} 
                  type={col.type?col.type:'string'}
                  name={col.name}  
                  value={this.state.record[col.name]?this.state.record[col.name]:''} 
                  selected={col.selected}
                  placeholder={col.placeholder?col.placeholder:col.name} 
                  required={col.required}
                  onChange={this.onChange}
                />
            }    
            </td>
        )} 
        <td>
            <Tooltip title="Add line to schedule">
                <IconButton type="submit">
                    <DownloadIcon />
                </IconButton>
            </Tooltip>
        </td>
      </tr>  
    </tbody>
  </table>
  </form>              


_List = () => (
  this.props.filterList.length > 0)?
      <table style={styles.table} >
        <thead>
          {this.props.columns.filter(it=>it.hidden===true?false:true).map(col=>   
            <th>{col.label}</th>
          )}
          <th />
          <th />
          <th />
        </thead>
        <tbody>
          {this.props.filterList.sort(this._compare).map((li, ix)=>
              <tr key={ix} >
                {this.props.columns.filter(it=>it.hidden===true?false:true).map((col)=> 
                  this._ListElement(li, col)
                )}
                 <Tooltip title="Weekday of startdate">
                  <td style={{fontSize:14, color:tkColors.Purple.Light}}>{li.startDate?DateToDaynameShort(li.startDate, 'EN') :null}</td>
                </Tooltip>
                <td key={ix + 1} onClick={()=>this.props.handleCopyLine(li.id)}>
                  <Tooltip title="Duplicate line">
                      <ContentCopyIcon style={{color:'green', cursor:'pointer'}}/>
                  </Tooltip>
                </td>
                <td key={ix + 2} onClick={()=>this.props.handleDeleteById(li.id)}>
                  <Tooltip title="Delete line">
                      <DeleteForeverIcon style={{color:'red', cursor:'pointer'}}/>
                  </Tooltip>
                </td>
              </tr>
        )}
        </tbody>
      </table>
  :
      <table style={styles.table} >
          <tbody>
              <td>List is empty</td>
          </tbody>
      </table>


  uniqueCheck(columns, list) {
    let duplicates = []
    columns.forEach(col => {
        if (col.unique===true) {
            list.sort((a,b) => a[col.name].localeCompare(b[col.name]))
            let prevVal = undefined;
            list.forEach(it => {
                let val = it[col.name]
                if (val===prevVal) {
                    duplicates = [...duplicates, col.label + ':' + val]
                }    
                prevVal=val
            })
        }
    })    
    if (duplicates.length === 0) {
        return true 
    } else {    
      console.log('duplicates:', duplicates)
      alert('Duplicates exists for column/s:' + JSON.stringify(duplicates))
      return false
    }
  }         

  handleAdd(e) {
    e.preventDefault();
    const newRecord = {...this.state.record, templateName: this.props.templateName}
    console.log('newRecord:', newRecord)

    const testDuplicatesList = [...this.props.filterList, newRecord]
    if (!this.uniqueCheck(this.props.columns, testDuplicatesList)) {
      return
    }
    
    this.props.handleAdd(newRecord)

    // Reset the record after add
    //this.props.columns.forEach(col => {return ({...record, [col]:''})})
    let record = this.state.record
    for (var member in record) delete record[member]
    this.setState({record})
  }

  render() {
    console.log('record:', this.state.record)
    return(
        this.props.templateName?
          <div style={styles.root}>
            <h2 style={styles.header}>
              Template: {this.props.templateName}
            </h2>
              <div>  
                {this._AddRow()}  
                {this._List()}
              </div>
        </div>                   
      :null
    )  
  }
};

export default ScheduleEdit
