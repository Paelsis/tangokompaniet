import React, {Component} from 'react'
import PropTypes from 'prop-types' 
import tkColors from 'Settings/tkColors'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import config, {SHOP_IMAGE_DIR} from 'Settings/config' 
import axiosGet from '../../functions/axiosGet'
import EmailIcon from '@material-ui/icons/Email'
import Tooltip from '@material-ui/core/Tooltip'


const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const imageUrl=apiBaseUrl + SHOP_IMAGE_DIR;

const Alert = (msg) => {
  Text('click:' + msg)
}

const maillist = (list, fld) => list.map(it => it[fld]?it[fld]:'').join(', ')

const styles = {
  root:{
      display:'flex',
      flexDirection:'column',
      fontSize:'normal',
  },
  h4:{
      textAlign:'left',
      color:tkColors.color,    
    },
  table: {
      paddingTop:4,
      overflowX:'auto',
      borderCollapse:'collapse',
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
  },
  tr: {
      verticalAlign:'top',
  },
  th: {
      wordWrap: 'break-word',  
      maxWidth:60,
      fontSize:20,
      verticalAlign:'center',
      overflowWrap:'normal',

  },
  tdNoBorder: {
    verticalAlign:'top',
    overflowWrap:'normal',

  },
  td: {
      wordWrap: 'break-word',  
      maxWidth:60,
      minWidth:15,
      verticalAlign:'top',
      overflowWrap:'normal',
  },
  inputSearch:{
    minWidth:15,
    color:'green', 
    fontStyle:'italic',
    backgroundColor:'lightyellow',
  },
};

