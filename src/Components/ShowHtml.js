import React, {Component} from 'react';
import EditText from 'Components/Text/EditText'

export default class ShowHtml extends Component {
    // Render 
    render() { 
        return(
            <div>
                <EditText url={'/getTexts'} groupId={this.props.groupId} textId={this.props.textId}>
                    <h1>No text found in tbl_text for groupId = {this.props.groupId} and textId={this.props.textId}... Please fill in !!!</h1>
                </EditText>
            </div>   
        )
    }
}

// Using old table
// < div dangerouslySetInnerHTML={{__html: this.props.myHtml}} />
