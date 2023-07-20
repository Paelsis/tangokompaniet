import React, {Component} from 'react';
import TextShow from 'Components/Text/TextShow'

export default class ShowHtml extends Component {
    // Render 
    render() { 
        return(
            <div>
                <TextShow url={'/getTexts'} groupId={this.props.groupId} textId={this.props.textId}>
                    <h1>No text found in tbl_text for groupId = {this.props.groupId} and textId={this.props.textId}... Please fill in !!!</h1>
                </TextShow>
            </div>   
        )
    }
}

// Using old table
// < div dangerouslySetInnerHTML={{__html: this.props.myHtml}} />
