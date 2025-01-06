import React, {Component} from 'react';
import GetMapMap from './GetMapMap'
import {acceptKeys} from 'Settings/Utils'

let styles = {
    root:{
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
        //// console.log('handleOpen open:', open);
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
        if (this.props.edit[row.id]) {
            this.props.updateRow(acceptRow)
            this.props.toggleEdit(row.id)
        } 
    }

    toggleEdit(row) {
        this.props.toggleEdit(row.id);
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

