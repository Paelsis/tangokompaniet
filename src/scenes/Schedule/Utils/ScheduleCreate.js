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
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EditOutlinedIcon from '@material-ui/icons/Toc';
import EditIcon from '@material-ui/icons/Edit';
// import EditIcon from '@material-ui/icons/UploadFile';
import SaveIcon from '@material-ui/icons/Save';
// import SaveOutlinedIcon from '@material-ui/icons/Save';
import SaveAsIcon from '@material-ui/icons/SaveOutlined';
// import SaveAsOutlinedIcon from '@material-ui/icons/SaveAsOutlined';
import ReleaseIcon from '@material-ui/icons/RedoOutlined';
import PublishIcon from '@material-ui/icons/Publish';
import PublishIconOutlined from '@material-ui/icons/PublishOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FallbackIcon from '@material-ui/icons/Undo';
import DeleteIconOutlined from '@material-ui/icons/DeleteOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Tooltip from '@material-ui/core/Tooltip';
import {EVENT_TYPE, SELECTION_MENU_TYPE} from 'Settings/Const';
// import AddCircleIcon from '@material-ui/icons/AddCircle';



const UNSET_ACTION="UNSET_ACTION"
const NEW_ACTION="NEW_ACTION"
const OLD_ACTION="OLD_ACTION"
const CHANGE_ACTION="CHANGE_ACTION"
const DELETE_ACTION="DELETE_ACTION"
const DELETE_PRODUCTION_ACTION="DELETE_PRODUCTION_ACTION"
const TRUNCATE_PRODUCTION_ACTION="TRUNCATE_PRODUCTION_ACTION"
const DROPDOWN_ACTION="DROPDOWN_ACTION"
const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const styles={
    root:{
        padding:0,
        position:'relative',
        minHeight:'100vh',
        textAlign:'center',
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
        position:'relative',
        paddingTop:20, 
        textAlign:'center',
        verticalAlign:'middle'
    },
    tooltip:{
        fontSize:18,
        color:'white',
    }
}


