import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import fetchList from 'functions/fetchList';
import {postUpdTable, postUpdTableAll} from 'functions/postUpdTable'
import postData from 'functions/postData'
import config from 'Settings/config';


var idNumber = 0;

// Note thh url can either arrive from props

// More components
const withRecords = (WrappedComponent) => {
    return class _withRecords extends Component {
        static propTypes = {
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            subdir: PropTypes.string
        };

        constructor(props) {
            super(props);
            this.state = {list:[], columns:[], edit:{}, weeks:undefined, sortKey:undefined, sortDirection:0, overuleUrl:undefined};
            this.getList = this.getList.bind(this);
            this.setList = this.setList.bind(this);
            this.replaceById = this.replaceById.bind(this);
            this.handleChangeId = this.handleChangeId.bind(this);
            this.handleChangeIndex = this.handleChangeIndex.bind(this);
            this.handleChangeValueById = this.handleChangeValueById.bind(this);
            this.handleChangeValueByIndex = this.handleChangeValueByIndex.bind(this);
            this.handleAdd = this.handleAdd.bind(this);
            this.handleDeleteById = this.handleDeleteById.bind(this);
            this.handleCopyLine = this.handleCopyLine.bind(this);
            this.fetchListAgain = this.fetchListAgain.bind(this);
            this.setWeeksBack = this.setWeeksBack.bind(this);
            this.setOverruleUrl = this.setOverruleUrl.bind(this);
            this.updateRow = this.updateRow.bind(this);
            this.replaceRow = this.replaceRow.bind(this);
            this.deleteRow = this.deleteRow.bind(this);
            this.addRow = this.addRow.bind(this);
            this.updateTableAll = this.updateTableAll.bind(this);
            this.fetchFromDatabase = this.fetchFromDatabase.bind(this);
            this.fetchColumns = this.fetchColumns.bind(this);
            this.sortStateListByKey = this.sortStateListByKey.bind(this);
            this.sortListByKey = this.sortListByKey.bind(this);
            this.toggleEdit = this.toggleEdit.bind(this);
            this.toggleEditIds = this.toggleEditIds.bind(this);
            this.handleReply = this.handleReply.bind(this);
        }

        componentDidMount () {
            console.log('componentDidMount: withRecords this.props.url=', this.props.url?this.props.url:'nextProps.url not found'); 
            this.fetchFromDatabase(this.props.url)
            if (this.props.table !== undefined) {
                this.fetchColumns(this.props.table)
            }    
        }  

        componentWillReceiveProps(nextProps) {
            if (this.props.url !== nextProps.url && (this.props.subdir?this.props.subdir 
                || this.props.subdir !== nextProps.subdir:true))  {
                console.log('componentDidMount: withRecords nextProps.url=', nextProps.url?nextProps.url:'nextProps.url not found'); 
                this.fetchFromDatabase(nextProps.url)
            } 
            if (nextProps.table !== this.props.table) {
                this.fetchColumns(nextProps.table)
            }    
        }

        setWeeksBack(limit) {
            this.setState(limit)
        }

        setOverruleUrl(limit) {
            this.setState(limit)
        }

        fetchListAgain() {
            console.log('fetchListAgain url=', this.props.url); 
            this.fetchFromDatabase(this.props.url)
        }

    
        handleReply (statusFlag, data) {
            console.log('withRecords.handleReply: statusFlag:' + statusFlag + 'data:' + data);
        }    
    
        handleReplyAll(statusFlag, data) {
            console.log('withRecords.handleReplyAll: statusFlag:' + statusFlag + 'data:' + data);
        }    

        handleReply(status, data) {
            console.log('status:' + status + ' Data:' + JSON.stringify(data))
            this.fetchListAgain()
        } 

        updateRow(row)
        {
            const table=this.props.tableUpdate
            const id = row.id
            if (id) {
                const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/updateRow'
                postUpdTable(url, table, this.props.username, this.props.password, id, row, this.handleReply)
            } else {
                alert('updateRow: The row for updating table ' + table + ' does not contain required field id, row:' + JSON.stringify(row))
            }    
        }

        addRow(row)
        {
            const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/addRow'
            const table=this.props.tableUpdate
            postUpdTable(url, table, this.props.username, this.props.password, undefined, row, this.handleReply)
        }

        replaceRow(row)
        {
            const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/replaceRow'
            
            const data = {
                table:this.props.tableUpdate?this.props.tableUpdate:this.props.tableName?this.props.tableName:this.props.table?this.props.table:'Unkonwn table', 
                data:row
            }  

            postData(url, this.props.username, this.props.password, data, this.handleReply)
        }

        deleteRow(id)
        {
            const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/deleteRow'
            const data = {
                table:this.props.tableUpdate?this.props.tableUpdate:this.props.tableName?this.props.tableName:this.props.table?this.props.table:'Unkonwn table', 
                id
            }  
            //eslint-disable-next-line
            if (!confirm("Are you sure you want to delete the row " + JSON.stringify(Object.values(data)).map(it=>it)) + " (y/n) ?") {
                postData(url, this.props.username, this.props.password, data, this.handleReply)
            } 
        }


        updateTableAll(list)
        {
            const urlUpdate = this.props.urlUpdate?this.props.urlUpdate:'/admin/updateRowsInPresence'
            const url = config[process.env.NODE_ENV].apiBaseUrl + urlUpdate
            const table=this.props.tableUpdate
            postUpdTableAll(url, table, this.props.username, this.props.password, list, this.handleReply)
        }
    

        sortStateListByKey(sortKey) {
                const sortDirection=sortKey===this.state.sortKey?this.state.sortDirection===1?0:1:0
                this.setState({list:this.sortListByKey(this.state.list, sortKey, sortDirection), sortKey, sortDirection}) 
        }

        // Choose url either from props or from state (the latter if sent via Link)
        findUrl(propsUrl) {
            let urlActive=null;
            if (propsUrl) {
                urlActive=config[process.env.NODE_ENV].apiBaseUrl + propsUrl;
            } else if (typeof this.props.location !== "undefined") {    
                let {url}=this.props.location.state?this.props.location.state:{url:'No url in location state'};
                urlActive=config[process.env.NODE_ENV].apiBaseUrl + url;
            } else {
                console.log('ERROR: Function \"withRecords\" did not find any url in props or in this.props.location.state'); 
            }   
            console.log('subdir:', this.props.subdir)
            console.log('urlActive before:', urlActive)
            let subdir=this.props.subdir
            subdir=subdir?subdir.charAt(0)==='/'?'':'/' + subdir:undefined
            urlActive += subdir?'?subdir=' + subdir:''; 
            console.log('urlActive after:', urlActive)

            return urlActive;
        }    


        replaceById(list) {
            const newList = this.state.list.map(it => {
                const foundObj = list.find(li => li.id === it.id)
                return foundObj?foundObj:it
            })    
            this.setState({list:newList})
        }

        sortListByKey(list, sortKey, sortDirection) {
            if (sortKey) {
                if (sortDirection===0) {
                    return list.sort((a,b)=>a[sortKey]&&b[sortKey]?a[sortKey].localeCompare(b[sortKey]):a[sortKey]?0:b[sortKey]?1:0)
                } else {    
                    return list.sort((a,b)=>a[sortKey]&&b[sortKey]?b[sortKey].localeCompare(a[sortKey]):a[sortKey]?1:b[sortKey]?0:1)
                }    
            } else {
                return list
            }   
        }    

        // Fetchrecords from database
        fetchFromDatabase(propsUrl) {
            let url = this.findUrl(propsUrl);
            try {
                let username=this.props.username?this.props.username:'';
                let password=this.props.password?this.props.password:'';
                fetchList(username, password, url, (list) => {
                    const sortKey = this.state.sortKey?this.state.sortKey:this.props.sortKey?this.props.sortKey:undefined
                    const sortedList = this.sortListByKey(list, sortKey, this.state.sortDirection)
                    console.log('(withRecords) Number of found elements in list:' + list.length + ' for url=' + url)
                    this.setState({list:sortedList, sortKey});
                })
            } catch(e) {
                this.setState({list:[]});
                let errMessage = 'ERROR:' + e.message + ' ' + ' url=' + url;
                console.log(errMessage);
            } 
        }

        fetchColumns(tableName) {
            let url = this.findUrl("/admin/getColumns?tableName=" + tableName);
            try {
                let username=this.props.username?this.props.username:'';
                let password=this.props.password?this.props.password:'';
                fetchList(username, password, url, columns => {
                    this.setState({columns});
                })
            } catch(e) {
                this.setState({list:[]});
                let errMessage = 'ERROR:' + e.message + ' ' + ' url=' + url;
                console.log(errMessage);
            } 
        }


        // Handle change on a single property of a single element in a list
        handleChangeId(e, id) {
            console.log('withRecords: handleChangeId for id:', id, 'type:', e.target.type, 'name:', e.target.name, 'value:', e.target.value, 'checked:', e.target.checked)
            const list = this.state.list.map(it=> {
                if (it.id === id) {
                    switch(e.target.type) {
                        case 'checkbox': return({...it, [e.target.name]:e.target.checked?1:0})
                        default: return {...it, [e.target.name]:e.target.value} 
                    }    
                } else {
                    return it 
                }
            })
            this.setState({list})
        }


        handleChangeIndex(e, index)
        {
            console.log('withRecords: handleChangeIndex for index:' +  index +  ' ' + e.target.name + ' = ' + e.target.value + ' (checked=' + e.target.checked + ')' );
            let list = this.state.list.map((it, ix)=> {
                if (index === ix) {
                    switch(e.target.type) {
                        case 'checkbox': return({...it, [e.target.name]:e.target.checked===true?1:0})
                        default: return({...it, [e.target.name]:e.target.value})
                    }    
                    // return({...it, [e.target.name]:e.target.value})
                } else {
                    return(it)
                }
            })
            this.setState({list})
        }

        handleChangeValueById(name, value, id)
        {
            console.log('withRecords: handleChangeValueById for id:' +  id +  ' name:' + name + ' value:' + value);
            let list = this.state.list.map((it)=> {
                if (it.id === id) {
                    return({...it, [name]:value})
                } else {
                    return(it)
                }
            })
            this.setState({list})
        }

        handleChangeValueByIndex(name, value, index) 
        {
            console.log('withRecords: handleChangeValue for index:' +  index +  ' name:' + name + ' value:' + value);
            let list = this.state.list.map((it, ix)=> {
                if (ix === index) {
                    return({...it, [name]:value})
                } else {
                    return(it)
                }
            })
            this.setState({list})
        }


        handleDeleteById(id)
        {
            // console.log('withRecords: handleDelete for index:' +  index);
            let list = this.state.list.filter((it)=> it.id !==id);
            this.setState({list})
        }

        handleCopyLine(id)
        {
            // console.log('withRecords: handleDelete for index:' +  index);
            if (this.state.list?this.state.list.length > 0:false) {
                let list =  this.state.list
                let record = list.find(it=>it.id === id)
                record = {...record, id:100000 + idNumber++}
                list = [...this.state.list, record]
                this.setState({list}) 
            } else {
                alert('handleCopyLine: list contains no records')
            }    
        }

        handleAdd(obj)
        {
            console.log('withRecords: handleAdd object:', obj);
            const objWithId = obj.id?obj:{...obj, id:100000 + idNumber++}
            let list = [...this.state.list, objWithId];
            this.setState({list})
        }


        toggleEdit(id) {
            //console.log('Flag edit:', edit)
            let edit = {...this.state.edit,[id]: this.state.edit[id]?undefined:true}
            this.setState({edit});
        };

        toggleEditIds(ids) {
            let edit = {}
            ids.forEach(id => {
                if (!this.state.edit[id]) {
                    edit = {...edit, [id]:true}
                }    
            })    
            this.setState({edit});
        };

        getList () {
            return(this.state.list)
        }

        setList(list) {
            this.setState({list})
        }
      
        render () {
            return(<WrappedComponent 
                list={this.state.list} 
                columns={this.state.columns}
                getList={this.getList} 
                setList={(list)=>this.setList(list)} 
                handleChangeId={this.handleChangeId} 
                handleChangeIndex={this.handleChangeIndex} 
                handleChangeValueById={this.handleChangeValueById} 
                handleChangeValueByIndex={this.handleChangeValueByIndex} 
                handleAdd={this.handleAdd}
                handleCopyLine={this.handleCopyLine}
                handleDeleteById={this.handleDeleteById}
                replaceById={this.replaceById}
                fetchListAgain={this.fetchListAgain}
                updateRow={this.updateRow}
                replaceRow={this.replaceRow}
                deleteRow={this.deleteRow}
                updateTableAll={this.updateTableAll}
                sortStateListByKey={this.sortStateListByKey}
                edit={this.state.edit}
                toggleEdit={this.toggleEdit} 
                toggleEditIds={this.toggleEditIds} 
                {...this.props} 
            />)    
        }    
    }  
}

export default withRecords;
