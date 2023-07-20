import React, {Component} from 'react';
import config from 'Settings/config';
import GetMapMap from './GetMapMap'
import {postUpdTable, postUpdTableAll} from 'functions/postUpdTable'
import {acceptKeys} from 'Settings/Utils'

let styles = {
    root:{
        flex:1,
        position:'relative',
        marginRight:'auto',
        marginLeft:'auto',
    },
};

const Com = ({name}) => <h1>Hello {name}</h1>



export default class GetRegistrationMapMap extends Component {
    constructor() {
        super();
        this.state = {open: []};
        this.handleOpen = this.handleOpen.bind(this)
        this.toggleEditAndSave = this.toggleEditAndSave.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.toggleEditList = this.toggleEditList.bind(this)
    }

    componentDidMount () {
        const open=this.props.groupByDefArr.map(it => ({}))
        this.setState({open});
    }  

    handleOpen(index, key) {
        let collapseAll=false;
        let open=this.state.open.map((op, ix) => {
            if (ix===index) {
                collapseAll=op[key]?true:false;
                return({...op, [key]:op[key]?undefined:true})
            } else if (collapseAll) {
                return({});
            } else {    
                return(op);
            }
        })
        //console.log('handleOpen open:', open);
        this.setState({open});
    };

    toggleEditAndSave(row) {
        // Don't remove the row.id for updateFields 
        let acceptRow = acceptKeys(row, this.props.updateFields)
        if (!!row.id === false) {
            // alert('toggleEditAndSave row:' . JSON.stringify(row))
            return
        }
        acceptRow={...acceptRow, id:row.id};
        this.props.edit[row.id]?this.props.updateRow(acceptRow):console.log('Do nothing in database');
        this.props.toggleEdit(row.id)
    }

    toggleEdit(row) {
        this.props.toggleEdit(row.id);
    }

    toggleEditList(list) {
        // Don't remove the row.id for updateFields 
        // const acceptList = list.map(row => ({...acceptKeys(row, this.props.updateFields), id:row.id}));  
        
        // 15/5-2022 Remove id's. The id must be undefined, otherwise replace stmt will update primary key id, instead of unique key on name and course date  
        const acceptList = list.map(row => ({...acceptKeys(row, this.props.updateFields), id:undefined}));  
        this.props.edit[list[0].id]?this.props.updateTableAll(acceptList):console.log('Do nothing in database');
        const ids = list.map(it => it.id)
        this.props.toggleEditIds(ids);
    }

    render = () => {
        return(
            <div style={styles.root} >
                &nbsp;&nbsp;    
                <GetMapMap 
                    {...this.props}
                    open={this.state.open}
                    handleOpen={this.handleOpen}
                    toggleEditAndSave={this.toggleEditAndSave}
                    toggleEdit={this.toggleEdit}
                    replaceRow={this.props.replaceRow}
                    toggleEditList={this.toggleEditList}
                />
            </div>
        )    
    }
}