export default class ScheduleCreate extends Component {

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
            templateName:undefined, 
            eventType:undefined,
            year:undefined,
            action:UNSET_ACTION, 
            prodDDownList:null,
            templateDDownList:null,
            eventTypeDDownList:null,
            buttonColor:'grey',
            dbSuccess:false,
            successText:undefined,
        }    
        this.handleSaveTemplate = this.handleSaveTemplate.bind(this)
        this.newTemplate = this.newTemplate.bind(this)
        this.renderSelectTemplateName = this.renderSelectTemplateName.bind(this)
        this.setTemplateName = this.setTemplateName.bind(this)
        this.handleReply = this.handleReply.bind(this)
        this.setAction = this.setAction.bind(this)
        this.handleDeleteTemplate = this.handleDeleteTemplate.bind(this)
        this.handleDeleteTemplateFromProduction = this.handleDeleteTemplateFromProduction.bind(this)
        this.handleTruncateTemplatesFromProduction = this.handleTruncateTemplatesFromProduction.bind(this)
        this.saveTemplate = this.saveTemplate.bind(this)
        this.saveTemplateAs = this.saveTemplateAs.bind(this)
        this.saveTemplateAsAndRelease = this.saveTemplateAsAndRelease.bind(this)
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

    handleReply(templateName) {
        this.setState({buttonColor:'green', dbSuccess:true})
        setTimeout(() => this.setState({dbSuccess:false, successText:'', buttonColor:'grey'}), 3500);
        this.fetchAllDropDownLists();
        this.setState({templateName})
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
        if ((this.state.year === undefined || this.state.eventType === undefined) && !!this.props.dontSelectEventTypeAndYear) {
            alert('WARNING: Please choose eventType and year')
            return false
        } else {
            // Take the current entries and save in a new list and shift the template name to the new one
            let addObj
            if (this.props?this.props.dontSelectEventTypeAndYear:false) {
                addObj = {templateName}
            } else {
                addObj = {templateName, eventType:this.state.eventType, year:this.state.year}
            }    

            const inserted=this.props?this.props.list.filter(it=>it.templateName === this.state.templateName).map(obj=>({...obj, ...addObj, id:undefined})):undefined

            if (!this.uniqueCheck(this.props.columns, inserted)) { 
                alert('WARNING: Unique check failed')
                return false
            }    
            //alert(JSON.stringify(inserted))

            const crud = {
                action:DROPDOWN_ACTION,
                deleteByValue:[{templateName}], // Delete 
                inserted, // Insert
            }

            if (!crud.inserted) {
                alert('WARNING: No schedule to save in database.')
            } else {
                //alert(JSON.stringify(crud))
                // Post the updated data to url
                let url=apiBaseUrl + '/admin/crud'
                postCrud(url, this.props.username, this.props.password, this.props.tableName, crud, list=>
                {
                    this.props.setList(list)
                    this.setState({successText:'Template ' + templateName + ' saved successfully'})
                    handleReply(templateName)
                })
            }    
            return true;
        }
    }


    handleSaveAndRelease(templateName, handleReply) {

        this.setState({successText:'Template saved and released successfully'})
        this.handleSaveTemplate(templateName, templateName => this.handleReleaseProduction(templateName, handleReply))
    }    

    handleDeleteTemplate(templateName) {
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to delete template " + templateName + " (y/n) ?")) {
            this.setState({action:UNSET_ACTION, templateName:undefined, eventType:'', year:''})
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
            console.log('handleDeleteTemplate: list after handleDelete->postCrud:', list)
            this.props.setList(list.map(it => {delete(it.id);return(it)}));
            this.setState({action:UNSET_ACTION, successText:'Delete of template ' + templateName + ' successful'})
            this.handleReply(undefined)
        })
    }

    handleDeleteTemplateFromProduction(templateName, handleReply) {
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to delete template " + templateName + " ?")) {
            console.log('The production template ' + templateName + ' was not deleted', crud)
            this.setState({action:UNSET_ACTION, templateName:undefined, eventType:'', year:''})
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
                this.setState({action:UNSET_ACTION, successText:'Template ' + templateName + ' removed from production'})
                handleReply(undefined)
            })
        }    
    }

    handleTruncateTemplatesFromProduction() {
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to delete whole schedule from production ?")) {
            console.log('Production table not truncated since crud action cancelled')
            this.setState({action:UNSET_ACTION, templateName:undefined})
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
            this.setState({action:UNSET_ACTION, successText:'All templates removed from production'})
            this.handleReply(undefined)
        })
    }


    handleReleaseProduction(templateName, handleReply) {
        
            //eslint-disable-next-line
            if (confirm("Are you sure you want to release template " + templateName +  " to production ?")) {
                const url=apiBaseUrl + this.props.releaseLink
                const oldListLength = this.state.prodDDownList.length;
                const payload = {
                    templateName,
                }
                postPayload(url, this.props.username, this.props.password, payload, (data)=>
                {
                    this.setState({action:UNSET_ACTION, successText:'Template ' + templateName + ' released to production'});
                    handleReply(undefined)
                })
            }
    }



    saveTemplate() {
        if (this.state.templateName) {
            return this.handleSaveTemplate(this.state.templateName, this.handleReply)    
        } else {
            alert('WARNING: No template name (function: saveTemplate)')
        }    
    }

    saveTemplateAs() {
        let newTemplateName = prompt("Save template as:");
        while (this.props.list.find(it => newTemplateName === it.templateName)!==undefined) {
            newTemplateName = prompt("Template " + newTemplateName + " already exists. Please use another name:");
            if (newTemplateName === undefined) {
                break
            }
        }    
        this.handleSaveTemplate(newTemplateName, this.handleReply)    
    } 
    
    saveTemplateAsAndRelease() {
        let newTemplateName = prompt("Save template as:");
        while (this.props.list.find(it => newTemplateName === it.templateName)!==undefined) {
            newTemplateName = prompt("Template " + newTemplateName + " already exists. Please use another name:");
            if (newTemplateName === undefined) {
                break
            }
        }    
        this.handleSaveAndRelease(newTemplateName, this.handleReply)    
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

    setEventTypeAndYear () {
        const currentYear = new Date().getFullYear()
        const years = [0, 1, 2, 3, 4, 5].map(it => currentYear + it)
        return(
            (this.state.action === OLD_ACTION || this.state.action === NEW_ACTION) 
            && this.state.eventTypeDDownList!==null
            && this.state.templateName !==undefined?
            <div>
                <h3 style={{paddingBottom:20}}>Set event and year</h3>
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
                <div style={{paddingBottom:20}}>
                <h3 style={{paddingBottom:20}}>Select old template:</h3>
                <select style={styles.select} name={'templateName'} 
                    value={''} 
                    onChange={this.setTemplateName}
                > 
                    <option value={''} selected disabled>Choose here</option>
                    {this.selectionList(this.props.list, 'templateName').map((it, idx) =>
                        <option key={idx} style={styles.enabled} value={it} disabled={false}>{it}</option>
                    )}  
                </select>
                </div>
            :this.state.action===DELETE_ACTION?
                <>
                <h3>Delete template:</h3>
                <select style={styles.select} name={'templateName'} 
                    value={''} 
                    onChange={e=>this.handleDeleteTemplate(e.target.value)}
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
                <select style={styles.select} name={'templateName'} value={this.state.templateName?this.state.templateName:undefined} onChange={e=>this.handleDeleteTemplateFromProduction(e.target.value, this.handleReply)}> 
                    <option value='' selected disabled>Choose here</option>
                    {this.state.prodDDownList.map((it, idx) =>
                        <option key={idx} style={styles.enabled} value={it} disabled={false}>{it}</option>
                    )}  
                </select>
                </>
            :null}
                    
    </div>

    _List = columns => {
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
        const columns=this.props.columns
        const buttonStyle={color:this.state.buttonColor}
        const dontSelectEventTypeAndYear = this.props.dontSelectEventTypeAndYear
        return(
            <div style={styles.root}>
                <h1>{this.props.title?this.props.title:'No title'}</h1>
                <Tooltip title={<h4 style={styles.tooltip}>Edit existing template</h4>} style={styles.tooltip}>
                    <EditOutlinedIcon style={buttonStyle} onClick={()=>this.setAction(OLD_ACTION)}/>
                </Tooltip>&nbsp;
                <Tooltip title={<h4 style={styles.tooltip}>Create a new template</h4>} style={styles.tooltip}>
                    <NoteAddIcon style={buttonStyle} onClick={this.newTemplate} />
                </Tooltip>&nbsp;
                <Tooltip title={<h4 style={styles.tooltip}>Save template</h4>} style={styles.tooltip}>
                    <SaveIcon  style={buttonStyle} onClick={()=>this.handleSaveTemplate(this.state.templateName, this.handleReply)}/>
                </Tooltip>&nbsp;
                <Tooltip title={<h4 style={styles.tooltip}>Save template and release it to production</h4>} style={styles.tooltip}>
                    <PublishIcon style={buttonStyle} onClick={()=>this.handleSaveAndRelease(this.state.templateName, this.handleReply)}/>
                </Tooltip>&nbsp;

                {this.state.action === OLD_ACTION||NEW_ACTION?
                    <>
                        <Tooltip title={<h4 style={styles.tooltip}>Save template with new name</h4>} style={styles.tooltip}>
                            <SaveAsIcon style={buttonStyle} onClick={this.saveTemplateAs}/>
                        </Tooltip>
                        <Tooltip title={<h4 style={styles.tooltip}>Save template with new name and release it to production</h4>} style={styles.tooltip}>
                            <PublishIconOutlined style={buttonStyle} onClick={this.saveTemplateAsAndRelease}/>
                        </Tooltip>
                    &nbsp;
                    </>
                    :
                        null
                }

                &nbsp;&nbsp;&nbsp;&nbsp;    
                &nbsp;
                <Tooltip title={<h4 style={styles.tooltip}>Remove template</h4>} style={styles.tooltip}>
                    <DeleteIconOutlined style={buttonStyle} onClick={()=>this.setAction(DELETE_ACTION)}/>
                </Tooltip>&nbsp;
                <Tooltip title={<h4 style={styles.tooltip}>Remove single template from production</h4>} style={styles.tooltip}>
                    <DeleteIcon style={buttonStyle} onClick={()=>this.setAction(DELETE_PRODUCTION_ACTION)}/>
                </Tooltip>
                <Tooltip title={<h4 style={styles.tooltip}>Remove all templates from production</h4>} style={styles.tooltip}>
                    <DeleteSweepIcon style={buttonStyle} onClick={()=>this.handleTruncateTemplatesFromProduction()}/>
                </Tooltip>

                {this.state.dbSuccess?<h4 style={{color:this.state.buttonColor}}>{this.state.successText}</h4>:null}
                <div style={{marginBottom:10}} />

                <div>        
                    <div style={{color:tkColors.Purple.Light}}>
                        {this.renderSelectTemplateName()}
                    </div>
                    <div style={{color:tkColors.Purple.Light}}>
                        {dontSelectEventTypeAndYear?null:this.setEventTypeAndYear()}
                    </div>
                    {this.state.eventType !== undefined?
                        this.state.action !== UNSET_ACTION?this._List(columns):null
                        :null
                    }
                </div>
            </div>
        )
    }
}    
/*
{this.state.action !== UNSET_ACTION?
    <Tooltip title={'Release this template to production'}>
        <ReleaseDirectIcon style={{color:'red'}} onClick={()=>this.handleSaveTemplate(this.state.templateName, templateName => this.handleReleaseProduction(templateName))} />
    </Tooltip>
:null}                                    
*/


