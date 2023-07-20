import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import Button from 'Components/Button'
import config from 'Settings/config';
import {loadUniqueTemplateList, loadDropdownListObjects} from 'Components/Table/loadDropdownList'
import postCrud from 'functions/postCrud';
import postPayload from 'functions/postPayload';
import ScheduleEdit from './ScheduleEdit'
import groupBy from 'functions/groupBy';
import tkColors from 'Settings/tkColors';
import AddIcon from '@material-ui/icons/NoteAdd';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import UploadFileIcon from '@material-ui/icons/UnarchiveOutlined';
//import UploadFileIcon from '@material-ui/icons/UploadFile';
import SaveIcon from '@material-ui/icons/Save';
import SaveAsIcon from '@material-ui/icons/SaveOutlined';
import ReleaseIcon from '@material-ui/icons/RedoOutlined';
import ReleaseDirectIcon from '@material-ui/icons/ArrowForward';
import FallbackIcon from '@material-ui/icons/UndoOutlined';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Tooltip from '@material-ui/core/Tooltip';
import ScheduleChange from '../ScheduleChange';
import {EVENT_TYPE, SELECTION_MENU_TYPE} from 'Settings/Const';
// import AddCircleIcon from '@mui/icons-material/AddCircle';



const UNSET_ACTION="UNSET_ACTION"
const NEW_ACTION="NEW_ACTION"
const OLD_ACTION="OLD_ACTION"
const CHANGE_ACTION="CHANGE_ACTION"
const DELETE_ACTION="DELETE_ACTION"
const RELEASE_PRODUCTION_ACTION="RELEASE_PRODUCTION_ACTION"
const DELETE_PRODUCTION_ACTION="DELETE_PRODUCTION_ACTION"
const TRUNCATE_PRODUCTION_ACTION="TRUNCATE_PRODUCTION_ACTION"
const DROPDOWN_ACTION="DROPDOWN_ACTION"
const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const styles={
    root:{
        padding:0,
        position:'relative',
        minHeight:'100vh',
        backgroundColor:tkColors.background,
        fontSize:14,
    },
    select: {
        backgroundColor:'lightYellow'
    },
    languageButton: {
        textAlign:'center',
        bottom:15,
    },
    selectTemplateName: {
        textAlign:'left',
        verticalAlign:'middle'
    }
}

class ScheduleCreate extends Component {

    static propTypes = {
        username:PropTypes.string.isRequired,
        password:PropTypes.string.isRequired,
        tableName: PropTypes.string.isRequired,
        productionTable:PropTypes.string.isRequired,
        columns:PropTypes.array.isRequired,
        list:PropTypes.array.isRequired,
        setList:PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {  
            edit:false, 
            templateName:'', 
            eventType:'',
            year:'',
            action:UNSET_ACTION, 
            prodDDownList:null,
            templateDDownList:null,
            eventTypeDDownList:null,

        }    
        this.handleSaveTemplate = this.handleSaveTemplate.bind(this)
        this.newTemplate = this.newTemplate.bind(this)
        this.saveTemplate = this.saveTemplate.bind(this)
        this.saveTemplateAs = this.saveTemplateAs.bind(this)
        this.renderSelectTemplateName = this.renderSelectTemplateName.bind(this)
        this.setTemplateName = this.setTemplateName.bind(this)
        this.updateCurrentTemplateName = this.updateCurrentTemplateName.bind(this)
        this.setAction = this.setAction.bind(this)
        this.executeDeleteTemplatePRODUCTION = this.executeDeleteTemplatePRODUCTION.bind(this)
        this.executeDeleteTemplate = this.executeDeleteTemplate.bind(this)
        this.executeTruncatePRODUCTION = this.executeTruncatePRODUCTION.bind(this)
    }