// More components
class _TableShow extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    list: PropTypes.array,
    setList: PropTypes.func,
  };

  constructor() {
      super();
      this.state = { searchValues:[], validEmails:[], validImages:[]};
      this.handleChange = this.handleChange.bind(this)
      this.handleChangeRange = this.handleChangeRange.bind(this)
      this.initSearchKeys = this.initSearchKeys.bind(this)
      this.initValidEmails = this.initValidEmails.bind(this)
      this.initValidImages = this.initValidImages.bind(this)
      this.compareFunction = this.compareFunction.bind(this)
      this.handleButton = this.handleButton.bind(this)
    }

  componentDidMount () {
    console.log('_TableShow: componentDidMount, list:', this.props.list)
    if (this.props.list.length > 0) {
      this.initSearchKeys(this.props.list);
      this.initValidEmails(this.props.list);
      this.initValidImages(this.props.list);
    }
  }  

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      console.log('_TableShow: componentWillReceiveProps mount, list:', nextProps.list)
      this.initSearchKeys(nextProps.list);
      this.initValidEmails(nextProps.list);
      this.initValidImages(nextProps.list);
    }   
  }

  initSearchKeys(records) {
    let searchValues = [];
    if (this.props.list.length > 0) {
        Object.keys(records[0]).forEach((key, index) => searchValues = [...searchValues, ''])
        this.setState({searchValues})
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  initValidEmails(list) {
    let validEmails = [];
    if (list.length > 0) {
      Object.values(list[0]).forEach(value => 
        validEmails = [...validEmails, this.validateEmail(value)]
      )
      this.setState({validEmails})
    }
    console.log('validEmails:', validEmails)
  }

  initValidImages(list) {
    let validImages = [];
    if (list > 0) {
      Object.values(list[0]).forEach((value, index) => 
        validImages = [...this.state.validImages, String(value).indexOf('.jpg') !==-1?true:false]
      )
      console.log('validImages:', validImages)
      this.setState({validImages})
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


  handleButton() {
    const url=apiBaseUrl + this.props.button.link
    console.log('handleButton: url:', url)
    axiosGet(url, (data) => alert(data.message?data.message:data.status))
  }

  compareFunction(a, b) {
    if (this.props.sortBy) {
      for (let i=0; i < this.props.sortBy.length; i++)
      {
        const fld = this.props.sortBy[i]
        if (a[fld]===undefined || b[fld]===undefined) {
          console.log('Sort property not found', a[fld]?a[fld]:null, b[fld]?b[fld]:null)
          return(1)
        }
        const ret = a[fld].localeCompare(b[fld])
        if (ret !== 0) {
          return ret;
        }
      }
    }
    return(0);
  }
  isThisAnArray(obj) {
    if (typeof Array.isArray === 'undefined') {
      Array.isArray = function(obj) {
       return Object.prototype.toString.call(obj) === '[object Array]';
      }
    }  
  }  

  render() {
      console.log('---TableShow---', this.state.searchValues);

      let filterList = this.props.list;
      if (this.state.searchValues.length > 0) {
        this.state.searchValues.forEach((sv, index) => {
          typeof sv === 'object'?
            filterList = sv?(sv.from && sv.to)?filterList.filter(it => (sv.from.localeCompare(Object.entries(it)[index][1]) <=0 && sv.to.localeCompare(Object.entries(it)[index][1])>=0)):filterList:filterList
          :
            filterList = sv?sv.length > 0?filterList.filter(it => Object.entries(it)[index][1].indexOf(sv) !== -1):filterList:filterList
        })
      }  
      if (this.props.sortBy) {
        filterList = filterList.sort((a,b) => this.compareFunction(a,b))
      }
      let comment = key => {
         const foundColumn = this.props.columns.find(co=>co.Field===key)
         return foundColumn?foundColumn.COLUMN_COMMENT.length > 0?foundColumn.COLUMN_COMMENT:'No help text':'No help text'
      }


  
      console.log('filterList:', filterList);
      return(
      <div style={styles.root}>
        <div>
        {this.props.button?
          <button className="button" onClick={this.handleButton}>{this.props.button.name}</button>
          :null
        }  
        </div>
        <p/>
        {this.props.list.length>0?
          <div>
              <ReactHTMLTableToExcel
                      className="btn btnInfo"
                      table="table-show-to-xls"
                      filename={this.props.table?this.props.table:"ReportExcel"}
                      sheet="Sheet"
                      buttonText="Download as XLS"/>

              <table className="table-grey" id="table-show-to-xls" style={styles.table} >
                  <thead style={styles.thead}>
                    <tr style={styles.trNoBorder}>
                      {Object.keys(this.props.list[0]).map(key=>
                          key.indexOf('email')===-1?
                            <Tooltip title={<h4>{comment(key)}</h4>}>  
                              <th key={key} style={styles.th}>{key}</th>
                            </Tooltip>
                          :  
                            <th>
                              {key}&nbsp;
                              <a href={'mailto:?bcc=' + maillist(filterList, key) + '&subject=Mail från TK'} target="_top">
                                <Tooltip title={'Send mail to group'}>  
                                  <EmailIcon style={{cursor:'pointer', fontSize:'small'}} />
                                </Tooltip>
                              </a>
                            </th>
                      )}
                    </tr>
                    <tr style={styles.trNoBorder}>
                      {Object.keys(this.props.list[0]).map((key, index) =>
                        key.indexOf('Timestamp')!== -1?   
                        <td key={key} style={styles.tdNoBorder}>
                          <input key={key} type="text" style={styles.inputSearch} 
                            value={this.state.searchValues[index]?this.state.searchValues[index].from?this.state.searchValues[index].from:undefined:undefined} 
                            placeholder={'Från'} 
                            onChange={e=>this.handleChangeRange(e, index, 'from')}
                          />
                          <input key={key} type="text" style={styles.inputSearch} 
                            value={this.state.searchValues[index]?this.state.searchValues[index].to?this.state.searchValues[index].to:undefined:undefined} 
                            placeholder={'Till'} 
                            onChange={e=>this.handleChangeRange(e, index, 'to')}
                          />
                        </td>  
                        :  
                        <td key={key} style={styles.tdNoBorder}>
                          <input type="text" style={styles.inputSearch} value={this.state.searchValues[index]} placeholder={'Sök ' + key} onChange={event=>this.handleChange(event, index)}/>
                        </td>)}
                      </tr>
                  </thead> 
                  <tbody style={styles.tbody} >
                    {filterList.map(rec => 
                      <tr key={rec.id} style={styles.tr}>
                        {Object.values(rec).map((val, index)=>
                          <td key={index} style={{...styles.td}}>
                            {this.state.validEmails[index]?
                              <a style={{color:'#addbe6'}} href={"mailto:?bcc=" + val + '&subject:Mail from TK'}>{val}</a>                          
                            :this.state.validImages[index]?
                              <img src={imageUrl + val} style={{width:40}} alt={val}/>
                            :Object.keys(this.props.list[0])[index]==='phone'?
                              <a style={{color:'#addbe6'}} href={"tel:" + val}>{val}</a>
                            :val}  
                          </td>
                        )}
                      </tr>)}
                  </tbody>
                </table>
                <h4>Number of rows = {filterList.length}</h4>
          </div>
        :  
          <h3>No records in database</h3>}
      </div>
    )  
  }
};

export default _TableShow;