    fetchAllDropDownLists() {
        loadUniqueTemplateList(
            this.props.username, 
            this.props.password, 
            this.props.productionTable, 
            (prodDDownList)=>this.setState({prodDDownList}));

        loadUniqueTemplateList(
            this.props.username, 
            this.props.password, 
            this.props.tableName, 
            (templateDDownList)=>this.setState({templateDDownList}));

        if (this.props.selectionMenuType===SELECTION_MENU_TYPE.COURSE) {
            loadDropdownListObjects(    
                this.props.username, 
                this.props.password, 
                'tbl_semester_def', 
                (list)=>this.setState({eventTypeDDownList:list.map(it => ({key:it.eventType, value:it.nameSV?it.nameSV:it.nameEN?it.nameEN:it.eventType}))})
            )
        } else {
            loadDropdownListObjects(    
                this.props.username, 
                this.props.password, 
                'tbl_schedule_def', 
                (list)=>this.setState({eventTypeDDownList:list.filter(it=>it.eventType !== EVENT_TYPE.MARATHON).map(it => ({key:it.eventType, value:it.nameSV?it.nameSV:it.nameEN?it.nameEN:it.eventType}))})
            )
        }    
    }    

    componentDidMount() {
        this.fetchAllDropDownLists();
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.props.list) {  
          /*   
          console.log('componentWillReceiveProps:', this.props.list)
          this.fetchAllDropDownLists();
          */
        }  
    }   


    setTemplateName(e) {
        const templateName = e.target.value
        const obj = this.props.list?this.props.list.length > 0?this.props.list.find(it=>it.templateName === templateName):undefined:undefined
        const year = obj?obj.year?obj.year:'':''
        const eventType = obj?obj.eventType?obj.eventType:'':''
        this.setState({templateName, year, eventType})
    }    

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
    

    handleSaveTemplate(templateName, handleReply) {
        if ((this.state.year === '' || this.state.eventType === '') && this.props.dontSelectScheduleId === undefined) {
            alert('WARNING: Please choose eventType and year')
            return false
        } else {
            // Take the current entries and save in a new list and shift the template name to the new one
            let addObj
            if (this.props.dontSelectScheduleId) {
                addObj = {templateName}
            } else {
                addObj = {templateName, eventType:this.state.eventType, year:this.state.year}
            }    

            const inserted=this.props.list.filter(it=>it.templateName === this.state.templateName).map(obj=>({...obj, ...addObj, id:undefined}))

            if (!this.uniqueCheck(this.props.columns, inserted)) { 
                return false
            }    
            //alert(JSON.stringify(inserted))

            const crud = {
                action:DROPDOWN_ACTION,
                deleteByValue:[{templateName}], // Delete 
                inserted, // Insert
            }

            if (crud.inserted.length===0) {
                alert('WARNING: No records in insert array. No new records saved database.')
            } else {
                // alert(JSON.stringify(crud))
                console.log('ScheduleCreate: crud', crud)
                // Post the updated data to url
                let url=apiBaseUrl + '/admin/crud'
                postCrud(url, this.props.username, this.props.password, this.props.tableName, crud, list=>
                {
                    this.fetchAllDropDownLists();
                    this.props.setList(list)
                    handleReply(templateName)
                })
            }    
            return true;
        }
    }

    executeDeleteTemplate(templateName) {
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to delete template " + templateName + " (y/n) ?")) {
            this.setState({action:UNSET_ACTION, templateName:'', eventType:'', year:''})
            return
        } 
        const crud = { 
            action:DROPDOWN_ACTION,
            deleteByValue:[{templateName}]
        }
        console.log('The following will be deleted, crud', crud)

        // Post the updated data to url
        let url=apiBaseUrl +'/admin/crud'
        postCrud(url, this.props.username, this.props.password, this.props.tableName, crud, list=>
        {
            console.log('executeDeleteTemplate: list after handleDelete->postCrud:', list)
            this.props.setList(list.map(it => {delete(it.id);return(it)}));
            this.setState({action:UNSET_ACTION, templateName:''})
        })
    }

    executeDeleteTemplatePRODUCTION(templateName) {
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to delete template " + templateName + " ?")) {
            console.log('The production template ' + templateName + ' was not deleted', crud)
            this.setState({action:UNSET_ACTION, templateName:'', eventType:'', year:''})
            return
        } 
        const crud = { 
            action:DROPDOWN_ACTION,
            deleteByValue:[{templateName}]
        }
        console.log('The following will be deleted, crud:', crud)
        if (!templateName) {
            alert('WARNING: No template to be deleted')
        } else {
            // Post the updated data to url
            let url=apiBaseUrl +'/admin/crud'
            const tableName = this.props.productionTable 
            postCrud(url, this.props.username, this.props.password, tableName, crud, list=>
            {
                const oldListLength = this.state.prodDDownList.length;
                console.log('postCrud: list after delete:', list)
                loadUniqueTemplateList(
                    this.props.username, 
                    this.props.password, 
                    tableName, 
                    prodDDownList=>this.setState({prodDDownList, action:UNSET_ACTION, templateName:''}));
            })
        }    
    }

    executeTruncatePRODUCTION() {
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to delete whole schedule from production ?")) {
            console.log('Production table not truncated since crud action cancelled')
            this.setState({action:UNSET_ACTION, templateName:''})
            return
        } 
        const crud = { 
            action:TRUNCATE_PRODUCTION_ACTION,
            truncate:true
        }
        console.log('The production table will be trunctaced, crud:', crud)

        // Post the updated data to url
        let url=apiBaseUrl +'/admin/crud'
        postCrud(url, this.props.username, this.props.password, this.props.productionTable, crud, (list)=>
        {
            const oldListLength = this.state.prodDDownList.length;
            console.log('OLD list.length=', oldListLength)
            console.log('productionDDist=', this.state.prodDDownList)
            this.setState({action:UNSET_ACTION, prodDDownList:[], templateName:'', eventType:'', year:''})
        })
    }


    executeReleasePRODUCTION = (templateName) => {
        
        const found = this.state.templateDDownList.find(it => templateName === it);
        if (found === undefined) {
            const strJson = JSON.stringify(this.state.templateDDownList)
            alert("Template " + templateName + " not found in list of templates stored in " + this.props.tableName + " (strJson" + strJson + ") , Please choose a valid template")
            this.setState({action:UNSET_ACTION, prodDDownList:[], templateName:'', eventType:'', year:''})
        } else {
            //eslint-disable-next-line
            if (confirm("Are you sure you want to release template " + templateName +  " to production ?")) {
                const url=apiBaseUrl + this.props.releaseLink
                const oldListLength = this.state.prodDDownList.length;
                const payload = {
                    templateName,
                }
                postPayload(url, this.props.username, this.props.password, payload, (data)=>
                {
                    console.log('return after postPayload, data:', data);
                    loadUniqueTemplateList(
                        this.props.username, 
                        this.props.password, 
                        this.props.productionTable, 
                        (prodDDownList)=>this.setState({prodDDownList, action:UNSET_ACTION, templateName:''}));
                })
            } else {
                this.setState({action:UNSET_ACTION, prodDDownList:[], templateName:'', eventType:'', year:''})
            }   
        }
    }

    updateCurrentTemplateName(templateName) {
        this.setState({templateName})
    }


    saveTemplate() {
        return this.handleSaveTemplate(this.state.templateName, this.updateCurrentTemplateName)    
    }

    saveTemplateAs() {
        let newTemplateName = prompt("Save template as:");
        while (this.props.list.find(it => newTemplateName === it.templateName)!==undefined) {
            newTemplateName = prompt("Template " + newTemplateName + " already exists. Please use another name:");
            if (newTemplateName === undefined) {
                break
            }
        }    
        this.handleSaveTemplate(newTemplateName, this.updateCurrentTemplateName)    
    } 
    

    setAction(action) {
        this.setState({action})        
    }

    newTemplate() {
        let templateName = prompt("Please give name of new template:");
        while (this.props.list.find(it => templateName === it.templateName) !== undefined) {
            templateName = prompt("Template name " + templateName + " exists already. Please enter a new unused template name:");
            if (templateName === null) {
                return
            }
        } 
        this.setState({templateName, eventType:'', year:'', action:NEW_ACTION});
        console.log('New templateName ', templateName)   
    }    

    selectEventTypeAndYear () {
        const currentYear = new Date().getFullYear()
        const years = [0, 1, 2, 3, 4, 5].map(it => currentYear + it)
        return(
            (this.state.action === OLD_ACTION || this.state.action === NEW_ACTION) 
            && this.state.eventTypeDDownList!==null
            && this.state.templateName !==undefined?
            <div>
                <h3>Select the event and year</h3>
                <select 
                    style={styles.select}
                    name={'eventType'} 
                    value={this.state.eventType}
                    onChange={e=>this.setState({eventType:e.target.value})}
                > 
                    <option value={''} hidden>{'Choose event'}</option>
                    {this.state.eventTypeDDownList.map(it =>
                        <option 
                            value={it.key} 
                        >
                            {it.value}
                        </option>
                    )}  
                </select>
                &nbsp;&nbsp;
                <select 
                    style={styles.select}
                    name={'year'} 
                    value={this.state.year}
                    onChange={e => this.setState({year: e.target.value})}
                > 
                    <option value={''} hidden>{'Choose year'}</option>
                    {years.map(it =>
                        <option 
                            value={it} 
                        >
                            {it}
                        </option>
                    )}  
                </select>
            </div>
          :null
        )  
    }

    selectionList (list, key) {
        if (!!list === false) {
            return(['list is null'])
        } else if (list.length > 0) {
            const fieldMap = groupBy(list.sort((a,b) => a[key].localeCompare(b[key])), it => it[key])
            return(Array.from(fieldMap.keys()))
        } else {
            return(['no values in list'])
        }
    }



    renderSelectTemplateName = () => 
        <div style={styles.selectTemplateName}>
            {this.state.action===NEW_ACTION? 
                <>
                </>
            :this.state.action===OLD_ACTION? 
                <>
                <h3>Select old template:</h3>
                <select style={styles.select} name={'templateName'} 
                    value={this.state.templateName?this.state.templateName:''} 
                    onChange={this.setTemplateName}
                > 
                    <option value={''} disabled>Choose here</option>
                    {this.selectionList(this.props.list, 'templateName').map((it, idx) =>
                        <option key={idx} style={styles.enabled} value={it} disabled={false}>{it}</option>
                    )}  
                </select>
                </>
            :this.state.action===DELETE_ACTION?
                <>
                <h3>Delete template:</h3>
                <select style={styles.select} name={'templateName'} 
                    value={''} 
                    onChange={e=>this.executeDeleteTemplate(e.target.value)}
                > 
                    <option value='' selected disabled>Choose here</option>
                    {this.selectionList(this.props.list, 'templateName').map((it, idx) =>
                        <option key={idx} style={styles.enabled} value={it} disabled={false}>{it}</option>
                    )}  
                </select>
                </>
            :this.state.action===RELEASE_PRODUCTION_ACTION ?
                <>
                    <h3>Release template to PRODUCTION:</h3>
                    <select style={styles.select} name={'templateName'} 
                        value={''} 
                        onChange={e => this.executeReleasePRODUCTION(e.target.value)}
                    > 
                        <option value='' selected disabled>Choose here</option>
                        {this.selectionList(this.props.list, 'templateName').map((it, idx) =>
                            <option key={idx} style={styles.enabled} value={it} disabled={false}>{it}</option>
                        )}  
                    </select>
                </>
            :this.state.action===DELETE_PRODUCTION_ACTION && this.state.prodDDownList?
                <>
                <h3>Delete single template from production:</h3>
                <select style={styles.select} name={'templateName'} value={this.state.templateName?this.state.templateName:''} onChange={e=>this.executeDeleteTemplatePRODUCTION(e.target.value)}> 
                    <option value='' selected disabled>Choose here</option>
                    {this.state.prodDDownList.map((it, idx) =>
                        <option key={idx} style={styles.enabled} value={it} disabled={false}>{it}</option>
                    )}  
                </select>
                </>
            :null}
                    
    </div>

    _List = (columns) => {
        const filterList=this.props.list.filter(it => it.templateName === this.state.templateName)
        return(
            (this.state.action === OLD_ACTION || this.state.action === NEW_ACTION)?
            <div>
                <ScheduleEdit 
                    {...this.props}
                    saveTemplate={this.saveTemplate}
                    templateName={this.state.templateName}
                    columns={columns}
                    filterList={filterList}
                />     
            </div> 
        :
            null 
        )
    }     

    render = () =>{
        const columns=this.props.columns;
        return(
            <div style={styles.root}>
                <Tooltip title={'Create new template'}><AddIcon style={{color:'green'}} onClick={this.newTemplate} /></Tooltip>&nbsp;
                <Tooltip title={'Edit existing template'}><UploadFileIcon style={{color:'green'}} onClick={()=>this.setAction(OLD_ACTION)}/></Tooltip>&nbsp;
                <Tooltip title={'Save template'}><SaveIcon  style={{color:'green'}} onClick={this.saveTemplate}/></Tooltip>&nbsp;

                {this.state.action === OLD_ACTION||NEW_ACTION?
                    <Tooltip title={'Save template with a new template name'}><SaveAsIcon style={{color:'green'}} onClick={this.saveTemplateAs}/></Tooltip>
                :
                    null
                }
                <Tooltip title={'Delete template'}><DeleteIcon style={{color:'red'}}onClick={()=>this.setAction(DELETE_ACTION)}/></Tooltip>&nbsp;

                &nbsp;&nbsp;&nbsp;&nbsp;    
                &nbsp;
                <Tooltip title={'Choose template from picklist and release it to production'}><ReleaseIcon style={{color:'green'}} onClick={()=>this.setAction(RELEASE_PRODUCTION_ACTION)}/></Tooltip>&nbsp;
                <Tooltip title={'Choose template from picklist and delete it from production'}><FallbackIcon style={{color:'orange'}}onClick={()=>this.setAction(DELETE_PRODUCTION_ACTION)}/></Tooltip>
                <Tooltip title={'Remove all templates from production'}><DeleteSweepIcon style={{color:'red'}}onClick={()=>this.executeTruncatePRODUCTION()}/></Tooltip>

                <div style={{marginBottom:10}} />

                {this.state.action === CHANGE_ACTION?
                    <ScheduleChange />
                :    
                    <div>        
                        <div style={{color:tkColors.Purple.Light}}>
                            {this.renderSelectTemplateName()}
                        </div>
                        <div style={{color:tkColors.Purple.Light}}>
                            {this.props.dontSelectScheduleId===undefined?this.selectEventTypeAndYear():null}
                        </div>
                        {this.state.eventType !== undefined?
                            this.state.action !== UNSET_ACTION?this._List(columns):null
                            :null
                        }
                    </div>
                }    
            </div>
        )
    }
}    
/*
{this.state.action !== UNSET_ACTION?
    <Tooltip title={'Release this template to production'}>
        <ReleaseDirectIcon style={{color:'red'}} onClick={()=>this.handleSaveTemplate(this.state.templateName, templateName => this.executeReleasePRODUCTION(templateName))} />
    </Tooltip>
:null}                                    
*/
//<Tooltip title={'Change existing schedule'}><UploadFileIconOutlined onClick={()=>this.setAction(CHANGE_ACTION)}/></Tooltip>&nbsp;


export default ScheduleCreate
